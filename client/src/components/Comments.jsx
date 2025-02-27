import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import api from '../api.js';
import { useSelector } from 'react-redux';
import noUserImg from '../assets/noProfile.jpg';
import { useNavigate } from 'react-router-dom';

const Container = styled.div({

});

const StartComment = styled.div({ 
    display:"flex",
    gap:"10px",
    alignItems:"center"
});
const Image = styled.img({
    height:"40px",
    width:"40px",
    borderRadius:"50%"
});
const Input = styled.input(props=>({
    border:"none",
    outline:"none",
    background:"transparent",
    color:props.theme.mainText,
    width:"100%",
    marginRight:"5px",
    paddingBottom:"10px",
    borderBottom:`1px solid ${props.theme.mainText}`,
    fontSize:"16px"
}));

const Button = styled.div({
    display:"flex",
    alignItems:"center",
    gap:"5px",
    cursor:"pointer"
});

function Comments({video}) {
    const {currentUser} = useSelector(state=>state.user);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchComments = async()=>{
            const commentResponse = await api.get(`/comments/${video?._id}`);
            setComments(commentResponse.data.data.comments);
        }
        if(video){
            fetchComments();
        }
    },[video]);

    const handleComment = async() =>{
        if(!currentUser){
            navigate("/signin");
        }
        else{
            const commentRes = await api.post(`/comments/${video._id}`,{desc:newComment},{withCredentials:true});
            setNewComment("");
        }
    };
  return (
    <Container>
        <StartComment>
            <Image src={currentUser?.img || noUserImg} />
            <Input type='text' placeholder='Add a comment' onChange={e=>setNewComment(e.target.value)}/>
            <Button onClick={handleComment}>Add</Button>
        </StartComment>
        {comments.map(comment=>
            <Comment key={comment._id} comment={comment}/>
        )}
        
    </Container>
  )
}

export default Comments