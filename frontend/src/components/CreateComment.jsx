import { useCommentsContext } from '../contexts/CommentsContext'
import { useState } from 'react'


function CreateComment(){
    const [comment, setComment] = useState("")
    const [comments , setComments] = useCommentsContext()

    function addComment(e) {
        const id = Math.floor(Math.random() * 99)

        setComments([...comments, {id, name:"Kalaya", text:comment}])
        setComment("")
    }

    function handleChange(event){
        setComment(event.target.value)
    }

    function handleKeyPress(e) {
       if(e.key === 'Enter'){
     addComment()
  } 
    }
    


    return(
        <div>
                <input 
                className="createComment" 
                type="text"
                value={comment}
                placeholder="Add a public comment..."
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                />
        </div>
    )
}

export default CreateComment