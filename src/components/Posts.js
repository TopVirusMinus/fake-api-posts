import React from 'react'
import { useEffect, useState } from 'react';
import CSS from "./Posts.module.css";
import Post from "./Post";
import axios from 'axios';

const Posts = () => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        const fetchData = async _=>{
            await axios.get("http://jsonplaceholder.typicode.com/posts")
            .then((res)=>setData((prev)=>prev = res.data))
        }
        fetchData();
    },[])
    
    const handleDelete = (postId)=>{
        console.log(postId);
        setData((prev)=>{
            return prev.filter(p => p.id != postId)
        })
    }

    return (
        <div className="postsContainer">
            <h1>Posts: {data.length}</h1>
            <div className={CSS.posts}>
                {data.length ? data.map(d =>{
                    return(
                        <div key={d.id} className={CSS.post}>
                            <Post handleDelete={(postId)=>handleDelete(postId)} userId={d.userId} postId={d.id} title={d.title} postBody={d.body}/>
                        </div>
                    )
                }) : <p> Fetching Posts...</p>}
            </div>
        </div>
     );
}
 
export default Posts;