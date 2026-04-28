import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  InputLabel,
  Container,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  InputAdornment,
  Pagination,
  PaginationItem,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { config } from "../../../../../config/config";
// Import your invokeApi and apiList properly here
import { invokeApi, apiList } from "../../../../../services/apiServices";
import SideNav from "../../common/Sidenav";
import Header from "../../common/Header";
import NavigatedComponent from "../NavigatedComponent";
import IconSidenav from "../../common/IconSidenav";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import SearchIcon from "@mui/icons-material/Search";
import { DropzoneArea } from "mui-file-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function Universities() {
  const [cookies] = useCookies();

  const location = useLocation();
  const isUsersPage =
    location.pathname === "/university-manager/university-list";
  const [page, setPage] = useState(0);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );
  const isSmallScreen = useMediaQuery(
    "(min-width:1024px) and (max-width:1440px)"
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    isMobileScreen ? 5 : isSmallScreen ? 5 : 10
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [university, setUniversity] = useState("");
  const [ratings, setRatings] = useState("");
  const [universityLogo, setUniversityLogo] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  // const [universityLogoUrl, setUniversityLogoUrl] = useState("");
  const [showSideNav, setShowSideNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.trimStart());
  };
  const filteredRows = rows.filter((row) => {
    const { name, ratings } = row;
    const lowerCaseQuery = searchQuery.toLowerCase();

    if (lowerCaseQuery === "5") {
      return ratings.trim().toLowerCase() === "5";
    }

    return (
      (name && name.toLowerCase().includes(lowerCaseQuery)) ||
      (ratings && ratings.toLowerCase().includes(lowerCaseQuery))
    );
  });

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  useEffect(() => {
    setLoading(true);
    fetchTableData();
  }, []);

  const handleFileChange = (files) => {
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setUniversityLogo(selectedFile);
    } else {
      setUniversityLogo(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      handleCloseDialog();
      await handleAddLogo();
    } catch (error) {
      console.error("Error while adding university:", error);
    }
  };

  const handleAddLogo = async () => {
    const formData = new FormData();
    formData.append("logo", universityLogo);
    try {
      const response = await fetch(
        "https://image-upload.getmycollege.com/addUniversityLogo",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response?.status >= 200 && response?.status < 300) {
        const responseData = await response.json();
        const logoUrl = responseData.imageUrl;

        if (logoUrl !== null && logoUrl !== "") {
          handleAddUniversity(logoUrl);
        } else {
          showSnackbar("Failed to add college logo", "error");
        }
      } else {
        showSnackbar("Failed to add college logo", "error");
      }
    } catch (error) {
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleAddUniversity = async (logoUrl) => {
    try {
      const universityData = {
        logoUrl,
        name: university,
        ratings: ratings,
      };
      const response = await invokeApi(
        config.getMyCollege + apiList.adduniversity,
        universityData,
        cookies
      );

      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          showSnackbar("University Added successfully", "success");
          fetchTableData();
        } else if (response.data.responseCode === "400") {
          showSnackbar(response.data.responseMessage, "error");
        }
      }
    } catch (error) {
      console.error("Error during adding university:", error);
      showSnackbar("Something went wrong. Please try again later!!", "error");
    }
  };

  const fetchTableData = async () => {
    const params = {};
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getuniversities,
        params,
        cookies
      );
      console.log(params);
      if (response?.status === 200) {
        setRows(response.data.universities);
        setLoading(false);
        console.log(response.data);
      } else {
        console.error("Failed to fetch data:", response);
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
    }
  };

  const handleViewEdit = async (id) => {
    const params = {
      id: id,
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getuniversity,
        params,
        cookies
      );

      if (response?.status === 200) {
        const userData = response.data.university;
        setSelectedRow({
          item1: userData.id,
          item2: userData.logoUrl,
          item3: userData.name,
          item4: userData.ratings,
          status: "Active",
        });
        setOpenDialogEdit(true);
      } else {
        showSnackbar("Something went wrong. Please try again later!!");
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
      showSnackbar("Something went wrong. Please try again later!!");
    }
  };

  const handleSaveChanges = async () => {
    const params = {
      id: selectedRow.item1,
      logoUrl: selectedRow.item2,
      name: selectedRow.item3,
      ratings: selectedRow.item4,
      status: "Active",
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updateuniversity,
        params,
        cookies
      );
      if (response?.status === 200) {
        setOpenDialogEdit(false);
        fetchTableData();
        showSnackbar("User updated successfully", "success");
      } else if (response?.status === 400) {
        showSnackbar("Failed to update. Please try again later!!", "error");
      }
    } catch (error) {
      showSnackbar("Failed to update. Please try again later!!", "error");
    }
  };

  const handleUniversityDelete = async () => {
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.deleteuniversity,
        { id: deleteItemId },
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          showSnackbar("University deleted successfully", "success");
          setOpenDeleteDialog(false);
          setRows(rows.filter((row) => row.id !== deleteItemId));
          fetchTableData();
        } else if (response.data.responseCode === "400") {
          showSnackbar("Failed to delete. Please try again later!!", "error");
        }
      }
    } catch (error) {
      showSnackbar("Failed to delete. Please try again later!!", "error");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseDialog = () => {
    setUniversityLogo("");
    setSelectedFileName("");
    setUniversity("");
    setRatings("");
    setOpenDialog(false);
  };

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  const columns = [
    { id: "item1", label: "Sl. No" },
    { id: "item2", label: "Logo" },
    { id: "item3", label: "Name" },
    { id: "item4", label: "Ratings" },
    { id: "item5", label: "Action" },
  ];

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenDeleteDialog = (id) => {
    setOpenDeleteDialog(true);
    setDeleteItemId(id);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleRatingsChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 5 && value % 0.5 === 0) {
      setRatings(value.toString());
    } else if (e.target.value === "") {
      setRatings("");
    }
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
          <Grid sx={{ py: 1 }}>
            <NavigatedComponent pathname={location.pathname} />

            <Grid
              sx={{
                width: "100%",
                px: isMobileScreen ? 1 : isSmallScreen ? 2 : 5,
              }}
            >
              <Grid
                container
                md={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  my: 2,
                }}
              >
                <Grid item md={12} xs={12}>
                  <TextField
                    type="text"
                    size="small"
                    placeholder="search"
                    name="searchQuery"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "#1D1A57" }} />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      style: {
                        height: isMobileScreen ? 10 : isSmallScreen ? 13 : 15,
                        fontSize: isMobileScreen ? 12 : isSmallScreen ? 12 : 14,
                      },
                    }}
                    sx={{
                      width: isMobileScreen
                        ? "250px"
                        : isSmallScreen
                        ? "300px"
                        : "400px",
                      background: "#f0f8ff",
                      borderRadius: "20px",

                      border: "1px solid #1D1A57",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: { md: "flex", xs: "flex" },
                  flexDirection: { xs: "column", md: "row" },
                  flexWrap: { md: "wrap" },
                  gap: { md: 2, xs: 2 },
                  my: { md: 2, xs: 2 },
                  width: isMobileScreen ? 175 : "auto",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={
                    <AddIcon style={{ fontSize: isMobileScreen ? 12 : 14 }} />
                  }
                  onClick={handleOpenDialog}
                  sx={{
                    height: isMobileScreen ? "20px" : "25px",
                    whiteSpace: "nowrap",
                    fontSize: isMobileScreen ? 8 : isSmallScreen ? 10 : 12,
                  }}
                >
                  Add New Institute Type
                </Button>
              </Box>
              {isUsersPage && (
                <>
                  {loading ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: isMobileScreen
                          ? "100px"
                          : isSmallScreen
                          ? "100px"
                          : "200px",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <>
                      <Paper
                        sx={{
                          width: "100%",
                          boxShadow: 3,
                          py: 1,
                          maxWidth: isMobileScreen ? 275 : "none",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 2,
                            py: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",

                              alignItems: "center",
                              gap: isMobileScreen ? 1 : isSmallScreen ? 5 : 10,
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <InputLabel
                                sx={{
                                  mx: 1,
                                  fontSize: isMobileScreen
                                    ? 10
                                    : isSmallScreen
                                    ? 10
                                    : 12,
                                }}
                              >
                                Row per page
                              </InputLabel>
                              <Select
                                value={rowsPerPage}
                                onChange={handleChangeRowsPerPage}
                                sx={{
                                  height: 25,
                                  fontSize: isMobileScreen
                                    ? 10
                                    : isSmallScreen
                                    ? 10
                                    : 12,
                                }}
                                MenuProps={{
                                  PaperProps: {
                                    style: {
                                      maxHeight: "100px",
                                    },
                                  },
                                }}
                              >
                                <MenuItem
                                  value={
                                    isMobileScreen ? 5 : isSmallScreen ? 5 : 10
                                  }
                                  sx={{
                                    fontSize: isMobileScreen
                                      ? 10
                                      : isSmallScreen
                                      ? 10
                                      : 12,
                                    "&.MuiButtonBase-root": {
                                      minHeight: 0,
                                    },
                                  }}
                                >
                                  {isMobileScreen ? 5 : isSmallScreen ? 5 : 10}
                                </MenuItem>
                                <MenuItem
                                  value={
                                    isMobileScreen
                                      ? 10
                                      : isSmallScreen
                                      ? 10
                                      : 10
                                  }
                                  sx={{
                                    fontSize: isMobileScreen
                                      ? 10
                                      : isSmallScreen
                                      ? 10
                                      : 12,
                                    "&.MuiButtonBase-root": {
                                      minHeight: 0,
                                    },
                                  }}
                                >
                                  {isMobileScreen
                                    ? 10
                                    : isSmallScreen
                                    ? 10
                                    : 20}
                                </MenuItem>
                                <MenuItem
                                  value={
                                    isMobileScreen
                                      ? 15
                                      : isSmallScreen
                                      ? 15
                                      : 30
                                  }
                                  sx={{
                                    fontSize: isMobileScreen
                                      ? 10
                                      : isSmallScreen
                                      ? 10
                                      : 12,
                                    "&.MuiButtonBase-root": {
                                      minHeight: 0,
                                    },
                                  }}
                                >
                                  {isMobileScreen
                                    ? 15
                                    : isSmallScreen
                                    ? 15
                                    : 30}
                                </MenuItem>
                              </Select>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <InputLabel
                                sx={{
                                  mx: 1,
                                  fontSize: isMobileScreen
                                    ? 10
                                    : isSmallScreen
                                    ? 10
                                    : 12,
                                }}
                              >
                                Go to page
                              </InputLabel>
                              <TextField
                                type="number"
                                variant="outlined"
                                value={page + 1}
                                onChange={(event) => {
                                  const pageNumber = parseInt(
                                    event.target.value,
                                    10
                                  );
                                  handleChangePage(event, pageNumber - 1);
                                }}
                                inputProps={{
                                  min: 1,
                                  max: Math.ceil(
                                    filteredRows.length / rowsPerPage
                                  ),
                                  style: {
                                    height: "auto",

                                    fontSize: isMobileScreen
                                      ? 10
                                      : isSmallScreen
                                      ? 10
                                      : 12,
                                    padding: "1px 7px",
                                  },
                                }}
                                sx={{
                                  width: isMobileScreen
                                    ? 40
                                    : isSmallScreen
                                    ? 40
                                    : 60,
                                }}
                              />
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: isMobileScreen ? "none" : "flex",
                            }}
                          >
                            <Pagination
                              count={Math.ceil(
                                filteredRows.length / rowsPerPage
                              )}
                              page={page + 1}
                              onChange={(event, value) =>
                                handleChangePage(event, value - 1)
                              }
                              color="primary"
                              renderItem={(item) => (
                                <PaginationItem
                                  {...item}
                                  style={{
                                    fontSize: isMobileScreen
                                      ? 10
                                      : isSmallScreen
                                      ? 10
                                      : 12,
                                  }}
                                />
                              )}
                              shape="rounded"
                              boundaryCount={1}
                              siblingCount={1}
                              showFirstButton
                              showLastButton
                              firstIcon={<FirstPageRoundedIcon />}
                              lastIcon={<LastPageRoundedIcon />}
                              prevIcon={<ChevronLeftRoundedIcon />}
                              nextIcon={<ChevronRightRoundedIcon />}
                            />
                          </Box>
                        </Box>

                        <TableContainer
                          id="table-container"
                          sx={{
                            maxHeight: isMobileScreen ? 440 : 440,
                            overflowY: "auto",
                          }}
                        >
                          <Table aria-label="sticky table">
                            <TableHead
                              style={{
                                background: "white",
                                position: isMobileScreen ? "auto" : "sticky",
                                top: 0,
                                zIndex: 5,
                                textAlign: "left",
                              }}
                            >
                              {columns.map((column, index) => (
                                <TableCell
                                  key={index}
                                  align="center"
                                  style={{
                                    width: isSmallScreen
                                      ? "auto"
                                      : `${100 / columns.length}%`,
                                    background: "#fff",
                                    zIndex: 100,
                                    backgroundColor: "#f0f8ff",
                                    fontWeight: 600,
                                    boxShadow: 2,
                                    whiteSpace: "nowrap",
                                    textAlign: "left",
                                  }}
                                >
                                  <Grid
                                    sx={{
                                      display: "flex",

                                      gap: 0,
                                      fontSize: isSmallScreen ? 12 : 13,
                                    }}
                                  >
                                    {column.label}
                                  </Grid>
                                </TableCell>
                              ))}
                            </TableHead>
                            <TableBody>
                              {filteredRows.length === 0 ? (
                                <TableRow>
                                  <TableCell
                                    colSpan={columns.length}
                                    align="center"
                                    style={{ padding: "6px" }}
                                  >
                                    No data found
                                  </TableCell>
                                </TableRow>
                              ) : (
                                filteredRows
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((row, index) => (
                                    <TableRow key={index} sx={{}}>
                                      <TableCell
                                        sx={{
                                          py: "4px",
                                          position: isMobileScreen
                                            ? "sticky"
                                            : "none",
                                          left: isMobileScreen ? 0 : "none",

                                          background: isMobileScreen
                                            ? "#f0f8ff"
                                            : "none",
                                          px: 2,
                                          fontSize: isSmallScreen ? 11 : 12,
                                          textAlign: "left",
                                        }}
                                      >
                                        {index + 1 + page * rowsPerPage}
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          py: "6px",
                                          textAlign: "left",
                                        }}
                                      >
                                        <Grid
                                          sx={{
                                            width: isSmallScreen ? 16 : 22,
                                            height: isSmallScreen ? 16 : 22,
                                          }}
                                        >
                                          <img
                                            src={row.logoUrl}
                                            alt="CollegeLogoImage"
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              objectFit: "contain",
                                            }}
                                          />
                                        </Grid>
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          py: "6px",
                                          textAlign: "left",
                                          "@media (min-width: 1440px) and (max-width:2000px)":
                                            {
                                              whiteSpace: "nowrap",
                                            },
                                          fontSize: isSmallScreen ? 11 : 12,
                                        }}
                                      >
                                        {row.name}
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          py: "6px",
                                          textAlign: "left",
                                          "@media (min-width: 1440px) and (max-width:2000px)":
                                            {
                                              whiteSpace: "nowrap",
                                            },
                                          fontSize: isSmallScreen ? 11 : 12,
                                        }}
                                      >
                                        {row.ratings}
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          py: "6px",
                                          textAlign: "left",
                                          "@media (min-width: 1440px) and (max-width:2000px)":
                                            {
                                              whiteSpace: "nowrap",
                                            },
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        <Button
                                          sx={{
                                            marginRight: isSmallScreen ? 1 : 2,
                                            height: isSmallScreen
                                              ? "15px"
                                              : "20px",
                                            my: "3px",

                                            fontSize: 11,
                                            "&.MuiButtonBase-root": {
                                              border: "1px solid #1b5e20",
                                              minWidth: 30,
                                              py: 1,
                                            },
                                            "@media (min-width: 1440px) and (max-width:2000px)":
                                              {
                                                my: 0,
                                              },
                                          }}
                                          onClick={() => handleViewEdit(row.id)}
                                        >
                                          <EditIcon
                                            style={{
                                              fontSize: isSmallScreen ? 11 : 12,
                                              color: "#1b5e20",
                                            }}
                                          />
                                        </Button>
                                        <Button
                                          sx={{
                                            height: isSmallScreen
                                              ? "15px"
                                              : "20px",
                                            my: "3px",
                                            fontSize: 11,
                                            "&.MuiButtonBase-root": {
                                              border: "1px solid #c62828",
                                              minWidth: 30,
                                              py: 1,
                                            },
                                            "@media (min-width: 1440px) and (max-width:2000px)":
                                              {
                                                my: 0,
                                              },
                                          }}
                                          onClick={() =>
                                            handleOpenDeleteDialog(row.id)
                                          }
                                        >
                                          <DeleteIcon
                                            style={{
                                              fontSize: isSmallScreen ? 11 : 12,
                                              color: "#c62828",
                                            }}
                                          />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </>
                  )}
                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    fullWidth
                    maxWidth="sm"
                  >
                    <DialogTitle
                      sx={{
                        mb: 1,
                        mx: 8,
                        fontSize: 18,
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      Add University
                    </DialogTitle>
                    <form onSubmit={handleSubmit}>
                      <DialogContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <InputLabel
                              sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                            >
                              Logo*:
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
                                onChange={handleFileChange}
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
                          <Grid item xs={12}>
                            <InputLabel
                              sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                            >
                              University*:
                            </InputLabel>
                            <TextField
                              placeholder="Enter the university name"
                              fullWidth
                              value={university}
                              onChange={(e) => setUniversity(e.target.value)}
                              inputProps={{
                                style: { height: "8px", fontSize: 14 },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <InputLabel
                              sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                            >
                              Ratings*:
                            </InputLabel>
                            <TextField
                              placeholder="Enter the rating 0-5 (increments of 0.5)"
                              fullWidth
                              value={ratings}
                              onChange={handleRatingsChange}
                              type="number"
                              inputProps={{
                                step: 0.5,
                                min: 0,
                                max: 5,
                                style: { height: "8px", fontSize: 14 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: isMobileScreen
                            ? "center"
                            : "flex-end",
                        }}
                      >
                        <Button
                          onClick={handleCloseDialog}
                          sx={{
                            my: 2,
                            px: 2,
                            fontSize: 12,
                            border: "1px solid #1d1a57",
                            color: "#1d1a57",
                            fontWeight: 600,
                            "&:hover": {
                              border: "1px solid #1d1a57",
                              color: "#1d1a57",
                            },
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          color="primary"
                          sx={{
                            my: 2,
                            mx: 2,
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
                        >
                          Add University
                        </Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                  <Dialog
                    open={openDialogEdit}
                    onClose={handleCloseDialogEdit}
                    fullWidth
                    maxWidth="sm"
                  >
                    <Container>
                      <DialogTitle
                        sx={{
                          mb: 1,
                          mx: 8,
                          fontSize: 18,
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                      >
                        Edit University
                      </DialogTitle>
                      <DialogContent>
                        <Grid container md={12} xs={12}>
                          <Grid item md={12} xs={12} sx={{ my: 1 }}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: 15,
                              }}
                            >
                              Image Url*:
                            </InputLabel>
                            <TextField
                              placeholder="Enter the logourl"
                              autoFocus
                              fullWidth
                              value={selectedRow?.item2}
                              onChange={(e) => {
                                setSelectedRow({
                                  ...selectedRow,
                                  item2: e.target.value,
                                });
                              }}
                              inputProps={{
                                style: { height: "8px", fontSize: 14 },
                              }}
                            />
                          </Grid>
                          <Grid item md={12} xs={12} sx={{ my: 1 }}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: 15,
                              }}
                            >
                              University*:
                            </InputLabel>
                            <TextField
                              placeholder="Enter the university name"
                              autoFocus
                              fullWidth
                              value={selectedRow?.item3}
                              onChange={(e) => {
                                setSelectedRow({
                                  ...selectedRow,
                                  item3: e.target.value,
                                });
                              }}
                              inputProps={{
                                style: { height: "8px", fontSize: 14 },
                              }}
                            />
                          </Grid>
                          <Grid item md={12} xs={12} sx={{ my: 1 }}>
                            <InputLabel
                              sx={{
                                fontWeight: "bold",
                                my: 1,
                                fontSize: 15,
                              }}
                            >
                              Ratings*:
                            </InputLabel>
                            <TextField
                              placeholder="Enter the rating"
                              autoFocus
                              fullWidth
                              value={selectedRow?.item4}
                              onChange={(e) => {
                                setSelectedRow({
                                  ...selectedRow,
                                  item4: e.target.value,
                                });
                              }}
                              inputProps={{
                                style: { height: "8px", fontSize: 14 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: isMobileScreen
                            ? "center"
                            : "flex-end",
                        }}
                      >
                        <Button
                          onClick={handleCloseDialogEdit}
                          sx={{
                            my: 2,
                            px: 2,
                            fontSize: 12,
                            border: "1px solid #1d1a57",
                            color: "#1d1a57",
                            fontWeight: 600,
                            "&:hover": {
                              border: "1px solid #1d1a57",
                              color: "#1d1a57",
                            },
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveChanges}
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
                        >
                          Save Changes
                        </Button>
                      </DialogActions>
                    </Container>
                  </Dialog>

                  <Dialog
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    fullWidth
                    maxWidth="xs"
                  >
                    <Container>
                      <DialogTitle
                        sx={{
                          fontWeight: "600",
                          fontSize: "25px",
                          my: 1,
                          textAlign: "center",
                        }}
                      >
                        Confirm Delete
                      </DialogTitle>
                      <DialogContent>
                        <Grid container>
                          <Grid item md={12} sx={{ my: 1 }}>
                            <Typography>
                              Are you sure you want to delete?
                            </Typography>
                          </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Grid
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <Button
                            onClick={handleCloseDeleteDialog}
                            sx={{
                              mb: 2,

                              fontSize: 12,
                              border: "1px solid #d11a2a",
                              color: "#d11a2a",
                              fontWeight: 600,
                              "&:hover": {
                                border: "1px solid #d11a2a",
                                color: "#d11a2a",
                              },
                              width: "40%",
                            }}
                          >
                            No
                          </Button>
                          <Button
                            onClick={handleUniversityDelete}
                            color="primary"
                            sx={{
                              mb: 2,

                              fontSize: 12,
                              background: "#d11a2a",
                              color: "#fff",
                              fontWeight: 600,
                              "&:hover": {
                                background: "#d11a2a",
                                color: "#fff",
                              },
                              width: "40%",
                            }}
                          >
                            Yes
                          </Button>
                        </Grid>
                      </DialogActions>
                    </Container>
                  </Dialog>
                </>
              )}
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Universities;
