import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextareaAutosize,
  Typography,
  TextField,
  Box,
  Divider,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Paper,
  LinearProgress,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../common/Header";
import Sidenav from "../../common/Sidenav";
import { config } from "../../../config/config";
import { apiList, invokeApi } from "../../../services/apiServices";
import { useCookies } from "react-cookie";
import NavigatedComponent from "../NavigatedComponent";
import { DropzoneArea } from "mui-file-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PdfImage from "../../../assets/images/1-01.webp";
import ReactQuill from "react-quill";
import IconSidenav from "../../common/IconSidenav";
import JoditEditor from "jodit-react";

const AddNewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [formLocation, setFormLocation] = useState([]);
  // const [amenities, setAmenity] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [pages, setPages] = useState({
    pageTitle: "",
    location: "",
    ogUrl: "",
    signatureServices: "",
    bannerUrl: "",
    featuredUrl: "",
    reviews: [
      {
        review: "",
        customerName: "",
        ratings: "",
      },
    ],
    faq: [
      {
        question: "",
        answer: "",
      },
    ],
    gallery: [{ imageUrl: "" }],
  });

  const [errors, setErrors] = useState({});
  const [submitClicked, setSubmitClicked] = useState();
  const [collegeLogo, setCollegeLogo] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [broucherFile, setBroucherFile] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [showDepartment, setShowDepartment] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const handleBannerImage = (files) => {
    if (files && files.length > 0) {
      const selectedBannerFile = files[0];
      setBannerImage(selectedBannerFile);
    } else {
      setBannerImage(null);
    }
  };
  const handleFeaturedImage = (files) => {
    if (files && files.length > 0) {
      const selectedFeaturedFile = files[0];
      setFeaturedImage(selectedFeaturedFile);
    } else {
      setFeaturedImage(null);
    }
  };

  const handleFileChange = (files) => {
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        imageUrl: file,
      }));
      setGalleryImages(newImages);
    } else {
      console.log("No files selected");
    }
  };

  const handleUploadFiles = async () => {
    try {
      let bannerUrl = "";
      let featuredUrl = "";
      let gallery = [];

      if (
        !bannerUrl &&
        !featuredUrl &&
        !gallery.length
      ) {
        if (!bannerUrl && bannerImage) {
          bannerUrl = await handleAddBannerImage();
        }
        if (!featuredUrl && featuredImage) {
          featuredUrl = await handleAddFeatured();
        }
        if (!gallery.length && galleryImages.length) {
          gallery = await handleAddGalleryImages();
        }
      } else {
        if (!bannerUrl) {
          showSnackbar("College banner image is required.", "error");
        }
        if (!featuredUrl) {
          showSnackbar("College featured image is required.", "error");
        }
        if (!gallery.length) {
          showSnackbar("College gallery images are required.", "error");
        }
      }

      if (
        bannerUrl &&
        featuredUrl &&
        gallery.length
      ) {
        setPages((prevPages) => ({
          ...prevPages,
          bannerUrl,
          featuredUrl,
          gallery: gallery.map((image) => ({
            imageUrl: image.imageUrl,
          })),
        }));
        setButtonClicked(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPages((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (value) => {
    setPages((prevState) => ({
      ...prevState,
      signatureServices: value,
    }));
  };

  const handleLocationChange = (newValue) => {
    setPages((prevPages) => ({
      ...prevPages,
      location: newValue,
    }));
  };

  const handleChangeReview = (newValueOrEvent, index, field) => {
    let value;
    if (
      newValueOrEvent &&
      typeof newValueOrEvent === "object" &&
      newValueOrEvent.target
    ) {
      value = newValueOrEvent.target.value;
    } else {
      value = newValueOrEvent || "";
    }

    const newReviewData = [...pages.reviews];
    newReviewData[index] = {
      ...newReviewData[index],
      [field]: value,
    };

    setPages((prevPages) => ({
      ...prevPages,
      reviews: newReviewData,
    }));
  };

  const handleChangeFaq = (newValueOrEvent, index, field) => {
    let value;
    if (
      newValueOrEvent &&
      typeof newValueOrEvent === "object" &&
      newValueOrEvent.target
    ) {
      value = newValueOrEvent.target.value;
    } else {
      value = newValueOrEvent || "";
    }

    const newFaqData = [...pages.faq];
    newFaqData[index] = {
      ...newFaqData[index],
      [field]: value,
    };

    setPages((prevPages) => ({
      ...prevPages,
      faq: newFaqData,
    }));
  };

  const handleAddReviewDetails = () => {
    setPages({
      ...pages,
      reviews: [
        ...pages.reviews,
        {
          review: "",
          customerName: "",
          ratings: "",
        },
      ],
    });
  };

  const handleRemoveReviewDetails = (indexToRemove) => {
    setPages({
      ...pages,
      reviews: pages.reviews.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };


  const handleAddFaqDetails = () => {
    setPages({
      ...pages,
      faq: [
        ...pages.faq,
        {
          question: "",
          answer: "",
        },
      ],
    });
  };

  const handleRemoveFaqDetails = (indexToRemove) => {
    setPages({
      ...pages,
      faq: pages.faq.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  // const handleAmenitiesChange = (event, newValue) => {
  //   setColleges((prevFormData) => ({
  //     ...prevFormData,
  //     collegeAmenities: newValue.map((amenity) => ({ amenity })),
  //   }));
  // };

  const fetchData = async (endpoint) => {
    const params = {
      status: 'Active',
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + endpoint,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          switch (endpoint) {
            case apiList.getLocations:
              setFormLocation(response.data.locations);
              setSubmitClicked(false);
              break;
            // case apiList.getamenities:
            //   setAmenity(response.data.amenities);
            //   setSubmitClicked(false);
            //   break;
            default:
              console.error("Unknown endpoint:", endpoint);
              break;
          }
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

  const handleFormLocationClick = async () => {
    if (!formLocation.length) {
      setSubmitClicked(true);
      setLoading(true);
      await fetchData(apiList.getLocations);
      setLoading(false);
    }
  };

  // const handleAminitiesClick = async () => {
  //   if (!amenities.length) {
  //     setSubmitClicked(true);
  //     setLoading(true);
  //     await fetchData(apiList.getamenities);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    handleFormLocationClick();
    // handleAminitiesClick();
  }, [setSubmitClicked]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setSubmitting(true);
      setProgress(100);
      try {
        await handleAddPage();
      } catch (error) {
        console.error("Error while adding college details:", error);
        showSnackbar("Something went wrong. Please try again later.", "error");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleAddBannerImage = async () => {
    const formData = new FormData();
    formData.append("banner", bannerImage);
    try {
      const response = await invokeFormDataApi(apiList.addBannerImage, formData, cookies);

      if (response?.status >= 200 && response?.status < 300) {
        return response.data.bannerUrl || "";
      } else {
        showSnackbar("Failed to add banner image", "error");
      }
    } catch (error) {
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleAddFeatured = async () => {
    const formData = new FormData();
    formData.append("featured", featuredImage);
    try {
      const response = await invokeFormDataApi(apiList.addFeaturedImage, formData, cookies);

      if (response?.status >= 200 && response?.status < 300) {
        return response.data.imageUrl || "";
      } else {
        showSnackbar("Failed to add featured image", "error");
      }
    } catch (error) {
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleAddGalleryImages = async () => {
    const formData = new FormData();
    galleryImages.forEach((image, index) => {
      formData.append(`gallery[${index}]`, image.imageUrl);
    });

    try {
      const response = await invokeFormDataApi(apiList.addGallery, formData, cookies);

      if (response?.status >= 200 && response?.status < 300) {
        const galleryUrls = response.data.galleryUrls || [];
        return galleryUrls.map((url) => ({ imageUrl: url }));
      } else {
        showSnackbar("Failed to add Gallery Image", "error");
      }
    } catch (error) {
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleAddPage = async () => {
    const params = {
      ...pages,
    };

    console.log(params);
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.addNewPage,
        params,
        cookies
      );
      if (response?.data.responseCode === "200") {
        showSnackbar("Page Added successfully", "success");
        // navigate("/university-manager/college-list");
      } else if (response?.data.responseCode === "400") {
        if (
          response.data.responseMessage === "Malformed JSON request" ||
          response.data.responseMessage ===
          "collegePlacement - is an empty or not in valid format"
        ) {
          showSnackbar(response.data.responseMessage, "error");
        } else {
          showSnackbar("An error occurred. Please try again later.", "error");
        }
      } else if (
        response?.data.responseCode === "GM003" &&
        (response.data.responseMessage === "collegeName already exists" ||
          response.data.responseMessage === "ogUrl already exists")
      ) {
        showSnackbar(
          "College name or URL already exists. Please choose a different name or URL.",
          "error"
        );
      } else {
        showSnackbar(
          `An error occurred with status code ${response.status}. Please try again later.`,
          "error"
        );
      }
    } catch (error) {
      console.error("Error during adding college:", error);
      showSnackbar("Something went wrong. Please try again later!!", "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate location name
    // if (!pages.formLocation) {
    //   errors.formLocation = "Location is required";
    //   isValid = false;
    // }

    // // Validate OG URL
    // if (!colleges.ogUrl.trim()) {
    //   errors.ogUrl = "OG URL is required";
    //   isValid = false;
    // }

    setErrors(errors);
    return isValid;
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
        <Grid
          component="main"
          sx={{ width: "100%", px: isMobileScreen ? 0 : 1 }}
        >
          <Header toggleSideNav={toggleSideNav} />
          <Grid sx={{ py: 1 }}>
            <NavigatedComponent pathname={location.pathname} />

            <Grid sx={{ width: "100%", px: isMobileScreen ? 2 : 5 }}>
              <form onSubmit={handleSubmit}>
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
                          placeholder="Enter Page Name / Identifier"
                          fullWidth
                          name="pageTitle"
                          value={pages.pageTitle}
                          onChange={handleChange}
                          error={!!errors.pageTitle}
                          helperText={errors.pageTitle}
                          inputProps={{
                            style: {
                              height: isMobileScreen ? "3px" : "8px",
                              fontSize: isMobileScreen ? 12 : 14,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={5} xs={11} sx={{ py: 1 }}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Location *
                        </InputLabel>
                        <Autocomplete
                          options={formLocation.map((option) => option.location)}
                          getOptionLabel={(location) => location || ""}
                          fullWidth
                          name="location"
                          value={pages.location}
                          onChange={(event, newValue) =>
                            handleLocationChange(newValue)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select University"
                              error={!!errors.university}
                              helperText={errors.university}
                              sx={{
                                "& .MuiInputBase-input": {
                                  height: isMobileScreen ? "3px" : "8px",
                                  fontSize: isMobileScreen ? 12 : 14,
                                },
                                "& .MuiAutocomplete-inputRoot": {
                                  height: isMobileScreen ? "35px" : "40px",
                                },
                              }}
                            />
                          )}
                          ListboxComponent={(props) => (
                            <Paper
                              {...props}
                              style={{
                                maxHeight: "200px",
                                fontSize: isMobileScreen ? 12 : 14,
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{ py: 1 }}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          OG URL *
                        </InputLabel>
                        <TextField
                          placeholder=""
                          fullWidth
                          name="ogUrl"
                          value={pages.ogUrl}
                          onChange={handleChange}
                          error={!!errors.ogUrl}
                          helperText={errors.ogUrl}
                          inputProps={{
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
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Signature Services
                        </InputLabel>
                        <Grid
                          item
                          // xs={12}
                          sx={{
                            my: isMobileScreen ? 2 : 2,
                            mb: isMobileScreen ? 15 : 1,
                          }}
                        >
                          <JoditEditor
                            value={pages.signatureServices}
                            onChange={handleInputChange}
                            style={{
                              height: "500px",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 1 }} />
                  {/* review Details */}
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
                    {pages.reviews.map((review, index) => (
                      <Grid
                        sx={{
                          width: "100%",
                          alignItems: "flex-start",
                          py: "7px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Grid
                          key={index}
                          container
                          spacing={isMobileScreen ? 0 : showDepartment ? 2 : 5}
                          md={12}
                          xs={12}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Grid item md={4} xs={12}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 14,
                              }}
                            >
                              Review
                            </InputLabel>
                            <TextField
                              fullWidth
                              placeholder="Review"
                              name="review"
                              value={review.review}
                              onChange={(event) =>
                                handleChangeReview(event, index, "review")
                              }
                              inputProps={{
                                style: {
                                  height: isMobileScreen ? "3px" : "8px",
                                  fontSize: isMobileScreen ? 12 : 14,
                                },
                              }}
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 14,
                              }}
                            >
                              Customer Name
                            </InputLabel>
                            <TextField
                              placeholder="Customer Name"
                              fullWidth
                              name="customerName"
                              value={review.customerName}
                              onChange={(event) =>
                                handleChangeReview(
                                  event,
                                  index,
                                  "customerName"
                                )
                              }
                              inputProps={{
                                style: {
                                  height: isMobileScreen ? "3px" : "8px",
                                  fontSize: isMobileScreen ? 12 : 14,
                                },
                              }}
                            />
                          </Grid>
                          <Grid item md={showDepartment ? 1.5 : 2} xs={11}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 14,
                              }}
                            >
                              Ratings
                            </InputLabel>
                            <TextField
                              fullWidth
                              placeholder="Ratings"
                              name="ratings"
                              value={review.ratings}
                              onChange={(event) =>
                                handleChangeReview(event, index, "ratings")
                              }
                              inputProps={{
                                style: {
                                  height: isMobileScreen ? "3px" : "8px",
                                  fontSize: isMobileScreen ? 12 : 14,
                                },
                              }}
                            />
                          </Grid>
                          <Grid
                            item
                            md={showDepartment ? 0.5 : 1}
                            xs={11}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {index === 0 ? (
                              <Button
                                onClick={handleAddReviewDetails}
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
                                onClick={() => handleRemoveReviewDetails(index)}
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
                  </Grid>
                  <Divider sx={{ my: 1 }} />
                  {/* faq Details */}
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
                    {pages.faq.map((faq, index) => (
                      <Grid
                        sx={{
                          width: "100%",
                          alignItems: "flex-start",
                          py: "7px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Grid
                          key={index}
                          container
                          spacing={isMobileScreen ? 0 : 5}
                          md={12}
                          xs={12}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Grid item md={5} xs={12}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 14,
                              }}
                            >
                              Question *
                            </InputLabel>
                            <TextField
                              fullWidth
                              placeholder="Question"
                              name="question"
                              value={faq.question}
                              onChange={(event) =>
                                handleChangeFaq(event, index, "question")
                              }
                              inputProps={{
                                style: {
                                  height: isMobileScreen ? "3px" : "8px",
                                  fontSize: isMobileScreen ? 12 : 14,
                                },
                              }}
                            />
                          </Grid>
                          <Grid item md={5} xs={12}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 14,
                              }}
                            >
                              Answer *
                            </InputLabel>
                            <TextField
                              placeholder="Answer"
                              fullWidth
                              name="answer"
                              value={faq.answer}
                              onChange={(event) =>
                                handleChangeFaq(
                                  event,
                                  index,
                                  "answer"
                                )
                              }
                              inputProps={{
                                style: {
                                  height: isMobileScreen ? "3px" : "8px",
                                  fontSize: isMobileScreen ? 12 : 14,
                                },
                              }}
                            />
                          </Grid>
                          <Grid
                            item
                            md={1}
                            xs={11}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {index === 0 ? (
                              <Button
                                onClick={handleAddFaqDetails}
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
                                onClick={() => handleRemoveFaqDetails(index)}
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
                  </Grid>

                  {/* <Divider sx={{ mb: 1, mt: 3 }} /> */}
                  {/* Articles*/}
                  {/* <Grid sx={{ py: isMobileScreen ? 2 : 2 }}>
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
                      Related Articles
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid
                      container
                      spacing={2}
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
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Related Articles
                        </InputLabel>
                        <Autocomplete
                          multiple
                          id="multi-selector"
                          // options={amenities.map((option) => option.amenity)}
                          // value={
                          //   colleges.collegeAmenities[0].amenity.length > 0
                          //     ? colleges.collegeAmenities.map(
                          //       (amenity) => amenity.amenity
                          //     )
                          //     : []
                          // }
                          // onChange={handleAmenitiesChange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              sx={{
                                ".MuiAutocomplete-inputRoot": {
                                  height: "auto",
                                  p: 1,
                                },
                              }}
                            />
                          )}
                          ListboxComponent={(props) => (
                            <Paper
                              {...props}
                              style={{
                                maxHeight: "200px",
                                fontSize: isMobileScreen ? 12 : 14,
                              }}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid> */}
                  <Divider sx={{ mb: 1, mt: 3 }} />
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
                      <Grid item md={2} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Banner Image
                        </InputLabel>
                        <Grid
                          sx={{
                            my: 2,
                            ".MuiBox-root ": {
                              bgcolor: "#f0f8ff",
                              borderColor: "#1d1a57",
                              minHeight: 0,
                              my: 1,
                              alignItems: "center",
                              justifyContent: "center",
                            },
                          }}
                        >
                          <DropzoneArea
                            filesLimit={1}
                            acceptedFiles={["image/jpeg", "image/png"]}
                            onChange={handleBannerImage}
                            maxFileSize={5000000}
                            showPreviews={true}
                            showAlerts={false}
                            showPreviewsInDropzone={false}
                            showFileNames={false}
                            Icon={(props) => (
                              <CloudUploadIcon
                                style={{
                                  color: "#1d1a57",
                                  width: 35,
                                  height: 35,
                                }}
                                {...props}
                              />
                            )}
                            dropzoneText={
                              <Typography
                                sx={{
                                  color: "#1d1a57",
                                  fontWeight: 600,
                                  fontSize: 16,
                                }}
                              >
                                Upload / Drag files
                              </Typography>
                            }
                            previewText="Selected Banner Image:"
                          />
                        </Grid>
                      </Grid>
                      <Grid item md={2} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Featured Image
                        </InputLabel>
                        <Grid
                          sx={{
                            my: 2,
                            ".MuiBox-root ": {
                              bgcolor: "#f0f8ff",
                              borderColor: "#1d1a57",
                              minHeight: 0,
                              my: 1,
                              alignItems: "center",
                              justifyContent: "center",
                            },
                          }}
                        >
                          <DropzoneArea
                            filesLimit={1}
                            onChange={handleFeaturedImage}
                            acceptedFiles={["image/jpeg", "image/png"]}
                            maxFileSize={5000000}
                            showPreviews={true}
                            showAlerts={false}
                            showPreviewsInDropzone={false}
                            showFileNames={false}
                            Icon={(props) => (
                              <CloudUploadIcon
                                style={{
                                  color: "#1d1a57",
                                  width: 35,
                                  height: 35,
                                }}
                                {...props}
                              />
                            )}
                            dropzoneText={
                              <Typography
                                sx={{
                                  color: "#1d1a57",
                                  fontWeight: 600,
                                  fontSize: 16,
                                }}
                              >
                                Upload / Drag files
                              </Typography>
                            }
                            previewText="Selected Featured Image:"
                          />
                        </Grid>
                      </Grid>
                      <Grid item md={11} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Gallery Images (Select Multiple)
                        </InputLabel>
                        <Grid
                          sx={{
                            my: 2,
                            ".MuiBox-root ": {
                              bgcolor: "#f0f8ff",
                              borderColor: "#1d1a57",
                              minHeight: 0,
                              my: 1,
                              alignItems: "center",
                              justifyContent: "center",
                            },
                          }}
                        >
                          <DropzoneArea
                            acceptedFiles={[
                              "image/jpeg",
                              "image/jpg",
                              "image/png",
                            ]}
                            onChange={handleFileChange}
                            maxFileSize={5000000}
                            filesLimit={8}
                            showPreviews={true}
                            showAlerts={false}
                            showPreviewsInDropzone={false}
                            showFileNames={false}
                            Icon={(props) => (
                              <CloudUploadIcon
                                style={{
                                  color: "#1d1a57",
                                  width: 35,
                                  height: 35,
                                }}
                                {...props}
                              />
                            )}
                            dropzoneText={
                              <Typography
                                sx={{
                                  color: "#1d1a57",
                                  fontWeight: 600,
                                  fontSize: 16,
                                }}
                              >
                                Upload / Drag files
                              </Typography>
                            }
                            previewText="Selected Gallery Images:"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    {!buttonClicked && (
                      <Grid
                        sx={{
                          mx: 10,
                          mt: 3,
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          variant="contained"
                          type="submit"
                          component="span"
                          disabled={
                            buttonClicked ||
                            !bannerImage ||
                            !featuredImage ||
                            galleryImages.length === 0
                          }
                          sx={{
                            background: "#1d1a57",
                            color: "#FFF",
                            fontSize: 12,
                            fontWeight: 600,
                            "&:hover": {
                              background: "#1d1a57",
                              color: "#FFF",
                            },
                            position: "relative",
                          }}
                          onClick={handleUploadFiles}
                        >
                          {buttonClicked ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            "Upload Files"
                          )}
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Grid
                    container
                    md={12}
                    xs={12}
                    sx={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Grid
                      item
                      md={12}
                      xs={11}
                      sx={{
                        px: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      {buttonClicked ? (
                        <Grid
                          sx={{
                            mb: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          {/* Submit button */}
                          <Button
                            variant="contained"
                            type="submit"
                            component="span"
                            disabled={submitting}
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
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button>
                        </Grid>
                      ) : (
                        <Grid
                          sx={{
                            mb: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          {/* Submit button */}
                          <Button
                            variant="contained"
                            type="submit"
                            component="span"
                            disabled
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
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Grid>
            {/* Snackbar */}
            <Snackbar
              open={openSnackbar}
              autoHideDuration={2000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AddNewPage;
