import axios from "axios";
const GOAL_API = "/api/goals/";
const setGoals = async (goals, token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  let response = await axios.post(GOAL_API, goals, config);

  return response.data;
};
const getGoals = async (token) => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    let response = await axios.get(GOAL_API,config);
  
    return response.data;
  }
  const deleteGoal= async (id,token) => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    let response = await axios.delete(GOAL_API+id,config);
  
    return response.data;
  };
  
const goalReducer = {
  setGoals,
  getGoals,
  deleteGoal
};

export default goalReducer;
