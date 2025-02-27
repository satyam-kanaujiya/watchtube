import React from 'react';
import styled from 'styled-components';
import Watchtube from '../assets/watchtube.png';
import { MdHome,MdOutlineExplore,MdSubscriptions,MdVideoLibrary,MdOutlineHistory,MdLibraryMusic,MdOutlineSportsBasketball,MdMovie,MdLiveTv,MdOutlineSettings,MdOutlineFlag,MdHelp,MdOutlineSettingsBrightness,MdAccountCircle} from "react-icons/md";
import { IoGameController,IoNewspaperOutline } from "react-icons/io5";
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div(props=>({
    flex:1.3,
    backgroundColor:props.theme.menuBg,
    color:props.theme.menuText,
    height:"100vh",
    fontSize:"12px",
    position:"sticky",
    top:"0px",
  }));

const Wrapper = styled.div({
  padding:"10px 15px",
});

const Logo = styled.div(props=>({
  display:"flex",
  gap:"5px",
  alignItems:"center",
  fontWeight:"bold",
  marginBottom:"20px",
  fontSize:"18px",
  color:props.theme.menuText
}));

const Img = styled.img({
  height:"20px",
  borderRadius:"7px"
});

const Item = styled.div(props=>({
  display:"flex",
  alignItems:"center",
  gap:"10px",
  cursor:"pointer",
  marginBottom:"10px",
  
  "&:hover":{
    backgroundColor:props.theme.mainBg
  }
  
}));

const Hr = styled.hr(props=>({
  margin:"10px 0px",
  border:`0.5px solid ${props.theme.heading}`
}));

const Login = styled.div({

});

const Button = styled.button(props=>({
  display:"flex",
  alignItems:"center",
  gap:"5px",
  padding:"5px 12px",
  backgroundColor:"transparent",
  border:"1px solid aqua",
  color:"aqua",
  fontWeight:"500",
  marginTop:"10px",
  cursor:"pointer"
}));

const Title = styled.div(props=>({
  fontWeight:500,
  color:"#aaaaaa",
  marginBottom:"10px"
}))

function Menu({darkMode,setDarkMode}) {
  const {currentUser} = useSelector(state=>state.user);
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{textDecoration:"none"}}>
          <Logo >
            <Img src={Watchtube}/>
              Watchtube
          </Logo>
        </Link>
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <MdHome size="18px"/>
              Home
          </Item>
        </Link>
        <Link to="trends" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <MdOutlineExplore size="18px"/>
              Explore
          </Item>
        </Link>
        <Link to="subscriptions" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <MdSubscriptions size="18px" />
              Subscriptions
          </Item>
        </Link>
        <Hr/>
        <Item>
          <MdVideoLibrary size="18px"/>
            Library
        </Item>
        <Item>
          <MdOutlineHistory size="18px"/>
            History
        </Item>
        <Hr/>
        {!currentUser && (
        <Login>
          Sign in to like videos, comment and subscribe
          <Link to="signin" style={{textDecoration:"none"}}>
            <Button><MdAccountCircle size="18px"/>SIGN IN</Button>
          </Link>
        </Login>)}
        <Hr/>
        <Title>BEST OF WATCHTUBE</Title>
        <Item>
          <MdLibraryMusic size="18px"/>
            Music
        </Item>
        <Item>
          <MdOutlineSportsBasketball size="18px"/>
            Sports
        </Item>
        <Item>
          <IoGameController size="18px"/>
            Gaming
        </Item>
        <Item>
          <MdMovie size="18px"/>
            Movies
        </Item>
        <Item>
          <IoNewspaperOutline size="18px"/>
            News
        </Item>
        <Item>
          <MdLiveTv size="18px"/>
            Live
        </Item>
        <Hr/>
        <Item>
          <MdOutlineSettings size="18px"/>
            Settings
        </Item>
        <Item>
          <MdOutlineFlag size="18px"/>
            Report
        </Item>
        <Item>
          <MdHelp size="18px"/>
            Help
        </Item>
        <Item onClick={()=>setDarkMode(!darkMode)}>
          <MdOutlineSettingsBrightness size="18px"/>
            {darkMode?"Light":"Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  )
}

export default Menu;