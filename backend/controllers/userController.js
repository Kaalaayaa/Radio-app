import express from 'express';
import User from '../models/user.js';
import Comment from '../models/comment.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { compareHashes } from '../libs/crypto.js';
import validate from '../middlewares/checkValidation.js';
import loginRules from '../validation/loginRules.js';
import registerRules from '../validation/registerRules.js';
import commentRules from '../validation/commentRules.js';


const router = express.Router();
dotenv.config();

const secret = process.env.SECRET;

router.post("/register", 
validate(registerRules), 
async (req, res) => {
	try {
		let userCheck = await User.findOne({
			email: req.body.email,
		});
		if (userCheck) {
			return res.status(400).send("That user already exists!");
		} 

		const user = await User.register(req.body);
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: "Check inputs" });
	}
});

router.post('/login', 
validate(loginRules), 
async (req, res) => {
	try {
		const user = await User.findOne({
      email: req.body.email,
  	})
		if (!user) {
				return res.json({ 
					status: 'error',
					error: 'Invalid login'
				})
		}

		const isPasswordValid = await compareHashes(req.body.password, user.password);
		
		if (isPasswordValid) {
			const token = jwt.sign({
						name: user.name,
						email: user.email,
				},
				secret
			)
			
			// load comments together with successful login
			const allComments = await Comment.find();

			return res.json({ 
				status: 'ok',
				userToken: token,
				comments: allComments
			})
		} else {
			return res.json({ 
				status: 'error',
				user: false
			})
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: "Check inputs" });
	}
  
})

// checkLogin is to check if there's still a valid JWT token (optional, if we are also able to build the authorization headers into the frontend)

// const checkLogin = (req, res, next) => {
//     const rawJWTHeader = req.headers.authorization;
//     if (!rawJWTHeader) { return res.sendStatus(401) };
//     const tokenToCheck = rawJWTHeader.slice(7);
//     jwt.verify(tokenToCheck, process.env.SECRET, (err, decoded) => {
//         if (err) {
//             console.log("Error verifying JWT: ", err.message);
//             return res.sendStatus(401);
//         }
//         console.log(decoded);
//         next();
//     });
// };

router.post("/:user/commenting", 
// checkLogin, 
validate(commentRules), 
async (req, res) => {
    // console.log(req.body);
    try {
			const userMatch = await User.findOne({ _id: req.params.user});
			if (!userMatch) {
					return res.status(400).json({ success: false });
			}

			const newComment = await Comment.create({
					user: userMatch._id,
					// user: userMatch.name, // TODO? not sure how to get the username displayed (needs to be wrangled in frontend?)
					title: req.body.title,
					content: req.body.content
			})
			userMatch.comments.push(newComment);
			res.json(newComment);

    } catch (error) {
			res.status(400).json({ error: error.message });
			console.log(error);
			return;
    }

});

export default router;
