const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const SALT_ROUNDS = 10;

    return await bcrypt.hash(password, SALT_ROUNDS);
}

module.exports = hashPassword;