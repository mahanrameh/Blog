const yup = require("yup");



const registerSchema = yup.object().shape({
    name: yup.string().max(255).required(),
    username: yup.string().matches(
        /^[a-zA-Z0-9] + ([._]?[a-zA-Z0-9]+)$/, 
        'username can contain letter and number'
    ).min(8).max(255).required(),
    email: yup.string().email().max(255).required(),
    password: yup.string().min(8).optional(),
    confirmPassword: yup.string().oneOf([yup.ref('password')])
});


module.exports = registerSchema;