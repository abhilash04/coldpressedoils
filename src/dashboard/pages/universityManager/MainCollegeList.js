import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Pagination,
  PaginationItem,
  MenuItem,
  Select,
  InputLabel,
  TableRow,
  TextField,
  Grid,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../../../../../config/config";
import { apiList, invokeApi } from "../../../../../services/apiServices";
import SideNav from "../../common/Sidenav";
import Header from "../../common/Header";
import NavigatedComponent from "../NavigatedComponent";
import SearchIcon from "@mui/icons-material/Search";
import IconSidenav from "../../common/IconSidenav";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const MainCollegeList = () => {
  const [cookies] = useCookies();
  const location = useLocation();
  const isUsersPage =
    location.pathname === "/university-manager/main-college-list";
  const navigate = useNavigate();
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
  const [rows, setRows] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  const buttonData = [
    {
      label: "College List",
      color: "primary",
      path: "/university-manager/college-list",
    },
    {
      label: "Main College List",
      color: "info",
      path: "/university-manager/main-college-list",
    },
  ];
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.trimStart());
  };

  const filteredRows = rows.filter((row) => {
    const { collegeName, createdBy, status } = row;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      (collegeName && collegeName.toLowerCase().includes(lowerCaseQuery)) ||
      (createdBy && createdBy.toLowerCase().includes(lowerCaseQuery)) ||
      (status && status.toLowerCase().includes(lowerCaseQuery))
    );
  });

  useEffect(() => {
    setLoading(true);
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    const params = { status: "Pending Approval, Active" };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getMainColleges,
        params,
        cookies
      );
      // console.log(params);
      if (response?.status === 200) {
        setRows(response.data.mainColleges);
        setLoading(false);
        console.log(response.data);
      } else {
        console.error("Failed to fetch data:", response);
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
    }
  };
  const handleView = async (id) => {
    const params = {
      id: id,
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getCollege,
        params,
        cookies
      );

      if (response?.status === 200) {
        const userData = response.data.colleges;

        navigate(`/university-manager/view-main-college/${id}`, {
          state: { userData },
        });
      } else {
        showSnackbar("Something went wrong. Please try again later!!");
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
      showSnackbar("Something went wrong. Please try again later!!");
    }
  };
  const handleEdit = async (id) => {
    const params = {
      id: id,
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getCollege,
        params,
        cookies
      );

      if (response?.status === 200) {
        const userData = response.data.colleges;

        navigate(`/university-manager/edit-main-college/${id}`, {
          state: { userData },
        });
      } else {
        showSnackbar("Something went wrong. Please try again later!!");
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
      showSnackbar("Something went wrong. Please try again later!!");
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "item1", label: "Sl. No" },
    { id: "item2", label: "Logo" },
    { id: "item3", label: "College Name" },
    { id: "item4", label: "Created By" },
    { id: "item5", label: "Status" },
    { id: "item6", label: "Action" },
  ];

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <div>
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
                  display: "flex",
                  flexWrap: "wrap",
                  gap: isMobileScreen ? 1 : 2,

                  py: 2,
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
                      height: isMobileScreen ? "20px" : "25px",
                      whiteSpace: "nowrap",
                      fontSize: isMobileScreen ? 8 : isSmallScreen ? 10 : 12,
                    }}
                  >
                    {button.label}
                  </Button>
                ))}
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
                                          }}
                                        >
                                          <Grid
                                            sx={{
                                              width: isSmallScreen ? 16 : 22,
                                              height: isSmallScreen ? 16 : 22,
                                            }}
                                          >
                                            <img
                                              src={row.collegeLogoUrl}
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
                                          {row.collegeName}
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
                                          {row.createdBy}
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
                                            "@media (min-width: 1440px) and (max-width:2000px)":
                                              {
                                                whiteSpace: "nowrap",
                                              },
                                            fontSize: isSmallScreen ? 11 : 12,
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
                                                border: "1px solid #1565c0",
                                                minWidth: 30,
                                                py: 1,
                                              },
                                              "@media (min-width: 1440px) and (max-width:2000px)":
                                                {
                                                  my: 0,
                                                },
                                            }}
                                            onClick={() => handleView(row.id)}
                                          >
                                            <VisibilityOutlinedIcon
                                              style={{
                                                fontSize: isSmallScreen
                                                  ? 13
                                                  : 14,
                                                color: "#1565c0",
                                              }}
                                            />
                                          </Button>
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
                                            onClick={() => handleEdit(row.id)}
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
                                            // onClick={() => handleOpenDeleteDialog(row.id)}
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
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainCollegeList;
