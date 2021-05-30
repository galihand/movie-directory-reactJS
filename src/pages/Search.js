import React, { Suspense, useEffect, useState } from "react"
import { Col, Container, Pagination } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../components/Layout"
import { getMatch } from "../store/action/movieAction"
import { useHistory, useLocation } from "react-router"
import Loading from "../components/Loading"
const MovieCard = React.lazy(() => import("../components/MovieCard"))

const Search = () => {
  const history = useHistory()
  const page = +new URLSearchParams(useLocation().search).get('page') || 1
  const query = new URLSearchParams(useLocation().search).get('query') || ''
  const dispatch = useDispatch()
  const { collection } = useSelector(state => state.movieReducer)
  const [pageDisplay, setPageDisplay] = useState([])
  console.log(query)
  useEffect(() => {
    dispatch(getMatch(query, page))
  }, [dispatch, page, query])

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
    history.push(`/search?page=${page}&query=${query}`)
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Layout>
      <Container >
        <div className='my-5'>
          <h3 className='pb-2 mb-2 border-bottom font-weight-bold'>Search Movie Results</h3>
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

export default Search