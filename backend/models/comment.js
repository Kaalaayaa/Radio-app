import mongoose from 'mongoose';

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