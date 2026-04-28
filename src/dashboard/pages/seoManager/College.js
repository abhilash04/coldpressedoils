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
  Pagination,
  PaginationItem,
  TextField,
  Paper,
  CircularProgress,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import Sidenav from "../../common/Sidenav";
import Header from "../../common/Header";
import { SeoButtons } from "./SeoButtons";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { apiList, invokeApi } from "../../../../../services/apiServices";
import { config } from "../../../../../config/config";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import IconSidenav from "../../common/IconSidenav";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import NavigatedComponent from "../NavigatedComponent";
import SearchIcon from "@mui/icons-material/Search";

const College = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  const isUsersPage = location.pathname === "/seo-manager/colleges";
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
  const [showSideNav, setShowSideNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.trimStart());
  };
  const filteredRows = rows.filter((row) => {
    const { siteType, siteName, createdBy } = row;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      (siteType && siteType.toLowerCase().includes(lowerCaseQuery)) ||
      (siteName && siteName.toLowerCase().includes(lowerCaseQuery)) ||
      (createdBy && createdBy.toLowerCase().includes(lowerCaseQuery))
    );
  });
  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubTypeChange = (event) => {
    setSelectedSubType(event.target.value);
  };

  const columns = [
    { id: "item1", label: "Sl. No" },
    { id: "item2", label: "Site Type " },
    { id: "item3", label: "Site Name " },
    { id: "item3", label: "Created By" },
    { id: "item4", label: "Add MetaData" },
  ];

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
      siteType: "College",
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
      } else {
        console.error("Failed to fetch data:", response);
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
    }
  };

  const handleAddPage = (id) => {
    navigate(`/seo-manager/add-metadata/${id}`);
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
                                            "@media (min-width: 1440px) and (max-width:2000px)":
                                              {
                                                whiteSpace: "nowrap",
                                              },
                                            fontSize: 12,
                                          }}
                                        >
                                          {row.createdBy}
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
                                                border: "1px solid #1565c0",
                                                minWidth: 30,
                                                py: 1,
                                              },
                                              "@media (min-width: 1440px) and (max-width:2000px)":
                                                {
                                                  my: 0,
                                                },
                                            }}
                                            onClick={() =>
                                              handleAddPage(row.id)
                                            }
                                          >
                                            <AddIcon
                                              style={{
                                                fontSize: 14,
                                                color: "#1565c0",
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
                                              navigate(
                                                `/seo-manager/edit-metadata/college/${row.id}`
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
                                          {/* <Button
                          variant="contained"
                          color="primary"
                          startIcon={<VisibilityIcon />}
                          size="small"
                          sx={{ marginRight: 1, fontSize: "0.75rem" }}
                          onClick={() => handleView(row.id)}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<EditIcon />}
                          size="small"
                          sx={{ marginRight: 1, fontSize: "0.75rem" }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<DeleteIcon />}
                          size="small"
                          sx={{
                            marginRight: 1,
                            marginLeft: "2px",
                            fontSize: "0.75rem",
                          }}
                          onClick={() => handleOpenDeletePopup()}
                        >
                          Delete
                        </Button> */}
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default College;
