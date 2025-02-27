import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import api from '../api.js';
import noUserImg from '../assets/noProfile.jpg';


const Container = styled.div({
    display:"flex",
    gap:"10px",
    alignItems:"center",
    marginTop:"20px"
});
const Image = styled.img({
    height:"40px",
    width:"40px",
    borderRadius:"50%"
});
const Details = styled.div(props=>({
    display:"flex",
    flexDirection:"column",
    gap:"5px",    
    color:props.theme.mainText
}));
const CommentDetail=styled.div({
    display:"flex",
    alignItems:"center",
    gap:"10px"
});
const Name = styled.span({
    fontWeight:"600",
    fontSize:"14px"
});
const Date = styled.span({
    fontSize:"10px"
});
const Text = styled.span({
    fontSize:"14px"
});

function Comment({comment}){
    const {currentUser} = useSelector(state=>state.user);
    const [channel,setChannel] = useState({});
    
    useEffect(()=>{
        const fetchUser = async() =>{
            const userRes = await api.get(`/users/${comment.userId}`);
            setChannel(userRes.data.data.user);
        }
        fetchUser();
    },[currentUser?.userId]);
  return (
    <Container>
        <Image src={channel?.img || noUserImg}/>
        <Details>
            <CommentDetail>
                <Name>{channel.username}</Name>
                <Date>{format(comment.createdAt)}</Date>
            </CommentDetail>
            <Text>{comment.desc}</Text>
        </Details>
    </Container>
  )
};

export default Comment