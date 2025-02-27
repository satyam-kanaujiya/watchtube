import api from '../api.js';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Card from '../components/Card';

const Container = styled.div({
    display:"flex",
    justifyContent:"flex-start",
    flexWrap:"wrap",
    gap:"20px"
});
function Search() {
    const [videos,setVideos] = useState([]);
    const [error,setError] = useState(null);

    const query = useLocation().search;

    useEffect(()=>{
        const fetchVideo = async() =>{
            try{
                const res = await api.get(`/videos/search/${query}`);
                setVideos(res.data.data.videos);
            } catch (error) {
                setError(error);
            }
        }
        fetchVideo();
    },[query])
    return (
        error
        ?<h1>{error.message}</h1>
        :<Container>
            {videos.map(video=>(<Card key={video._id} video={video}/>))}
        </Container>
    )
}

export default Search