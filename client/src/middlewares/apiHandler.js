import axios from "axios";

// const API = axios.create({ baseURL:"http://localhost:5000/" });

// API.interceptors.request.use((req) => {
//   if(localStorage.getItem("profile")){
//       req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
//   }

//   return req;
// })

  const config = {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("profile")) && JSON.parse(localStorage.getItem("profile")).token}` }
  };



const apiHandler = {

  login: (data) => {
    const { payload } = data;
    return axios.post("http://localhost:5000/user/signin", {
      ...payload,
    });
  },

  register: (data) => {
    const { payload } = data;
    return axios.post("http://localhost:5000/user/signup", {
      ...payload,
    });
  },

  forgotPassword: (data) => {
    const { payload } = data;
    console.log(payload)
    return axios.post("http://localhost:5000/user/forgotPassword", {
      ...payload,
    });
  },

  resetPassword: (data) => {
    const { payload } = data;
    console.log(payload)
    return axios.put(`http://localhost:5000/user${payload.path}`, { 
      ...payload,
    });
  },

  getUsers: () => {
    return axios.get(`http://localhost:5000/posts/`);
  },

  deleteUser: (data) => {
    const {payload} = data
    console.log(payload)
    return axios.delete(`http://localhost:5000/posts/deletePost/${payload.id}`,config);
  },

  addUser: (data) => {
    const {payload} = data
    console.log(payload)
    return axios.post(`http://localhost:5000/posts/createPost`,{...payload},config);
  },

};

export default apiHandler;
