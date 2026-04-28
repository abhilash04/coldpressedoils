import React, { useEffect, useState } from "react";
import {
  Grid,
  InputLabel,
  TextareaAutosize,
  Typography,
  TextField,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../common/Header";
import Sidenav from "../../common/Sidenav";
import CloseIcon from "@mui/icons-material/Close";
import { apiList, invokeApi } from "../../../../../services/apiServices";
import { config } from "../../../../../config/config";
import ReactQuill from "react-quill";
import IconSidenav from "../../common/IconSidenav";

const ViewMainCollege = () => {
  const location = useLocation();
  const userData = location.state.userData;
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [collegeData, setCollegeData] = useState([]);
  const [selectedSubColleges, setSelectedSubColleges] = useState(
    userData.subColleges
      ? userData.subColleges.split(",").map((id) => parseInt(id.trim()))
      : []
  );
  const [showSideNav, setShowSideNav] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  console.log(userData, "url");

  const handleOpenImageDialog = (src) => {
    setImageSrc(src);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setImageSrc();
    setOpenImageDialog(false);
    console.log("close");
  };
  const getSuggestions = async (id) => {
    try {
      let params = { id: id };
      let response = await invokeApi(
        config.getMyCollege + apiList.getalltopcolleges,
        params
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          setCollegeData(response.data.topColleges);
          console.log(response.data.topColleges, "collegeData");
        } else {
          showSnackbar(
            "Something went wrong while getting Programs Details. Please try again later!",
            "error"
          );
        }
      } else {
        showSnackbar(
          "Something went wrong while getting Programs Details. Please try again later!",
          "error"
        );
      }
    } catch (error) {
      console.error("Error while fetching suggestions:", error);
      showSnackbar(
        "Something went wrong while getting Programs Details. Please try again later!",
        "error"
      );
    }
  };
  useEffect(() => {
    getSuggestions();
  }, []);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <>
      <Grid sx={{ display: "flex" }}>
        {isMobileScreen ? (
          <IconSidenav />
        ) : showSideNav ? (
          <IconSidenav />
        ) : (
          <Sidenav />
        )}
        <Grid component="main" sx={{ width: "100%", px: 1 }}>
          <Header toggleSideNav={toggleSideNav} />
            <Grid sx={{ width: "100%", px: isMobileScreen ? 2 : 5 }}>
              <form>
                <Box
                  sx={{
                    my: isMobileScreen ? 2 : 5,
                    boxShadow: 2,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* College Details */}
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
                      College Details
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid
                      container
                      md={12}
                      xs={12}
                      spacing={isMobileScreen ? 0 : 2}
                      sx={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Grid item md={11} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 15,
                          }}
                        >
                          College Name *
                        </InputLabel>

                        <TextField
                          fullWidth
                          name="collegeName"
                          value={userData.collegeName}
                          inputProps={{
                            readOnly: true,
                            style: {
                              height: isMobileScreen ? "3px" : "8px",
                              fontSize: isMobileScreen ? 12 : 14,
                            },
                          }}
                        />
                      </Grid>

                      <Grid item md={11} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 15,
                          }}
                        >
                          OG URL *
                        </InputLabel>
                        <TextField
                          placeholder=""
                          fullWidth
                          name="ogUrl"
                          value={userData.ogUrl}
                          inputProps={{
                            readOnly: true,
                            style: {
                              height: isMobileScreen ? "3px" : "8px",
                              fontSize: isMobileScreen ? 12 : 14,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{ my: 2 }}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 15,
                          }}
                        >
                          College Full Description
                        </InputLabel>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            my: isMobileScreen ? 2 : 2,
                            mb: isMobileScreen ? 15 : 1,
                          }}
                        >
                          <ReactQuill
                            value={userData.fullDescription}
                            readOnly={true}
                            modules={{
                              toolbar: [
                                ["bold", "italic", "underline", "strike"],
                                ["blockquote", "code-block"],
                                [{ list: "ordered" }, { list: "bullet" }],
                                [{ script: "sub" }, { script: "super" }],
                                [{ indent: "-1" }, { indent: "+1" }],
                                [{ direction: "rtl" }],
                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                [{ color: [] }, { background: [] }],
                                [{ font: [] }],
                                [{ align: [] }],
                                ["link", "image", "video"],
                                ["clean"],
                              ],
                            }}
                            style={{ height: "500px" }}
                          />
                        </Grid>
                      </Grid>

                      <Grid item md={11} xs={11} sx={{ my: 1 }}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 15,
                          }}
                        >
                          Sub Colleges
                        </InputLabel>
                        <TextField
                          fullWidth
                          value={selectedSubColleges.map(
                            (id) =>
                              collegeData.find((college) => college.id === id)
                                ?.collegeName || ""
                          )}
                          variant="outlined"
                          inputProps={{
                            readOnly: true,
                            style: {
                              height: isMobileScreen ? "3px" : "8px",
                              fontSize: isMobileScreen ? 12 : 14,
                            },
                          }}
                        />
                      </Grid>
                      <Grid
                        container
                        md={12}
                        xs={12}
                        sx={{
                          width: "100%",
                          justifyContent: "space-around",
                          my: 5,
                        }}
                      >
                        {/* College Logo */}
                        <Grid item md={2} xs={11}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: isMobileScreen ? 12 : 15,
                            }}
                          >
                            College Logo
                          </InputLabel>
                          <Grid sx={{ width: "50%", height: "50%", my: 3 }}>
                            <img
                              src={userData.collegeLogoUrl}
                              alt="collegelogo"
                              style={{
                                height: "100%",
                                width: "100%",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleOpenImageDialog(userData.collegeLogoUrl)
                              }
                            />
                            <Dialog
                              open={openImageDialog}
                              onClose={handleCloseImageDialog}
                              fullWidth
                            >
                              <Grid sx={{ py: 20, px: 10 }}>
                                <DialogTitle>
                                  <IconButton
                                    aria-label="close"
                                    style={{
                                      position: "absolute",
                                      right: 0,
                                      top: 0,
                                    }}
                                    onClick={handleCloseImageDialog}
                                  >
                                    <CloseIcon sx={{ fontSize: 40 }} />
                                  </IconButton>
                                </DialogTitle>
                                <DialogContent
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={imageSrc}
                                    alt="collegelogo"
                                    style={{
                                      height: "auto",
                                      width: "auto",
                                      overflowX: "hidden",
                                      overflowY: "hidden",
                                    }}
                                  />
                                </DialogContent>
                              </Grid>
                            </Dialog>
                          </Grid>
                        </Grid>

                        {/* Banner Image */}
                        <Grid item md={2} xs={11}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: isMobileScreen ? 12 : 15,
                            }}
                          >
                            Banner Image
                          </InputLabel>
                          <Grid sx={{ width: "50%", height: "50%", my: 3 }}>
                            <img
                              src={userData.collegeBannerUrl}
                              alt="bannerimage"
                              style={{
                                height: "100%",
                                width: "100%",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleOpenImageDialog(userData.collegeBannerUrl)
                              }
                            />
                            <Dialog
                              open={openImageDialog}
                              onClose={handleCloseImageDialog}
                              fullWidth
                            >
                              <Grid sx={{ py: 20, px: 10 }}>
                                <DialogTitle>
                                  <IconButton
                                    aria-label="close"
                                    style={{
                                      position: "absolute",
                                      right: 0,
                                      top: 0,
                                    }}
                                    onClick={handleCloseImageDialog}
                                  >
                                    <CloseIcon sx={{ fontSize: 40 }} />
                                  </IconButton>
                                </DialogTitle>
                                <DialogContent
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={imageSrc}
                                    alt="collegebanner"
                                    style={{
                                      height: "auto",
                                      width: "auto",
                                      overflowX: "hidden",
                                      overflowY: "hidden",
                                    }}
                                  />
                                </DialogContent>
                              </Grid>
                            </Dialog>
                          </Grid>
                        </Grid>

                        <Grid item md={2} xs={11}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: isMobileScreen ? 12 : 15,
                            }}
                          >
                            Featured Image
                          </InputLabel>
                          <Grid sx={{ width: "50%", height: "50%", my: 3 }}>
                            <img
                              src={userData.collegeFeaturedUrl}
                              alt="featuredimage"
                              style={{
                                height: "100%",
                                width: "100%",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleOpenImageDialog(
                                  userData.collegeFeaturedUrl
                                )
                              }
                            />
                            <Dialog
                              open={openImageDialog}
                              onClose={handleCloseImageDialog}
                              fullWidth
                            >
                              <Grid sx={{ py: 20, px: 10 }}>
                                <DialogTitle>
                                  <IconButton
                                    aria-label="close"
                                    style={{
                                      position: "absolute",
                                      right: 0,
                                      top: 0,
                                    }}
                                    onClick={handleCloseImageDialog}
                                  >
                                    <CloseIcon sx={{ fontSize: 40 }} />
                                  </IconButton>
                                </DialogTitle>
                                <DialogContent
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={imageSrc}
                                    alt="featuredimage"
                                    style={{
                                      height: "auto",
                                      width: "auto",
                                      overflowX: "hidden",
                                      overflowY: "hidden",
                                    }}
                                  />
                                </DialogContent>
                              </Grid>
                            </Dialog>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Grid>
          </Grid>
      </Grid>
    </>
  );
};

export default ViewMainCollege;
