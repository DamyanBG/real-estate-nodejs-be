const User = require("../models/User");

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

module.exports = {
    updateUser
}