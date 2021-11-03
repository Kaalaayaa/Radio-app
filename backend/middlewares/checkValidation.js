import { validationResult } from 'express-validator';

const validate = (rules) => {
	const middlewares = rules;
	middlewares.push((req, res, next) => {
			const result = validationResult(req);
			if (result.isEmpty()) {
				return next();
			}
            // console.log(result);
			res.status(400);
			res.json({
					errors: result.errors.map(e => e.msg)
			});
	})
	return middlewares;
}

export default validate;

