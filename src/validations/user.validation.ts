import Joi from 'joi'

const loginUser = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
}

const registerUser = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
    })
}

export default {
    loginUser,
    registerUser
}