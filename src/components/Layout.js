import React, { useEffect } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getGenres } from '../store/action/movieAction'
import "../styles/Layout.scss"
import SearchBox from './SearchBox'

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  const { genres } = useSelector(state => state.movieReducer)

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  return (
    <React.Fragment>
      <div>
        <Navbar bg='dark' collapseOnSelect expand='sm' variant='dark' sticky="top">
          <Container fluid>
            <Navbar.Brand as={Link} to='/'>Movie Directory</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'>
                <NavDropdown title='Genres' id='collasible-nav-drodown'>
                  {genres.map(genre =>
                    <NavDropdown.Item as={Link} to={`/genre/${genre.id}`} key={genre.id}>{genre.name}</NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
              <Nav className='ml-auto'>
                <SearchBox />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div style={{ minHeight: '55vh' }}>
          {children}
        </div>
        <div style={{ height: '30vh' }} className='bg-dark mt-5 text-center py-5'>
          <p className='text-muted'>Created at may 2021</p>
          <p className='text-muted'>Supported API by TMDB</p>
          <p className='text-muted'>Originaly made by Galih Andyan</p>
          <p className='text-muted'>Contact at andyangalih@gmail.com</p>
        </div>
      </div >
    </React.Fragment >
  )
}

export default Layout