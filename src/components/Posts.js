import React from 'react'
import { useEffect, useState, useRef } from 'react';
import CSS from "./Posts.module.css";
import Post from "./Post";
import axios from 'axios';
import UpdateModal from "./UpdateModal"
import AddPostModal from './AddPostModal';

const Posts = () => {
    const [data, setData] = useState();    
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showAddPostModal, setShowAddPostModal] = useState(false);

    const [maxPostId, setMaxPostId] = useState(100);

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

        setShowUpdateModal((prev)=>false)
        setData((prev)=> newData);
    }

    const handleAdd = (title, postBody) => {
        let newData = data;
        setMaxPostId((prev)=>prev + 1);
        newData.push({userId:0, id:maxPostId + 1, title, body:postBody});
        setShowAddPostModal((prev)=>false)
        setData((prev)=> newData);
    }

    const handleModal = (postId, userId, title, postBody) => {
        setShowUpdateModal((prev)=>prev = true);
        fillCurrentPostInfo(postId, userId, title, postBody)
    }

    return (
        <div className={CSS.postsContainer}>
            <h1>Posts: {data && data.length}</h1>
            <button onClick={()=>setShowAddPostModal((prev)=>prev = true)} className={CSS.addPost}>Add Post</button>
            {showAddPostModal && <AddPostModal 
                            close={()=>setShowAddPostModal((prev)=>prev = false)}
                            add={handleAdd}
                            postId={maxPostId}
                            userId={0} />
            }

            {showUpdateModal && <UpdateModal 
                            close={()=>setShowUpdateModal((prev)=>prev = false)}
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