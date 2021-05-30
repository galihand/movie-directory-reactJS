import React, { Suspense, useEffect, useState } from "react"
import { Button, Col, Container, Form, Pagination } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../components/Layout"
import { getMatch } from "../store/action/movieAction"
import { useHistory, useLocation } from "react-router"
import Loading from "../components/Loading"
import moment from "moment"
const MovieCard = React.lazy(() => import("../components/MovieCard"))

const Search = () => {
  const [after, setAfter] = useState()
  const [before, setBefore] = useState()
  const [filtered, setFiltered] = useState([])
  const history = useHistory()
  const page = +new URLSearchParams(useLocation().search).get('page') || 1
  const query = new URLSearchParams(useLocation().search).get('query') || ''
  const dispatch = useDispatch()
  const { collection } = useSelector(state => state.movieReducer)
  const [pageDisplay, setPageDisplay] = useState([])

  useEffect(() => {
    setFiltered()
    setAfter(0)
    setBefore(0)
    dispatch(getMatch(query, page))
  }, [dispatch, page, query])

  useEffect(() => {
    setFiltered()
    setAfter(0)
    setBefore(0)
    let before = []
    let after = []
    for (let i = page; i > 0 && i >= page - 5; i--) {
      before = [...before, i]
    }
    for (let i = page + 1; i < collection.total_pages && i <= page + 5; i++) {
      after = [...after, i]
    }
    setPageDisplay(before.concat(...after).sort((a, b) => a - b))
  }, [page, collection.total_pages])

  const changePageHandler = page => {
    setFiltered()
    history.push(`/search?page=${page}&query=${query}`)
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  const submitFilter = e => {
    e.preventDefault()
    setFiltered(collection.results.filter(item => moment(item.release_date).isBetween(after, before)))
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Layout>
      <Container >
        <div className='my-5'>
          <div className='px-2 mb-2 border-bottom d-flex justify-content-between align-items-center'>
            <h3 className='font-weight-bold'>Search Movie results</h3>
          </div>
          <Form onSubmit={submitFilter}>
            <Form.Row>
              <Col>
                <Form.Control
                  value={after}
                  onChange={e => setAfter(e.target.value)}
                  type='date' placeholder='after' autoComplete='false'
                  size='sm'
                />
              </Col>
              to
              <Col>
                <Form.Control
                  value={before}
                  onChange={e => setBefore(e.target.value)}
                  type='date' placeholder='before' autoComplete='false'
                  size='sm'
                />
              </Col>
              <Button type='submit' variant='outline-secondary' size='sm'>filter</Button>
            </Form.Row>
          </Form>
          <div className='d-flex flex-wrap justify-content-center'>
            {
              filtered ? filtered.map(item =>
                <Col md={2} sm={3} xs={4} className='p-0 mx-2 my-2' key={item.id}>
                  <Suspense fallback={<Loading />}>
                    <MovieCard data={item} />
                  </Suspense>
                </Col>) : collection?.results?.map(item =>
                  <Col md={2} sm={3} xs={4} className='p-0 mx-2 my-2' key={item.id}>
                    <Suspense fallback={<Loading />}>
                      <MovieCard data={item} />
                    </Suspense>
                  </Col>
                )}
          </div>
          <div className='d-flex justify-content-center mt-3 border-top pt-3'>
            <Pagination>
              <Pagination.First disabled={page === 1} onClick={() => changePageHandler(1)} />
              <Pagination.Prev disabled={page === 1} onClick={() => changePageHandler(page - 1)} />
              {pageDisplay.map(item =>
                <Pagination.Item key={item} active={item === page} onClick={() => changePageHandler(item)}>{item}</Pagination.Item>
              )}
              <Pagination.Next disabled={page === collection.total_pages} onClick={() => changePageHandler(page + 1)} />
              <Pagination.Last disabled={page === collection.total_pages} onClick={() => changePageHandler(collection.total_pages)} />
            </Pagination>
          </div>
        </div>
      </Container>
    </Layout >
  )
}

export default Search