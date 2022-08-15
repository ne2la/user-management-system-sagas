import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const complexityOptions = {
    min: 8,
    max: 250,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 6,
};

const email = Joi.string().email().lowercase().required();
const nameJoi = Joi.string().pattern(/^[a-zA-Z ]+$/).min(3).required();
const passwordJoi = passwordComplexity(complexityOptions);

export const signUpSchema = Joi.object({
    firstName: nameJoi,
    lastName: nameJoi,
    email,
    password : passwordJoi,
    confirmPassword : Joi.ref('password'),
})

export const signInSchema = Joi.object({
    email,
    password : passwordJoi,
})

export const resetPasswordSchema = Joi.object({
    email
})

export const userDetailSchema = Joi.object({
    userName: nameJoi,
    userEmail: email,
    occupation: nameJoi,
    NIC: Joi.string().alphanum().length(12).required(),
    userImage: Joi.string()
})