import React, { useState, useContext } from "react"

export const CommentsContext = React.createContext()

export function CommentsContextProvider(props) {
    const [comments, setComments] = useState([
    { id: 58477, name:"Maxie",text: "Waw amazing music"},
    { id: 58477, name:"Maria",text: "This radio app is so well made, I cannot believe it!!!!"},
    { id: 58477, name:"Kalaya",text: "I loooooove this song"},
])

    return (
        <CommentsContext.Provider value={[ comments, setComments ]}>
            {props.children}
        </CommentsContext.Provider>
    )
}

export const useCommentsContext = () => {
    return useContext(CommentsContext)
}