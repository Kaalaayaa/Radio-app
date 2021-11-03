import { body } from 'express-validator';

// Add request body validation and even one header validator :)
// Custom error messages enable easier translation in the frontend
const loginRules = [
    body("email").isEmail().normalizeEmail().withMessage("email-invalid"),
    // body("password").isLength({min: 8}).withMessage("password-too-short"), // is included in .isStrongPassword
    body("password").isLength({max: 28}).withMessage("password-too-long"),
    body("password").isStrongPassword().withMessage("password-too-weak"),
];

export default loginRules;

