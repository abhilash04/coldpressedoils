import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  InputLabel,
  InputAdornment,
  TextareaAutosize,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  Autocomplete,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../../../services/apiServices";
import { config } from "../../../../../config/config";
import { useCookies } from "react-cookie";
import { DropzoneArea } from "mui-file-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import pdfImage from "../../../../../assets/images/pdf.jpeg";
import ReactQuill from "react-quill";

const UpdateCollegeDetails = () => {
  const [cookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state.userData;
  const [colleges, setColleges] = useState(userData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  // my use states
  const [submitClicked, setSubmitClicked] = useState();
  const [universities, setUniversities] = useState([]);
  const [collegeTypeData, setCollegeTypeData] = useState([]);
  const [instituteTypeData, setInstituteTypeData] = useState([]);
  const [companiesData, setCompaniesData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [amenities, setAmenity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalColleges, setOriginalColleges] = useState({ ...colleges });

  // upload files
  const [collegeLogo, setCollegeLogo] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [broucherFile, setBroucherFile] = useState(null);
  const [selectedCollegeLogo, setSelectedCollegeLogo] = useState(
    userData.collegeLogoUrl
  );
  const [selectedBannerImage, setSelectedBannerImage] = useState(
    userData.collegeBannerUrl
  );
  const [selectedFeaturedImage, setSelectedFeaturedImage] = useState(
    userData.collegeFeaturedUrl
  );
  const [selectedBroucherFile, setSelectedBroucherFile] = useState(
    userData.collegeBroucherUrl
  );

  const [collegeLogoChanged, setCollegeLogoChanged] = useState(false);
  const [bannerImageChanged, setBannerImageChanged] = useState(false);
  const [featuredImageChanged, setFeaturedImageChanged] = useState(false);
  const [broucherFileChanged, setBroucherFileChanged] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const handleSubmit = async () => {
    try {
      const collegeLogoUrl = collegeLogoChanged
        ? await handleAddCollegeLogo()
        : originalColleges.collegeLogoUrl;
      const collegeBannerUrl = bannerImageChanged
        ? await handleAddBannerImage()
        : originalColleges.collegeBannerUrl;
      const collegeFeaturedUrl = featuredImageChanged
        ? await handleAddCollegeFeatured()
        : originalColleges.collegeFeaturedUrl;
      const collegeBroucherUrl = broucherFileChanged
        ? await handleAddBroucherFile()
        : originalColleges.collegeBroucherUrl;
      const updatedCollegeData = {
        id: colleges.id,
        ...(colleges.collegeName !== originalColleges.collegeName && {
          collegeName: colleges.collegeName,
        }),
        ...(colleges.university !== originalColleges.university && {
          university: colleges.university,
        }),
        ...(colleges.ogUrl !== originalColleges.ogUrl && {
          ogUrl: colleges.ogUrl,
        }),
        ...(collegeLogoUrl !== originalColleges.collegeLogoUrl && {
          collegeLogoUrl,
        }),
        ...(collegeBannerUrl !== originalColleges.collegeBannerUrl && {
          collegeBannerUrl,
        }),
        ...(collegeFeaturedUrl !== originalColleges.collegeFeaturedUrl && {
          collegeFeaturedUrl,
        }),
        ...(collegeBroucherUrl !== originalColleges.collegeBroucherUrl && {
          collegeBroucherUrl,
        }),
        ...(colleges.scholarship !== originalColleges.scholarship && {
          scholarship: colleges.scholarship,
        }),
        ...(colleges.scholarshipCutoff !==
          originalColleges.scholarshipCutoff && {
          scholarshipCutoff: colleges.scholarshipCutoff,
        }),
        ...(colleges.collegeType !== originalColleges.collegeType && {
          collegeType: colleges.collegeType,
        }),
        ...(colleges.instituteType !== originalColleges.instituteType && {
          instituteType: colleges.instituteType,
        }),
        ...(colleges.establishedYear !== originalColleges.establishedYear && {
          establishedYear: colleges.establishedYear,
        }),
        ...(colleges.country !== originalColleges.country && {
          country: colleges.country,
        }),
        ...(colleges.state !== originalColleges.state && {
          state: colleges.state,
        }),
        ...(colleges.district !== originalColleges.district && {
          district: colleges.district,
        }),
        ...(colleges.pincode !== originalColleges.pincode && {
          pincode: colleges.pincode,
        }),
        ...(colleges.area !== originalColleges.area && { area: colleges.area }),
        ...(colleges.fullDescription !== originalColleges.fullDescription && {
          fullDescription: colleges.fullDescription,
        }),
      };

      await handleUpdateCollege(updatedCollegeData);
    } catch (error) {
      console.error("Error while adding college details:", error);
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleAddCollegeLogo = async () => {
    const formData = new FormData();
    formData.append("logo", collegeLogo);
    try {
      const response = await fetch(
        "https://image-upload.getmycollege.com/addCollegeLogo",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response?.status >= 200 && response?.status < 300) {
        const responseData = await response.json();
        return responseData.imageUrl || "";
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
      const response = await fetch(
        `https://image-upload.getmycollege.com/addCollegeBanner`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response?.status >= 200 && response?.status < 300) {
        const responseData = await response.json();
        return responseData.bannerUrl || "";
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
      const response = await fetch(
        "https://image-upload.getmycollege.com/addCollegeFeaturedImage",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response?.status >= 200 && response?.status < 300) {
        const responseData = await response.json();
        return responseData.imageUrl || "";
      } else {
        showSnackbar("Failed to add college featured image", "error");
      }
    } catch (error) {
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleAddBroucherFile = async () => {
    const formData = new FormData();
    formData.append("broucher", broucherFile);
    try {
      const response = await fetch(
        `https://image-upload.getmycollege.com/addCollegeBroucher`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response?.status >= 200 && response?.status < 300) {
        const responseData = await response.json();
        return responseData.pdfUrl || "";
      } else {
        showSnackbar("Failed to add college broucher", "error");
      }
    } catch (error) {
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleCollegeLogo = (files) => {
    if (files && files.length > 0) {
      setCollegeLogoChanged(true);
      const selectedCollegeFile = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedCollegeLogo(reader.result);
        setCollegeLogo(selectedCollegeFile);
      };
      reader.readAsDataURL(selectedCollegeFile);
    } else {
      setSelectedCollegeLogo("");
      setCollegeLogo(null);
      setCollegeLogoChanged(false);
    }
  };

  const handleBannerImage = (files) => {
    if (files && files.length > 0) {
      setBannerImageChanged(true);
      const selectedBannerFile = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedBannerImage(reader.result);
        setBannerImage(selectedBannerFile);
      };
      reader.readAsDataURL(selectedBannerFile);
    } else {
      setSelectedBannerImage("");
      setBannerImage(null);
      setBannerImageChanged(false);
    }
  };

  const handleFeaturedImage = (files) => {
    if (files && files.length > 0) {
      setFeaturedImageChanged(true);
      const selectedFeaturedFile = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFeaturedImage(reader.result);
        setFeaturedImage(selectedFeaturedFile);
      };
      reader.readAsDataURL(selectedFeaturedFile);
    } else {
      setSelectedFeaturedImage("");
      setFeaturedImage(null);
      setFeaturedImageChanged(false);
    }
  };

  const handleCollegeBroucher = (files) => {
    if (files && files.length > 0) {
      setBroucherFileChanged(true);
      const selectedBroucher = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedBroucherFile(reader.result);
        setBroucherFile(selectedBroucher);
      };
      reader.readAsDataURL(selectedBroucher);
    } else {
      setSelectedBroucherFile("");
      setBroucherFile(null);
      setBroucherFileChanged(false);
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

  const handleUniversityChange = (newValue) => {
    setColleges((prevState) => ({
      ...prevState,
      university: newValue,
    }));
  };

  const handleCollegeTypeChange = (newValue) => {
    setColleges((prevState) => ({
      ...prevState,
      collegeType: newValue,
    }));
  };

  const handleInstituteTypeChange = (newValue) => {
    setColleges((prevState) => ({
      ...prevState,
      instituteType: newValue,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setColleges((prevState) => {
      if (prevState[name] !== value) {
        return {
          ...prevState,
          [name]: value,
        };
      }
      return prevState;
    });
  };
  const handleChange = (value) => {
    setColleges((prevState) => ({
      ...prevState,
      fullDescription: value,
    }));
  };
  const handleUpdateCollege = async (updatedData) => {
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updatecollegedetails,
        updatedData,
        cookies
      );
      if (response?.status === 200) {
        showSnackbar("User updated successfully");
        navigate("/university-manager/college-list");
      } else if (response?.status === 400) {
        showSnackbar("Failed to update. Please try again later!!");
      }
    } catch (error) {
      showSnackbar("Failed to update. Please try again later!!");
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

  // fetch data
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

  return (
    <>
      <Paper elevation={0} sx={{ width: "100%" }}>
        <Box sx={{ width: "100%", height: "100%" }}>
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
            <Grid
              container
              spacing={isMobileScreen ? 0 : 2}
              md={12}
              xs={12}
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
                  College Name
                </InputLabel>

                <TextField
                  fullWidth
                  name="collegeName"
                  value={colleges.collegeName}
                  onChange={handleInputChange}
                  inputProps={{
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
                  University Name
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
              <Grid item md={11} xs={11}>
                <InputLabel
                  sx={{
                    fontWeight: "bold",
                    my: 1,
                    fontSize: isMobileScreen ? 12 : 15,
                  }}
                >
                  OG URL
                </InputLabel>
                <TextField
                  placeholder=""
                  fullWidth
                  name="ogUrl"
                  value={colleges.ogUrl}
                  onChange={handleInputChange}
                  inputProps={{
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
                <Select
                  fullWidth
                  name="scholarship"
                  value={colleges.scholarship}
                  onChange={handleInputChange}
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
                    value=""
                    disabled
                    style={{ fontSize: isMobileScreen ? 12 : 14 }}
                  >
                    Select Scholarship
                  </MenuItem>
                  <MenuItem
                    value={"Academic Scholarships"}
                    style={{ fontSize: isMobileScreen ? 12 : 14 }}
                  >
                    Academic Scholarships
                  </MenuItem>
                  <MenuItem
                    value={"Average Academic Performance Scholarships"}
                    style={{ fontSize: isMobileScreen ? 12 : 14 }}
                  >
                    Average Academic Performance Scholarships
                  </MenuItem>
                  <MenuItem
                    value={"Athletic Scholarships"}
                    style={{ fontSize: isMobileScreen ? 12 : 14 }}
                  >
                    Athletic Scholarships
                  </MenuItem>
                  <MenuItem
                    value={"Scholarships for Minorities"}
                    style={{ fontSize: isMobileScreen ? 12 : 14 }}
                  >
                    Scholarships for Minorities
                  </MenuItem>
                  <MenuItem
                    value={"Scholarships for Women"}
                    style={{ fontSize: isMobileScreen ? 12 : 14 }}
                  >
                    Scholarships for Women
                  </MenuItem>
                  <MenuItem
                    value={"Creative Scholarships"}
                    style={{ fontSize: isMobileScreen ? 12 : 14 }}
                  >
                    Creative Scholarships
                  </MenuItem>
                  <MenuItem
                    value={"Unusual Scholarships"}
                    style={{ fontSize: isMobileScreen ? 12 : 14 }}
                  >
                    Unusual Scholarships
                  </MenuItem>
                  <MenuItem
                    value={"Community Service Scholarships"}
                    style={{ fontSize: isMobileScreen ? 12 : 14 }}
                  >
                    Community Service Scholarships
                  </MenuItem>
                </Select>
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
                  value={colleges.scholarshipCutoff}
                  onChange={handleInputChange}
                  inputProps={{
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
                <Autocomplete
                  options={collegeTypeData.map((option) => option.collegeType)}
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
                    fontSize: isMobileScreen ? 12 : 15,
                  }}
                >
                  Institute Type
                </InputLabel>
                <Autocomplete
                  options={instituteTypeData.map(
                    (option) => option.instituteType
                  )}
                  getOptionLabel={(instituteType) => instituteType || ""}
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

              <Grid item md={11} xs={11}>
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
                  value={colleges.establishedYear}
                  onChange={handleInputChange}
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
                    value={colleges.fullDescription}
                    onChange={handleChange}
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
            </Grid>
            <Divider sx={{ my: 2, mt: 8 }} />
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
              <Grid
                container
                spacing={isMobileScreen ? 0 : 3}
                md={12}
                xs={12}
                sx={{ width: "100%", justifyContent: "space-around" }}
              >
                <Grid item xs={11}>
                  <InputLabel
                    sx={{
                      fontWeight: "bold",
                      my: 1,
                      fontSize: isMobileScreen ? 12 : 15,
                    }}
                  >
                    Country :
                  </InputLabel>
                  <TextField
                    placeholder="Enter the country"
                    fullWidth
                    name="country"
                    value={colleges.country}
                    onChange={handleInputChange}
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
                    State :
                  </InputLabel>
                  <TextField
                    placeholder="Enter the state"
                    fullWidth
                    name="state"
                    value={colleges.state}
                    onChange={handleInputChange}
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
                    District:
                  </InputLabel>
                  <TextField
                    placeholder="Enter the district"
                    fullWidth
                    name="district"
                    value={colleges.district}
                    onChange={handleInputChange}
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
                    Pincode :
                  </InputLabel>
                  <TextField
                    placeholder="Enter the pincode"
                    fullWidth
                    name="pincode"
                    value={colleges.pincode}
                    onChange={handleInputChange}
                    inputProps={{
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
                    value={colleges.area}
                    onChange={handleInputChange}
                    inputProps={{
                      style: {
                        height: isMobileScreen ? "3px" : "8px",
                        fontSize: isMobileScreen ? 12 : 14,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
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
                    fontSize: isMobileScreen ? 12 : 15,
                  }}
                >
                  College Logo
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
                    onChange={handleCollegeLogo}
                    maxFileSize={5000000}
                    showPreviews={true}
                    showAlerts={false}
                    showPreviewsInDropzone={false}
                    showFileNames={false}
                    Icon={(props) => (
                      <CloudUploadIcon
                        style={{ color: "#1d1a57", width: 35, height: 35 }}
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
                <Grid
                  sx={{
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    width: "100%",
                    height: "auto",
                  }}
                >
                  {selectedCollegeLogo && (
                    <img
                      src={selectedCollegeLogo}
                      alt="collegelogo"
                      style={{ maxWidth: "90px", display: "none" }}
                    />
                  )}
                  {!selectedCollegeLogo && userData.collegeLogoUrl && (
                    <img
                      src={userData.collegeLogoUrl}
                      alt="collegelogo"
                      style={{ maxWidth: "90px" }}
                    />
                  )}
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
                        style={{ color: "#1d1a57", width: 35, height: 35 }}
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
                <Grid
                  sx={{
                    my: 3,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "auto",
                    height: "auto",
                  }}
                >
                  {selectedBannerImage && (
                    <img
                      src={selectedBannerImage}
                      alt="BannerUrl"
                      style={{ maxWidth: "90px", display: "none" }}
                    />
                  )}
                  {!selectedBannerImage && userData.collegeBannerUrl && (
                    <img
                      src={userData.collegeBannerUrl}
                      alt="BannerUrl"
                      style={{ maxWidth: "90px" }}
                    />
                  )}
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
                    onChange={handleFeaturedImage}
                    maxFileSize={5000000}
                    showPreviews={true}
                    showAlerts={false}
                    showPreviewsInDropzone={false}
                    showFileNames={false}
                    Icon={(props) => (
                      <CloudUploadIcon
                        style={{ color: "#1d1a57", width: 35, height: 35 }}
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
                <Grid
                  sx={{
                    my: 3,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "auto",
                  }}
                >
                  {selectedFeaturedImage && (
                    <img
                      src={selectedFeaturedImage}
                      alt="FeaturedUrl"
                      style={{ maxWidth: "90px", display: "none" }}
                    />
                  )}
                  {!selectedFeaturedImage && userData.collegeFeaturedUrl && (
                    <img
                      src={userData.collegeFeaturedUrl}
                      alt="FeaturedUrl"
                      style={{ maxWidth: "90px" }}
                    />
                  )}
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
                    filesLimit={1}
                    acceptedFiles={["application/pdf"]}
                    onChange={handleCollegeBroucher}
                    maxFileSize={5000000}
                    showPreviews={true}
                    showAlerts={false}
                    showPreviewsInDropzone={false}
                    showFileNames={false}
                    Icon={(props) => (
                      <CloudUploadIcon
                        style={{ color: "#1d1a57", width: 35, height: 35 }}
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
                  />
                </Grid>
                <Grid
                  sx={{
                    my: 3,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "auto",
                  }}
                >
                  {selectedBroucherFile && (
                    <img
                      src={pdfImage}
                      alt="pdf-icon"
                      style={{ maxWidth: "90px", display: "none" }}
                    />
                  )}
                  {!selectedBroucherFile && userData.collegeBroucherUrl && (
                    <img
                      src={pdfImage}
                      alt="pdf-icon"
                      style={{ maxWidth: "90px" }}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
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
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </Grid>
        </Box>

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
      </Paper>
    </>
  );
};

export default UpdateCollegeDetails;
