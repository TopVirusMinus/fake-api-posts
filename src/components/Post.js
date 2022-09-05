import React from 'react'
import CSS from "./Post.module.css";

const Post = ({handleDelete,handleUpdate, userId, postId, title, postBody}) => {
    
    const clickDelete = ()=>{
        handleDelete(postId)
    }

    return (
        <div class="postsContainer">
            <div className={CSS.post}>
                <button onClick={()=>clickDelete()} className={CSS.remove}>&#x2716;</button>
                <button onClick={()=>handleUpdate(postId, userId, title, postBody)} className={CSS.update}>Update</button>
                <p className={CSS.userId}>UserId: {userId}</p>
                <p className={CSS.postId}>PostId: {postId}</p>
                <p className={CSS.title}>{title}</p>
                <p className={CSS.postBody}>{postBody}</p>
            </div>
        </div>
     );
}
 
export default Post;