import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Header from "../../common/Header";
import Sidenav from "../../common/Sidenav";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";
import IconSidenav from "../../common/IconSidenav";

const AddMetaData = () => {
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
  const [indexingStatus, setIndxingStatus] = useState("");
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
  //add meta data
  const handleAddMetaData = async () => {
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
      orgName,
      orgWebsite,
      orgStreet,
      orgLocality,
      orgRegion,
      orgPincode,
      orgTelephone,
      orgImageUrl,
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
        config.getMyCollege + apiList.addMetaData,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          alert("Data Saved Successfully");
          navigate("/seo-manager/add-sites");
        }
      } else if (response.data.responseCode === "400") {
        alert("Something went wrong please try again");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  //faq
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

      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          handleAddMetaData();
        }
      } else if (response.data.responseCode === "400") {
        handleAddMetaData();
      }
    } catch (error) {
      alert("Something went wrong please try again");
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        {showSideNav ? <IconSidenav /> : <Sidenav />}
        <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
          <Header toggleSideNav={toggleSideNav} />
          <Box sx={{ marginTop: "25px", display: "flex" }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ marginLeft: { md: "10px", sm: "20px", xs: "0px" } }}
              startIcon={<ArticleOutlinedIcon />}
              onClick={() => {
                navigate("/seo-manager/add-sites");
              }}
            >
              Back
            </Button>
          </Box>
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
            Metadata
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
              justifyContent: "space-around",
              mt: { md: "10px", SM: "10px", xs: "10px" },
            }}
          >
            <Grid item md={12}>
              <InputLabel sx={{ fontWeight: "bold" }}>Meta Title*</InputLabel>
              <TextField
                sx={{ width: "100%" }}
                value={metaTitle}
                onChange={(event) => {
                  setMetaTitle(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                Meta Description*
              </InputLabel>
              <TextField
                sx={{ width: "100%" }}
                value={metaDescription}
                onChange={(event) => {
                  setMetaDescription(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                Meta Keywords*
              </InputLabel>
              <TextareaAutosize
                placeholder="Enter  meta keywords"
                minRows={5}
                style={{
                  width: "100%",
                }}
                value={metaKeywords}
                onChange={(event) => {
                  setMetaKeywords(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>OG Title*</InputLabel>
              <TextField
                sx={{ width: "100%" }}
                value={ogTitle}
                onChange={(event) => {
                  setOgTitle(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>OG Type*</InputLabel>
              <TextField
                sx={{ width: "100%" }}
                value={ogType}
                onChange={(event) => {
                  setOgType(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                OG Description*
              </InputLabel>
              <TextareaAutosize
                placeholder="Enter  og description"
                minRows={5}
                style={{
                  width: "100%",
                }}
                value={ogDescription}
                onChange={(event) => {
                  setOgDescription(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel sx={{ fontWeight: "bold" }}>OG URL*</InputLabel>
              <TextField
                sx={{ width: "100%" }}
                value={ogUrl}
                onChange={(event) => {
                  setOgUrl(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel sx={{ fontWeight: "bold" }}>OG Sitename*</InputLabel>
              <TextField
                sx={{ width: "100%" }}
                value={ogSiteName}
                onChange={(event) => {
                  setOgSiteName(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel sx={{ fontWeight: "bold" }}>OG Image URL*</InputLabel>
              <TextField
                sx={{ width: "100%" }}
                value={ogImageUrl}
                onChange={(event) => {
                  setOgImageUrl(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel sx={{ fontWeight: "bold" }}>Twitter Site*</InputLabel>
              <TextField
                sx={{ width: "100%" }}
                value={twitterSite}
                onChange={(event) => {
                  setTwitterSite(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                Twitter Title*
              </InputLabel>
              <TextField
                sx={{ width: "100%" }}
                value={twitterTitle}
                onChange={(event) => {
                  setTwitterTitle(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                Twitter Description*
              </InputLabel>
              <TextareaAutosize
                placeholder="Enter  twitter description"
                minRows={5}
                style={{
                  width: "100%",
                }}
                value={twitterDescription}
                onChange={(event) => {
                  setTwitterDescription(event.target.value);
                }}
              />
            </Grid>

            <Grid item md={6} sm={6} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                Canonical URL*
              </InputLabel>
              <TextField
                sx={{ width: "100%" }}
                value={canonicalUrl}
                onChange={(event) => {
                  setCanonicalUrl(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                Article Publisher*
              </InputLabel>
              <TextField
                sx={{ width: "100%" }}
                value={articlePublisher}
                onChange={(event) => {
                  setArticlePublisher(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>Author*</InputLabel>
              <TextField
                sx={{ width: "100%" }}
                value={author}
                onChange={(event) => {
                  setAuthor(event.target.value);
                }}
              />
            </Grid>

            <Grid item md={6} sm={6} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                Indexing Status*
              </InputLabel>
              <Autocomplete
                value={indexingStatus}
                onChange={(event, newValue) => {
                  setIndxingStatus(newValue ? newValue : "");
                }}
                options={["Yes", "No"]}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
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
                Ratings
              </Typography>
              <Divider sx={{ mb: 1 }} />
            </Grid>
            <Grid item md={6} sm={6} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>Ratings*:</InputLabel>
              <Select
                fullWidth
                value={ratings}
                onChange={(e) => {
                  setRatings(e.target.value);
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
            <Divider />

            <Grid item md={6} sm={6} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                RatingsCount*:
              </InputLabel>
              <TextField
                placeholder="Enter the rating"
                autoFocus
                fullWidth
                value={ratingsCount}
                onChange={(e) => {
                  setRatingsCount(e.target.value);
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
        </Box>
      </Box>
    </div >
  );
};

export default AddMetaData;
