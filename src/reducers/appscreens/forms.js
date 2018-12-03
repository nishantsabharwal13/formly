const GET_FORMS = 'GET_FORMS';
const CREATE_FORM = 'CREATE_FORM';
const UPDATE_FORM = 'UPDATE_FORM';

const addForm = (items, payload) => {
    return [...items, payload];
};

const updateForm = (items, payload) => {
  if (items.some(i => i.id == payload.id)) {
    return items.map(i => i.id == payload.id ? { ...i, ...payload } : i);
  } 
};


export default function (state = {
  forms: [{
    formArray: [],
    formName: 'test',
    id: 2312,
    createdAt: 123123213
  }]
}, action = {}) {
  switch (action.type) {
    case GET_FORMS: {
      return {
        ...state, forms: [...state.forms]
      };

    }
    
    case CREATE_FORM: {
      return { ...state, forms: addForm(state.forms, action.payload ) };
    }

    case UPDATE_FORM: {
      return { ...state, forms: updateForm(state.forms, action.payload ) };
    }

    default:
      return {...state};
  }
};