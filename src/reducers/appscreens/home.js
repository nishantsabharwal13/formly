
import * as types from '../../constants/actionTypes';

export default function (state = {}, action) {
  switch (action.type) {
    case types.RETRIEVE_COURSE_DETAILS:
      return {
        ...state
      };
    default:
      return state;
  }

  export default function (
    state =
      {
        details: {}
      }, action) {
    switch (action.type) {
      case 'GET_USER_DETAILS':
        return { ...state, user: { ...action.payload } };
    }
    return state;
  }