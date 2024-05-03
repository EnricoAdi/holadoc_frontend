import axios from "axios"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import KEY from "./key";
// let BaseUrl =  process.env.NODE_ENV==="development" ? "localhost:8000" : process.env.NEXT_PUBLIC_PRODUCTION_URL+""

// const API_URL = "http://192.168.1.7:8000/api/"
// const API_URL = "http://192.168.0.10:8000/api/"
const API_URL = "http://localhost:8000/api/"
// const baseClient = axios.create({
//   baseURL: API_URL
// })
let accessToken = "";
function setAccessToken(token) {
  accessToken = token;
}

const publicClient = axios.create({
  baseURL: API_URL,
  headers: {
      "Content-Type": "application/json",
  }
});

const privateClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

privateClient.interceptors.request.use(async (req) => {
  if (req.headers) {
      req.headers["Authorization"] = "Bearer " + accessToken;
  }
  return req;
});

//response interceptors
privateClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const request = error.config;
    if (error.response.status === 401 && !request._retry) {
      let errorMsg = error.response.data.message
      if(errorMsg=="Unauthenticated."){
        //refresh token
        request._retry = true;
        try {
          const user = await Auth.refresh();
          // console.log(user.token)
          setAccessToken(user.token);
          request.headers["Authorization"] = "Bearer " + user.token;
          return privateClient.request(request);
        } catch (error) {
          console.log(error)
          //auto logout
          await AsyncStorage.removeItem(KEY.AUTH_KEY);
          RootNavigation.navigate("Login")
        }
      }
    }
    return Promise.reject(error);
  }
);
export { publicClient, privateClient, accessToken, setAccessToken };