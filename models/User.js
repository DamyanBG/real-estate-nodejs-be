import { model, Schema, Types } from 'mongoose';
const EMAIL_REGEX = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    last_name: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return EMAIL_REGEX.test(value);
            },
            message: `Email must be valid!!`,
        },
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: [`admin`, `broker`, `user`],
    },
    phone_number: {
        type: String,
        required: true,
    },
});

userSchema.index(
    { email: 1 },
    {
        unique: true,
        collation: {
            locale: `en`,
            strength: 2,
        },
    }
);

const User = model('User', userSchema);
export default User;
