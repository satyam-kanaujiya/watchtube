import api from '../api.js';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice.js';
import {auth,provider} from '../utils/firebase.js';
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';

const Container = styled.div(props=>({
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    height:"90vh",
    color:props.theme.mainText,
    padding:"0px 0px"
}));
const Wrapper = styled.div(props=>({
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    height:"7f0vh",
    backgroundColor:props.theme.mainBg,
    padding:"20px 50px",
    border:`1px solid ${props.theme.mainText}`,
    gap:"10px"
}));

const Title = styled.h1({
    margin:"0px",
    fontSize:"20px"
});
const SubTitle = styled.h2({
    margin:"0px",
    fontWeight:300,
    fontSize:"20px",

});
const Input = styled.input(props=>({
    borderRadius:"3px",
    padding:"8px",
    width:"100%",
    backgroundColor:"transparent",
    border:`1px solid ${props.theme.mainText}`,
    color:props.theme.mainText
}));
const Button = styled.button(props=>({
    borderRadius:"20px",
    border:`1px solid ${props.theme.menuText}`,
    padding:"6px 10px",
    fontWeight:500,
    cursor:"pointer",
    backgroundColor:props.theme.mainBg,
    color:props.theme.mainText
}));
const More = styled.div({
    display:"flex",
    fontSize:"12px",
    marginTop:"10px"
});
const Links = styled.div({
    marginLeft:"50px",
    display:"flex",
    gap:"10px"
});
const Link = styled.span({});

function SignIn() {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentUser} = useSelector(state=>state.user);

    const handleSignin = async(e) =>{
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await api.post("/auth/signin",{email,password},{withCredentials:true});
            if(res.data?.success){
                dispatch(loginSuccess(res.data.data.user));
                // console.log(res.data);
                toast.success(res.data.message);
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            dispatch(loginFailure());
            toast.error(error.message);
        }
    };

    const handleSignup = async(e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await api.post("/auth/signup",{username,email,password},{withCredentials:true});
            if(res.data?.success){
                dispatch(loginSuccess(res.data.data.user));
                toast.success(res.data.message);
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            dispatch(loginFailure());
            toast.error(error.message);
        }
    };

    const signinWithGoogle = () =>{
        signInWithPopup(auth,provider)
        .then(result=>{
            return api.post("/auth/google",{
            username:result.user.displayName,
            email:result.user.email,
            img:result.user.photoURL
        })})
        .then((res)=>{
            dispatch(loginSuccess(res.data.data.user));
            console.log(res.data.data.user);
        })
        .catch(err=>{
            dispatch(loginFailure());
        });
    };

    useEffect(()=>{
        if(currentUser){
            navigate("/");
        }
    },[currentUser,navigate]);

return (
    <Container>
        <Wrapper>
            <Title>Sign in</Title>
            <SubTitle>to continue to WatchTube</SubTitle>
            <Input placeholder='Email' type='text' onChange={(e)=>{setEmail(e.target.value)}}/>
            <Input placeholder='Password' type='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button onClick={handleSignin}>Sign in</Button>
            <Title>or</Title>
            <Button onClick={signinWithGoogle}>Signin with Google</Button>
            <Title>or</Title>
            <Input placeholder='username' type='text' onChange={(e)=>{setUsername(e.target.value)}}/>
            <Input placeholder='email' type='email' onChange={(e)=>{setEmail(e.target.value)}}/>
            <Input placeholder='password' type='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button onClick={handleSignup}>Sign up</Button>
        </Wrapper>

        <More>
            English(IN)
            <Links>
                <Link>Help</Link>
                <Link>Privacy</Link>
                <Link>Terms</Link>
            </Links>
        </More>
    </Container>
  )
}

export default SignIn