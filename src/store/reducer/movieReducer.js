const initialState = {
  collection: {},
  movie: {
    genres: [],
    production_companies: []
  },
  credits: {
    cast: [],
    crew: []
  },
  genres: [],
  recommend: [],
  autocomplete: [],
  isLoading: false
}

const movieReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'GET_MOVIE_REQUEST':
      return {
        ...state,
        isLoading: true,
        movie: {
          genres: [],
          production_companies: []
        }
      }
    case 'GET_MATCH_REQUEST':
    case 'GET_POPULAR_REQUEST':
    case 'GET_CREDITS_REQUEST':
    case 'GET_GENRES_REQUEST':
    case 'GET_MOVIEBYGENRE_REQUEST':
    case 'GET_RECOMMEND_REQUEST':
    case 'SEARCH_MOVIE_REQUEST':
      return {
        ...state,
        isLoading: true
      }
    case 'GET_GENRES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        genres: payload
      }
    case 'GET_POPULAR_SUCCESS':
    case 'GET_MOVIEBYGENRE_SUCCESS':
    case 'GET_MATCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        collection: payload
      }
    case 'GET_MOVIE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        movie: payload
      }
    case 'GET_CREDITS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        credits: payload
      }
    case 'GET_RECOMMEND_SUCCESS':
      return {
        ...state,
        isLoading: false,
        recommend: payload
      }
    case 'SEARCH_MOVIE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        autocomplete: payload.map(item => item.title)
      }
    default:
      return state
  }
}

export default movieReducer