import React, { useState } from "react";
import {
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
  useMediaQuery,
} from "@mui/material";
import Header from "../../common/Header";
import Sidenav from "../../common/Sidenav";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useNavigate } from "react-router-dom";
import IconSidenav from "../../common/IconSidenav";

export const SeoViewForm = () => {
  const navigate = useNavigate();
  const [select, setSelected] = useState("--Select--");
  const [isDisabled, setIsDisabled] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  const handleClick = () => {
    // Add your logic here
    setIsDisabled(true); // For demonstration purposes, setting it to true when the button is clicked
  };

  return (
    <div>
       <Box sx={{ display: "flex" }}>
       {isMobileScreen ? (
          <IconSidenav />
        ) : showSideNav ? (
          <IconSidenav />
        ) : (
          <Sidenav />
        )}
        <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
          <Header toggleSideNav={toggleSideNav} />
          <Box sx={{ marginTop: "25px", display: "flex" }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ marginLeft: { md: "10px", sm: "20px", xs: "0px" } }}
              startIcon={<ArticleOutlinedIcon />}
            >
              Static Page
            </Button>
          </Box>
          <Typography
            sx={{
              mt: { md: "20px", sm: "20px", xs: "10px" },
              ml: { md: "10px", sm: "10px", xs: "10px" },
              fontSize: { md: "18px", sm: "20px", xs: "15px" },
              fontWeight: "600",
            }}
          >
            Static Page Form
          </Typography>
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
                placeholder="Enter meta title"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                Meta Description*
              </InputLabel>
              <TextareaAutosize
                placeholder="Enter meta description"
                readOnly
                minRows={5}
                style={{
                  width: "100%",
                }}
                required
              />
            </Grid>
            <Grid item md={12} sm={12} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                Meta Keywords*
              </InputLabel>
              <TextareaAutosize
                placeholder="Enter  meta keywords"
                readOnly
                minRows={5}
                style={{
                  width: "100%",
                }}
                required
              />
            </Grid>
            <Grid item md={6} sm={12} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>OG Title*</InputLabel>
              <TextField
                placeholder="Enter og title"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item md={6} sm={12} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>OG Type*</InputLabel>
              <FormControl
                sx={{
                  minWidth: { xs: 220, sm: 300, md: 520 },
                }}
              >
                <Select value={select} onChange={handleChange}
                  inputProps={{
                    readOnly: true
                  }}
                >
                  <MenuItem
                    value="--Select--"
                    disabled
                    sx={{ color: "inherit" }}
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    Select og type
                  </MenuItem>
                  <MenuItem value="Yes" sx={{ width: "100%" }}>
                    Blog
                  </MenuItem>
                  <MenuItem value="No" sx={{ width: "50%" }}>
                    Article
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={12} sm={12} xs={11}>
              <InputLabel
              
                sx={{ fontWeight: "bold" }}
              >
                OG Description*
              </InputLabel>
              <TextareaAutosize
                placeholder="Enter  og description"
                minRows={5}
                readOnly
                style={{
                  width: "100%",
                }}
                required
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel sx={{ fontWeight: "bold" }}>OG URL*</InputLabel>
              <TextField
                placeholder="Enter  og url"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                required
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel sx={{ fontWeight: "bold" }}>OG Sitename*</InputLabel>
              <TextField
                placeholder="Enter og sitename"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel sx={{ fontWeight: "bold" }}>OG Image URL*</InputLabel>
              <TextField
                placeholder="Enter og image url"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel sx={{ fontWeight: "bold" }}>Twitter Site*</InputLabel>
              <TextField
                placeholder="Enter twitter site"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                required
              />
            </Grid>
            <Grid item md={12} sm={12} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                Twitter Title*
              </InputLabel>
              <TextField
                placeholder="Enter twitter title"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                required
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
                readOnly
                required
              />
            </Grid>

            <Grid item md={6} sm={6} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                Canonical URL*
              </InputLabel>
              <TextField
                placeholder="Enter canonical url"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                required
              />
            </Grid>
            <Grid item md={6} sm={6} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                Article Publisher*
              </InputLabel>
              <TextField
                placeholder="Article publisher"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item md={6} sm={6} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>Author*</InputLabel>
              <TextField
                placeholder=" Author"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                required
              />
            </Grid>

            <Grid item md={6} sm={6} xs={11}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                Indexing Status*
              </InputLabel>
              <FormControl
                sx={{
                  minWidth: { xs: 220, sm: 300, md: 520 },
                }}
              >
                <Select value={select} onChange={handleChange}
                inputProps={{
                  readOnly: true
                }}>
                  <MenuItem 
                    
                    value="placeholder" disabled sx={{ color: "gray" }}
                  
                  >
                    --Select--
                  </MenuItem>
                  <MenuItem value="Yes" sx={{ width: "100%" }}>
                    Yes
                  </MenuItem>
                  <MenuItem value="No" sx={{ width: "50%" }}>
                    No
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Box sx={{ mt: "20px" }}>
              <Button
                disabled={isDisabled}
                sx={{
                  backgroundColor: "#1D1A57",
                  "&:hover": {
                    backgroundColor: "#2D2A67",
                  },
                  color: "white",
                }}
                onClick={handleClick}
              
              >
                submit
              </Button>
            </Box>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};
export default SeoViewForm;
