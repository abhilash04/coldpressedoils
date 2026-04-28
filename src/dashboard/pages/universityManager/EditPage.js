import React, { useState } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import SideNav from "../../common/Sidenav";
import Header from "../../common/Header";
import UpdateCollegeDetails from "./UpdatePageDetails";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import IconSidenav from "../../common/IconSidenav";
import UpdateReviews from "./UpdateReviews";
import UpdateFaq from "./UpdateFaq";
import UpdateGallery from "./UpdateGallery";

const EditPage = () => {
  const [value, setValue] = useState("1");
  const [showSideNav, setShowSideNav] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid sx={{ display: "flex" }}>
        {isMobileScreen ? (
          <IconSidenav />
        ) : showSideNav ? (
          <IconSidenav />
        ) : (
          <SideNav />
        )}
        <Grid component="main" sx={{ width: "100%", px: 1 }}>
          <Header toggleSideNav={toggleSideNav} />
          <Grid sx={{ width: "100%", px: isMobileScreen ? 2 : 5 }}>
            <Box sx={{ width: "100%", my: 5, boxShadow: 4 }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 3,
                    "& .MuiTabScrollButton-root": {
                      display: isMobileScreen ? "flex" : "none",
                    },
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                      "& .MuiTabs-indicator": {
                        backgroundColor: "#1d1a57",
                        height: "2px",
                        overflow: "hidden",
                      },
                      "& .MuiTab-root": {
                        fontSize: isMobileScreen ? "12px" : "20px",
                        fontWeight: 600,
                        background: "#FFF",
                        "&.Mui-selected": {
                          color: "#1d1a57",
                        },
                      },

                      "& .MuiTabScrollButton-root svg": {
                        fontSize: "30px",
                      },
                    }}
                  >
                    <Tab
                      label="Page Details"
                      value="1"
                      sx={{
                        textTransform: "initial",
                        mx: isMobileScreen ? 1 : 4,
                      }}
                    />
                    <Tab
                      label="Update Reviews"
                      value="2"
                      sx={{
                        textTransform: "initial",
                        mx: isMobileScreen ? 1 : 4,
                      }}
                    />
                    <Tab
                      label="Update Faq"
                      value="3"
                      sx={{
                        textTransform: "initial",
                        mx: isMobileScreen ? 1 : 4,
                      }}
                    />
                    <Tab
                      label="Update Gallery"
                      value="4"
                      sx={{
                        textTransform: "initial",
                        mx: isMobileScreen ? 1 : 4,
                      }}
                    />
                  </TabList>
                </Box>
                <TabPanel
                  value="1"
                  sx={{ borderTop: 1, borderColor: "divider" }}
                >
                  <UpdateCollegeDetails />
                </TabPanel>
                <TabPanel
                  value="2"
                  sx={{ borderTop: 1, borderColor: "divider" }}
                >
                  <UpdateReviews />
                </TabPanel>
                <TabPanel
                  value="3"
                  sx={{ borderTop: 1, borderColor: "divider" }}
                >
                  <UpdateFaq />
                </TabPanel>
                <TabPanel
                  value="4"
                  sx={{ borderTop: 1, borderColor: "divider" }}
                >
                  <UpdateGallery />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EditPage;
