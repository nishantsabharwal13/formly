const HOME_DETAILS = 'HOME_DETAILS';

export default function (state = {
  home: {}
}, action = {}) {
  switch (action.type) {
    case HOME_DETAILS: {
      return { 
        ...state, home: { ...action.payload } 
      };

    }

    default:
      return state;
  }
};