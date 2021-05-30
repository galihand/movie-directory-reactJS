import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import DefaultImage from '../assets/No-image-found.jpg'
import "../styles/CastCard.scss"
import Loading from './Loading'

const CastCard = ({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <React.Fragment>
      <Loading show={imageLoaded} />
      <Card className='card__cast' style={{ display: imageLoaded ? 'block' : 'none' }}>
        {data.profile_path ?
          <Card.Img onLoad={() => setImageLoaded(true)}
            src={`${process.env.REACT_APP_TMDB_BASE_IMAGE_URL}/original/${data.profile_path}`}
          /> : <Card.Img onLoad={() => setImageLoaded(true)}
            src={DefaultImage}
          />
        }
        <div className='card__cast-info'>
          <p className='name'>{data.name}</p>
          <p className='char'>as {data.character}</p>
        </div>
      </Card>
    </React.Fragment>
  )
}

export default CastCard