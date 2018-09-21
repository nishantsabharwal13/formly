
const HOME_DETAILS = 'HOME_DETAILS';

const  getHomeDetails = (res) => {
  return {
    type: HOME_DETAILS,
    payload: res.data
  };
}

export const homeDetails = () => {
  return function (dispatch) {
    return fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => {
        dispatch(getHomeDetails(res));
      })
      .catch( error => {
        console.log(error); 
      });
  };
}