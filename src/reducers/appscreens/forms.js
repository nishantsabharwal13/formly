const GET_FORMS = 'GET_FORMS';
const CREATE_FORM = 'CREATE_FORM';

export default function (state = {
  forms: {}
}, action = {}) {
  switch (action.type) {
    case GET_FORMS: {
      return {
        ...state, forms: { ...action.payload }
      };

    }
    
    case CREATE_FORM: {
      return {
        ...state, forms: { ...action.payload }
      }
    }

    default:
      return state;
  }
};