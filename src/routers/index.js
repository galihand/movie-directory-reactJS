import { Route, Switch } from "react-router-dom"
import Home from "../pages/Home"
import React from 'react'
import Movie from "../pages/Movie"
import Genres from "../pages/Genres"
import Search from "../pages/Search"

const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/movie/:movie_id' component={Movie} />
      <Route exact path='/genre/:genre_id' component={Genres} />
      <Route exact path='/search' component={Search} />
    </Switch>
  )
}

export default Router