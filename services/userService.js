const User = require('../models/User');
const { hash } = require('bcrypt');

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
        phone_number,
    });

    await user.save();

    return user;
}

async function getUserByEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, `i`) });
    return user;
}

async function findUserById(userId) {
    const user = await User.findById(userId);
    return user;
}

async function updateUserProfile(userId, userProfile) {
    const existing = await User.findById(userId);

    existing.first_name = userProfile.firstName;
    existing.last_name = userProfile.lastName;
    existing.phone_number = userProfile.phoneNumber;

    await existing.save();
    return existing;
}

async function updateUserPassword(userId, password) {
    const existing = await User.findById(userId);

    const hashedPassword = await hash(password, 10);

    existing.password = hashedPassword;

    await existing.save();
    return existing;
}

async function updateUserEmail(userId, email) {
    const existing = await User.findById(userId);

    existing.email = email;

    await existing.save();
    return existing;
}

async function queryUserNames(userId) {
    const namesResult = await User.findById(userId).select(['first_name', 'last_name']);
    if (!namesResult) return 'Deleted user';
    const userNames = `${namesResult.first_name} ${namesResult.last_name}`;
    return userNames;
}

module.exports = {
    updateUser,
    createUser,
    getUserByEmail,
    findUserById,
    updateUserProfile,
    updateUserPassword,
    updateUserEmail,
    queryUserNames,
};
