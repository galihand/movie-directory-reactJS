import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
const baseURL = `${process.env.REACT_APP_TMDB_API_BASE_URL}/movie`

function* getPopular(action) {
  const URL = `${baseURL}/popular`
  const { payload } = action
  try {
    const res = yield axios.get(URL, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        page: payload
      }
    })
    yield put({
      type: 'GET_POPULAR_SUCCESS',
      payload: res.data
    })
  } catch (err) {
    yield put({
      type: 'GET_POPULAR_FAILED',
      payload: err.status_message
    })
  }
}

function* getDetail(action) {
  const { payload } = action
  const URL = `${baseURL}/${payload}`
  try {
    const res = yield axios.get(URL, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY
      }
    })
    yield put({
      type: 'GET_MOVIE_SUCCESS',
      payload: res.data
    })
  } catch (err) {
    console.log(err.response)
    yield put({
      type: 'GET_MOVIE_FAILED',
      payload: err.status_message
    })
  }
}

function* getCredits(action) {
  const { payload } = action
  const URL = `${baseURL}/${payload}/credits`
  try {
    const res = yield axios.get(URL, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY
      }
    })

    yield put({
      type: 'GET_CREDITS_SUCCESS',
      payload: res.data
    })
  } catch (err) {
    console.log(err.response)
    yield put({
      type: 'GET_CREDITS_FAILED',
      payload: err.status_message
    })
  }
}

function* getGenres() {
  const URL = `${process.env.REACT_APP_TMDB_API_BASE_URL}/genre/movie/list`
  try {
    const res = yield axios.get(URL, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY
      }
    })
    yield put({
      type: 'GET_GENRES_SUCCESS',
      payload: res.data.genres
    })
  } catch (err) {
    console.log(err.response)
    yield put({
      type: 'GET_GENRES_FAILED',
      payload: err.status_message
    })
  }
}

function* getByGenre(action) {
  const { genre_id, page } = action.payload
  const URL = `${process.env.REACT_APP_TMDB_API_BASE_URL}/discover/movie`
  try {
    const res = yield axios.get(URL, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        with_genres: genre_id,
        page
      }
    })

    yield put({
      type: "GET_MOVIEBYGENRE_SUCCESS",
      payload: res.data
    })
  } catch (err) {
    console.log(err.response)
    yield put({
      type: 'GET_MOVIEBYGENRE_FAILED',
      payload: err.status_message
    })
  }
}

function* getRecommend(action) {
  const { payload } = action
  const URL = `${baseURL}/${payload}/recommendations`
  try {
    const res = yield axios.get(URL, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY
      }
    })

    yield put({
      type: 'GET_RECOMMEND_SUCCESS',
      payload: res.data.results
    })

  } catch (err) {
    console.log(err.response)
    yield put({
      type: 'GET_RECOMMEND_FAILED',
      payload: err.status_message
    })
  }
}

function* searchMovie(action) {
  const { payload } = action
  const URL = `${process.env.REACT_APP_TMDB_API_BASE_URL}/search/movie`
  try {
    const res = yield axios.get(URL, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        query: payload
      }
    })

    yield put({
      type: 'SEARCH_MOVIE_SUCCESS',
      payload: res.data.results
    })
  } catch (err) {
    console.log(err.response)
    yield put({
      type: 'SEARCH_MOVIE_FAILED',
      payload: err.status_message
    })
  }
}

function* getMatch(action) {
  const { page, query } = action.payload
  console.log(page, query)
  const URL = `${process.env.REACT_APP_TMDB_API_BASE_URL}/search/movie`
  try {
    const res = yield axios.get(URL, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        query: query,
        page: page
      }
    })

    yield put({
      type: 'GET_MATCH_SUCCESS',
      payload: res.data
    })
  } catch (err) {
    console.log(err.response)
    yield put({
      type: 'GET_MATCH_FAILED',
      payload: err.status_message
    })
  }
}

export function* watchGetPopular() {
  yield takeEvery('GET_POPULAR_REQUEST', getPopular)
}

export function* watchGetMovie() {
  yield takeEvery('GET_MOVIE_REQUEST', getDetail)
}

export function* watchGetCredits() {
  yield takeEvery('GET_CREDITS_REQUEST', getCredits)
}

export function* watchGetGenres() {
  yield takeEvery('GET_GENRES_REQUEST', getGenres)
}

export function* watchGetRecommend() {
  yield takeEvery('GET_RECOMMEND_REQUEST', getRecommend)
}

export function* watchGetMovieByGenre() {
  yield takeEvery('GET_MOVIEBYGENRE_REQUEST', getByGenre)
}

export function* watchSearchMovie() {
  yield takeEvery('SEARCH_MOVIE_REQUEST', searchMovie)
}

export function* watchGetMatch() {
  yield takeEvery('GET_MATCH_REQUEST', getMatch)
}