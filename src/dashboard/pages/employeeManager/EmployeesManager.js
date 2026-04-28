import React, { useEffect, useState } from "react";
import Sidenav from "../../common/Sidenav";
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
  Select,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  Pagination,
  PaginationItem,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import Header from "../../common/Header";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";
import NavigatedComponent from "../NavigatedComponent";
import IconSidenav from "../../common/IconSidenav";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import SearchIcon from "@mui/icons-material/Search";

const EmployeesManager = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );
  const isUsersPage = location.pathname === "/employee-manager/users";

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.trimStart());
  };

  const filteredRows = rows.filter((row) => {
    const { name, phoneNumber, email, roles, status } = row;
    const lowerCaseQuery = searchQuery.toLowerCase();
    const rolesString = roles.join(", ").toLowerCase();
    return (
      (name && name.toLowerCase().includes(lowerCaseQuery)) ||
      (phoneNumber && phoneNumber.toLowerCase().includes(lowerCaseQuery)) ||
      (email && email.toLowerCase().includes(lowerCaseQuery)) ||
      (status && status.toLowerCase().includes(lowerCaseQuery)) ||
      (rolesString && rolesString.includes(lowerCaseQuery))
    );
  });

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  useEffect(() => {
    setLoading(true);

    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    const params = {
      roles: ["Admin", "Team Leader", "Telecaller", "Interns"],
      status: "Active",
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getUsers,
        params,
        cookies
      );
      console.log(params);
      if (response?.status === 200) {
        setRows(response.data.users);
        setLoading(false);
        console.log(response.data.users);
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
        config.getMyCollege + apiList.getUser,
        params,
        cookies
      );

      if (response?.status === 200) {
        const userData = response.data.users;

        setSelectedRow({
          item1: userData.id,
          item2: userData.name,
          item3: userData.phoneNumber,
          item4: userData.email,
          item5: null,
          item6: userData.roles[0],
          status: "Active",
        });
        setOpenDialog(true);
      } else if (
        response?.status === 400 &&
        response?.data?.responseMessage === "Malformed JSON request"
      ) {
        showSnackbar(
          "Malformed JSON request. Please check your request format."
        );
      } else if (
        response?.status === 400 &&
        response?.data?.responseMessage ===
        "id - is an empty or not in valid format"
      ) {
        showSnackbar(
          "ID is empty or not in a valid format. Please provide a valid ID."
        );
      } else if (
        response?.status === 404 &&
        response?.data?.responseMessage ===
        "The user is not found in the system. id:5"
      ) {
        showSnackbar("The user is not found in the system.");
      } else {
        showSnackbar("Something went wrong. Please try again later!!");
      }
    } catch (error) {
      // console.error("Error during data fetch:", error);
      showSnackbar("Failed to fetch. Please try again later!!");
    }
  };

  // Function to handle saving changes
  const handleSaveChanges = async () => {
    const params = {
      id: selectedRow.item1,
      name: selectedRow.item2,
      phoneNumber: selectedRow.item3,
      email: selectedRow.item4,
      role: selectedRow.item6,
      status: "Active",
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updateUser,
        params,
        cookies
      );
      if (response?.status === 200) {
        // console.log("User updated successfully");
        setOpenDialog(false);
        fetchTableData();
        showSnackbar("User updated successfully");
      } else if (response?.status === 400) {
        // console.error("Error: Bad request -", response.data.responseCode);
        // alert(response.data.responseCode);
        showSnackbar("Failed to update. Please try again later!!");
      }
    } catch (error) {
      // console.error("Error during user update:", error);
      showSnackbar("Failed to update. Please try again later!!");
    }
  };

  // Function to handle user deletion
  const handleDelete = async (id) => {
    const params = {
      id: id,
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.deleteUser,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          showSnackbar("User deleted successfully");
          fetchTableData();
        } else if (response.data.responseCode === "400") {
          showSnackbar("Failed to update. Please try again later!!");
        }
      }
    } catch (error) {
      showSnackbar("Failed to delete. Please try again later!!");
    }
  };

  // Function to handle page change in pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change in pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Function to handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to show Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Function to close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Define table columns
  const columns = [
    { id: "item1", label: "Sl. No" },
    { id: "item2", label: "Name" },
    { id: "item3", label: "Phone" },
    { id: "item4", label: "Email" },
    { id: "item5", label: "Role" },
    { id: "item6", label: "Status" },
    { id: "item7", label: "Action" },
  ];

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

            <Grid sx={{ width: "100%", px: isMobileScreen ? 1 : 5 }}>
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
                                            fontSize: 12,
                                          }}
                                        >
                                          {row.phoneNumber}
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
                                          {row.email}
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
                                          {row.roles}
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
                                              handleViewEdit(row.id)
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
                {/* Dialog for editing user */}
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
                      Edit User
                    </DialogTitle>
                    <DialogContent>
                      <Grid container md={12} xs={12}>
                        <Grid item md={12} xs={12} sx={{ my: 1 }}>
                          <InputLabel
                            sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                          >
                            Name*:
                          </InputLabel>
                          <TextField
                            placeholder="Enter your Full Name"
                            autoFocus
                            fullWidth
                            value={selectedRow?.item2}
                            onChange={(e) =>
                              setSelectedRow({
                                ...selectedRow,
                                item2: e.target.value,
                              })
                            }
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                        </Grid>
                        <Grid item md={12} xs={12} sx={{ my: 1 }}>
                          <InputLabel
                            sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                          >
                            Phone*:
                          </InputLabel>
                          <TextField
                            placeholder="Enter Phone Number"
                            autoFocus
                            fullWidth
                            value={selectedRow?.item3}
                            onChange={(e) =>
                              setSelectedRow({
                                ...selectedRow,
                                item3: e.target.value,
                              })
                            }
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                        </Grid>
                        {/* <Grid item md={12} xs={12} sx={{ my: 1 }}>
                          <InputLabel
                            sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                          >
                            Email*:
                          </InputLabel>
                          <TextField
                            placeholder="admin@getmycollege.com"
                            autoFocus
                            fullWidth
                            value={selectedRow?.item4}
                            onChange={(e) =>
                              setSelectedRow({
                                ...selectedRow,
                                item4: e.target.value,
                              })
                            }
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                        </Grid> */}

                        <Grid item md={12} xs={12}>
                          <InputLabel
                            sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                          >
                            Role*:
                          </InputLabel>
                          <Select
                            fullWidth
                            value={selectedRow?.item6}
                            onChange={(e) =>
                              setSelectedRow({
                                ...selectedRow,
                                item6: e.target.value,
                              })
                            }
                            style={{
                              height: "40px",
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
                            <MenuItem
                              value="--Select--"
                              disabled
                              style={{ fontSize: 14 }}
                            >
                              --Select--
                            </MenuItem>
                            <MenuItem
                              value={"Team Leader"}
                              style={{ fontSize: 14 }}
                            >
                              Team Leader
                            </MenuItem>
                            <MenuItem
                              value={"Telecaller"}
                              style={{ fontSize: 14 }}
                            >
                              Telecaller
                            </MenuItem>
                          </Select>
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
                        onClick={handleSaveChanges}
                        color="primary"
                        sx={{
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
                {/* Snackbar */}
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
};

export default EmployeesManager;
