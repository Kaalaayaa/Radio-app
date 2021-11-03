import express from 'express';
import User from '../models/user.js';
import Comment from '../models/comment.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { compareHashes } from '../libs/crypto.js';
import validate from '../middlewares/checkValidation.js';
import userValidators from '../validation/userValidators.js';



const router = express.Router();
dotenv.config();

const secret = process.env.SECRET;

router.post("/register", 
// validate(userValidators), same error as with register?
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
			email: user.email,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: "Check inputs" });
	}
});

router.post('/login', 
// validate(userValidators), // getting error here: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
async (req, res) => {
	try {
		const user = await User.findOne({
      email: req.body.email,
  	})

		if (!user) {
				return { // comment from maxie: does this need to be a res.json() or where is this returned object going to ?
						status: 'error',
						error: 'Invalid login'
				}
				// like this: 
				// return res.json({ 
				// 	status: 'error',
				// 	error: 'Invalid login'
				// })
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
			// res.json(allComments);

			return res.json({ // Comment from maxie: the return needs to go, if you have a else, no?
				status: 'ok',
				userToken: token,
				comments: allComments
			})
			// like this: 
			// res.json({ 
			// 	status: 'ok',
			// 	userToken: token,
			// 	comments: allComments
			// })
		} else {
			return res.json({ // same here
				status: 'error',
				user: false
			})
			// like this:
			// res.json({ 
			// 	status: 'error',
			// 	user: false
			// })
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
// validate(userValidators), // can't use them 
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
