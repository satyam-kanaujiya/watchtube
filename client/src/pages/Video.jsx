import React, { useEffect, useState } from 'react';
import noUserImg from '../assets/noProfile.jpg';
import styled from 'styled-components';
import { IoMdThumbsUp,IoMdThumbsDown,IoMdShareAlt } from "react-icons/io";
import { PiThumbsUpThin,PiThumbsDownThin } from "react-icons/pi";
import { MdWatchLater } from "react-icons/md";
import Comments from '../components/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api.js';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';

const Container = styled.div({
   display:"flex",
   gap:"20px"
});

const Content = styled.div({
  flex:6
});

const VideoWrapper = styled.div({

});

const Title = styled.h2(props=>({
  fontSize:"16px",
  fontWeight:400,
  margin:"10px 0px",
}));

const Details = styled.div({
  display:"flex",
  justifyContent:"space-between"
});

const Info = styled.div({
});

const Buttons = styled.div({
  display:"flex",
  gap:"10px"
});

const Button = styled.div({
  display:"flex",
  alignItems:"center",
  gap:"5px",
  cursor:"pointer"
});

const Hr = styled.hr(props=>({
  border:`0.5px solid ${props.theme.mainText}`,
  marginTop:"18px",
  marginBottom:"10px"
}));

const Channel = styled.div({
  display:"flex",
  justifyContent:"space-between"
});

const ChannelInfo = styled.div({
  display:"flex",
  gap:"10px"
});

const Subscribe = styled.button({
  height:"max-content",
  padding:"5px",
  margin:"0px 10px",
  borderStyle:"none",
  border:"none",
  backgroundColor:"red",
  borderRadius:"20px",
  cursor:"pointer"
});

const Image = styled.img({
  height:"40px",
  width:"40px",
  borderRadius:"50%"
});

const ChannelDetail = styled.div({
  display:"flex",
  flexDirection:"column",
  gap:"2px"
});

const ChannelName = styled.h2({
  fontSize:"18px",
  margin:"2px 0px"
});

const ChannelSub = styled.span({
  margin:"2px 0px",
  fontSize:"12px"
});

const Description = styled.p({
  margin:"10px 0px",
  fontSize:"14px",
});

const VideoFrame = styled.video({
  maxWidth:"720px",
  width:"100%",
  objectFit:"cover" 
});

function Video(){
  const {currentUser} = useSelector(state=>state.user); 
  const {currentVideo} = useSelector(state=>state.video);
  const dispatch = useDispatch();
  const id = useLocation().pathname.split("/")[2];
  const [channel,setChannel] = useState({});
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async() =>{
      try {
        const videoRes = await api.get(`/videos/${id}`);
        const channelRes = await api.get(`/users/${videoRes.data?.data?.video?.userId}`);

        dispatch(fetchSuccess(videoRes.data?.data?.video));
        setChannel(channelRes.data?.data?.user);
      }catch(error) {
        console.log("got error in video page",error);
      }
    };

    fetchData();
  },[id]);

  useEffect(()=>{
    const increaseViews = async() =>{
     const viewRes = await api.put(`/videos/view/${currentVideo._id}`);
    };
    if(currentVideo){
      increaseViews();
    }
  },[currentVideo])

  const handleLike = async () =>{
    if(!currentUser){
      navigate("/signin");
    }
    else{
      await api.patch(`/users/like/${currentVideo?._id}`,null,{withCredentials:true});
      dispatch(like(currentUser._id));
    }

  };

  const handleDislike = async() =>{
    if(!currentUser){
      navigate("/signin");
    }
    else{
      await api.patch(`/users/dislike/${currentVideo?._id}`,null,{withCredentials:true}); 
      dispatch(dislike(currentUser._id));
    } 
  };

  const handleSubscription = async() =>{

    if(!currentUser){
      navigate("/signin");
    }else{
      currentUser.subscribedChannels.includes(channel?._id)
        ? await api.patch(`/users/unsub/${channel._id}`,null,{withCredentials:true})
        : await api.patch(`/users/sub/${channel._id}`,null,{withCredentials:true});
      dispatch(subscription(channel._id));
    }
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls>

          </VideoFrame>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views . {format(currentVideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
                {(currentVideo?.likes?.includes(currentUser?._id))?<IoMdThumbsUp size="20px"/>:<PiThumbsUpThin size="20px" />}<span>{currentVideo?.likes?.length}</span> 
            </Button>
            <Button onClick={handleDislike}>
            {(currentVideo?.dislikes?.includes(currentUser?._id))?<IoMdThumbsDown size="20px"/>:<PiThumbsDownThin size="20px" />}<span>dislike</span>
            </Button>
            <Button>
                <IoMdShareAlt size="20px"/> <span>Share</span>
            </Button>
            <Button>
                <MdWatchLater size="20px"/> <span>Save</span>
            </Button>
          </Buttons>
        </Details>
        <Hr/>
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img || noUserImg}/>
            <ChannelDetail>
              <ChannelName>{channel?.username}</ChannelName>
              <ChannelSub>{channel?.subscribers} Subscribers</ChannelSub>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscription}>{currentUser?.subscribedChannels?.includes(channel._id)?"Subscribed":"Subscribe"}</Subscribe>
        </Channel>
        <Hr/>
        <Comments video={currentVideo} channel={channel}/>
      </Content>
      <Recommendation currentVideo={currentVideo}/>
      
    </Container>
  )
}
export default Video