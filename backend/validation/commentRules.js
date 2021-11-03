import { body } from 'express-validator';

const commentRules = [
    body("title").not().isEmpty().trim().escape().withMessage("title-has-invalid-input"),
    body("content").not().isEmpty().trim().escape().withMessage("title-has-invalid-input"),
];

export default commentRules;
