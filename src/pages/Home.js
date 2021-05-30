import React, { Suspense, useEffect, useState } from "react"
import { Col, Container, Pagination } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../components/Layout"
import { getPopular } from "../store/action/movieAction"
import { useHistory, useLocation } from "react-router"
import Loading from "../components/Loading"
import '../App.scss'
const MovieCard = React.lazy(() => import("../components/MovieCard"))

const Home = () => {
  const history = useHistory()
  const page = +new URLSearchParams(useLocation().search).get('page') || 1
  const dispatch = useDispatch()
  const { collection } = useSelector(state => state.movieReducer)
  const [pageDisplay, setPageDisplay] = useState([])

  useEffect(() => {
    dispatch(getPopular(page))
  }, [dispatch, page])

  useEffect(() => {
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
    history.push(`/?page=${page}`)
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Layout>
      <div >
        <Col className='mx-auto mt-3' lg={6} md={8}>
          <h3 className='text-center'>Welcome to Movie Directory</h3>
          <p className='mx-auto text-center w-75'>We try to provide any kind movies information as much as we can.
          So, let's see what we got for you
          </p>
        </Col>
      </div>
      <Container >
        <div className='my-5'>
          <div className='px-2 mb-2 border-bottom d-flex justify-content-between align-items-center'>
            <h3 className='font-weight-bold'>Most Popular</h3>
          </div>
          <div className='d-flex flex-wrap justify-content-center'>
            {collection?.results?.map(item =>
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

export default Home