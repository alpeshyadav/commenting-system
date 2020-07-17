import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../styles.css'

export default () => {

    const [posts, setPosts] = useState([])
    const {register, handleSubmit} = useForm()
    const onSubmit = (data) => {
        const formData = {
            "username": data.username,
            "comment": data.comment,
            "upVote": 0,
            "downVote": 0
        }
        axios.post("http://localhost:5000/add", formData)

    }

    const increment = (id) => {
        const alterPost = posts.findIndex(postid => postid._id === id)
        let newPosts = [...posts]
        newPosts[alterPost].upVote++
        setPosts(newPosts => newPosts)
        axios.post(`http://localhost:5000/inc/${id}`, newPosts[alterPost])
    }
    const decrement = (id) => {
        const alterPost = posts.findIndex(postid => postid._id === id)
        let newPosts = [...posts]
        newPosts[alterPost].downVote--
        setPosts(newPosts => newPosts)
        axios.post(`http://localhost:5000/dec/${id}`, newPosts[alterPost])
    }

    useEffect(() => {
        axios.get("http://localhost:5000/")
        .then(response => {
            setPosts(response.data)

        })
        .catch(err => console.log(err))
    }, [posts])

    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    ref={register}
                />
                <br/>
                <input
                    name="comment"
                    placeholder="Add a comment..."
                    ref={register}
                />
                <br/>
                <button className="commentSubmit">Submit</button>
            </form>
            <div className="commentList">
            {posts.map(post =>
                <li className="commentItem" key={post._id}>
                <div className="comment">{post.comment}</div>
                <br/>
                <div className="meta">{post.username}</div>
                <br/>
                <button className="avatarGreen" onClick={() => increment(post._id)}>{post.upVote}</button>
                <br/>
                <button className="avatarRed"  onClick={() => decrement(post._id)}>{post.downVote}</button>
                </li>
            )}
            </div>

        </main>
    )
}
