import CSS from "./UpdateModal.module.css";
import React, { useEffect } from 'react';
import { useState } from "react";
import ReactDOM from "react-dom";

const UpdateModal = ({close, update, userId, postId, title, postBody}) => {
    const [newTitle, setNewTitle] = useState(title);
    const [newPostBody, setNewPostBody] = useState(postBody);

    const handleTitleChange = (text) => {
        setNewTitle((prev)=>prev = text);
    }

    const handleContentChange = (text) => {
        setNewPostBody((prev)=>prev = text);
    }

    return ReactDOM.createPortal(
        <>
        <div onClick={()=>close()} className={CSS.overlay}></div>
        <div className={CSS.modalContainer}>
            <button onClick={()=>close()}  className={CSS.remove}>&#x2716;</button>
            <p className={CSS.userId}>UserId: {userId}</p>
            <p className={CSS.postId}>PostId: {postId}</p>
            <input onChange={(e)=>handleTitleChange(e.target.value)} className={CSS.title} value={newTitle}/>
            <input onChange={(e)=>handleContentChange(e.target.value)}  className={CSS.postBody} value={newPostBody}/>
            <button onClick={()=>update(postId, userId, newTitle, newPostBody)} className={CSS.update}>Update</button>
        </div>
        </>, document.getElementById("modal"));
}
 
export default UpdateModal;