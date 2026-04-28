import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../common/Header";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  DialogContent,
  DialogTitle,
  Dialog,
  Card,
  Divider,
  InputLabel,
  IconButton,
  Alert,
  Snackbar,
  DialogActions,
  Container,
  TextareaAutosize,
  useMediaQuery,
} from "@mui/material";
import Sidenav from "../../common/Sidenav";
import ReactQuill from "react-quill";
import CloseIcon from "@mui/icons-material/Close";
import { config } from "../../../config/config";
import { apiList, invokeApi } from "../../../services/apiServices";
import { useCookies } from "react-cookie";
import IconSidenav from "../../common/IconSidenav";
import JoditEditor from "jodit-react";

const ViewBlogApprovedList = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  const blogData = location.state.blogData;
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showSideNav, setShowSideNav] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  const handleOpenImageDialog = (src) => {
    setImageSrc(src);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setImageSrc();
    setOpenImageDialog(false);
    console.log("close");
  };
  const handleOpenAprroveDialog = () => {
    setOpenApproveDialog(true);
  };
  const handleCloseAprroveDialog = () => {
    setOpenApproveDialog(false);
  };
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleApprove = async () => {
    const params = {
      id: blogData.id,
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.approveBlog,
        params,
        cookies
      );

      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          navigate(`/blog-approval/approved-blog-list`);
        } else {
          showSnackbar("Something went wrong. Please try again later!!");
        }
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
      showSnackbar("Something went wrong. Please try again later!!");
    }
  };
  const htmlToText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  return (
    <div>
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

          <Grid sx={{ width: "100%", px: isMobileScreen ? 1 : 5 }}>
            <Card elevation={1} sx={{ my: 5 }}>
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
                  Create New Blog
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <form>
                  <Grid
                    container
                    md={12}
                    xs={12}
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      my: 2,
                    }}
                  >
                    <Grid item md={11} xs={11} sx={{ my: 2 }}>
                      <InputLabel
                        sx={{
                          fontWeight: "bold",
                          my: 1,
                          fontSize: isMobileScreen ? 12 : 15,
                        }}
                      >
                        Blog Title *
                      </InputLabel>
                      <TextField
                        placeholder="Enter Blog Title"
                        fullWidth
                        name="blogTitle"
                        value={blogData.blogTitle}
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
                        OG URL *
                      </InputLabel>
                      <TextField
                        placeholder=""
                        fullWidth
                        name="ogUrl"
                        value={blogData.ogUrl}
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
                        Category
                      </InputLabel>
                      <TextField
                        placeholder=""
                        fullWidth
                        name="ogUrl"
                        value={blogData.category}
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
                        }}
                      >
                        Blog Content
                      </InputLabel>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          my: isMobileScreen ? 2 : 2,
                          mb: isMobileScreen ? 15 : 1,
                        }}
                      >
                        <JoditEditor
                          value={blogData.blogContent}
                          config={{
                            readonly: true,
                            toolbarSticky: false,
                            toolbarAdaptive: true,
                            height: 500,
                            buttons: [
                              "bold",
                              "italic",
                              "underline",
                              "strikethrough",
                              "eraser",
                              "ul",
                              "ol",
                              "outdent",
                              "indent",
                              "superscript",
                              "subscript",
                              "font",
                              "fontsize",
                              "paragraph",
                              "image",
                              "table",
                              "link",
                              "align",
                              "undo",
                              "redo",
                              "hr",
                              "copyformat",
                              "cut",
                              "paste",
                              "selectall",
                              "print",
                              "source",
                              "about",
                            ],
                          }}
                          style={{
                            height: "500px",
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item md={11} xs={11} sx={{ my: 2 }}>
                      <InputLabel
                        sx={{
                          fontWeight: "bold",
                          my: 1,
                          fontSize: isMobileScreen ? 12 : 15,
                        }}
                      >
                        Table Of Content
                      </InputLabel>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          my: isMobileScreen ? 2 : 2,
                          mb: isMobileScreen ? 15 : 1,
                        }}
                      >
                        <JoditEditor
                          value={blogData.tableOfContent}
                          config={{
                            readonly: true,
                            toolbarSticky: false,
                            toolbarAdaptive: true,
                            height: 500,
                            buttons: [
                              "bold",
                              "italic",
                              "underline",
                              "strikethrough",
                              "eraser",
                              "ul",
                              "ol",
                              "outdent",
                              "indent",
                              "superscript",
                              "subscript",
                              "font",
                              "fontsize",
                              "paragraph",
                              "image",
                              "table",
                              "link",
                              "align",
                              "undo",
                              "redo",
                              "hr",
                              "copyformat",
                              "cut",
                              "paste",
                              "selectall",
                              "print",
                              "source",
                              "about",
                            ],
                          }}
                          style={{
                            height: "500px",
                          }}
                        />
                      </Grid>
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
                      {/* Banner Image */}
                      <Grid
                        item
                        md={2}
                        xs={11}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: isMobileScreen ? "center" : "flex-start",
                        }}
                      >
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
                            src={blogData.bannerUrl}
                            alt="bannerimage"
                            style={{
                              height: "100%",
                              width: "100%",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleOpenImageDialog(blogData.bannerUrl)
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

                      <Grid
                        item
                        md={2}
                        xs={11}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: isMobileScreen ? "center" : "flex-start",
                        }}
                      >
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
                            src={blogData.featuredUrl}
                            alt="featuredimage"
                            style={{
                              height: "100%",
                              width: "100%",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleOpenImageDialog(blogData.featuredUrl)
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

                  <Grid
                    container
                    md={12}
                    xs={12}
                    sx={{
                      width: "100%",
                    }}
                  ></Grid>
                  <Divider sx={{ mb: 3 }} />
                  <Grid
                    container
                    spacing={isMobileScreen ? 0 : 2}
                    md={12}
                    xs={12}
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 5,
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
                      onClick={handleOpenAprroveDialog}
                    >
                      Approve Blog
                    </Button>
                    <Button
                      sx={{
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
                      onClick={() =>
                        navigate(`/blog-approval/blog-approve-list`)
                      }
                    >
                      Cancel
                    </Button>
                  </Grid>
                </form>
                <Dialog
                  open={openApproveDialog}
                  onClick={handleCloseAprroveDialog}
                  sx={{ width: "100%" }}
                >
                  <Container>
                    <DialogTitle
                      sx={{
                        fontWeight: "600",
                        fontSize: "25px",
                        my: 1,
                        textAlign: "center",
                      }}
                    >
                      Confirm Approval
                    </DialogTitle>
                    <DialogContent>
                      <Grid container>
                        <Grid item md={12} sx={{ my: 1 }}>
                          <Typography>
                            Are you sure you want to Approve?
                          </Typography>
                        </Grid>
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Grid
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          onClick={handleCloseAprroveDialog}
                          sx={{
                            width: "40%",
                            mb: 2,
                            border: "1px solid#5cb85c",
                            color: "#5cb85c",
                          }}
                        >
                          No
                        </Button>
                        <Button
                          onClick={handleApprove}
                          variant="contained"
                          color="success"
                          sx={{
                            width: "40%",
                            mb: 2,

                            color: "#FFF",
                            fontWeight: 600,
                          }}
                        >
                          Yes
                        </Button>
                      </Grid>
                    </DialogActions>
                  </Container>
                </Dialog>
              </Grid>
            </Card>

            {/* Snackbar */}
            <Snackbar
              open={openSnackbar}
              autoHideDuration={4000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              sx={{ width: "auto" }}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity={snackbarSeverity}
                sx={{ width: "auto" }}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewBlogApprovedList;
