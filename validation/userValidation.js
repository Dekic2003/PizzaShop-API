const Joi = require('joi')


const registerValidation=(data)=>{
    const schema=Joi.object({
        name:Joi.string().max(255).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).max(1024).required()

    })
    return schema.validate(data);
}

module.exports.registerValidation=registerValidation;
