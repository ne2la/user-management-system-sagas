import axios from "axios";

//  axios.interceptors.request.use((req) => {
//   if(localStorage.getItem("profile")){
//     req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
//   }
    
//     return req;
//  }) 

const apiHandler = {

  login: (data) => {
    const { payload } = data;
    return axios.post("https://z5osptjne0.execute-api.us-east-1.amazonaws.com/dev/signInUserCognito", {
      ...payload,
    });
  },

  register: (data) => {
    const { payload } = data;
    return axios.post("https://z5osptjne0.execute-api.us-east-1.amazonaws.com/dev/registerUserCognito", {
      ...payload,
    });
  },

  verifyEmail: (data) => {
    const { payload } = data;
    return axios.post("https://z5osptjne0.execute-api.us-east-1.amazonaws.com/dev/confirmRegisterUserCognito", {
      ...payload,
    });
  },

  forgotPassword: (data) => {
    const { payload } = data;
    console.log(payload)
    return axios.post("https://z5osptjne0.execute-api.us-east-1.amazonaws.com/dev/forgotPasswordCognito", {
      ...payload,
    });
  },

  resetPassword: (data) => {
    const { payload } = data;
    console.log(payload)
    return axios.put(`https://z5osptjne0.execute-api.us-east-1.amazonaws.com/dev/resetPasswordCognito`, { 
      ...payload,
    });
  },

  getUsers: () => {
    return axios.get(`https://b48us7kmv5.execute-api.us-east-1.amazonaws.com/dev/userDetails`);
  },

  deleteUser: (data) => {
    const {payload} = data
    console.log(payload)
    return axios.delete(`https://b48us7kmv5.execute-api.us-east-1.amazonaws.com/dev/deleteUser/${payload.id}`);
  },

  addUser: (data) => {
    const {payload} = data
    console.log(payload)
    return axios.post(`https://b48us7kmv5.execute-api.us-east-1.amazonaws.com/dev/addUser`,{...payload});
  },

  updateUser: (data) => {
    const {payload,id} = data
    console.log("apiUpdate",data)
    return axios.put(`https://b48us7kmv5.execute-api.us-east-1.amazonaws.com/dev/updateUser/${id}`,{...payload});
  },

};

export default apiHandler;
