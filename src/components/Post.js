import React from 'react'
import { useRef } from 'react';
import CSS from "./Post.module.css";

const Posts = ({handleDelete, userId, postId, title, postBody}) => {
    const postIdRef = useRef(postId);
    const clickDelete = ()=>{
        handleDelete(postId)
    }
    return (
        <div class="postsContainer">
            <div className={CSS.post}>
                <button onClick={()=>clickDelete()} className={CSS.remove}>&#x2716;</button>
                <p className={CSS.userId}>UserId: {userId}</p>
                <p className={CSS.postId}>PostId: {postId}</p>
                <p className={CSS.title}>{title}</p>
                <p className={CSS.postBody}>{postBody}</p>
            </div>
        </div>
     );
}
 
export default Posts;