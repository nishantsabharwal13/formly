
const GET_FORMS= 'GET_FORMS';
const CREATE_FORM = 'CREATE_FORM';
const UPDATE_FORM = 'UPDATE_FORM';
const DELETE_FORM = 'DELETE_FORM';

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

const updateForms = (res) => {
  return {
    type: UPDATE_FORM,
    payload: res
  };
}

const deleteForms = (res) => {
  return {
    type: DELETE_FORM,
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

export const updateForm = (res ={}) => {
  return function (dispatch) {
    return dispatch(updateForms(res));
  };
}

export const deleteForm = (res = '') => {
  return function (dispatch) {
    return dispatch(deleteForms(res));
  };
}
