import React from 'react'
import moment from "moment"
import { useState } from "react"
import { Card } from "react-bootstrap"
import '../styles/MovieCard.scss'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import DefaultImage from '../assets/No-image-found.jpg'
const MovieCard = ({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <React.Fragment>
      <Loading show={imageLoaded} />
      <Card className='card__movie' style={{ display: imageLoaded ? 'block' : 'none' }} as={Link} to={`/movie/${data.id}`} >
        {data.poster_path ?
          <Card.Img onLoad={() => setImageLoaded(true)} src={`${process.env.REACT_APP_TMDB_BASE_IMAGE_URL}/original/${data.poster_path}`} />
          : <Card.Img onLoad={() => setImageLoaded(true)}
            src={DefaultImage}
          />
        }
        <div className='movie__text'>
          <p className='movie__title'>{data.original_title}</p>
          <p className='movie__date'>
            {`release date: ${moment(data.release_date).format("DD MMM YYYY")}`}
          </p>
        </div>
      </Card>
    </React.Fragment>
  )
}

export default MovieCard