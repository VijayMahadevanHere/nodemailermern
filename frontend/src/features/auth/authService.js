import axios from "axios";
const API_URL = "/api/users/";

const register = async (userdata) => {
  let response = await axios.post(API_URL, userdata);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login= async(userdata)=>{

  let response=await axios.post(API_URL+'login',userdata)
  if(response.data){
    localStorage.setItem('user',JSON.stringify(response.data))
  }
  return response.data
}

const logout=()=>{
 return localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout
}

export default authService