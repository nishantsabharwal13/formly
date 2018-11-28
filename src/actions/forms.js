
const GET_FORMS= 'GET_FORMS';
const CREATE_FORM = 'CREATE_FORM';

const getForms = (res) => {
  return {
    type: GET_FORMS,
    payload: res
  };
}

const createForms = (res) => {
  return {
    type: CREATE_FORM,
    payload: res
  };
}

export const formDetails = () => {
  return fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => {
      dispatch(getForms(res));
    })
    .catch(error => {
      console.log(error);
    });
}

export const createForm = (res ={}) => {
  return function (dispatch) {
    return dispatch(createForms(res));
  };
}