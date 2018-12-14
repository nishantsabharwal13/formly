
const GET_RECORDS = 'GET_RECORDS';
const CREATE_RECORD = 'CREATE_RECORD';
const UPDATE_RECORD = 'UPDATE_RECORD';

const getRecords = (res) => {
  return {
    type: GET_RECORDS,
    payload: res
  };
}

const createRecords = (res) => {
  return {
    type: CREATE_RECORD,
    payload: res
  };
}

const updateRecords = (res) => {
  return {
    type: UPDATE_RECORD,
    payload: res
  };
}


export const recordDetails = () => {
  return fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => {
      dispatch(getRecords(res));
    })
    .catch(error => {
      console.log(error);
    });
}

export const createRecord = (res = {}) => {
  return function (dispatch) {
    return dispatch(createRecords(res));
  };
}

export const updateRecord = (res = {}) => {
  return function (dispatch) {
    return dispatch(updateRecords(res));
  };
}
