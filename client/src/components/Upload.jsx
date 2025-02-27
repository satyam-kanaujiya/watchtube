import api from '../api.js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div({
    width:"100%",
    height:"100%",
    position:"fixed",
    top:"0px",
    left:"0px",
    backgroundColor:"#000000a7",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
});
const Wrapper = styled.div(props=>({
    width:"500px",
    height:"530px",
    backgroundColor:props.theme.mainBg,
    color:props.theme.mainText,
    padding:"20px",
    display:"flex",
    flexDirection:"column",
    gap:"20px",
    position:"relative"
}));
const Close = styled.div({
    position:"absolute",
    top:"10px",
    right:"10px",
    cursor:"pointer"
});
const Title = styled.h2({
    textAlign:"center",
    marginBottom:"10px"
});

const Input = styled.input(props=>({
    border:`1px solid gray`,
    color:props.theme.mainText,
    borderRadius:"5px",
    padding:"10px",
    backgroundColor:"transparent"
}));
const TextArea = styled.textarea(props=>({
    border:`1px solid gray`,
    color:props.theme.mainText,
    borderRadius:"5px",
    padding:"10px",
    backgroundColor:"transparent"
}));

const Button = styled.button(props=>({
    borderRadius:"3px",
    border:"none",
    padding:"6px 10px",
    fontWeight:500,
    cursor:"pointer",
    backgroundColor:props.theme.mainBg,
    color:props.theme.mainText
}));

const Label = styled.label({
    fontSize:"14px"
});

function Upload({setOpen}) {

  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleVideoChange = (e) => setVideo(e.target.files[0]);
  const handleImgChange = (e) => setImg(e.target.files[0]);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleTagsChange = (e) => setTags(e.target.value.split(","));

  const handleUpload = async () => {
    if (!video || !img || !title || !description || !tags) {
      alert("Please fill all fields and select both video and image!");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("img", img);
    formData.append("title", title);
    formData.append("desc", description);
    formData.append("tags", JSON.stringify(tags)); 

    console.log(formData);

    try {
      setUploading(true);
      setUploadProgress(0);

      const response = await api.post("/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },withCredentials:true
      });

      console.log("Upload Successful:", response);
      alert("Upload successful!");
      setUploadProgress(0);
      setOpen(false);
      response.status===201 && navigate(`/video/${response.data?.data?.video?._id}`);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Upload failed!");
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload a New Video</Title>
            <Label>Video:</Label>
            <Input type="file" accept='video/*' onChange={handleVideoChange}/>
            <Input type="text" placeholder="Title" value={title} onChange={handleTitleChange}/>
            <TextArea placeholder='Description' rows={8} value={description} onChange={handleDescriptionChange}/>
            <Input type="text" placeholder="Seperate tags with commas." value={tags} onChange={handleTagsChange}/>
            <Label>Image:</Label>
            <Input type="file" accept="image/*" onChange={handleImgChange}/>
            <Button onClick={handleUpload} disabled={uploading}>Upload</Button>
            {uploading && <progress value={uploadProgress} max="100"></progress>}
        </Wrapper>
    </Container>
  )
}

export default Upload