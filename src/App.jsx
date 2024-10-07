import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './Header.jsx';
import SideBar from './SideBar.jsx';
import Content from './Content.jsx';
function App() {


  return (
    <div className='grid-container'>
    <Header></Header>
      <SideBar></SideBar>
      <Content></Content>
 
    </div>
    
  )
}

export default App
