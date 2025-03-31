const validator = require('validator');

 const validateSignUp = (data) => {
    if (data.email && !validator.isEmail(data.email)) {
        throw new Error("Invalid email format");
    }
    else if (!validator.isStrongPassword(data.password)) {
        throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
    }

}

exports.validateSignUp = validateSignUp
