import axios from 'axios';

export const SET_POST_REQUEST = 'SET_POST_REQUEST';
export const SET_POST_SUCCESS = 'SET_POST_SUCCESS';
export const SET_POST_FALIURE = 'SET_POST_FALIURE';

export const getPost = subreddit => async dispatch => {
  dispatch ({type: SET_POST_REQUEST});
  try {
    const {data} = await axios (`https://www.reddit.com/r/${subreddit}.json`);
    dispatch ({type: SET_POST_SUCCESS, payload: data});
  } catch (error) {
    dispatch ({type: SET_POST_FALIURE});
  }
};
