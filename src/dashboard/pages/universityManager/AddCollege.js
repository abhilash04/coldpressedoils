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
import { config } from "../../../../../config/config";
import { apiList, invokeApi } from "../../../../../services/apiServices";
import { useCookies } from "react-cookie";
import NavigatedComponent from "../NavigatedComponent";
import { DropzoneArea } from "mui-file-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PdfImage from "../../../../../assets/images/pdf.jpeg";
import ReactQuill from "react-quill";
import IconSidenav from "../../common/IconSidenav";

const AddCollege = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [collegeTypeData, setCollegeTypeData] = useState([]);
  const [instituteTypeData, setInstituteTypeData] = useState([]);
  const [companiesData, setCompaniesData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [amenities, setAmenity] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [colleges, setColleges] = useState({
    collegeName: "",
    university: "",
    ogUrl: "",
    collegeLogoUrl: "",
    collegeBannerUrl: "",
    collegeFeaturedUrl: "",
    collegeBroucherUrl: "",
    scholarship: "",
    scholarshipCutoff: "",
    collegeType: "",
    instituteType: "",
    establishedYear: "",
    country: "",
    state: "",
    district: "",
    pincode: "",
    area: "",
    fullDescription: "",
    metaKeywords: "",
    metaDescription: "",
    schemaScript: "",
    ogTitle: "",
    ogDescription: "",
    ogSiteName: "",
    ogImageUrl: "",
    TwitterTitle: "",
    twitterDescription: "",
    collegeAmenities: [{ amenity: "" }],
    collegeGallery: [{ imageUrl: "" }],
    collegeCourse: [
      {
        collegeDepartment: "",
        course: "",
        courseFees: "",
        batchCapacity: "",
        cutoff: "",
      },
    ],
    collegePlacement: [{ placementCompany: "" }],
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
  const handleCollegeLogo = (files) => {
    if (files && files.length > 0) {
      const selectedCollegeFile = files[0];
      setCollegeLogo(selectedCollegeFile);
    } else {
      setCollegeLogo(null);
    }
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

  const handleCollegeBroucher = (files) => {
    if (files && files.length > 0) {
      const selectedBroucher = files[0];
      setBroucherFile(selectedBroucher);
    } else {
      setBroucherFile(null);
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
      let collegeLogoUrl = "";
      let collegeBannerUrl = "";
      let collegeFeaturedUrl = "";
      let collegeGallery = [];
      let collegeBroucherUrl = "";

      if (
        !collegeLogoUrl &&
        !collegeBannerUrl &&
        !collegeFeaturedUrl &&
        !collegeGallery.length &&
        !collegeBroucherUrl
      ) {
        if (!collegeLogoUrl && collegeLogo) {
          collegeLogoUrl = await handleAddCollegeLogo();
        }
        if (!collegeBannerUrl && bannerImage) {
          collegeBannerUrl = await handleAddBannerImage();
        }
        if (!collegeFeaturedUrl && featuredImage) {
          collegeFeaturedUrl = await handleAddCollegeFeatured();
        }
        if (!collegeGallery.length && galleryImages.length) {
          collegeGallery = await handleAddGalleryImages();
        }
        if (!collegeBroucherUrl && broucherFile) {
          collegeBroucherUrl = await handleAddBroucherFile();
        }
      } else {
        if (!collegeLogoUrl) {
          showSnackbar("College logo is required.", "error");
        }
        if (!collegeBannerUrl) {
          showSnackbar("College banner image is required.", "error");
        }
        if (!collegeFeaturedUrl) {
          showSnackbar("College featured image is required.", "error");
        }
        if (!collegeGallery.length) {
          showSnackbar("College gallery images are required.", "error");
        }
        if (!collegeBroucherUrl) {
          showSnackbar("College brochure file is required.", "error");
        }
      }

      if (
        collegeLogoUrl &&
        collegeBannerUrl &&
        collegeFeaturedUrl &&
        collegeGallery.length &&
        collegeBroucherUrl
      ) {
        setColleges((prevColleges) => ({
          ...prevColleges,
          collegeLogoUrl,
          collegeBannerUrl,
          collegeFeaturedUrl,
          collegeBroucherUrl,
          collegeGallery: collegeGallery.map((image) => ({
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
    setColleges((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleInputChange = (value) => {
    setColleges((prevState) => ({
      ...prevState,
      fullDescription: value,
    }));
  };
  const handleUniversityChange = (newValue) => {
    setColleges((prevColleges) => ({
      ...prevColleges,
      university: newValue,
    }));
  };
  const handleCollegeTypeChange = (newValue) => {
    setColleges((prevColleges) => ({
      ...prevColleges,
      collegeType: newValue,
    }));
  };

  const handleInstituteTypeChange = (newValue) => {
    setColleges((prevColleges) => ({
      ...prevColleges,
      instituteType: newValue,
    }));
  };

  const handleChangePlacement = (event, newValue) => {
    setColleges((prevState) => ({
      ...prevState,
      collegePlacement: newValue.map((placementCompany) => ({
        placementCompany,
      })),
    }));
  };

  const handleChangeCourse = (newValueOrEvent, index, field) => {
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

    const newCourseData = [...colleges.collegeCourse];
    newCourseData[index] = {
      ...newCourseData[index],
      [field]: value,
    };

    setColleges((prevColleges) => ({
      ...prevColleges,
      collegeCourse: newCourseData,
    }));
  };
  const handleAddCourseDetails = () => {
    setColleges({
      ...colleges,
      collegeCourse: [
        ...colleges.collegeCourse,
        {
          collegeDepartment: "",
          course: "",
          courseFees: "",
          batchCapacity: "",
          cutoff: "",
        },
      ],
    });
  };

  const handleRemoveCourseDetails = (indexToRemove) => {
    setColleges({
      ...colleges,
      collegeCourse: colleges.collegeCourse.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setColleges((prevState) => ({
      ...prevState,
      country: selectedCountry,
      state: "",
      district: "",
      pincode: "",
    }));
    setSelectedCountry(selectedCountry);
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setColleges((prevState) => ({
      ...prevState,
      state: selectedState,
      district: "",
      pincode: "",
    }));
    setSelectedState(selectedState);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setColleges((prevState) => ({
      ...prevState,
      district: selectedDistrict,
      pincode: "",
    }));
    setSelectedDistrict(selectedDistrict);
  };

  const handlePincodeChange = (event) => {
    const selectedPincode = event.target.value;
    setColleges((prevState) => ({
      ...prevState,
      pincode: selectedPincode,
    }));
    setSelectedPincode(selectedPincode);
  };
  const handleAmenitiesChange = (event, newValue) => {
    setColleges((prevFormData) => ({
      ...prevFormData,
      collegeAmenities: newValue.map((amenity) => ({ amenity })),
    }));
  };
  const handleCheckboxChange = () => {
    setShowDepartment(!showDepartment);
  };
  const fetchData = async (endpoint) => {
    const params = {};
    try {
      const response = await invokeApi(
        config.getMyCollege + endpoint,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          switch (endpoint) {
            case apiList.getuniversities:
              setUniversities(response.data.universities);
              setSubmitClicked(false);
              break;
            case apiList.getcollegetypes:
              setCollegeTypeData(response.data.collegeTypes);
              setSubmitClicked(false);
              break;
            case apiList.getinstitutetypes:
              setInstituteTypeData(response.data.instituteTypes);
              setSubmitClicked(false);
              break;
            case apiList.getPlacementCompanies:
              setCompaniesData(response.data.placementCompanys);
              setSubmitClicked(false);
              break;
            case apiList.getcourses:
              setCourseData(response.data.courses);
              break;
            case apiList.getcountrypincodemapping:
              setCountries(response.data.countries);
              setSubmitClicked(false);
              break;
            case apiList.getamenities:
              setAmenity(response.data.amenities);
              setSubmitClicked(false);
              break;
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

  const handleUniversityClick = async () => {
    if (!universities.length) {
      setSubmitClicked(true);
      setLoading(true);
      await fetchData(apiList.getuniversities);
      setLoading(false);
    }
  };

  const handleCollegeTypeClick = async () => {
    if (!collegeTypeData.length) {
      setSubmitClicked(true);
      setLoading(true);
      await fetchData(apiList.getcollegetypes);
      setLoading(false);
    }
  };
  const handleInstituteTypeClick = async () => {
    if (!instituteTypeData.length) {
      setSubmitClicked(true);
      setLoading(true);
      await fetchData(apiList.getinstitutetypes);
      setLoading(false);
    }
  };

  const handlePlacementCompaniesClick = async () => {
    if (!companiesData.length) {
      setSubmitClicked(true);
      setLoading(true);
      await fetchData(apiList.getPlacementCompanies);
      setLoading(false);
    }
  };
  const handleCourseClick = async () => {
    if (!courseData.length) {
      setSubmitClicked(true);
      setLoading(true);
      await fetchData(apiList.getcourses);
      setLoading(false);
    }
  };
  const handleCountryPincodeMappingClick = async () => {
    if (!countries.length) {
      setSubmitClicked(true);
      setLoading(true);
      await fetchData(apiList.getcountrypincodemapping);
      setLoading(false);
    }
  };
  const handleAminitiesClick = async () => {
    if (!amenities.length) {
      setSubmitClicked(true);
      setLoading(true);
      await fetchData(apiList.getamenities);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleUniversityClick();
    handleCollegeTypeClick();
    handleInstituteTypeClick();
    handlePlacementCompaniesClick();
    handleCourseClick();
    handleCountryPincodeMappingClick();
    handleAminitiesClick();
  }, [setSubmitClicked]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setSubmitting(true);
      setProgress(100);
      try {
        await handleAddCollege();
      } catch (error) {
        console.error("Error while adding college details:", error);
        showSnackbar("Something went wrong. Please try again later.", "error");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleAddCollegeLogo = async () => {
    const formData = new FormData();
    formData.append("logo", collegeLogo);
    try {
      const response = await invokeFormDataApi(apiList.addCollegeLogo, formData);

      if (response?.status >= 200 && response?.status < 300) {
        return response.data.imageUrl || "";
      } else {
        showSnackbar("Failed to add college logo", "error");
      }
    } catch (error) {
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleAddBannerImage = async () => {
    const formData = new FormData();
    formData.append("banner", bannerImage);
    try {
      const response = await invokeFormDataApi(apiList.addCollegeBanner, formData);

      if (response?.status >= 200 && response?.status < 300) {
        return response.data.bannerUrl || "";
      } else {
        showSnackbar("Failed to add college banner", "error");
      }
    } catch (error) {
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleAddCollegeFeatured = async () => {
    const formData = new FormData();
    formData.append("featured", featuredImage);
    try {
      const response = await invokeFormDataApi(apiList.addCollegeFeaturedImage, formData);

      if (response?.status >= 200 && response?.status < 300) {
        return response.data.imageUrl || "";
      } else {
        showSnackbar("Failed to add college featured image", "error");
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
      const response = await invokeFormDataApi(apiList.addCollegeGallery, formData);

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

  const handleAddBroucherFile = async () => {
    const formData = new FormData();
    formData.append("broucher", broucherFile);
    try {
      const response = await invokeFormDataApi(apiList.addCollegeBroucher, formData);

      if (response?.status >= 200 && response?.status < 300) {
        return response.data.pdfUrl || "";
      } else {
        showSnackbar("Failed to add college broucher", "error");
      }
    } catch (error) {
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleAddCollege = async () => {
    const params = {
      ...colleges,
    };
    if (showDepartment) {
      params.mainCollegeFlag = "no";
    } else {
      params.mainCollegeFlag = "no";
    }
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.addCollege,
        params,
        cookies
      );

      console.log(params);

      if (response?.data.responseCode === "200") {
        showSnackbar("College Added successfully", "success");
        navigate("/university-manager/college-list");
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

    // Validate College Name
    if (!colleges.collegeName.trim()) {
      errors.collegeName = "College Name is required";
      isValid = false;
    }

    // Validate University Name
    if (!colleges.university) {
      errors.university = "University Name is required";
      isValid = false;
    }

    // Validate OG URL
    if (!colleges.ogUrl.trim()) {
      errors.ogUrl = "OG URL is required";
      isValid = false;
    }

    // Validate College Type
    if (!colleges.collegeType) {
      errors.collegeType = "College Type is required";
      isValid = false;
    }

    // Validate Institute Type
    if (!colleges.instituteType) {
      errors.instituteType = "Institute Type is required";
      isValid = false;
    }
    if (colleges.collegePlacement.length === 0) {
      errors.collegePlacement = "College Type is required";
      isValid = false;
    }

    // Validate Scholarship CuttOff
    if (!/^\d+%?$/.test(colleges.scholarshipCutoff)) {
      errors.scholarshipCutoff =
        "Please enter a valid numeric value (e.g., 90%)";
    }
    // Validate Established Year
    if (!/^\d{1,4}$/.test(colleges.establishedYear)) {
      errors.establishedYear = "Established Year must be a 4-digit number";
    }

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
                          placeholder="
                    Enter College Name"
                          fullWidth
                          name="collegeName"
                          value={colleges.collegeName}
                          onChange={handleChange}
                          error={!!errors.collegeName}
                          helperText={errors.collegeName}
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
                          University Name *
                        </InputLabel>
                        <Autocomplete
                          options={universities.map((option) => option.name)}
                          getOptionLabel={(name) => name || ""}
                          fullWidth
                          name="university"
                          value={colleges.university}
                          onChange={(event, newValue) =>
                            handleUniversityChange(newValue)
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
                          value={colleges.ogUrl}
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

                      <Grid item md={5} xs={11} sx={{ py: 1 }}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Scholarships
                        </InputLabel>
                        <Select
                          fullWidth
                          name="scholarship"
                          value={colleges.scholarship}
                          onChange={handleChange}
                          style={{
                            height: isMobileScreen ? "35px" : "40px",
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: "200px",
                              },
                            },
                          }}
                        >
                          <MenuItem
                            style={{ fontSize: isMobileScreen ? 12 : 14 }}
                            value=""
                            disabled
                          >
                            Select Scholarship
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: isMobileScreen ? 12 : 14 }}
                            value={"Academic Scholarships"}
                          >
                            Academic Scholarships
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: isMobileScreen ? 12 : 14 }}
                            value={"Average Academic Performance Scholarships"}
                          >
                            Average Academic Performance Scholarships
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: isMobileScreen ? 12 : 14 }}
                            value={"Athletic Scholarships"}
                          >
                            Athletic Scholarships
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: isMobileScreen ? 12 : 14 }}
                            value={"Scholarships for Minorities"}
                          >
                            Scholarships for Minorities
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: isMobileScreen ? 12 : 14 }}
                            value={"Scholarships for Women"}
                          >
                            Scholarships for Women
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: isMobileScreen ? 12 : 14 }}
                            value={"Creative Scholarships"}
                          >
                            Creative Scholarships
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: isMobileScreen ? 12 : 14 }}
                            value={"Unusual Scholarships"}
                          >
                            Unusual Scholarships
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: isMobileScreen ? 12 : 14 }}
                            value={"Community Service Scholarships"}
                          >
                            Community Service Scholarships
                          </MenuItem>
                        </Select>
                      </Grid>
                      <Grid item md={5} xs={11} sx={{ py: 1 }}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Scholarships Cut Off's
                        </InputLabel>
                        <TextField
                          placeholder="(e.g., 90)"
                          fullWidth
                          name="scholarshipCutoff"
                          value={colleges.scholarshipCutoff}
                          onChange={handleChange}
                          error={!!errors.scholarshipCutoff}
                          helperText={errors.scholarshipCutoff}
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
                          College Type
                        </InputLabel>

                        <Autocomplete
                          options={collegeTypeData.map(
                            (option) => option.collegeType
                          )}
                          getOptionLabel={(collegeType) => collegeType || ""}
                          fullWidth
                          name="collegetype"
                          value={colleges.collegeType}
                          onChange={(event, newValue) =>
                            handleCollegeTypeChange(newValue)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select College Type"
                              error={!!errors.collegeType}
                              helperText={errors.collegeType}
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
                      <Grid item md={5} xs={11} sx={{ py: 1 }}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Institute Type
                        </InputLabel>
                        <Autocomplete
                          options={instituteTypeData.map(
                            (option) => option.instituteType
                          )}
                          getOptionLabel={(instituteType) =>
                            instituteType || ""
                          }
                          fullWidth
                          name="institutetype"
                          value={colleges.instituteType}
                          onChange={(event, newValue) =>
                            handleInstituteTypeChange(newValue)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Institute Type"
                              error={!!errors.instituteType}
                              helperText={errors.instituteType}
                              sx={{
                                "& .MuiInputBase-input": {
                                  height: isMobileScreen ? "3px" : "8px",
                                  fontSize: isMobileScreen ? 12 : 14,
                                },
                                "& .MuiAutocomplete-inputRoot": {
                                  height: "45px",
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

                      <Grid item md={7} xs={11} sx={{ py: 1 }}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Placements
                        </InputLabel>
                        <Autocomplete
                          multiple
                          id="multi-selector"
                          options={companiesData.map(
                            (option) => option.placementCompany
                          )}
                          value={
                            colleges.collegePlacement[0].placementCompany
                              .length > 0
                              ? colleges.collegePlacement.map(
                                  (placementCompany) =>
                                    placementCompany.placementCompany
                                )
                              : []
                          }
                          onChange={handleChangePlacement}
                          onClick={handlePlacementCompaniesClick}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              name="collegePlacement"
                              sx={{
                                ".MuiAutocomplete-inputRoot": {
                                  height: "auto",
                                  p: 1,
                                  fontSize: isMobileScreen ? 12 : 14,
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
                      <Grid item md={3} xs={11} sx={{ py: 1 }}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Established year
                        </InputLabel>
                        <TextField
                          placeholder="(e.g., 1987)"
                          fullWidth
                          name="establishedYear"
                          value={colleges.establishedYear}
                          onChange={handleChange}
                          error={!!errors.establishedYear}
                          helperText={errors.establishedYear}
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
                          College Full Description
                        </InputLabel>
                        <Grid
                          item
                          // xs={12}
                          sx={{
                            my: isMobileScreen ? 2 : 2,
                            mb: isMobileScreen ? 15 : 1,
                          }}
                        >
                          <ReactQuill
                            value={colleges.fullDescription}
                            onChange={handleInputChange}
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
                            style={{
                              height: "500px",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1 }} />
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
                    <Grid sx={{ mx: isMobileScreen ? 2 : 10 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={showDepartment}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={
                          <Typography
                            style={{
                              fontSize: isMobileScreen ? 12 : 14,
                              fontWeight: 600,
                            }}
                          >
                            Colleges as Department
                          </Typography>
                        }
                      />
                    </Grid>
                    {colleges.collegeCourse.map((course, index) => (
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
                          {showDepartment && (
                            <Grid item md={2} xs={11}>
                              <InputLabel
                                sx={{
                                  fontWeight: "bold",
                                  my: 1,
                                  fontSize: isMobileScreen ? 12 : 14,
                                }}
                              >
                                Department
                              </InputLabel>
                              <TextField
                                fullWidth
                                placeholder="Department"
                                name="collegeDepartment"
                                value={course.collegeDepartment}
                                onChange={(event) =>
                                  handleChangeCourse(
                                    event,
                                    index,
                                    "collegeDepartment"
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
                          )}
                          <Grid
                            item
                            md={showDepartment ? 3 : 4}
                            xs={showDepartment ? 11 : 11}
                          >
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 14,
                              }}
                            >
                              Courses
                            </InputLabel>
                            <Autocomplete
                              options={courseData.map(
                                (option) => option.course
                              )}
                              getOptionLabel={(course) => course || ""}
                              fullWidth
                              name="course"
                              value={course.course || ""}
                              onChange={(event, newValue) =>
                                handleChangeCourse(newValue, index, "course")
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder="Select Course"
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                  }}
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
                          <Grid item md={2} xs={11}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 14,
                              }}
                            >
                              Course Fee
                            </InputLabel>
                            <TextField
                              fullWidth
                              placeholder="Course Fee"
                              name="courseFees"
                              value={course.courseFees}
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
                          <Grid item md={2} xs={11}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: isMobileScreen ? 12 : 14,
                              }}
                            >
                              Batch Capacity
                            </InputLabel>
                            <TextField
                              placeholder="Batch Capacity"
                              fullWidth
                              name="batchCapacity"
                              value={course.batchCapacity}
                              onChange={(event) =>
                                handleChangeCourse(
                                  event,
                                  index,
                                  "batchCapacity"
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
                              Cut Off
                            </InputLabel>
                            <TextField
                              fullWidth
                              placeholder="Cut Off"
                              name="cutoff"
                              value={course.cutoff}
                              onChange={(event) =>
                                handleChangeCourse(event, index, "cutoff")
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
                  </Grid>
                  <Divider sx={{ mb: 1, mt: 3 }} />
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
                      md={12}
                      xs={12}
                      sx={{ width: "100%", justifyContent: "space-around" }}
                    >
                      <Grid item md={5} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Country*:
                        </InputLabel>
                        <Select
                          fullWidth
                          value={colleges.country}
                          onChange={handleCountryChange}
                          onClick={handleCountryPincodeMappingClick}
                          error={!!errors.country}
                          helperText={errors.country}
                          style={{
                            height: "40px",
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: "200px",
                              },
                            },
                          }}
                        >
                          <MenuItem
                            style={{ fontSize: isMobileScreen ? 12 : 14 }}
                            value=""
                            disabled
                          >
                            Select Country
                          </MenuItem>
                          {countries.map((country) => (
                            <MenuItem
                              style={{ fontSize: isMobileScreen ? 12 : 14 }}
                              key={country.countryName}
                              value={country.countryName}
                            >
                              {country.countryName}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item md={5} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          State*:
                        </InputLabel>
                        <Select
                          fullWidth
                          value={colleges.state}
                          onChange={handleStateChange}
                          error={!!errors.state}
                          helperText={errors.state}
                          style={{
                            height: "40px",
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: "200px",
                              },
                            },
                          }}
                        >
                          <MenuItem
                            style={{ fontSize: isMobileScreen ? 12 : 14 }}
                            value=""
                            disabled
                          >
                            Select State
                          </MenuItem>
                          {countries
                            .find(
                              (country) =>
                                country.countryName === selectedCountry
                            )
                            ?.states.map((state) => (
                              <MenuItem
                                key={state.stateName}
                                value={state.stateName}
                                style={{ fontSize: isMobileScreen ? 12 : 14 }}
                              >
                                {state.stateName}
                              </MenuItem>
                            ))}
                        </Select>
                      </Grid>
                      <Grid item md={3} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          District*:
                        </InputLabel>
                        <Select
                          fullWidth
                          value={colleges.district}
                          onChange={handleDistrictChange}
                          error={!!errors.district}
                          helperText={errors.district}
                          style={{
                            height: "40px",
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: "200px",
                              },
                            },
                          }}
                        >
                          <MenuItem
                            style={{ fontSize: isMobileScreen ? 12 : 14 }}
                            value=""
                            disabled
                          >
                            Select District
                          </MenuItem>
                          {countries
                            .find(
                              (country) =>
                                country.countryName === selectedCountry
                            )
                            ?.states.find(
                              (state) => state.stateName === selectedState
                            )
                            ?.districts.map((district) => (
                              <MenuItem
                                key={district.districtName}
                                value={district.districtName}
                                style={{ fontSize: isMobileScreen ? 12 : 14 }}
                              >
                                {district.districtName}
                              </MenuItem>
                            ))}
                        </Select>
                      </Grid>
                      <Grid item md={3} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Pincode*:
                        </InputLabel>
                        <Select
                          fullWidth
                          value={colleges.pincode}
                          onChange={handlePincodeChange}
                          error={!!errors.pincode}
                          helperText={errors.pincode}
                          style={{
                            height: "40px",
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: "200px",
                              },
                            },
                          }}
                        >
                          <MenuItem
                            style={{ fontSize: isMobileScreen ? 12 : 14 }}
                            value=""
                            disabled
                          >
                            Select Pincode
                          </MenuItem>
                          {countries
                            .find(
                              (country) =>
                                country.countryName === selectedCountry
                            )
                            ?.states.find(
                              (state) => state.stateName === selectedState
                            )
                            ?.districts.find(
                              (district) =>
                                district.districtName === selectedDistrict
                            )
                            ?.pincodes.map((pincode) => (
                              <MenuItem
                                key={pincode.pincode}
                                value={pincode.pincode}
                                style={{ fontSize: isMobileScreen ? 12 : 14 }}
                              >
                                {pincode.pincode}
                              </MenuItem>
                            ))}
                        </Select>
                      </Grid>
                      <Grid item md={3} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Area:
                        </InputLabel>
                        <TextField
                          placeholder="Enter the area"
                          fullWidth
                          name="area"
                          value={colleges.area}
                          onChange={handleChange}
                          error={!!errors.area}
                          helperText={errors.area}
                          inputProps={{
                            style: {
                              height: "8px",
                              fontSize: isMobileScreen ? 12 : 14,
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider sx={{ mb: 1, mt: 3 }} />
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
                          Facilities/Amenities
                        </InputLabel>
                        <Autocomplete
                          multiple
                          id="multi-selector"
                          options={amenities.map((option) => option.amenity)}
                          value={
                            colleges.collegeAmenities[0].amenity.length > 0
                              ? colleges.collegeAmenities.map(
                                  (amenity) => amenity.amenity
                                )
                              : []
                          }
                          onChange={handleAmenitiesChange}
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
                  </Grid>
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
                          College Logo
                        </InputLabel>
                        <Grid
                          sx={{
                            my: 2,
                            ".MuiBox-root ": {
                              bgcolor: "#f0f8ff",
                              minHeight: 0,
                              my: 1,
                              borderColor: "#1d1a57",
                              alignItems: "center",
                              justifyContent: "center",
                            },
                          }}
                        >
                          <DropzoneArea
                            filesLimit={1}
                            acceptedFiles={["image/jpeg", "image/png"]}
                            onChange={handleCollegeLogo}
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
                            previewText="Selected College Logo:"
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
                      <Grid item md={2} xs={11}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 14,
                          }}
                        >
                          Brochure
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
                            onChange={handleCollegeBroucher}
                            acceptedFiles={["application/pdf"]}
                            filesLimit={1}
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
                            previewText="Selected Brochure:"
                            previewChipProps={{
                              icon: (
                                <img
                                  src={PdfImage}
                                  alt="PDF Preview"
                                  style={{ width: "auto", height: "100%" }}
                                />
                              ),
                            }}
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
                            !collegeLogo ||
                            !bannerImage ||
                            !featuredImage ||
                            galleryImages.length === 0 ||
                            !broucherFile
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

export default AddCollege;
