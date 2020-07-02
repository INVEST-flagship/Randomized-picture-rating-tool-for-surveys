import axios from 'axios';

export const getQuestionnaireByKey = async (key) => {
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  const response = await axios.post(`/api/questionnaire`, {key: key,})
  .catch(function (error) {
    if (error.response) {
      // if server returned error code, forward it.
      return {'status':error.response.status, 'response':error.response.data};
    } else {
      // else return 404
      return {'status':404, 'response':"Not found"};
    }
  });
  // if no errors, return status and data
  return {'status':response.status, 'data':response.data};
};

export const postAnswer = async (key, picture_id, value) => {
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  const response = await axios.post(`/api/answer`, {key: key, picture:picture_id, value:value})
  .catch(function (error) {
    if (error.response) {
      // if server returned error code, forward it.
      return {'status':error.response.status, 'response':error.response.data};
    } else {
      // else return 404
      return {'status':404, 'response':"Not found"};
    }
  });
  // if no errors, return status and data
  return {'status':response.status, 'data':response.data};
};

export const postDemographic = async (key, gender, age, education, educationExtra, occupation, province) => {
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  const response = await axios.patch(`/api/demographics/${key}`, {
    gender:gender,
    age:age,
    education:education,
    educationExtra:educationExtra,
    occupation:occupation,
    province:province
  })
  .catch(function (error) {
    if (error.response) {
      // if server returned error code, forward it.
      return {'status':error.response.status, 'response':error.response.data};
    } else {
      // else return 404
      return {'status':404, 'response':"Not found"};
    }
  });
  // if no errors, return status and data
  return {'status':response.status, 'data':response.data};
};

export const postRaffle = async (key, name, email, phone) => {
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  const response = await axios.post(`/api/raffle`, {
    key:key,
    name:name,
    email:email,
    phone:phone
  })
  .catch(function (error) {
    if (error.response) {
      // if server returned error code, forward it.
      return {'status':error.response.status, 'response':error.response.data};
    } else {
      // else return 404
      return {'status':404, 'response':"Not found"};
    }
  });
  // if no errors, return status and data
  return {'status':response.status, 'data':response.data};
};