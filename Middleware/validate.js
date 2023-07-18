const joi = require('joi');

exports.validateRegistration = (data) => {
    const schema = joi.object().keys({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required().label('Email'),
        mobileNumber: joi.string().length(10).optional(),
        password: joi.string().min(8).required()
    })//.options({ allowUnknown: true });
    return schema.validate(data);
}

exports.validateLogin = (data) => {
    const schema = joi.object().keys({
        email: joi.string().email().required().label('Email'),
        password: joi.string().min(8).required()
    })//.options({ allowUnknown: true });
    return schema.validate(data);
}

exports.addCourse = (data) => {
    const schema = joi.object().keys({
        name: joi.string().min(5).max(50).required(),
        price: joi.string().required(),
        title: joi.string().min(20).max(100).required(),
    })//.options({ allowUnknown: true });
    return schema.validate(data);
}