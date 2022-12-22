const { model, Schema, Types: {ObjectId}} = require("mongoose");

const EMAIL_REGEX = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;

const userSchema = new Schema({
    first_name: {
        type: String,
        require: true,
        min: 3,
        max: 50
    },
    last_name: {
        type: String,
        require: true,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        require: true,
        validate: {
            validator(value){
                return EMAIL_REGEX.test(value);
            },
            message: `Email must be valid!!`
        },
    },
    hashedPassword: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        enum: [`admin`, `broker`, `user`]
    },
    phone_number: {
        type: String,
        require: true
    }
});

userSchema.index({email: 1}, {
    unique: true,
    collation: {
        locale: `en`,
        strength: 2
    }
})

const User = model("User", userSchema);
module.exports = User;