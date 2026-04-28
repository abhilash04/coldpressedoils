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

const ViewCollege = () => {
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
      (prevIndex) => (prevIndex + 1) % userData.collegeGallery.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + userData.collegeGallery.length) %
        userData.collegeGallery.length
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
                      College Details
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
                      <Grid item md={5} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 15,
                          }}
                        >
                          University Name *
                        </InputLabel>
                        <TextField
                          fullWidth
                          name="university"
                          value={userData.university}
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

                      <Grid item md={5} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 15,
                          }}
                        >
                          Scholarships
                        </InputLabel>
                        <TextField
                          fullWidth
                          name="scholarship"
                          value={userData.scholarship}
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
                          Scholarships Cut Off's
                        </InputLabel>
                        <TextField
                          placeholder="(e.g., 90)"
                          fullWidth
                          name="scholarshipCutoff"
                          value={userData.scholarshipCutoff}
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
                          College Type
                        </InputLabel>
                        <TextField
                          fullWidth
                          name="collegeType"
                          value={userData.collegeType}
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
                          Institute Type
                        </InputLabel>
                        <TextField
                          fullWidth
                          name="instituteType"
                          value={userData.instituteType}
                          inputProps={{
                            readOnly: true,
                            style: {
                              height: isMobileScreen ? "3px" : "8px",
                              fontSize: isMobileScreen ? 12 : 14,
                            },
                          }}
                        />
                      </Grid>

                      <Grid item md={7} xs={11}>
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
                      </Grid>
                      <Grid item md={3} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 15,
                          }}
                        >
                          Established year
                        </InputLabel>
                        <TextField
                          placeholder="(e.g., 1987)"
                          fullWidth
                          name="establishedYear"
                          value={userData.establishedYear}
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

                      <Grid item md={11} xs={11} sx={{ my: 2 }}>
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
                      </Grid>
                      <Grid item md={11} xs={11}>
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
                      </Grid>
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
                        Course Details
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      {userData.collegeCourse.length > 0 ? (
                        userData.collegeCourse.map((course, index) => (
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
                            <Grid item md={2} xs={11}>
                              <InputLabel
                                sx={{
                                  fontWeight: "bold",
                                  my: 1,
                                  fontSize: isMobileScreen ? 12 : 15,
                                }}
                              >
                                Department
                              </InputLabel>
                              <TextField
                                fullWidth
                                name="collegeDepartment"
                                value={course.collegeDepartment}
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
                                Courses
                              </InputLabel>
                              <TextField
                                fullWidth
                                name="course"
                                value={course.course}
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
                                Course Fee
                              </InputLabel>
                              <TextField
                                fullWidth
                                placeholder="Course Fee"
                                name="courseFees"
                                value={course.courseFees}
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
                                Batch Capacity
                              </InputLabel>
                              <TextField
                                placeholder="Batch Capacity"
                                fullWidth
                                name="batchCapacity"
                                value={course.batchCapacity}
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
                                Cut Off
                              </InputLabel>
                              <TextField
                                fullWidth
                                placeholder="Cut Off"
                                name="cutoff"
                                value={course.cutoff}
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
                              Department
                            </InputLabel>
                            <TextField
                              fullWidth
                              name="collegeDepartment"
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
                          <Grid item md={3} xs={11}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 15,
                              }}
                            >
                              Courses
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
                              Course Fee
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
                              Batch Capacity
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
                          <Grid item md={2} xs={11}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 15,
                              }}
                            >
                              Cut Off
                            </InputLabel>
                            <TextField
                              fullWidth
                              placeholder="Cut Off"
                              name="cutoff"
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

                    {/* Area Details */}
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
                        Area Details
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      <Grid
                        container
                        spacing={isMobileScreen ? 0 : 3}
                        sx={{ width: "100%", justifyContent: "space-around" }}
                      >
                        <Grid item md={5} xs={11}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: isMobileScreen ? 12 : 15,
                            }}
                          >
                            Country*:
                          </InputLabel>
                          <TextField
                            fullWidth
                            value={userData.country}
                            name="country"
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
                            State*:
                          </InputLabel>
                          <TextField
                            fullWidth
                            value={userData.state}
                            name="state"
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
                            District*:
                          </InputLabel>
                          <TextField
                            fullWidth
                            value={userData.district}
                            name="district"
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
                            Pincode*:
                          </InputLabel>
                          <TextField
                            fullWidth
                            value={userData.pincode}
                            inputProps={{
                              readOnly: true,
                              style: {
                                height: isMobileScreen ? "3px" : "8px",
                                fontSize: isMobileScreen ? 12 : 14,
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={11}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: isMobileScreen ? 12 : 15,
                            }}
                          >
                            Area:
                          </InputLabel>
                          <TextField
                            placeholder="Enter the area"
                            fullWidth
                            name="area"
                            value={userData.area}
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
                    </Grid>
                    <Divider sx={{ my: 1, mt: 6 }} />
                    {/* Facilities/Amenities*/}
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
                        Facilities/Amenities
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      <Grid
                        container
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
                            Facilities/Amenities
                          </InputLabel>

                          <TextField
                            fullWidth
                            value={userData.collegeAmenities
                              .map((amenity) => amenity.amenity)
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
                        </Grid>
                      </Grid>
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
                        {/* Brochure */}
                        <Grid item md={2} xs={11}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: isMobileScreen ? 12 : 15,
                            }}
                          >
                            Brochure
                          </InputLabel>
                          <Grid sx={{ my: 3 }}>
                            {userData.collegeBroucherUrl ? (
                              <Grid>
                                <a
                                  href={userData.collegeBroucherUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textDecoration: "none",
                                  }}
                                >
                                  <PictureAsPdfIcon
                                    sx={{
                                      mr: 1,
                                      color: "red",
                                      fontSize: "30px",
                                    }}
                                  />
                                  <Typography sx={{ color: "#000" }}>
                                    {getFileName()}
                                  </Typography>
                                </a>
                              </Grid>
                            ) : (
                              <Typography>No file uploaded</Typography>
                            )}
                          </Grid>
                        </Grid>
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

                        {/* Gallery Images */}
                        <Grid item md={11} xs={11}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: isMobileScreen ? 12 : 15,
                            }}
                          >
                            Gallery Images (Select Multiple)
                          </InputLabel>
                          <Grid
                            sx={{
                              my: 3,
                              display: "flex",
                              flexDirection: isMobileScreen ? "column" : "row",
                              alignItems: "flex-start",
                            }}
                          >
                            {userData.collegeGallery.map((image, index) => (
                              <Grid
                                key={index}
                                sx={{ p: 3, width: 150, height: 150 }}
                              >
                                <img
                                  src={image.imageUrl}
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
                                        userData.collegeGallery[
                                          currentImageIndex
                                        ].imageUrl
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

export default ViewCollege;
