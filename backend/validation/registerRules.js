import { body } from 'express-validator';

const registerRules = [
    body("name").not().isEmpty().trim().escape().withMessage("name-has-invalid-input"),
    body("email").isEmail().normalizeEmail().withMessage("email-invalid"),
    // body("password").isLength({min: 8}).withMessage("password-too-short"), // is included in .isStrongPassword
    body("password").isLength({max: 28}).withMessage("password-too-long"),
    body("password").isStrongPassword().withMessage("password-too-weak"),
];

export default registerRules;
