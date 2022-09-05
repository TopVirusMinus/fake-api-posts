import React from 'react'
import { useEffect, useState, useRef } from 'react';
import CSS from "./Posts.module.css";
import Post from "./Post";
import axios from 'axios';
import UpdateModal from "./UpdateModal"

const Posts = () => {
    const [data, setData] = useState();    
    const [showModal, setShowModal] = useState(false);

    const [currPostId, setCurrPostId] = useState();
    const [currUserId, setCurrUserId] = useState();
    const [currTitle, setCurrTitle] = useState();
    const [currPostBody, setCurrPostBody] = useState();

    

    useEffect(()=>{
        const fetchData = async _=>{
            await axios.get("http://jsonplaceholder.typicode.com/posts")
            .then((res)=>setData((prev)=> res.data))
        }
        fetchData();
    },[])
    
    const handleDelete = (postId)=>{
        console.log(postId);
        setData((prev)=>{
            return prev.filter(p => p.id !== postId)
        })
    }

    const fillCurrentPostInfo = (userId, postId, title, postBody) => {
        setCurrPostId((prev)=>postId);
        setCurrUserId((prev)=>userId);
        setCurrTitle((prev)=>title);
        setCurrPostBody((prev)=>postBody);
    }

    const handleUpdate = (userId, postId, title, postBody) => {
        let index = postId - 1;
        let newData = data;

        newData[index].userId = userId;
        newData[index].id = postId;
        newData[index].title = title;
        newData[index].body = postBody;

        setShowModal((prev)=>false)
        setData((prev)=> newData);
    }

    const handleModal = (postId, userId, title, postBody) => {
        setShowModal((prev)=>prev = true);
        fillCurrentPostInfo(postId, userId, title, postBody)
    }

    const handleClose = ()=>{
        setShowModal((prev)=>prev = false);
    }

    return (
        <div className={CSS.postsContainer}>
            <h1>Posts: {data && data.length}</h1>
            {showModal && <UpdateModal 
                            close={handleClose}
                            update={handleUpdate}
                            postId={currPostId}
                            userId={currUserId} 
                            title={currTitle} 
                            postBody={currPostBody}/>
            }
            <div className={CSS.posts}>
                {
                    data && data.length ? data.map(d =>{
                        return(
                            <div key={d.id} className={CSS.post}>
                                <Post handleUpdate={handleModal} handleDelete={(postId)=>handleDelete(postId)} userId={d.userId} postId={d.id} title={d.title} postBody={d.body}/>
                            </div>
                        )
                    }) : <p> Fetching Posts...</p>
                }
            </div>
        </div>
     );
}
 
export default Posts;