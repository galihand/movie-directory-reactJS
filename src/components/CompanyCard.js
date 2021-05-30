import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import DefaultImage from '../assets/No-image-found.jpg'
import '../styles/CompanyCard.scss'
import Loading from './Loading'

const CompanyCard = ({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <React.Fragment>
      <Loading show={imageLoaded} />
      <Card className='card__company' style={{ display: imageLoaded ? 'block' : 'none' }}>
        {data.logo_path ?
          <Card.Img onLoad={() => setImageLoaded(true)}
            src={`${process.env.REACT_APP_TMDB_BASE_IMAGE_URL}/original/${data.logo_path}`}
          /> : <Card.Img onLoad={() => setImageLoaded(true)}
            src={DefaultImage}
          />
        }
        <div className='card__company-info'>
          <p className='name'>{data.name}</p>
          <p className='country'>{data.origin_country}</p>
        </div>
      </Card>
    </React.Fragment>
  )
}

export default CompanyCard