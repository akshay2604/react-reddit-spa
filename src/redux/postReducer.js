import {
  SET_POST_REQUEST,
  SET_POST_SUCCESS,
  SET_POST_FALIURE,
} from './postAction';

const initialState = {
  post: null,
  loading: false,
};

const post = (state = initialState, action) => {
  switch (action.type) {
    case SET_POST_REQUEST:
      return {...state, loading: true};
    case SET_POST_SUCCESS:
      return {...state, post: action.payload, loading: false};
    case SET_POST_FALIURE:
      return {...state, loading: false};
  }
  return state;
};
export default post;
