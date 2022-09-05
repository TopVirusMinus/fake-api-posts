import CSS from "./AddPostModal.module.css";
import React, { useEffect } from 'react';
import { useState } from "react";
import ReactDOM from "react-dom";

const AddPostModal = ({close, add}) => {
    const [newTitle, setNewTitle] = useState("");
    const [newPostBody, setNewPostBody] = useState("");


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
            <input onChange={(e)=>handleTitleChange(e.target.value)} className={CSS.title} placeholder="Title" value={newTitle}/>
            <input onChange={(e)=>handleContentChange(e.target.value)}  className={CSS.postBody} placeholder="Content" value={newPostBody}/>
            <button onClick={()=>add(newTitle, newPostBody)} className={CSS.add}>Add</button>
        </div>
        </>, document.getElementById("AddModal"));
}
 
export default AddPostModal;