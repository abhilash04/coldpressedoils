import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
  Snackbar,
  Paper,
  useMediaQuery,
  Divider,
} from "@mui/material";
import Header from "../../common/Header";
import Sidenav from "../../common/Sidenav";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";
import IconSidenav from "../../common/IconSidenav";

const EditData = () => {
  const { id, site } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogType, setOgType] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogUrl, setOgUrl] = useState("");
  const [ogSiteName, setOgSiteName] = useState("");
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [twitterSite, setTwitterSite] = useState("");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [articlePublisher, setArticlePublisher] = useState("");
  const [author, setAuthor] = useState("");
  const [indexingStatus, setIndexingStatus] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [ratings, setRatings] = useState("");
  const [ratingsCount, setRatingsCount] = useState("");
  // new fields
  const [orgName, setOrgName] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgStreet, setOrgStreet] = useState("");
  const [orgLocality, setOrgLocality] = useState("");
  const [orgRegion, setOrgRegion] = useState("");
  const [orgPincode, setOrgPincode] = useState("");
  const [orgTelephone, setOrgTelephone] = useState("");
  const [orgImageUrl, setOrgImageUrl] = useState("");
  const [breadcrumbListing, setBreadcrumbListing] = useState("");
  const [videoName, setVideoName] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [videoContent, setVideoContent] = useState("");
  const [videoEmbed, setVideoEmbed] = useState("");
  const [articleHeadline, setArticleHeadline] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleKeywords, setArticleKeywords] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [articleName, setArticleName] = useState("");
  const [articleUrl, setArticleUrl] = useState("");


  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  useEffect(() => {
    const fetchData = async () => {
      const params = { id };

      try {
        const response = await invokeApi(
          config.getMyCollege + apiList.getsite,
          params,
          cookies
        );
        if (response?.status >= 200 && response?.status < 300) {
          if (response.data.responseCode === "200") {
            const { site } = response.data;
            setMetaTitle(site.metaTitle);
            setMetaDescription(site.metaDescription);
            setMetaKeywords(site.metaKeywords);
            setOgTitle(site.ogTitle);
            setOgType(site.ogType);
            setOgDescription(site.ogDescription);
            setOgUrl(site.ogUrl);
            setOgSiteName(site.ogSiteName);
            setOgImageUrl(site.ogImageUrl);
            setTwitterSite(site.twitterSite);
            setTwitterTitle(site.twitterTitle);
            setTwitterDescription(site.twitterDescription);
            setCanonicalUrl(site.canonicalUrl);
            setArticlePublisher(site.articlePublisher);
            setAuthor(site.author);
            setIndexingStatus(site.indexingStatus);
            setRatings(site.ratings);
            setRatingsCount(site.ratingsCount);
            setBreadcrumbListing(site.breadcrumbListing);
            setVideoName(site.videoName);
            setVideoDescription(site.videoDescription);
            setVideoContent(site.videoContent);
            setVideoThumbnail(site.videoThumbnail);
            setVideoEmbed(site.videoEmbed);
            setArticleHeadline(site.articleHeadline);
            setArticleDescription(site.articleDescription);
            setArticleKeywords(site.articleKeywords);
            setArticleBody(site.articleBody);
            setArticleName(site.articleName);
            setArticleUrl(site.articleUrl);
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

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleSaveChanges = async () => {
    const params = {
      id,
      metaTitle,
      metaDescription,
      metaKeywords,
      ogTitle,
      ogType,
      ogDescription,
      ogUrl,
      ogSiteName,
      ogImageUrl,
      twitterSite,
      twitterTitle,
      twitterDescription,
      canonicalUrl,
      articlePublisher,
      author,
      indexingStatus,
      ratings,
      ratingsCount,
      breadcrumbListing,
      videoName,
      videoDescription,
      videoContent,
      videoThumbnail,
      videoEmbed,
      articleHeadline,
      articleDescription,
      articleKeywords,
      articleBody,
      articleName,
      articleUrl,
    };

    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updateMetaData,
        params,
        cookies
      );
      if (response?.status === 200) {
        showSnackbar("Site updated successfully", "success");
        navigate("/seo-manager/static-pages"); // Navigate to the desired page
      } else if (response?.status === 400) {
        showSnackbar("Failed to update. Please try again later!!", "error");
      }
    } catch (error) {
      showSnackbar("Failed to update. Please try again later!!", "error");
    }
  };

  //faq data
  useEffect(() => {
    const getFaqData = async () => {
      const params = {
        siteId: id
      };

      try {
        const response = await invokeApi(
          config.getMyCollege + apiList.getSeoFaqsBySiteId,
          params,
          cookies
        );

        console.log(response);

        if (response?.status >= 200 && response?.status < 300) {
          if (response.data.responseCode === "200") {
            setFaqsList(response.data.seoFaqs);
          }
        } else if (response.data.responseCode === "400") {
          alert("Failed to fetch FAQ data.");
        }
      } catch (error) {
        console.error("Error during fetching FAQs:", error);
      }
    };

    getFaqData();
  }, []);

  const [faqsList, setFaqsList] = useState([
    { question: "", answer: "" }
  ]);

  const handleAddFaq = () => {
    setFaqsList([...faqsList, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (indexToRemove) => {
    setFaqsList(faqsList.filter((_, index) => index !== indexToRemove));
  };

  const handleChangeFaq = (index, event) => {
    const updatedFaqs = faqsList.map((faq, i) =>
      i === index ? { ...faq, [event.target.name]: event.target.value } : faq
    );
    setFaqsList(updatedFaqs);
  };

  const handleSaveFaqs = async () => {
    const params = {
      siteId: id,
      faqsList,
    };

    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updateSeoFaqs,
        params,
        cookies
      );

      console.log(response);

      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          handleSaveChanges();
        }
      } else if (response.data.responseCode === "400") {
        handleSaveChanges();
      }
    } catch (error) {
      console.error("Error during saving FAQs:", error);
    }
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

          <Grid sx={{ width: "100%", px: isMobileScreen ? 2 : 5 }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: isMobileScreen ? 1 : 2,

                py: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/seo-manager/add-sites");
                }}
                sx={{
                  height: isMobileScreen ? "15px" : "25px",
                  whiteSpace: "nowrap",
                  fontSize: isMobileScreen ? 8 : 12,
                  background: "#1a1d57",
                  "&:hover": {
                    background: "#1a1d57",
                  },
                }}
              >
                Back
              </Button>
            </Box>
            <Grid sx={{ mt: isMobileScreen ? 2 : 5 }}>
              <Paper
                sx={{
                  my: isMobileScreen ? 2 : 5,
                  p: 3,
                }}
              >
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
                  Static Page Form
                </Typography>
                <Grid
                  container
                  spacing={isMobileScreen ? 0 : 2}
                  md={12}
                  xs={12}
                  sx={{
                    width: "100%",
                    justifyContent: "space-around",
                    mt: { md: "10px", SM: "10px", xs: "10px" },
                  }}
                >
                  <Grid item md={12} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Meta Title*
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                      value={metaTitle}
                      onChange={(event) => {
                        setMetaTitle(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Meta Description*
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                      value={metaDescription}
                      onChange={(event) => {
                        setMetaDescription(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Meta Keywords*
                    </InputLabel>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={5}
                      placeholder="Enter meta keywords"
                      value={metaKeywords}
                      onChange={(event) => {
                        setMetaKeywords(event.target.value);
                      }}
                      style={{
                        width: "100%",
                        fontSize: isMobileScreen ? 12 : 14,

                        borderRadius: "4px",
                        borderColor: "rgba(0, 0, 0, 0.23)",
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      OG Title*
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                      value={ogTitle}
                      onChange={(event) => {
                        setOgTitle(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      OG Type*
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                      value={ogType}
                      onChange={(event) => {
                        setOgType(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      OG Description*
                    </InputLabel>
                    <TextareaAutosize
                      fullWidth
                      placeholder="Enter  og description"
                      minRows={5}
                      style={{
                        width: "100%",
                        fontSize: isMobileScreen ? 12 : 14,

                        borderRadius: "4px",
                        borderColor: "rgba(0, 0, 0, 0.23)",
                      }}
                      value={ogDescription}
                      onChange={(event) => {
                        setOgDescription(event.target.value);
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
                      OG URL*
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                      value={ogUrl}
                      onChange={(event) => {
                        setOgUrl(event.target.value);
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
                      OG Sitename*
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                      value={ogSiteName}
                      onChange={(event) => {
                        setOgSiteName(event.target.value);
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
                      OG Image URL*
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                      value={ogImageUrl}
                      onChange={(event) => {
                        setOgImageUrl(event.target.value);
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
                      Twitter Site*
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                      value={twitterSite}
                      onChange={(event) => {
                        setTwitterSite(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Twitter Title*
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                      value={twitterTitle}
                      onChange={(event) => {
                        setTwitterTitle(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Twitter Description*
                    </InputLabel>
                    <TextareaAutosize
                      placeholder="Enter  twitter description"
                      minRows={5}
                      fullWidth
                      style={{
                        width: "100%",
                        fontSize: isMobileScreen ? 12 : 14,

                        borderRadius: "4px",
                        borderColor: "rgba(0, 0, 0, 0.23)",
                      }}
                      value={twitterDescription}
                      onChange={(event) => {
                        setTwitterDescription(event.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item md={6} sm={6} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Canonical URL*
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                      value={canonicalUrl}
                      onChange={(event) => {
                        setCanonicalUrl(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Article Publisher*
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                      value={articlePublisher}
                      onChange={(event) => {
                        setArticlePublisher(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Author*
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                      value={author}
                      onChange={(event) => {
                        setAuthor(event.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item md={6} sm={6} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Indexing Status*
                    </InputLabel>
                    <Autocomplete
                      fullWidth
                      value={indexingStatus}
                      onChange={(event, newValue) => {
                        setIndexingStatus(newValue ? newValue : "");
                      }}
                      options={["Yes", "No"]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
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
                  <Grid item md={6} sm={6} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Ratings*
                    </InputLabel>
                    <Select
                      fullWidth
                      value={ratings}
                      onChange={(e) => {
                        setRatings(e.target.value);
                      }}
                      style={{
                        height: "42px",
                        fontSize: 14,
                      }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "200px",
                          },
                        },
                      }}
                    >
                      <MenuItem value="4" style={{ fontSize: 14 }}>
                        4
                      </MenuItem>
                      <MenuItem value="4.1" style={{ fontSize: 14 }}>
                        4.1
                      </MenuItem>
                      <MenuItem value="4.2" style={{ fontSize: 14 }}>
                        4.2
                      </MenuItem>
                      <MenuItem value="4.3" style={{ fontSize: 14 }}>
                        4.3
                      </MenuItem>
                      <MenuItem value="4.4" style={{ fontSize: 14 }}>
                        4.4
                      </MenuItem>
                      <MenuItem value="4.5" style={{ fontSize: 14 }}>
                        4.5
                      </MenuItem>
                      <MenuItem value="4.6" style={{ fontSize: 14 }}>
                        4.6
                      </MenuItem>
                      <MenuItem value="4.7" style={{ fontSize: 14 }}>
                        4.7
                      </MenuItem>
                      <MenuItem value="4.8" style={{ fontSize: 14 }}>
                        4.8
                      </MenuItem>
                      <MenuItem value="4.9" style={{ fontSize: 14 }}>
                        4.9
                      </MenuItem>
                      <MenuItem value="5" style={{ fontSize: 14 }}>
                        5
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item md={6} sm={6} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Ratings Count*
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                      value={ratingsCount}
                      onChange={(event) => {
                        setRatingsCount(event.target.value);
                      }}
                    />
                  </Grid>

                  {site !== 'static' && (
                    <Grid container spacing={2} md={12} sm={6} xs={12}>
                      <Grid item md={12} sm={6} xs={12}>
                        <Typography
                          sx={{
                            mt: 2,
                            mx: isMobileScreen ? 2 : 8,
                            textAlign: "left",
                            fontSize: isMobileScreen ? 14 : 18,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            marginLeft: "-3px"
                          }}
                        >
                          Breadcrumb
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                      </Grid>
                      <Grid item md={12} sm={12} xs={12}>
                        <InputLabel sx={{ fontWeight: "bold" }}>
                          Listing URL*
                        </InputLabel>
                        <TextField
                          sx={{ width: "100%" }}
                          value={breadcrumbListing}
                          onChange={(event) => {
                            setBreadcrumbListing(event.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}

                  <Grid item md={12} sm={6} xs={12}>
                    <Typography
                      sx={{
                        mt: 2,
                        mx: isMobileScreen ? 2 : 8,
                        textAlign: "left",
                        fontSize: isMobileScreen ? 14 : 18,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        marginLeft: "-3px"
                      }}
                    >
                      FAQ
                    </Typography>
                    <Divider sx={{ mb: 1 }} />
                  </Grid>
                  <Grid container spacing={2}>
                    {faqsList.map((faq, index) => (
                      <Grid item xs={12} key={index}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={5} md={5}>
                            <TextField
                              fullWidth
                              label="Question"
                              name="question"
                              value={faq.question}
                              onChange={(event) => handleChangeFaq(index, event)}
                              margin="normal"
                            />
                          </Grid>
                          <Grid item xs={5} md={5}>
                            <TextField
                              fullWidth
                              label="Answer"
                              name="answer"
                              value={faq.answer}
                              onChange={(event) => handleChangeFaq(index, event)}
                              margin="normal"
                            />
                          </Grid>
                          <Grid item xs={2} md={2} display="flex" justifyContent="center">
                            {index === 0 ? (
                              <Button
                                onClick={handleAddFaq}
                                sx={{
                                  background: "#006DB4",
                                  color: "#FFF",
                                  fontSize: 16,
                                  fontWeight: 600,
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
                                onClick={() => handleRemoveFaq(index)}
                                sx={{
                                  background: "#FF0000",
                                  color: "#FFF",
                                  fontSize: 16,
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

                  {site === 'college' && (
                    <Grid container spacing={2}>
                      <Grid item md={12} sm={6} xs={12}>
                        <Typography
                          sx={{
                            mt: 2,
                            mx: isMobileScreen ? 2 : 8,
                            textAlign: "left",
                            fontSize: isMobileScreen ? 14 : 18,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            marginLeft: "-3px"
                          }}
                        >
                          Video
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <InputLabel sx={{ fontWeight: "bold" }}>
                          Name*
                        </InputLabel>
                        <TextField
                          sx={{ width: "100%" }}
                          value={videoName}
                          onChange={(event) => {
                            setVideoName(event.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <InputLabel sx={{ fontWeight: "bold" }}>
                          Description*
                        </InputLabel>
                        <TextField
                          sx={{ width: "100%" }}
                          value={videoDescription}
                          onChange={(event) => {
                            setVideoDescription(event.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <InputLabel sx={{ fontWeight: "bold" }}>
                          Thumbnail URL*
                        </InputLabel>
                        <TextField
                          sx={{ width: "100%" }}
                          value={videoThumbnail}
                          onChange={(event) => {
                            setVideoThumbnail(event.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <InputLabel sx={{ fontWeight: "bold" }}>
                          Content URL*
                        </InputLabel>
                        <TextField
                          sx={{ width: "100%" }}
                          value={videoContent}
                          onChange={(event) => {
                            setVideoContent(event.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item md={12} sm={6} xs={12}>
                        <InputLabel sx={{ fontWeight: "bold" }}>
                          Embed URL*
                        </InputLabel>
                        <TextField
                          sx={{ width: "100%" }}
                          value={videoEmbed}
                          onChange={(event) => {
                            setVideoEmbed(event.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {site === 'blog' && (
                    <Grid container spacing={2}>
                      <Grid item md={12} sm={6} xs={12}>
                        <Typography
                          sx={{
                            mt: 2,
                            mx: isMobileScreen ? 2 : 8,
                            textAlign: "left",
                            fontSize: isMobileScreen ? 14 : 18,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            marginLeft: "-3px"
                          }}
                        >
                          Article
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Grid item md={12}>
                          <InputLabel sx={{ fontWeight: "bold" }}>Headline (10 Words)*</InputLabel>
                          <TextField
                            sx={{ width: "100%" }}
                            value={articleHeadline}
                            onChange={(event) => {
                              setArticleHeadline(event.target.value);
                            }}
                          />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                          <InputLabel sx={{ fontWeight: "bold" }}>
                            Description (20 Words)*
                          </InputLabel>
                          <TextField
                            sx={{ width: "100%" }}
                            value={articleDescription}
                            onChange={(event) => {
                              setArticleDescription(event.target.value);
                            }}
                          />
                        </Grid>
                        <Grid item md={12} sm={12} xs={11}>
                          <InputLabel sx={{ fontWeight: "bold" }}>
                            Keywords (4-6 Keywords)*
                          </InputLabel>
                          <TextareaAutosize
                            placeholder="Enter  meta keywords"
                            minRows={5}
                            style={{
                              width: "100%",
                            }}
                            value={articleKeywords}
                            onChange={(event) => {
                              setArticleKeywords(event.target.value);
                            }}
                          />
                        </Grid>
                        <Grid item md={12} sm={12} xs={11}>
                          <InputLabel sx={{ fontWeight: "bold" }}>
                            Body (60 Words)*
                          </InputLabel>
                          <TextareaAutosize
                            placeholder="Enter  meta keywords"
                            minRows={5}
                            style={{
                              width: "100%",
                            }}
                            value={articleBody}
                            onChange={(event) => {
                              setArticleBody(event.target.value);
                            }}
                          />
                        </Grid>
                        <Grid item md={12}>
                          <InputLabel sx={{ fontWeight: "bold" }}>Article Name*</InputLabel>
                          <TextField
                            sx={{ width: "100%" }}
                            value={articleName}
                            onChange={(event) => {
                              setArticleName(event.target.value);
                            }}
                          />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                          <InputLabel sx={{ fontWeight: "bold" }}>
                            Article URL*
                          </InputLabel>
                          <TextField
                            sx={{ width: "100%" }}
                            value={articleUrl}
                            onChange={(event) => {
                              setArticleUrl(event.target.value);
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                  <Box sx={{ mt: "20px" }}>
                    <Button
                      sx={{
                        backgroundColor: "#1D1A57",
                        "&:hover": {
                          backgroundColor: "#2D2A67",
                        },
                        color: "white",
                      }}
                      onClick={handleSaveFaqs}
                    >
                      submit
                    </Button>
                  </Box>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditData;
