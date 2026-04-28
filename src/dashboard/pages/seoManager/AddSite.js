import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Autocomplete,
  Snackbar,
  Paper,
  Pagination,
  PaginationItem,
  CircularProgress,
  InputAdornment,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Sidenav from "../../common/Sidenav";
import Header from "../../common/Header";
import { SeoButtons } from "./SeoButtons";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DialogContentText from "@mui/material/DialogContentText";
import IconSidenav from "../../common/IconSidenav";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import NavigatedComponent from "../NavigatedComponent";
import SearchIcon from "@mui/icons-material/Search";

const AddSite = () => {
  const { id } = useParams();
  const [cookies] = useCookies();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const isUsersPage = location.pathname === "/seo-manager/add-sites";
  const [selectedPageType, setSelectedPageType] = useState("");
  const [page, setPage] = useState(0);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );
  const [rowsPerPage, setRowsPerPage] = useState(isMobileScreen ? 5 : 10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [siteType, setSiteType] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  // for edit
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [editId, setEditId] = useState("");
  const [editSiteType, setEditSiteType] = useState("");
  const [editSiteName, setEditSiteName] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.trimStart());
  };

  const filteredRows = rows.filter((row) => {
    const { siteType, siteName } = row;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      (siteType && siteType.toLowerCase().includes(lowerCaseQuery)) ||
      (siteName && siteName.toLowerCase().includes(lowerCaseQuery))
    );
  });

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  useEffect(() => {
    setLoading(true);

    getAllSites();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPageType("");
    setSelectedSubType("");
  };

  const handleSubTypeChange = (event) => {
    setSelectedSubType(event.target.value);
  };

  const columns = [
    { id: "item1", label: "Sl. No" },
    { id: "item2", label: "Site Type " },
    { id: "item3", label: "Site Name " },
    { id: "item4", label: "Action" },
  ];

  // add site api
  const handleAddSite = async () => {
    const params = {
      siteName,
      siteType,
    };

    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.addSite,
        params,
        cookies
      );

      console.log(response);

      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode == "GM003") {
          alert("Site already exist");
          setOpenDialog(false);
        }
        if (response.data.responseCode === "200") {
          alert("Data Saved Successfully");
          setOpenDialog(false);
        } else if (response.data.responseCode === "400") {
          alert("Something went wrong! please try again");
          setOpenDialog(false);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const paginatedData = Array.isArray(rows)
    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  // get all sites
  useEffect(() => {
    setLoading(true);
    getAllSites();
  }, []);

  const getAllSites = async () => {
    const params = {
      siteType: "Static, Blog",
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getAllSites,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        setRows(response.data.allSites);
        setLoading(false);
        // console.log(response.data.allSites);
      } else {
        console.error("Failed to fetch data:", response);
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
    }
  };

  // for edit popup
  const handleOpenEditPopup = (getId, getSiteType, getSiteName) => {
    setEditId(getId);
    setEditSiteType(getSiteType);
    setEditSiteName(getSiteName);
    setOpenEditPopup(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditPopup(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  const handleDelete = async (id) => {
    setDeleteTargetId(id);
    setOpenDeleteDialog(true);
  };

  const handleSaveChanges = async () => {
    const params = {
      id: editId,
      siteName: editSiteName,
      siteType: editSiteType,
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updateSite,
        params,
        cookies
      );
      if (response?.status === 200) {
        // Update the site in the list
        const updatedRows = rows.map((row) => {
          if (row.id === editId) {
            return {
              ...row,
              siteName: editSiteName,
              siteType: editSiteType,
            };
          }
          return row;
        });
        setRows(updatedRows);
        // Show snackbar message
        showSnackbar("Site updated successfully", "success");
        // Close edit popup
        setOpenEditPopup(false);
      } else if (response?.status === 400) {
        showSnackbar("Failed to update. Please try again later!!", "error");
      }
    } catch (error) {
      showSnackbar("Failed to update. Please try again later!!", "error");
    }
  };
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };
  const handleConfirmDelete = async () => {
    setOpenDeleteDialog(false);
    const params = {
      id: deleteTargetId,
    };

    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.deleteSite,
        params,
        cookies
      );

      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          showSnackbar("Record deleted successfully");
          getAllSites();
        } else if (response.data.responseCode === "400") {
          showSnackbar("Failed to update. Please try again later!!");
        }
      }
    } catch (error) {
      showSnackbar("Failed to delete. Please try again later!!");
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
          <Grid sx={{ py: 1 }}>
            <NavigatedComponent pathname={location.pathname} />
            <Grid sx={{ width: "100%", px: isMobileScreen ? 1 : 5 }}>
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
                  startIcon={<AddIcon style={{ fontSize: 14 }} />}
                  onClick={handleOpenDialog}
                  sx={{
                    height: isMobileScreen ? "15px" : "25px",
                    whiteSpace: "nowrap",
                    fontSize: isMobileScreen ? 8 : 12,
                  }}
                >
                  Add Page
                </Button>
              </Box>

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
                        height: isMobileScreen ? 10 : 15,
                        fontSize: isMobileScreen ? 12 : 14,
                      },
                    }}
                    sx={{
                      width: isMobileScreen ? "250px" : "400px",
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
                          height: isMobileScreen ? "100px" : "200px",
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
                                gap: isMobileScreen ? 1 : 10,
                              }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <InputLabel
                                  sx={{
                                    mx: 1,
                                    fontSize: isMobileScreen ? 10 : 12,
                                  }}
                                >
                                  Row per page
                                </InputLabel>
                                <Select
                                  value={rowsPerPage}
                                  onChange={handleChangeRowsPerPage}
                                  sx={{
                                    height: 25,
                                    fontSize: isMobileScreen ? 10 : 12,
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
                                    value={isMobileScreen ? 5 : 10}
                                    sx={{
                                      fontSize: isMobileScreen ? 10 : 12,
                                      "&.MuiButtonBase-root": {
                                        minHeight: 0,
                                      },
                                    }}
                                  >
                                    {isMobileScreen ? 5 : 10}
                                  </MenuItem>
                                  <MenuItem
                                    value={isMobileScreen ? 10 : 20}
                                    sx={{
                                      fontSize: isMobileScreen ? 10 : 12,
                                      "&.MuiButtonBase-root": {
                                        minHeight: 0,
                                      },
                                    }}
                                  >
                                    {isMobileScreen ? 10 : 20}
                                  </MenuItem>
                                  <MenuItem
                                    value={isMobileScreen ? 15 : 30}
                                    sx={{
                                      fontSize: isMobileScreen ? 10 : 12,
                                      "&.MuiButtonBase-root": {
                                        minHeight: 0,
                                      },
                                    }}
                                  >
                                    {isMobileScreen ? 15 : 30}
                                  </MenuItem>
                                </Select>
                              </Box>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <InputLabel
                                  sx={{
                                    mx: 1,
                                    fontSize: isMobileScreen ? 10 : 12,
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

                                      fontSize: isMobileScreen ? 10 : 12,
                                      padding: "1px 7px",
                                    },
                                  }}
                                  sx={{ width: isMobileScreen ? 40 : 60 }}
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
                                      fontSize: isMobileScreen ? 10 : 12,
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
                                        width: `${100 / columns.length}%`,
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
                                          fontSize: 13,
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
                                            fontSize: 12,
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
                                            fontSize: 12,
                                          }}
                                        >
                                          {row.siteType}
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            py: "6px",
                                            textAlign: "left",
                                            "@media (min-width: 1440px) and (max-width:2000px)":
                                            {
                                              whiteSpace: "nowrap",
                                            },
                                            fontSize: 12,
                                          }}
                                        >
                                          {row.siteName}
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
                                              marginRight: 2,
                                              height: "20px",
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
                                                row.siteType,
                                                row.siteName
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
                                              marginRight: 2,
                                              height: "20px",
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
                                            onClick={() => handleDelete(row.id)}
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
                  </>
                )}

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
                      Add Site
                    </DialogTitle>
                    <DialogContent>
                      <Grid container spacing={isMobileScreen ? 0 : 2}>
                        <Grid item md={12} xs={12}>
                          <InputLabel
                            sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                          >
                            Site Type*:
                          </InputLabel>
                          <Autocomplete
                            value={siteType}
                            onChange={(event, newValue) => {
                              setSiteType(newValue ? newValue : "");
                            }}
                            options={["Static", "Blog"]}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select Site Type"
                                sx={{
                                  "& .MuiInputBase-input": {
                                    height: "8px",
                                    fontSize: 14,
                                  },
                                  "& .MuiAutocomplete-inputRoot": {
                                    height: "45px",
                                  },
                                }}
                              />
                            )}
                            ListboxComponent={(props) => (
                              <Paper
                                {...props}
                                style={{ maxHeight: "200px", fontSize: 14 }}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={12} xs={12} sx={{ my: 1 }}>
                          <InputLabel
                            sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                          >
                            Site Name*:
                          </InputLabel>
                          <TextField
                            fullWidth
                            value={siteName}
                            onChange={(event) => {
                              setSiteName(event.target.value);
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
                        onClick={handleAddSite}
                      >
                        Add Site
                      </Button>
                    </DialogActions>
                  </Container>
                </Dialog>

                {/* edit popup */}

                <Dialog
                  open={openEditPopup}
                  onClose={handleCloseEditDialog}
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
                      Edit Add Site
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
                            Site Type*:
                          </InputLabel>
                          <Autocomplete
                            value={editSiteType}
                            onChange={(event, newValue) => {
                              setSiteType(newValue ? newValue : "");
                            }}
                            options={["Static", "Blog"]}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select Institute Type"
                                sx={{
                                  "& .MuiInputBase-input": {
                                    height: "8px",
                                    fontSize: 14,
                                  },
                                  "& .MuiAutocomplete-inputRoot": {
                                    height: "45px",
                                  },
                                }}
                              />
                            )}
                            ListboxComponent={(props) => (
                              <Paper
                                {...props}
                                style={{ maxHeight: "200px", fontSize: 14 }}
                              />
                            )}
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
                            Site Name*:
                          </InputLabel>
                          <TextField
                            fullWidth
                            value={editSiteName}
                            onChange={(event) => {
                              setEditSiteName(event.target.value);
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
                        onClick={handleCloseEditDialog}
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
                  onClose={handleCancelDelete}
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
                          onClick={handleCancelDelete}
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
                          onClick={handleConfirmDelete}
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
                  autoHideDuration={6000}
                  onClose={handleSnackbarClose}
                  message={snackbarMessage}
                  severity={snackbarSeverity}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                ></Snackbar>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddSite;
