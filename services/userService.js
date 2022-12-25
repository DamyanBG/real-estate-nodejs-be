const User = require("../models/User");
const { hash } = require("bcrypt");

async function updateUser(userId, user) {
    const existing = await User.findById(userId);

    existing.first_name = user.first_name;
    existing.last_name = user.last_name;
    existing.email = user.email;
    existing.hashedPassword = user.hashedPassword;
    existing.role = user.role;
    existing.phone_number = user.phone_number;

    await existing.save();
    return existing;
}

async function createUser(first_name, last_name, email, password, role, phone_number) {

    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error(`Email is taken`);
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role,
        phone_number
    })

    await user.save();

    return user;

}

async function getUserByEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, `i`) });
    return user;
}

async function findUserById(userId) {
    console.log('do we call fundUserId')
    const user = await User.findById(userId);
    console.log(user, "user from findUserById")
    return user
}

module.exports = {
    updateUser,
    createUser,
    getUserByEmail,
    findUserById
}