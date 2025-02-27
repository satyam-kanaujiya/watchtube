import api from '../api.js';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';

const Container = styled.div({
    flex:2
  });

function Recommendation({currentVideo}) {
    const [videos,setVideos] = useState([]);

    useEffect(()=>{
        const fetchVideos = async() =>{
            const res = await api.get(`/videos/tags?tags=${currentVideo?.tags}`);
            setVideos(res.data.data.videos);
        };
        if(currentVideo){
          fetchVideos();
        }
    },[currentVideo?.tags]);

  return (
    <Container>
        {videos.filter(video=>video._id!==currentVideo._id).map(video=>
            <Card type="sm" key={video._id} video={video}/>
        )}
    </Container>
  )
}

export default Recommendation