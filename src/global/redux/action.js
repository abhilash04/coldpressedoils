import { invokeApi, apiList } from "../../services/apiServices";
import { config } from "../../config/config";

export const getUser = ({ id, cookies }) => {
  return async (dispatch) => {
    dispatch({ type: 'GET_USER_START' });
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getUser,
        { id },
        cookies
      );
      if (response?.status === 200 && response.data.responseCode === "200") {
        dispatch({ type: 'GET_USER_SUCCESS', payload: response.data });
      } else {
        dispatch({ type: 'GET_USER_FAILURE', payload: "Failed to fetch user" });
      }
    } catch (error) {
      dispatch({ type: 'GET_USER_FAILURE', payload: error.message });
    }
  };
};

export const logoutUser = () => ({
  type: 'LOGOUT'
});
