import mongoose from 'mongoose';
import App from '../../frontend/src/App';
import router from '../controllers/errorController';

const required = true;
const unique = true;

// TODO: move following into userSchema (.models/user.js):
    // comments: [{
    //     type: Schmema.Types.ObjectId,
    //     ref: "userComments"
    // }]

// TODO: import Comment from "../models/comment.js" (in userController)

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "radioUsers"
    },
    title: String,
    content: String
})

const Comment = mongoose.model("userComments", commentSchema);

export default Comment;

// from here goes into userController

// TODO: integrate following endpoint into login in userController (getting all Comments on login):

router.use("/:user/comments", async (req, res) => {
    try {
        const allComments = await Comment.find();
        res.json(allComments);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
        return;
    }
})

// add a comment

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
async (req, res) => {
    console.log(req.body);
    try {
        const newComment = await Comment.create({
        
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
        return;
    }

})