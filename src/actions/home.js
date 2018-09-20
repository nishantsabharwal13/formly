
const HOME_DETAILS = 'HOME_DETAILS';

export const  getHomeDetails = (res) => {
  return {
    type: HOME_DETAILS,
    coursesData: res.data
  };
}

export const homeDetails = () => {
  return function (dispatch) {
    return fetch(`Your url here`)
      .then(res => {
        dispatch(getHomeDetails(res));
      })
      .catch(error => {
        console.log(error); 
      });
  };
}