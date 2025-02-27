import React, { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineSearch, MdAccountCircle, MdVideoCall } from "react-icons/md";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import Upload from './Upload';
import noUserImg from '../assets/noProfile.jpg';
import {toast} from 'react-hot-toast';

const Container = styled.div(props=>({
  position:"sticky",
  top:"0px",
  backgroundColor:props.theme.mainBg,
  height:"8vh",
}));
const Wrapper = styled.div({
  display:"flex",
  justifyContent:"flex-end",
  alignItems:"center",
  height:"100%",
  padding:"0px 18px",
  position:"relative"
});
const Search = styled.div({
  width:"50%",
  display:"flex",
  alignItems:"center",
  position:"absolute",
  left:"10vw",
  right:"0px",
  backgroundColor:"#777777",
  borderRadius:"20px",
});
const Input = styled.input(props=>({
  width:"80%",
  outline:"none",
  borderStyle:"none",
  borderRadius:"20px 0px 0px 20px",
  padding:"8px 20px",
  marginRight:"20px",
  backgroundColor:props.theme.text,
  border:"1px solid blue"

}));
const Button = styled.button(props=>({
  display:"flex",
  alignItems:"center",
  gap:"5px",
  padding:"5px 12px",
  backgroundColor:"transparent",
  border:"1px solid aqua",
  color:"aqua",
  fontWeight:"500",
  cursor:"pointer"
}));

const User = styled.div(props=>({
  display:"flex",
  alignItems:"center",
  gap:"10px",
  color:props.theme.mainText
}));

const Avatar = styled.img({
  width:"32px",
  height:"32px",
  borderRadius:"50%",
  backgroundColor:"#999"
});

function Navbar() {
  const {currentUser} = useSelector(state=>state.user);
  const [open,setOpen] = useState(false);
  const [q,setQ] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = function(e){
    e.preventDefault();
    dispatch(logout());
    toast.success("logout successfully");

  };
  const handleSearch = (e) =>{
    navigate(`/search?q=${q}`);
  }
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" onChange={e=>setQ(e.target.value)}/>
            <MdOutlineSearch style={{cursor:"pointer"}} onClick={handleSearch}/>
          </Search>
          {currentUser?(
            <User>
              <MdVideoCall size="20px" style={{cursor:"pointer"}} onClick={()=>setOpen(true)}/>
              <Avatar src={currentUser?.img || noUserImg}/>
              {currentUser.username}
              <Button onClick={handleLogout}>Logout</Button>
            </User>
          ):(
            <Link to="signin" style={{textDecoration:"none"}}>
            <Button><MdAccountCircle size="18px"/>SIGN IN</Button>
          </Link>)}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen}/>}
    </>
  )
}

export default Navbar