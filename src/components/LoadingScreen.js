import { Spinner } from "react-bootstrap"
import '../styles/LoadingSceen.scss'

const LoadingScreen = ({ show }) => {
  return (
    <div className='loading__screen' style={{ display: show ? 'none' : 'block' }}>
      <Spinner className='mx-3' animation='grow' />
      <Spinner className='mx-3' animation='grow' />
      <Spinner className='mx-3' animation='grow' />
      <Spinner className='mx-3' animation='grow' />
      <Spinner className='mx-3' animation='grow' />
    </div>
  )
}

export default LoadingScreen