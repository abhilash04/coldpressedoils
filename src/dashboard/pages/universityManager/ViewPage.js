import React, { useState } from "react";
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
import { pdfjs } from "react-pdf";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import ReactQuill from "react-quill";
import IconSidenav from "../../common/IconSidenav";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ViewPage = () => {
  const location = useLocation();
  const userData = location.state.userData;
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSideNav, setShowSideNav] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  console.log(userData, "url");
  const handleOpen = (index) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % userData.gallery.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + userData.gallery.length) %
        userData.gallery.length
    );
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

  const getFileName = () => {
    const lastSlashIndex = userData.collegeBroucherUrl.lastIndexOf("-");
    return userData.collegeBroucherUrl.substring(lastSlashIndex + 1);
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
          <Grid sx={{ py: 2 }}>
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
                      Page Details
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid
                      container
                      md={12}
                      xs={12}
                      sx={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Grid item md={5} xs={11} sx={{ py: 1 }}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 15,
                          }}
                        >
                          Page Title / Identifier *
                        </InputLabel>

                        <TextField
                          fullWidth
                          name="collegeName"
                          value={userData.pageTitle}
                          inputProps={{
                            readOnly: true,
                            style: {
                              height: isMobileScreen ? "3px" : "8px",
                              fontSize: isMobileScreen ? 12 : 14,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={5} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 15,
                          }}
                        >
                          Location *
                        </InputLabel>
                        <TextField
                          placeholder="Enter Page Name / Identifier"
                          fullWidth
                          name="pageTitle"
                          value={userData.location}
                          inputProps={{
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
                      {/* <Grid item md={7} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 15,
                          }}
                        >
                          Placements
                        </InputLabel>

                        <TextField
                          fullWidth
                          value={userData.collegePlacement
                            .map(
                              (placementCompany) =>
                                placementCompany.placementCompany
                            )
                            .join(", ")}
                          variant="outlined"
                          inputProps={{
                            readOnly: true,
                            style: {
                              height: isMobileScreen ? "3px" : "8px",
                              fontSize: isMobileScreen ? 12 : 14,
                            },
                          }}
                        />
                      </Grid> */}

                      <Grid item md={11} xs={11} sx={{ my: 2 }}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                          }}
                        >
                          Signature Services
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
                            value={userData.signatureServices}
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

                      {/* <Grid item md={11} xs={11} sx={{ my: 2 }}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 15,
                          }}
                        >
                          Meta Keywords (Max of 10 keywords, separate with
                          commas)
                        </InputLabel>
                        <TextareaAutosize
                          aria-label="empty textarea"
                          placeholder=""
                          minRows={5}
                          style={{ width: "100%" }}
                          value={userData.metaKeywords}
                          readOnly
                          name="metaKeywords"
                        />
                      </Grid> */}
                      {/* <Grid item md={11} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 15,
                          }}
                        >
                          Meta Description (Enter Max. of 150 characters)
                        </InputLabel>
                        <TextareaAutosize
                          aria-label="empty textarea"
                          placeholder=""
                          minRows={5}
                          style={{ width: "100%" }}
                          value={userData.metaDescription}
                          readOnly
                          name="metaDescription"
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
                          Schema Script Generate Here Paste Below
                        </InputLabel>
                        <TextareaAutosize
                          aria-label="empty textarea"
                          placeholder="Schema Script Paste Here"
                          minRows={10}
                          style={{ width: "100%" }}
                          value={userData.schemaScript}
                          readOnly
                          name="schemaScript"
                        />
                      </Grid> */}
                    </Grid>

                    <Divider sx={{ my: 1, mt: 6 }} />
                    {/* Course Details */}
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
                      <Divider sx={{ mb: 3 }} />
                      {userData.reviews.length > 0 ? (
                        userData.reviews.map((review, index) => (
                          <Grid
                            key={index}
                            container
                            spacing={isMobileScreen ? 0 : 5}
                            md={12}
                            xs={12}
                            sx={{
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Grid item md={4} xs={11}>
                              <InputLabel
                                sx={{
                                  fontWeight: "bold",
                                  my: 1,
                                  fontSize: isMobileScreen ? 12 : 15,
                                }}
                              >
                                Review
                              </InputLabel>
                              <TextField
                                fullWidth
                                name="course"
                                value={review.review}
                                inputProps={{
                                  readOnly: true,
                                  style: {
                                    height: isMobileScreen ? "3px" : "8px",
                                    fontSize: isMobileScreen ? 12 : 14,
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item md={4} xs={11}>
                              <InputLabel
                                sx={{
                                  fontWeight: "bold",
                                  my: 1,
                                  fontSize: isMobileScreen ? 12 : 15,
                                }}
                              >
                                Customer Name
                              </InputLabel>
                              <TextField
                                fullWidth
                                placeholder="Course Fee"
                                name="courseFees"
                                value={review.customer_name}
                                inputProps={{
                                  readOnly: true,
                                  style: {
                                    height: isMobileScreen ? "3px" : "8px",
                                    fontSize: isMobileScreen ? 12 : 14,
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item md={3} xs={11}>
                              <InputLabel
                                sx={{
                                  fontWeight: "bold",
                                  my: 1,
                                  fontSize: isMobileScreen ? 12 : 15,
                                }}
                              >
                                Ratings
                              </InputLabel>
                              <TextField
                                placeholder="Batch Capacity"
                                fullWidth
                                name="batchCapacity"
                                value={review.ratings}
                                inputProps={{
                                  readOnly: true,
                                  style: {
                                    height: isMobileScreen ? "3px" : "8px",
                                    fontSize: isMobileScreen ? 12 : 14,
                                  },
                                }}
                              />
                            </Grid>
                          </Grid>
                        ))
                      ) : (
                        <Grid
                          container
                          spacing={isMobileScreen ? 0 : 5}
                          md={12}
                          xs={12}
                          sx={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Grid item md={3} xs={11}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 15,
                              }}
                            >
                              Review
                            </InputLabel>
                            <TextField
                              fullWidth
                              name="course"
                              value=""
                              inputProps={{
                                readOnly: true,
                                style: {
                                  height: isMobileScreen ? "3px" : "8px",
                                  fontSize: isMobileScreen ? 12 : 14,
                                },
                              }}
                            />
                          </Grid>
                          <Grid item md={2} xs={11}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 15,
                              }}
                            >
                              Customer Name
                            </InputLabel>
                            <TextField
                              fullWidth
                              placeholder="Course Fee"
                              name="courseFees"
                              value=""
                              inputProps={{
                                readOnly: true,
                                style: {
                                  height: isMobileScreen ? "3px" : "8px",
                                  fontSize: isMobileScreen ? 12 : 14,
                                },
                              }}
                            />
                          </Grid>
                          <Grid item md={2} xs={11}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 15,
                              }}
                            >
                              Ratings
                            </InputLabel>
                            <TextField
                              placeholder="Batch Capacity"
                              fullWidth
                              name="batchCapacity"
                              value=""
                              inputProps={{
                                readOnly: true,
                                style: {
                                  height: isMobileScreen ? "3px" : "8px",
                                  fontSize: isMobileScreen ? 12 : 14,
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Grid>

                    <Divider sx={{ my: 1, mt: 6 }} />
                    {/* Course Details */}
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
                        FAQ's
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      {userData.faq.length > 0 ? (
                        userData.faq.map((faqs, index) => (
                          <Grid
                            key={index}
                            container
                            spacing={isMobileScreen ? 0 : 5}
                            md={12}
                            xs={12}
                            sx={{
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Grid item md={5} xs={11}>
                              <InputLabel
                                sx={{
                                  fontWeight: "bold",
                                  my: 1,
                                  fontSize: isMobileScreen ? 12 : 15,
                                }}
                              >
                                Question
                              </InputLabel>
                              <TextField
                                fullWidth
                                placeholder="Course Fee"
                                name="courseFees"
                                value={faqs.question}
                                inputProps={{
                                  readOnly: true,
                                  style: {
                                    height: isMobileScreen ? "3px" : "8px",
                                    fontSize: isMobileScreen ? 12 : 14,
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item md={6} xs={11}>
                              <InputLabel
                                sx={{
                                  fontWeight: "bold",
                                  my: 1,
                                  fontSize: isMobileScreen ? 12 : 15,
                                }}
                              >
                                Answer
                              </InputLabel>
                              <TextField
                                placeholder="Batch Capacity"
                                fullWidth
                                name="batchCapacity"
                                value={faqs.answer}
                                inputProps={{
                                  readOnly: true,
                                  style: {
                                    height: isMobileScreen ? "3px" : "8px",
                                    fontSize: isMobileScreen ? 12 : 14,
                                  },
                                }}
                              />
                            </Grid>
                          </Grid>
                        ))
                      ) : (
                        <Grid
                          container
                          spacing={isMobileScreen ? 0 : 5}
                          md={12}
                          xs={12}
                          sx={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Grid item md={2} xs={11}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 15,
                              }}
                            >
                             Question
                            </InputLabel>
                            <TextField
                              fullWidth
                              placeholder="Course Fee"
                              name="courseFees"
                              value=""
                              inputProps={{
                                readOnly: true,
                                style: {
                                  height: isMobileScreen ? "3px" : "8px",
                                  fontSize: isMobileScreen ? 12 : 14,
                                },
                              }}
                            />
                          </Grid>
                          <Grid item md={2} xs={11}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 15,
                              }}
                            >
                              Answer
                            </InputLabel>
                            <TextField
                              placeholder="Batch Capacity"
                              fullWidth
                              name="batchCapacity"
                              value=""
                              inputProps={{
                                readOnly: true,
                                style: {
                                  height: isMobileScreen ? "3px" : "8px",
                                  fontSize: isMobileScreen ? 12 : 14,
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Grid>

                    <Divider sx={{ my: 1, mt: 6 }} />
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
                        Upload Files
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      <Grid
                        container
                        md={12}
                        xs={12}
                        sx={{ width: "100%", justifyContent: "space-around" }}
                      >
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
                              src={userData.bannerUrl}
                              alt="bannerimage"
                              style={{
                                height: "100%",
                                width: "100%",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleOpenImageDialog(userData.bannerUrl)
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
                              src={userData.featuredUrl}
                              alt="bannerimage"
                              style={{
                                height: "100%",
                                width: "100%",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleOpenImageDialog(userData.featuredUrl)
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

                        {/* Gallery Images */}
                        <Grid item md={11} xs={11}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: isMobileScreen ? 12 : 15,
                            }}
                          >
                            Gallery Images
                          </InputLabel>
                          <Grid
                            sx={{
                              my: 3,
                              display: "flex",
                              flexDirection: isMobileScreen ? "column" : "row",
                              alignItems: "flex-start",
                            }}
                          >
                            {userData.gallery.map((image, index) => (
                              <Grid
                                key={index}
                                sx={{ p: 3, width: 150, height: 150 }}
                              >
                                <img
                                  src={image.image_url}
                                  alt={`GalleryImage`}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    cursor: "pointer",
                                    p: 10,
                                  }}
                                  onClick={() => handleOpen(index)}
                                />
                              </Grid>
                            ))}
                          </Grid>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            fullWidth
                            maxWidth="md"
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
                                  onClick={handleClose}
                                >
                                  <CloseIcon sx={{ fontSize: 40 }} />
                                </IconButton>
                              </DialogTitle>
                              <Grid
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-around",
                                }}
                              >
                                <DialogActions>
                                  <IconButton onClick={handlePrevImage}>
                                    <NavigateBefore sx={{ fontSize: 45 }} />
                                  </IconButton>
                                </DialogActions>
                                <DialogContent>
                                  <Grid
                                    sx={{ width: "550px", height: "400px" }}
                                  >
                                    <img
                                      src={
                                        userData.gallery[
                                          currentImageIndex
                                        ].image_url
                                      }
                                      alt="GalleryImage"
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                      }}
                                    />
                                  </Grid>
                                </DialogContent>
                                <DialogActions>
                                  <IconButton onClick={handleNextImage}>
                                    <NavigateNext sx={{ fontSize: 45 }} />
                                  </IconButton>
                                </DialogActions>
                              </Grid>
                            </Grid>
                          </Dialog>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ViewPage;
