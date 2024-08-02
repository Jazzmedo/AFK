import React, { useEffect, useState ,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Import the custom CSS file
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import {ApiContext} from '../context/ApiContextProvider'

export default function MNavbar() {
  let [genres, setGenres] = useState([]);
  let [Platforms, setPlatforms] = useState([]);
  let {api1} = useContext(ApiContext);

  useEffect(() => {
    document.querySelector('.navbar').style.cssText = '';
    document.querySelectorAll('#basic-nav-dropdown').forEach(element => {
      element.style.color = '#b7feae';
    });
    getData()
  }, [])

  function getData(){
    axios.get(`https://api.rawg.io/api/genres?key=${api1}`).then(res=>{
      console.log(res.data.results)
      setGenres(res.data.results)
    })
    axios.get(`https://api.rawg.io/api/platforms?key=${api1}`).then(res=>{
      console.log(res.data.results)
      setPlatforms(res.data.results)
    })
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><Image height={20} src={require('../../logo/logo.png')} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{color: '#b7feae'}} href="/">Best Games</Nav.Link>
            <NavDropdown title="Genres" id="basic-nav-dropdown" className="custom-scrollbar">
              {genres.map((genre)=>(
                <NavDropdown.Item href={`/genre/${genre.id}`}>{genre.name}</NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title="Platforms" id="basic-nav-dropdown" className="custom-scrollbar">
            {Platforms.map((platform)=>(
                <NavDropdown.Item href={`/platform/${platform.id}`}>{platform.name}</NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}