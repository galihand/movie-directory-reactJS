import { all } from 'redux-saga/effects'
import { watchGetCredits, watchGetGenres, watchGetMatch, watchGetMovie, watchGetMovieByGenre, watchGetPopular, watchGetRecommend, watchSearchMovie } from './movieSaga'

export default function* rootSaga() {
  yield all([
    watchGetPopular(), watchGetMovie(), watchGetCredits(), watchGetMatch(),
    watchGetGenres(), watchGetMovieByGenre(), watchGetRecommend(), watchSearchMovie()
  ])
}