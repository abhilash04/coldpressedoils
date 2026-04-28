import { useEffect, useState } from "react";
import { config } from "../../config/config";
import { apiList, invokeApi } from "../../services/apiServices";
import { useCookies } from "react-cookie";

const useFetch = () => {
  const [cookies] = useCookies();
  const [newRole, setNewRole] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  };
  const [name, setName] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const handleGetUser = async () => {
      const id = cookies[config.cookieName]?.loginUserId;
      const params = {
        id,
      };

      try {
        const response = await invokeApi(
          config.getMyCollege + apiList.getUser,
          params,
        );

        if (response?.status >= 200 && response?.status < 300) {
          if (response.data.responseCode === "200") {
            showSnackbar("User Added successfully");
            const userData = response.data.users;
            setNewRole(userData.roles.join(", "));
            console.log(userData.roles.join(", "));
            setRoles(userData);
            setName(response.data.users);
          } else if (response.data.responseCode === "400") {
            showSnackbar(response.data.message, "error");
          }
        }
      } catch (error) {
        console.error("Error during login:", error);
        showSnackbar("Something went wrong. Please try again later!!", "error");
      }
    };
    handleGetUser();
  }, []);

    useEffect(() => {
        const handleGetUser = async () => {
            const id = cookies[config.cookieName]?.loginUserId;
            const params = {
                id
            };

            try {
                const response = await invokeApi(
                    config.getMyCollege + apiList.getUser,
                    params,
                    cookies,
                    console.log(params)
                );

                if (response?.status >= 200 && response?.status < 300) {
                    if (response.data.responseCode === "200") {
                        showSnackbar("User Added successfully");
                        const userData = response.data.users
                        console.log(userData)
                        console.log(userData.roles)
                        setRoles(userData.roles)
                        setName(userData)
                        console.log(userData.name)
                    } else if (response.data.responseCode === "400") {
                        showSnackbar(response.data.message, "error");
                    }
                }
            } catch (error) {
                console.error("Error during login:", error);
                showSnackbar("Something went wrong. Please try again later!!", "error");
            }
        };
        handleGetUser();
    }, [])


    return (
        roles,name
    )
}
export default useFetch;
