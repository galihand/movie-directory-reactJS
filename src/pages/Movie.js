import moment from "moment"
import React, { Suspense, useEffect, useState } from "react"
import { Button, Col, Container, Image, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import Loading from "../components/Loading"
import LoadingScreen from "../components/LoadingScreen"
import { getCreditsMovie, getDetailMovie, getRecommend } from "../store/action/movieAction"
import '../styles/Movie.scss'
const MovieCard = React.lazy(() => import('../components/MovieCard'))
const CastCard = React.lazy(() => import('../components/CastCard'))
const CompanyCard = React.lazy(() => import('../components/CompanyCard'))

const Movie = () => {
  const { movie_id } = useParams()

  const dispatch = useDispatch()
  const { movie, credits, recommend } = useSelector(state => state.movieReducer)
  const [imageLoaded, setImageLoaded] = useState(false)
  const topCast = credits.cast.sort((a, b) => b.popularity - a.popularity).slice(0, 10)

  useEffect(() => {
    setImageLoaded(false)
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
    dispatch(getDetailMovie(movie_id))
    dispatch(getCreditsMovie(movie_id))
    dispatch(getRecommend(movie_id))
  }, [dispatch, movie_id])

  return (
    <Layout>
      <LoadingScreen show={imageLoaded} />
      <div style={{ display: imageLoaded ? "block" : "none" }}>
        <div className='backdrop' >
          <Image
            onLoad={() => setImageLoaded(true)}
            src={`${process.env.REACT_APP_TMDB_BASE_IMAGE_URL}/original/${movie.backdrop_path}`}
          />
        </div>
        <Container className='mt-3'>
          <div className='d-flex justify-content-between border-bottom align-items-center'>
            <h1 className='title'>{movie.title}</h1>
          </div>
          <div className='d-flex mt-1'>
            {movie?.genres.map(genre =>
              <Button key={genre.id} as={Link} to={`/genre/${genre.id}`} size='sm' variant='outline-secondary' className='mr-1'>{genre.name}</Button>
            )}
          </div>

          <div className='content'>
            <h2 className='border-bottom pb-1'>Overview</h2>
            <p>{movie.overview}</p>
          </div>

          <div className='content'>
            <h2 className='border-bottom pb-1'>Information</h2>
            <Col lg={6} md={8} className='ml-3'>
              <Row>
                <Col>Original Title</Col>
                <Col>: {movie.original_title}</Col>
              </Row>
              <Row>
                <Col>Release Date</Col>
                <Col>: {moment(movie.release_date).format("DD MMM YYYY")}</Col>
              </Row>
              <Row>
                <Col>Rating</Col>
                <Col>: {movie.vote_average} / 10</Col>
              </Row>
              <Row>
                <Col>Total Voters</Col>
                <Col>: {movie.vote_count} voters</Col>
              </Row>
            </Col>
          </div>

          <div className='content'>
            <h2 className='border-bottom pb-1'>Production Companies</h2>
            <div className='mx-3 d-flex w-100 overflow-auto'>
              {movie.production_companies.map(comp =>
                <Col md={2} sm={3} xs={4} className='p-0 mx-2 my-2' key={comp.id}>
                  <Suspense fallback={<Loading />}>
                    <CompanyCard data={comp} />
                  </Suspense>
                </Col>
              )}
            </div>
          </div>

          <div className='content'>
            <h2 className='border-bottom pb-1'>Top 10 Casts</h2>
            <div className='mx-3 d-flex w-100 overflow-auto'>
              {topCast.map(cast =>
                <Col md={2} sm={3} xs={4} className='p-0 mx-2 my-2' key={cast.id}>
                  <Suspense fallback={<Loading />}>
                    <CastCard data={cast} />
                  </Suspense>
                </Col>
              )}
            </div>
          </div>

          <div className='content'>
            <h2 className='border-bottom pb-1'>Recommendation Movies</h2>
            <div className='mx-3 d-flex w-100 overflow-auto'>
              {recommend.map(item =>
                <Col md={2} sm={3} xs={4} className='p-0 mx-2 my-2' key={item.id}>
                  <Suspense fallback={<Loading />}>
                    <MovieCard data={item} />
                  </Suspense>
                </Col>
              )}
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default Movie