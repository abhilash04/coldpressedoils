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
  useMediaQuery,
} from "@mui/material";
import Sidenav from "../../common/Sidenav";
import { Add as PlusIcon, List as ListIcon } from "@mui/icons-material";
import ReactQuill from "react-quill";
import CloseIcon from "@mui/icons-material/Close";
import IconSidenav from "../../common/IconSidenav";
import JoditEditor from "jodit-react";

const ViewBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const blogData = location.state.blogData;
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
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
                    <Grid item md={11} xs={11} sx={{ my: 2 }}>
                      <InputLabel
                        sx={{
                          fontWeight: "bold",
                          my: 1,
                          fontSize: isMobileScreen ? 12 : 15,
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

                    <Grid
                      container
                      md={12}
                      xs={12}
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: isMobileScreen ? "column" : "row",
                        alignItems: "center",
                        justifyContent: isMobileScreen
                          ? "center"
                          : "space-around",
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
                    sx={{
                      width: "100%",
                    }}
                  ></Grid>
                  <Divider sx={{ mb: 1 }} />
                </form>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewBlog;
