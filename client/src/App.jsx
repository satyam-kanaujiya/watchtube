import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import { darkTheme,lightTheme } from './utils/theme';
import Home from './pages/Home';
import Video from './pages/Video';
import SignIn from './pages/SignIn';
import Search from './pages/Search';

const Container = styled.div({
  display:"flex",
  position:"relative"
});

const Main = styled.div(props=>({
  flex:7,
  backgroundColor:props.theme.mainBg
}));

const Wrapper = styled.div(props=>({
  color:props.theme.mainText,
  padding:"20px 30px"
}));

function App() {
  const [darkMode,setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode?darkTheme:lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
          <Main>
            <Navbar/>
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>}/>
                  <Route path="trends" element={<Home type="trend"/>}/>
                  <Route path="subscriptions" element={<Home type="sub"/>}/>
                  <Route path="search" element={<Search/>}/>
                  <Route path="signin" element={<SignIn/>}/>
                  <Route path='video'>
                    <Route path=':id' element={<Video/>}/>
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}

export default App