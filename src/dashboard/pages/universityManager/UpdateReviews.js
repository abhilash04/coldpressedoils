import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  InputLabel,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../../../config/config";
import { apiList, invokeApi } from "../../../services/apiServices";
import { useCookies } from "react-cookie";

const UpdateReviews = () => {
  const [cookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state.userData;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [courseData, setCourseData] = useState([]);
  const [courseList, setCourseList] = useState(userData.reviews);
  const [showDepartment, setShowDepartment] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const handleAddCourseDetails = () => {
    setCourseList([
      ...courseList,
      {
        collegeDepartment: null,
        course: "",
        courseFees: "",
        batchCapacity: "",
        cutoff: "",
      },
    ]);
  };

  const handleChangeCourse = (newValueOrEvent, index, field) => {
    let value;
    if (!newValueOrEvent) {
      value = "";
    } else if (typeof newValueOrEvent === "object" && newValueOrEvent.target) {
      value = newValueOrEvent.target.value;
    } else {
      value = newValueOrEvent;
    }
    const updatedCourses = [...courseList];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [field]: value,
    };
    setCourseList(updatedCourses);
  };

  const handleRemoveCourseDetails = (indexToRemove) => {
    setCourseList(courseList.filter((_, index) => index !== indexToRemove));
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleCheckboxChange = () => {
    setShowDepartment(!showDepartment);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await invokeApi(
          config.getMyCollege + apiList.getcourses,
          {},
          cookies
        );
        if (response?.status >= 200 && response?.status < 300) {
          if (response.data.responseCode === "200") {
            setCourseData(response.data.courses);
          } else {
            console.error("Invalid responseCode:", response.data.responseCode);
          }
        } else {
          console.error("HTTP error:", response?.status);
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSaveChanges = async () => {
    const params = {
      collegeId: userData.id,
      courseList: courseList,
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updatecollegecourse,
        params,
        cookies
      );
      console.log(params);
      if (response?.status === 200) {
        showSnackbar("User updated successfully", "success");

        navigate("/university-manager/college-list");
      } else {
        showSnackbar("Failed to update. Please try again later!!", "error");
      }
    } catch (error) {
      showSnackbar("Failed to update. Please try again later!!", "error");
    }
  };

  return (
    <Paper elevation={0} sx={{ width: "100%" }}>
      <Grid sx={{ py: isMobileScreen ? 2 : 2 }}>
        <Typography
          sx={{
            mb: 2,
            mx: isMobileScreen ? 2 : 8,
            textAlign: "left",
            fontSize: isMobileScreen ? 14 : 18,
            fontWeight: 600,
            // textDecorationLine: "underline",
            textTransform: "uppercase",
          }}
        >
          Review Details
        </Typography>
        {courseList.map((course, index) => (
          <Grid
            key={index}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              my: 1,
            }}
          >
            <Grid
              container
              spacing={isMobileScreen ? 0 : 2}
              md={12}
              xs={12}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                my: 1,
              }}
            >
              <Grid item md={5} xs={11}>
                <InputLabel sx={{ fontWeight: "bold", my: 1, fontSize: isMobileScreen ? 12 : 15 }}>
                  Review
                </InputLabel>
                <TextField
                  fullWidth
                  placeholder="Course Fee"
                  name="courseFees"
                  value={course.review}
                  onChange={(event) =>
                    handleChangeCourse(event, index, "courseFees")
                  }
                  inputProps={{
                    style: {
                      height: isMobileScreen ? "3px" : "8px",
                      fontSize: isMobileScreen ? 12 : 14,
                    },
                  }}
                />
              </Grid>
              <Grid item md={5} xs={11}>
                <InputLabel sx={{ fontWeight: "bold", my: 1, fontSize: isMobileScreen ? 12 : 15 }}>
                  Customer Name
                </InputLabel>
                <TextField
                  fullWidth
                  placeholder="Course Fee"
                  name="courseFees"
                  value={course.customer_name}
                  onChange={(event) =>
                    handleChangeCourse(event, index, "courseFees")
                  }
                  inputProps={{
                    style: {
                      height: isMobileScreen ? "3px" : "8px",
                      fontSize: isMobileScreen ? 12 : 14,
                    },
                  }}
                />
              </Grid>
              <Grid item md={1} xs={11}>
                <InputLabel sx={{ fontWeight: "bold", my: 1, fontSize: isMobileScreen ? 12 : 15 }}>
                  Ratings
                </InputLabel>
                <TextField
                  placeholder="Batch Capacity"
                  fullWidth
                  name="batchCapacity"
                  value={course.ratings}
                  onChange={(event) =>
                    handleChangeCourse(event, index, "batchCapacity")
                  }
                  inputProps={{
                    style: {
                      height: isMobileScreen ? "3px" : "8px",
                      fontSize: isMobileScreen ? 12 : 14,
                    },
                  }}
                />
              </Grid>
              <Grid item md={0.5} xs={11}>
                {index === 0 ? (
                  <Button
                    onClick={handleAddCourseDetails}
                    sx={{
                      background: "#006DB4",
                      color: "#FFF",
                      fontSize: 16,
                      mt: 4.5,
                      fontWeight: 600,
                      textAlign: "center",
                      "&:hover": {
                        background: "#006DB4",
                        color: "#FFF",
                      },
                    }}
                  >
                    +
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleRemoveCourseDetails(index)}
                    sx={{
                      background: "#FF0000",
                      color: "#FFF",
                      fontSize: 16,
                      mt: 4.5,
                      textAlign: "center",
                      fontWeight: 600,
                      "&:hover": {
                        background: "#FF0000",
                        color: "#FFF",
                      },
                    }}
                  >
                    -
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}

        {courseList.length === 0 && (
          <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
            No courses added.
          </Typography>
        )}

        <Divider sx={{ mt: 10 }} />
        <Grid
          container
          spacing={isMobileScreen ? 0 : 2}
          md={12}
          xs={12}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Button
            color="success"
            sx={{
              mr: 4,
              my: 2,
              px: 2,
              fontSize: 12,
              background: "#1d1a57",
              color: "#FFF",
              fontWeight: 600,
              "&:hover": {
                background: "#1d1a57",
                color: "#FFF",
              },
            }}
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UpdateReviews;
