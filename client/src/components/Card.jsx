import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {format} from 'timeago.js';
import api from '../api.js';
import noUserImg from '../assets/noProfile.jpg';


const Container = styled.div(props=>({
  width:"320px",
  marginBottom:props.type==="sm"?"14px":"10px",
  cursor:"pointer",
  color:props.theme.mainText,
  display:props.type==='sm' && 'flex',
  gap:"10px"
}));

const Image = styled.img(props=>({
    width:props.type=="sm"?"50%":"100%",
    height:props.type=="sm"?"100px":"200px",
    backgroundColor:"#999"
}));


const Details = styled.div(props=>({
  display:"flex",
  marginTop:!props.type=="sm"&&"10px",
  gap:"10px"
}));

const ChannelImage = styled.img(props=>({
  width:"30px",
  height:"30px",
  borderRadius:"50%",
  backgroundColor:"#999",
  display:props.type=="sm"&&"none"
}));

const Texts = styled.div({
 
});
const Title = styled.h2(props=>({
  margin:"0px",
  fontSize:props.type=="sm"?"11px":"16px",
  color:props.theme.mainText
}));
const ChannelName = styled.div(props=>({
  fontSize:props.type=="sm"?"10px":"14px",
  margin:"5px 0px"
}));
const Info = styled.div(props=>({
  fontSize:props.type=="sm"&&"8px"
}));

function Card({type,video}) {
  const [channel,setChannel] = useState({});
  useEffect(()=>{
    const fetchChannel = async ()=>{
      try {
        const res = await api.get(`users/${video.userId}`);
        setChannel(res.data.data.user);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchChannel();
  },[video.userId])
  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
    <Container type={type}>
       <Image src={video?.imgUrl || noUserImg } type={type}/>
       <Details>
          <ChannelImage src={channel?.img || noUserImg} type={type}/>
          <Texts>
            <Title type={type}>{video.title}</Title>
            <ChannelName type={type}>{channel.username}</ChannelName>
            <Info type={type}>{video.views} views . {format(`${video.createdAt}`, 'en_US')}</Info>
          </Texts>
       </Details>
    </Container>
    </Link>
  )
}

export default Card;