const HOME_DETAILS = 'HOME_DETAILS';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case HOME_DETAILS:
      return {
        ...state
      };
    default:
      return state;
  }
};