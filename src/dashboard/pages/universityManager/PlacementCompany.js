import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Pagination,
  PaginationItem,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
  Container,
  DialogActions,
  useMediaQuery,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as PlusIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { config } from "../../../../../config/config";
import { apiList, invokeApi } from "../../../../../services/apiServices";
import { useCookies } from "react-cookie";
import Header from "../../common/Header";
import Sidenav from "../../common/Sidenav";
import NavigatedComponent from "../NavigatedComponent";
import { useLocation } from "react-router-dom";
import IconSidenav from "../../common/IconSidenav";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import SearchIcon from "@mui/icons-material/Search";

const PlacementCompany = () => {
  const [cookies] = useCookies();
  const location = useLocation();
  const isUsersPage =
    location.pathname === "/university-manager/placement-company";
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [loading, setloading] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );
  const isSmallScreen = useMediaQuery(
    "(min-width:1024px) and (max-width:1440px)"
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    isMobileScreen ? 5 : isSmallScreen ? 5 : 10
  );

  //setting input values
  const [placementCompany, setPlacementCompany] = useState("");
  const [submitClicked, setSubmitClicked] = useState();
  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [page, setPage] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showSideNav, setShowSideNav] = useState(false);
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.trimStart());
  };

  const filteredRows = rows.filter((row) => {
    const { placementCompany, status } = row;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      (placementCompany &&
        placementCompany.toLowerCase().includes(lowerCaseQuery)) ||
      (status && status.toLowerCase().includes(lowerCaseQuery))
    );
  });

  const columns = [
    { id: "item1", label: "Sl. No" },
    { id: "item2", label: "Company" },
    { id: "item3", label: "Status" },
    { id: "item4", label: "Action" },
  ];
  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const handleOpenAddPopup = () => {
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
  };

  const handleOpenEditPopup = (getId, getCompanyName) => {
    setEditId(getId);
    setPlacementCompany(getCompanyName);
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };

  const handleOpenDeletePopup = (getId) => {
    setDeleteId(getId);
    setOpenDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
  };

  const handleAddSubmitClicked = () => {
    addPlacementCompany();
    setSubmitClicked(true);
  };

  const handleEditSubmitClicked = () => {
    updatePlacementCompany();
    setSubmitClicked(true);
  };

  const handleDeleteSubmitClicked = () => {
    deletePlacementCompany();
    setSubmitClicked(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  //add placement company api
  const addPlacementCompany = async () => {
    setloading(true);
    let params = {
      placementCompany,
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.addPlacementCompany,
        params,
        cookies
      );
      if (response) {
        if (
          response.status === "200" ||
          response.data.responseMessage === "Successful"
        ) {
          // alert(`Data Saved Successfully`);
          showSnackbar("Company added successfully", "success");
          setOpenAddPopup(false);
        } else {
          alert("Failed to save this Record");
        }
      } else {
        alert("Failed to Save");
      }
    } catch (error) {
      console.error("An error occurred while fetching location:", error);
    }
    setloading(false);
  };

  //get placement company api
  useEffect(() => {
    const getPlacementCompanies = async () => {
      setloading(true);
      let params = {};
      try {
        const response = await invokeApi(
          config.getMyCollege + apiList.getPlacementCompanies,
          params,
          cookies
        );
        if (response?.status >= 200 && response?.status < 300) {
          if (response.data.responseCode === "200") {
            setRows(response.data.placementCompanys);
            setSubmitClicked(false);
            console.log(response.data);
          } else {
            console.error("Invalid responseCode:", response.data.responseCode);
          }
        } else {
          console.error("HTTP error:", response?.status);
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
      setloading(false);
    };
    getPlacementCompanies();
  }, [submitClicked]);

  //edit placement company api
  const updatePlacementCompany = async () => {
    setloading(true);
    let params = {
      id: editId,
      placementCompany,
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updatePlacementCompany,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          showSnackbar("Company updated successfully", "success");
          setOpenEditPopup(false);
        } else {
          console.error("Invalid responseCode:", response.data.responseCode);
        }
      } else {
        console.error("HTTP error:", response?.status);
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
    setloading(false);
  };

  // delete api
  const deletePlacementCompany = async () => {
    setloading(true);
    let params = {
      id: deleteId,
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.deletePlacementCompany,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          showSnackbar("Company deleted successfully", "success");
          setOpenDeletePopup(false);
        } else {
          console.error("Invalid responseCode:", response.data.responseCode);
        }
      } else {
        console.error("HTTP error:", response?.status);
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
    setloading(false);
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
                xs={12}
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
                    <PlusIcon style={{ fontSize: isMobileScreen ? 12 : 14 }} />
                  }
                  onClick={handleOpenAddPopup}
                  sx={{
                    height: isMobileScreen ? "20px" : "25px",
                    whiteSpace: "nowrap",
                    fontSize: isMobileScreen ? 8 : isSmallScreen ? 10 : 12,
                  }}
                >
                  ADD NEW COMPANY
                </Button>
              </Box>
              <Grid
                sx={{
                  my: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
                                gap: isMobileScreen
                                  ? 1
                                  : isSmallScreen
                                  ? 5
                                  : 10,
                              }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
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
                                      isMobileScreen
                                        ? 5
                                        : isSmallScreen
                                        ? 5
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
                                      ? 5
                                      : isSmallScreen
                                      ? 5
                                      : 10}
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
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
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
                                  position: isMobileScreen
                                    ? "sticky"
                                    : "sticky",
                                  top: 0,
                                  zIndex: 5,
                                  textAlign: "left",
                                }}
                              >
                                <TableRow>
                                  {columns.map((column, index) => (
                                    <TableCell
                                      key={index}
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
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {filteredRows.length === 0 ? (
                                  <TableRow>
                                    <TableCell
                                      colSpan={columns.length}
                                      align="center"
                                      style={{ py: "6px" }}
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
                                      <TableRow key={index}>
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
                                            "@media (min-width: 1440px) and (max-width:2000px)":
                                              {
                                                whiteSpace: "nowrap",
                                              },
                                            fontSize: isSmallScreen ? 11 : 12,
                                          }}
                                        >
                                          {row.placementCompany}
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
                                          {row.status}
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            py: "6px",
                                            textAlign: "left",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          <Button
                                            sx={{
                                              marginRight: isSmallScreen
                                                ? 1
                                                : 2,
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
                                            onClick={() =>
                                              handleOpenEditPopup(
                                                row.id,
                                                row.placementCompany
                                              )
                                            }
                                          >
                                            <EditIcon
                                              style={{
                                                fontSize: 14,
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
                                              handleOpenDeletePopup(row.id)
                                            }
                                          >
                                            <DeleteIcon
                                              style={{
                                                fontSize: 14,
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

                    {/* add popup */}
                    <Dialog
                      open={openAddPopup}
                      onClose={handleCloseAddPopup}
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
                          ADD PLACEMENT COMPANY
                        </DialogTitle>
                        <DialogContent>
                          <Grid container>
                            <Grid item md={12} xs={12} sx={{ my: 1 }}>
                              <InputLabel
                                sx={{
                                  fontWeight: "bold",
                                  my: 1,
                                  fontSize: 15,
                                }}
                              >
                                Company Name*:
                              </InputLabel>
                              <TextField
                                placeholder="Enter the course"
                                autoFocus
                                fullWidth
                                value={placementCompany}
                                onChange={(event) => {
                                  setPlacementCompany(event.target.value);
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
                            onClick={handleCloseAddPopup}
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
                            color="primary"
                            onClick={handleAddSubmitClicked}
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
                            Add Company
                          </Button>
                        </DialogActions>
                      </Container>
                    </Dialog>

                    {/* view/edit popup */}
                    <Dialog
                      open={openEditPopup}
                      onClose={handleCloseEditPopup}
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
                          Edit Placement Company
                        </DialogTitle>
                        <DialogContent>
                          <Grid container>
                            <Grid item md={12} xs={12} sx={{ my: 1 }}>
                              <InputLabel
                                sx={{
                                  fontWeight: "bold",
                                  my: 1,
                                  fontSize: 15,
                                }}
                              >
                                Placement Company*:
                              </InputLabel>

                              <TextField
                                placeholder="Enter the college type"
                                autoFocus
                                fullWidth
                                value={placementCompany}
                                onChange={(event) => {
                                  setPlacementCompany(event.target.value);
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
                            onClick={handleCloseEditPopup}
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
                            onClick={handleEditSubmitClicked}
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

                    {/* delete popup */}

                    <Dialog
                      open={openDeletePopup}
                      onClose={handleCloseDeletePopup}
                      fullWidth
                      maxWidth="xs"
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
                              onClick={handleCloseDeletePopup}
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
                              onClick={handleDeleteSubmitClicked}
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
                    <Snackbar
                      open={openSnackbar}
                      autoHideDuration={4000}
                      onClose={handleCloseSnackbar}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
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
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PlacementCompany;
