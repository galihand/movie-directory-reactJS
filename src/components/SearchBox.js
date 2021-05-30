import React, { useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { searchMovie } from "../store/action/movieAction"


const SearchBox = () => {
  const history = useHistory()
  const [search, setSearch] = useState('')
  const [time, setTime] = useState(0)
  const dispatch = useDispatch()
  const { autocomplete } = useSelector(state => state.movieReducer)

  const changeSearchHandler = e => {
    setSearch(e.target.value)
    if (time) clearTimeout(time)
    setTime(setTimeout(() => {
      dispatch(searchMovie(search))
    }, 500))
  }

  const submitHandler = e => {
    e.preventDefault()
    history.push(`/search/?query=${search}`)
  }

  return (
    <Form onSubmit={submitHandler}>
      <InputGroup>
        <Form.Control
          value={search}
          onChange={e => changeSearchHandler(e)}
          list='autocomplete'
          type='text' placeholder='search any title of movie' autoComplete='false'
        />
        <InputGroup.Append>
          <Button type='submit' variant='secondary'>search</Button>
        </InputGroup.Append>
        <datalist id='autocomplete'>
          {autocomplete.map((item, idx) => <option key={idx}>{item}</option>)}
        </datalist>
      </InputGroup>
    </Form>
  )
}

export default SearchBox