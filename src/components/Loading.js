import { Spinner } from "react-bootstrap"

const Loading = ({ show }) => {
  return (
    <div className='text-center text-primary mt-5'
      style={{ display: show ? 'none' : 'block' }}
    >
      <Spinner animation='grow' />
    </div>
  )
}

export default Loading