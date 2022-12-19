const { model, Schema, Types: {ObjectId}} = require("mongoose");

const EMAIL_PATERM = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;

const userShcema = new Schema({
    first_name: {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    last_name: {
        type: String,
        require: true,
        min: 3,
        max: 10
    },
    email: {
        type: String,
        require: true,
        validate: {
            validator(value){
                return EMAIL_PATERM.test(value);
            },
            message: `Email must be valid!!`
        },
    },
    hashedPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        require: true,
        enum: [`admin`, `broker`, `use`]
    },
    phone_number: {
        type: String,
        require: true
    }
});

userShcema.index({email: 1}, {
    unique: true,
    collation: {
        locale: `en`,
        strength: 2
    }
})

const User = model("User", userShcema);
module.exports = User;