import { Box, Button, useMediaQuery } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SchoolIcon from "@mui/icons-material/School";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import AddIcon from "@mui/icons-material/Add";
import LinkIcon from "@mui/icons-material/Link";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SeoButtons = () => {
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const buttonData = [
    {
      label: "Add Site",
      icon: <AddIcon style={{ fontSize: isMobileScreen ? 8 : 14 }} />,
      color: "error",
      path: "/seo-manager/add-sites",
    },
    {
      label: "Static Page",
      icon: (
        <ArticleOutlinedIcon style={{ fontSize: isMobileScreen ? 8 : 14 }} />
      ),
      color: "secondary",
      path: "/seo-manager/static-pages",
    },
    {
      label: "College",
      icon: <SchoolIcon style={{ fontSize: isMobileScreen ? 8 : 14 }} />,
      color: "primary",
      path: "/seo-manager/colleges",
    },
  ];
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: isMobileScreen ? 1 : 2,
          px: isMobileScreen ? 1 : 5,
        }}
      >
        {buttonData.map((button, index) => (
          <Button
            key={index}
            variant="contained"
            color={button.color}
            startIcon={button.icon}
            label={button.label}
            onClick={() => {
              navigate(button.path);
            }}
            sx={{
              height: isMobileScreen ? "15px" : "25px",
              whiteSpace: "nowrap",
              fontSize: isMobileScreen ? 8 : 12,
            }}
          >
            {button.label}
          </Button>
        ))}
      </Box>
    </div>
  );
};
