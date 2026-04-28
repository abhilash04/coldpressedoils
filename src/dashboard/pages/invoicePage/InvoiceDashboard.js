import React, { useState } from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Collapse, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { Dashboard, Assignment, AccountBalanceWallet, Campaign, HelpOutline, Phone, ExitToApp, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import DashboardComponent from "./DashBoard";

import CreateInvoice from "./CreateInvoice";
import GetInvoice from "./GetInvoice";

const contentComponents = {
  Dashboard: DashboardComponent,
//   "Leads Management": LeadsManagementComponent,
  CreateInvoice: CreateInvoice,
  GetInvoice: GetInvoice,
//   Help: HelpComponent,
  
};

const InvoiceDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Dashboard");
  const [adsOpen, setAdsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAdsClick = () => {
    setAdsOpen(!adsOpen);
  };

  const handleSectionClick = (text, path) => {
    if (text === "Log Out") {
      navigate(path); // Navigate to the specified path
    } else {
      setSelectedSection(text);
    }
  };

  const sections = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "CreateInvoice", icon: <Assignment /> },
    { text: "GetInvoice", icon: <AccountBalanceWallet /> },
    // { text: "Ads", icon: <Campaign />, hasSubmenu: true },
    { text: "Log Out", icon: <ExitToApp />, path: "/dashboard" }, 
  ];

//   const adsSubmenu = [
//     "Facebook Ads Manager",
//     "Google Ads Manager",
//     "Linkedin Ads Manager",
//     "Youtube Ads Manager",
//   ];

  const SelectedComponent = contentComponents[selectedSection] || (() => <Typography>Select a section</Typography>);

  return (
    <Grid gap={3} sx={{ display: "flex", m:1 }}>
      <Grid md={4} sx={{ width: "300px", p: 2, border: "2px solid #f5f5f5", borderRadius: 4 }}>
        <List sx={{ fontWeight: "bold", width: '100%' }}>
          {sections.map(({ text, icon, hasSubmenu, path }) => (
            <React.Fragment key={text}>
              <ListItem
                button
                onClick={() => (hasSubmenu ? handleAdsClick() : handleSectionClick(text, path))}
                sx={{
                  width: '265px',
                  fontWeight: "bold",
                  background: selectedSection === text ? "linear-gradient(185deg, #005AE2 30%, #00042a 90%)" : "transparent",
                  color: selectedSection === text ? "white" : "black",
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": {
                    backgroundColor: "#00042a",
                    backgroundImage: "linear-gradient(135deg, #005AE2 30%, #00042a 90%)",
                    color: "white",
                  },
                }}
              >
                <ListItemIcon sx={{ color: selectedSection === text ? "white" : "black" }}>{icon}</ListItemIcon>
                <ListItemText primary={text} />
                {hasSubmenu && (adsOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>

              {/* {hasSubmenu && (
                <Collapse in={adsOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {adsSubmenu.map((subItem) => (
                      <ListItem
                        button
                        key={subItem}
                        onClick={() => setSelectedSection(subItem)}
                        sx={{
                          width: '250px',
                          pl: 4,
                          background: selectedSection === subItem ? "linear-gradient(185deg, #005AE2 30%, #00042a 90%)" : "transparent",
                          color: selectedSection === subItem ? "white" : "black",
                          borderRadius: 2,
                          mb: 1,
                          "&:hover": {
                            backgroundColor: "#00042a",
                            backgroundImage: "linear-gradient(135deg, #005AE2 30%, #00042a 90%)",
                            color: "white",
                          },
                        }}
                      >
                        <ListItemText primary={subItem} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )} */}
            </React.Fragment>
          ))}
        </List>
      </Grid>

      <Grid md={8} sx={{ flexGrow: 1, p: 2, border: "2px solid #f5f5f5", bgcolor: "#f5f5f5", borderRadius: 4 }}>
        <motion.div
          key={selectedSection}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{textAlign:"center"}}>
            {selectedSection}
          </Typography>
          <Box>
            <SelectedComponent />
          </Box>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default InvoiceDashboard;