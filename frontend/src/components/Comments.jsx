import Comment from "./Comment.jsx"
import CreateComment from "./CreateComment.jsx"
import "./Comments.css"

export default function Comments() {
    return (
       <div className="commentsWrapper">
        <CreateComment />
        <Comment />   
       </div>
    )
}