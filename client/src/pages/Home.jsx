import React, { useEffect, useState } from 'react';
import api from '../api.js';
import styled from 'styled-components';
import Card from '../components/Card';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Container = styled.div({
    display:"flex",
    justifyContent:"flex-start",
    flexWrap:"wrap",
    gap:"20px"
});
function Home({type}) {
  const {currentUser} = useSelector(state=>state.user);
  const [videos,setVideos] = useState([]);
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchVideo = async ()=>{
      try {
        const res = await api.get(`/videos/${type}`,{withCredentials:true});
        setVideos(res.data.data.videos);
      } catch (error) {
        if(error?.response?.data){
          setError(error.response.data);
        }else{
          setError(error);
        }
        
      }
    };
    if(type==="sub"){
      if(!currentUser){
        navigate("/signin");
      }else{
        fetchVideo();
      }
    }else{
      fetchVideo();
    }
  },[type])
  return (
    error?<h1>{error.message}</h1>:<Container>
      {videos?.map(video=>(<Card key={video._id} video={video}/>))}
    </Container>
  )
}

export default Home;