import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
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
  Typography,
  Pagination,
  PaginationItem,
  MenuItem,
  Select,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { config } from "../../../config/config";
import { apiList, invokeApi } from "../../../services/apiServices";
import SideNav from "../../common/Sidenav";
import Header from "../../common/Header";
import NavigatedComponent from "../NavigatedComponent";
import IconSidenav from "../../common/IconSidenav";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import SearchIcon from "@mui/icons-material/Search";

function Locations() {
  const [cookies] = useCookies();

  const location = useLocation();
  const isUsersPage =
    location.pathname === "/university-manager/institute-type";
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );
  const isSmallScreen = useMediaQuery(
    "(min-width:1024px) and (max-width:1440px)"
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    isMobileScreen ? 5 : isSmallScreen ? 5 : 10
  );
  const [page, setPage] = useState(0);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [formLocation, setFormLocation] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showSideNav, setShowSideNav] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.trimStart());
  };

  const filteredRows = (rows && Array.isArray(rows)) ? rows.filter((row) => {
    const { location } = row;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      location && location.toLowerCase().includes(lowerCaseQuery)
    );
  }) : [];



  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  useEffect(() => {
    setLoading(true);
    fetchTableData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      showSnackbar("User Added successfully", "success");
      setOpenDialog(false);
      await handleAddLocation();
      setFormLocation("");
    } catch (error) {
      console.error("Error while adding user:", error);
      showSnackbar("Something went wrong. Please try again later!!");
    }
  };

  const handleAddLocation = async () => {
    const params = {
      location: formLocation,
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.addLocation,
        params,
        cookies
      );
      console.log(response);
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          fetchTableData();
        } else if (response.data.responseCode === "400") {
          alert(response.data.responseCode);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again later!!");
    }
  };

  const fetchTableData = async () => {
    const params = {
      status: 'Active',
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getLocations,
        params,
        cookies
      );
      console.log(params);
      if (response?.status === 200) {
        setRows(response.data.locations);
        setLoading(false);
        // console.log(response.data.Locations);
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
        config.getMyCollege + apiList.getLocations,
        params,
        cookies
      );

      if (response?.status === 200) {
        const userData = response.data.Locations;
        setSelectedRow({
          item1: userData.id,
          item2: userData.location,
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
      Location: selectedRow.item2,
      status: "Active",
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updateLocation,
        params,
        cookies
      );
      if (response?.status === 200) {
        setOpenDialogEdit(false);
        fetchTableData();
        showSnackbar("User updated successfully");
      } else if (response?.status === 400) {
        showSnackbar("Failed to update. Please try again later!!");
      }
    } catch (error) {
      showSnackbar("Failed to update. Please try again later!!");
    }
  };

  const handleInstituteDelete = async () => {
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.deleteLocation,
        { id: deleteItemId },
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          showSnackbar("Location deleted successfully");
          setOpenDeleteDialog(false);
          setRows(rows.filter((row) => row.id !== deleteItemId));
          fetchTableData();
        } else if (response.data.responseCode === "400") {
          showSnackbar("Failed to delete. Please try again later!!");
        }
      }
    } catch (error) {
      showSnackbar("Failed to delete. Please try again later!!");
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
    setFormLocation("");
    setOpenDialog(false);
  };

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  const columns = [
    { id: "item1", label: "Sl. No" },
    { id: "item2", label: "Location" },
    { id: "item3", label: "Action" },
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
                    <AddIcon style={{ fontSize: isMobileScreen ? 12 : 14 }} />
                  }
                  onClick={handleOpenDialog}
                  sx={{
                    height: isMobileScreen ? "20px" : "25px",
                    whiteSpace: "nowrap",
                    fontSize: isMobileScreen ? 8 : isSmallScreen ? 10 : 12,
                  }}
                >
                  Add New Location
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
                {/* {isUsersPage && ( */}
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
                                          fontSize: isSmallScreen ? 11 : 12,
                                          "@media (min-width: 1440px) and (max-width:2000px)":
                                          {
                                            whiteSpace: "nowrap",
                                          },
                                        }}
                                      >
                                        {row.location}
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          py: "6px",
                                          textAlign: "left",

                                          "@media (min-width: 1440px) and (max-width:2000px)":
                                          {
                                            whiteSpace: "nowrap",
                                          },
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
                                            handleViewEdit(row.id, row.location)
                                          }
                                        >
                                          <EditIcon
                                            style={{
                                              fontSize: isSmallScreen
                                                ? 13
                                                : 14,
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
                                              fontSize: isSmallScreen
                                                ? 13
                                                : 14,
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
                </>
                {/* )} */}

                <Dialog
                  open={openDialog}
                  onClose={handleCloseDialog}
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
                      Add New Location
                    </DialogTitle>
                    <DialogContent>
                      <Grid container md={12} xs={12}>
                        <Grid item md={12} xs={12} sx={{ my: 1 }}>
                          <InputLabel
                            sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                          >
                            Location*:
                          </InputLabel>
                          <TextField
                            placeholder="Enter the Location"
                            autoFocus
                            fullWidth
                            value={formLocation}
                            onChange={(e) => {
                              setFormLocation(e.target.value);
                            }}
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleCloseDialog}
                        sx={{
                          my: 1,
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
                        onClick={handleSubmit}
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
                        Add Location
                      </Button>
                    </DialogActions>
                  </Container>
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
                      Edit Type of Institute
                    </DialogTitle>
                    <DialogContent>
                      <Grid container md={12} xs={12}>
                        <Grid item md={12} xs={12} sx={{ my: 1 }}>
                          <InputLabel
                            sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                          >
                            Type Institute*:
                          </InputLabel>

                          <TextField
                            placeholder="Enter the Location"
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
                      </Grid>
                    </DialogContent>
                    <DialogActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: isMobileScreen ? "center" : "flex-end",
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
                        mb: 2,
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
                          <Typography sx={{ textAlign: "center" }}>
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
                          onClick={handleInstituteDelete}
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
      </Grid>
    </>
  );
}

export default Locations;
