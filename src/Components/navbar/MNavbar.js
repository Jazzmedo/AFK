import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Import the custom CSS file
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTv, faFilm } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import { ApiContext } from '../context/ApiContextProvider'

export default function MNavbar() {
  let [genres, setGenres] = useState([]);
  let [Platforms, setPlatforms] = useState([]);
  let { api1 } = useContext(ApiContext);
  let [results, setResults] = useState([])
  let [searchh, setSearchh] = useState("")


  useEffect(() => {
    document.querySelector('.navbar').style.cssText = '';
    document.querySelectorAll('#basic-nav-dropdown').forEach(element => {
      element.style.color = '#b7feae';
    });
    document.getElementById('searchInput').addEventListener('input', function () {
      var input = this.value.toLowerCase();
      document.getElementById('dropdownMenu').style.display = input ? 'block' : 'none';
      setSearchh(input)
    });

    getData()

    // console.log(searchh)
    if (searchh) {
      getResults()
    }
    Array.from(document.querySelectorAll('.dropdown-item')).map(each => {
      each.addEventListener('click', () => {
        document.getElementById('dropdownMenu').style.display = 'none'
        setSearchh("")
      })
    })
    Array.from(document.querySelectorAll('.preventt')).map(each => {
      each.addEventListener('click', () => {
        document.getElementById('dropdownMenu').style.display = 'none'
        setSearchh("")
      })
    })
  }, [searchh, results])

  function getData() {
    axios.get(`https://api.rawg.io/api/genres?key=${api1}`).then(res => {
      console.log(res.data.results)
      setGenres(res.data.results)
    })
    axios.get(`https://api.rawg.io/api/platforms?key=${api1}`).then(res => {
      console.log(res.data.results)
      setPlatforms(res.data.results)
    })
  }

  function getResults() {
    axios.get(`https://api.rawg.io/api/games?search=${encodeURIComponent(searchh)}&key=${api1}`)
      .then(res => {
        // console.log('API Response:', res.data); // Log the API response
        if (res.data && res.data.results) {
          setResults(res.data.results.sort((a, b) => {
            const bTotal = b.reviews_count + b.ratings_count + b.added + b.suggestions_count;
            const aTotal = a.reviews_count + a.ratings_count + a.added + a.suggestions_count;
            return bTotal - aTotal;
          }).slice(0, 8));
        } else {
          setResults([]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setResults([]);
      });
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
      <Container>
        <Navbar.Brand href="/"><Image height={20} src={require('../../logo/logo.png')} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{ color: '#b7feae' }} href="/">Best Games</Nav.Link>
            <NavDropdown title="Genres" id="basic-nav-dropdown" className="custom-scrollbar">
              {genres.map((genre) => (
                <NavDropdown.Item href={`/genre/${genre.id}`}>{genre.name}</NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title="Platforms" id="basic-nav-dropdown" className="custom-scrollbar">
              {Platforms.map((platform) => (
                <NavDropdown.Item href={`/platform/${platform.id}`}>{platform.name}</NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <div className="search-bar">
          <input value={searchh} type="text" placeholder="Search..." id="searchInput" autocomplete="off" onChange={(e) => setSearchh(e.target.value)} />
          <div className="dropdown-menu" id="dropdownMenu">
            {results.length > 0 ? results.map(item =>
              item ? (
                <>
                  <Link key={item.id} to={`/game/${item.id}`} className="dropdown-item">
                    <h6 className='.names'>{item.name}</h6>
                  </Link>
                </>
              ) : <></>) : <div className='dropdown-item'><h6 className='.names'>No Result Found</h6></div>}
          </div>
        </div>
      </Container>
    </Navbar>
  );
}