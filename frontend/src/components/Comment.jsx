import { useCommentsContext } from "../contexts/CommentsContext"
import React, { useState} from 'react'



function Comment(){
    const [ comments, setComments ] = useCommentsContext()

    return(
        <div className="comment">
            {comments.map((comment, index) => (
                <ul>
                    <li >
                        <p className="comment-name">{comment.name}</p>
                        <p className="comment-text">{comment.text}</p>
                        <div className="reactions">
                            <span>&#128077;</span>
                            <span>&#128078;</span>
                            <p>REPLY</p>
                        </div>
                    </li>
                </ul>
              ))}
        </div>
    )
}

export default Comment