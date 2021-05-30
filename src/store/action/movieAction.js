export const getPopular = (page = 1) => ({
  type: 'GET_POPULAR_REQUEST',
  payload: page
})

export const getDetailMovie = id => ({
  type: 'GET_MOVIE_REQUEST',
  payload: id
})

export const getCreditsMovie = id => ({
  type: 'GET_CREDITS_REQUEST',
  payload: id
})

export const getGenres = () => ({
  type: 'GET_GENRES_REQUEST'
})

export const getMovieByGenre = (genre_id, page, year = null) => ({
  type: 'GET_MOVIEBYGENRE_REQUEST',
  payload: { genre_id, page, year }
})

export const getRecommend = movie_id => ({
  type: 'GET_RECOMMEND_REQUEST',
  payload: movie_id
})

export const searchMovie = query => ({
  type: 'SEARCH_MOVIE_REQUEST',
  payload: query
})

export const getMatch = (query, page, year = null) => ({
  type: 'GET_MATCH_REQUEST',
  payload: { query, page, year }
})