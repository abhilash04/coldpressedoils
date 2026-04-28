import React, { useEffect, useRef, useState } from "react";
import {
  School as SchoolIcon,
  LibraryBooks as LibraryBooksIcon,
  Person as PersonIcon,
  Event as EventIcon,
  LocalLibrary as LocalLibraryIcon,
  AccessTime as FakeIcon,
  PlaylistAddCheck as FollowUpIcon,
  ErrorOutline as ConvertedIcon,
  Info as OtherDetailsIcon,
  DoNotDisturbAlt as DoNotDisturbAltIcon,
  ThumbUpOffAlt as ThumbUpOffAltIcon,
  Cached as CachedIcon,
  FileDownloadRounded as FileDownloadRoundedIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputLabel,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextareaAutosize,
  Typography,
  Paper,
  Grid,
  Pagination,
  PaginationItem,
  Select,
  MenuItem,
  CircularProgress,
  InputAdornment,
  FormControl,
  Container,
  useMediaQuery,
} from "@mui/material";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";
import CloseIcon from "@mui/icons-material/Close";
import NavigatedComponent from "../NavigatedComponent";
import Header from "../../common/Header";
import Sidenav from "../../common/Sidenav";
import { useLocation } from "react-router-dom";
import IconSidenav from "../../common/IconSidenav";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const FreshLeads = () => {
  const location = useLocation();
  const [page, setPage] = useState(0);
  const isUsersPage = location.pathname === "/lead-manager/fresh-leads";
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
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openDialog, setOpenDialog] = useState(false);

  const [id, setId] = useState("");

  const [otherDetailsId, setOtherDetailsId] = useState(null);
  const [lead, setLead] = useState([]);
  const [isFake, setIsFake] = useState("");
  const [fakeId, setFakeId] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [nextFollowUpDate, setNextFollowUpDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("XLS");
  const [leadStatus, setLeadStatus] = useState("Fresh");
  const [showSideNav, setShowSideNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // analytics
  const [todayLeads, setTodayLeads] = useState("");
  const [yesterdayLeads, setYesterdayLeads] = useState("");
  const [dayBeforeYesterdayLeads, setDayBeforeYesterdayLeads] = useState("");
  const [thisMonthLeads, setThisMonthLeads] = useState("");
  const [totalLeads, setTotalLeads] = useState("");

  const calculateLeadTotals = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(today.getDate() - 2);

    const getPreviousSunday = (date) => {
      const currentDay = date.getDay();
      const distanceToPreviousSunday = (currentDay + 7) % 7;
      const previousSunday = new Date(date);
      previousSunday.setDate(date.getDate() - distanceToPreviousSunday);
      return previousSunday;
    };

    const getPreviousSaturday = (previousSunday) => {
      const previousSaturday = new Date(previousSunday);
      previousSaturday.setDate(previousSunday.getDate() + 6);
      return previousSaturday;
    };

    const previousSunday = getPreviousSunday(today);
    const previousSaturday = getPreviousSaturday(previousSunday);

    // Set the start date to the first day of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Set the end date to the last day of the current month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const todayLeads = rows.filter(
      (row) => new Date(row.lead_date).toDateString() === today.toDateString()
    );
    const yesterdayLeads = rows.filter(
      (row) =>
        new Date(row.lead_date).toDateString() === yesterday.toDateString()
    );
    const dayBeforeYesterdayLeads = rows.filter(
      (row) =>
        new Date(row.lead_date).toDateString() ===
        dayBeforeYesterday.toDateString()
    );
    const oneWeekLeads = rows.filter(
      (row) =>
        new Date(row.lead_date) >= previousSunday &&
        new Date(row.lead_date) <= previousSaturday
    );
    const oneMonthLeads = rows.filter(
      (row) =>
        new Date(row.lead_date) >= startOfMonth &&
        new Date(row.lead_date) <= endOfMonth
    );

    return {
      today: todayLeads.length,
      yesterday: yesterdayLeads.length,
      dayBeforeYesterday: dayBeforeYesterdayLeads.length,
      oneWeek: oneWeekLeads.length,
      oneMonth: oneMonthLeads.length,
      total: rows.length,

    };
  };

  const leadTotals = calculateLeadTotals();
  // console.log("Leads Counts",leadTotals);
  
 
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.trimStart());
  };
  const filteredRows = rows.filter((row) => {
    const { name, phone, email, leadType, leadDate } = row;
    const lowerCaseQuery = searchQuery.toLowerCase();
    const formattedLeadDate = new Date(leadDate).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return (
      (name && name.toLowerCase().includes(lowerCaseQuery)) ||
      (phone && phone.toLowerCase().includes(lowerCaseQuery)) ||
      (email && email.toLowerCase().includes(lowerCaseQuery)) ||
      (leadType && leadType.toLowerCase().includes(lowerCaseQuery)) ||
      (formattedLeadDate &&
        formattedLeadDate.toString().includes(lowerCaseQuery))
    );
  });

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  // const [openDialog, setOpenDialog] = useState(false);

  const handleFakeButtonClick = (getFakeId) => {
    setFakeId(getFakeId);
    setLeadStatus("Fake");
    setOpenDialog(true);
  };

  const handleConfirmFake = (e) => {
    setOpenDialog(false);
    updateLeadStatus(e);
    setOpenSnackbar(true);
    setId(e);
    const fakeLeadStatus = "Fake";
    console.log("Fake Lead Status:", fakeLeadStatus);

    showSnackbar("Successfull");
  };

  const handleFollowUpButtonClick = (getFollowUpId) => {
    setOpenFollowUpDialog(true);
    setFakeId(getFollowUpId);
    setLeadStatus("FollowUp");
  };

  const handleConfirmFollowUp = (e) => {
    if (!followUpDate || !nextFollowUpDate) {
      showSnackbar(
        "Please fill in both Follow up Date and Next follow up Date.",
        "error"
      );
    } else {
      showSnackbar("Successfully");
      setOpenFollowUpDialog(false);
      updateLeadStatus(e);
      setId(e);
      setFollowUpDate("");
      setNextFollowUpDate("");
      setRemarks("");
    }
  };

  const handleCancelFollowUp = () => {
    setOpenFollowUpDialog(false);
    setFollowUpDate("");
    setNextFollowUpDate("");
    setRemarks("");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleCancelFake = () => {
    setOpenDialog(false);
  };

  //followup functionality

  const [openFollowUpDialog, setOpenFollowUpDialog] = useState(false);
  const [openConvertDialog, setOpenConvertDialog] = useState(false);

  //other details functionality

  const [openOtherDetailsDialog, setOpenOtherDetailsDialog] = useState(false);

  const handleOtherDetailsButtonClick = (e) => {
    console.log("Clicked row ID:", id);
    setOpenOtherDetailsDialog(true);
    setOtherDetailsId(e);
  };

  const handleCloseOtherDetailsDialog = () => {
    setOpenOtherDetailsDialog(false);
  };

  const handleConvertedButtonClick = (getConvertedId) => {
    setOpenConvertDialog(true);
    setFakeId(getConvertedId);
    setLeadStatus("Converted");
  };

  const handleConvertedClick = (e) => {
    setOpenConvertDialog(false);
    updateLeadStatus(e);
    setOpenSnackbar(true);
    showSnackbar("Successfull");

    setId(e);
  };

  const columns = [
    { id: "item1", label: "Sl. No" },
    { id: "item2", label: "Name" },
    { id: "item3", label: "Date-Time" },
    { id: "item4", label: "Phone" },
    // { id: "item5", label: "Email" },
    { id: "item6", label: "Source" },
    // { id: "item7", label: "Lead Type" },
    { id: "item8", label: "Status/Action" },
  ];
  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setFromDate("");
    setToDate("");
  };

  const handleDownloadClick = () => {
    alert("Export functionality requires additional setup. Please contact the administrator.");
  };

  useEffect(() => {
    setLoading(true);
    fetchTableData();
  }, []);

  // const fetchLeadAnalytics = async () => {
  //   const params = {
  //     leadStatus,
  //     leadFlag: "Organic, Blog",
  //   };
  //   try {
  //     const response = await invokeApi(
  //       config.getMyCollege + apiList.getLeadAnalytics,
  //       params,
  //       cookies
  //     );
  //     if (response?.status === 200) {
  //       setTodayLeads(response.data.leads[0].todayLeads);
  //       setYesterdayLeads(response.data.leads[0].yesterdayLeads);
  //       setDayBeforeYesterdayLeads(response.data.leads[0].dayBeforeYesterdayLeads);
  //       setThisMonthLeads(response.data.leads[0].thisMonthLeads);
  //       setTotalLeads(response.data.leads[0].totalLeads);
  //     } else {
  //       console.error("Failed to fetch data:", response);
  //     }
  //   } catch (error) {
  //     console.error("Error during data fetch:", error);
  //   }
  // };

  const fetchTableData = async () => {
    const params = {
      leadStatus,
    };
    console.log(params);
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getLeads,
        params,
        cookies
      );
      console.log(params);
      if (response?.status === 200) {
        console.log(response.data.leads);
        setRows(response.data.leads);
        setLoading(false);
        console.log(response.data.leads);
      } else {
        console.error("Failed to fetch data:", response);
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
    }
  };

  //getLead

  useEffect(() => {
    getLeadData(otherDetailsId || id);
  }, [otherDetailsId]);

  const getLeadData = async (id) => {
    const params = {
      id: id,
    };

    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getLead,
        params,
        cookies
      );
      console.log(params);

      if (response?.status === 200) {
        console.log(response.data.lead);
        setLead(response.data.lead);
      } else {
        console.error("Failed to fetch data:", response);
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
    }
  };

  // updateLeadStatus api
  useEffect(() => {
    if (id) {
      updateLeadStatus();
    }
  }, []);

  const updateLeadStatus = async () => {
    const params = {
      id: fakeId,
      leadStatus,
      followUpDate,
      nextFollowUpDate,
      remarks,
    };

    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updateLeadStatus,
        params,
        cookies
      );
      console.log(params);
      if (response?.status === 200) {
        // fetchTableData();
        setIsFake(response.data.lead);
      } else {
        console.error("Failed to fetch data:", response);
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
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
                <Grid item md={8} xs={8}>
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

                <Grid
                  item
                  md={4}
                  xs={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{
                      height: isMobileScreen ? "15px" : "25px",
                      whiteSpace: "nowrap",
                      fontSize: isMobileScreen ? 8 : isSmallScreen ? 10 : 12,
                    }}
                    onClick={handleDownloadClick}
                  >
                    <FileDownloadRoundedIcon style={{ fontSize: 14 }} />
                    &nbsp;Export
                  </Button>
                </Grid>
              </Grid>

              <Grid
                sx={{
                  my: 1,
                  display: "flex",
                  flexDirection: isMobileScreen ? "column" : "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: isMobileScreen ? 0 : isSmallScreen ? 15 : 20,
                }}
              >
                <Typography sx={{ fontSize: 12 }}>
                  <span style={{ fontWeight: 600 }}>Today:&nbsp;</span>
                  {leadTotals.today}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  <span style={{ fontWeight: 600 }}>Yesterday:&nbsp;</span>
                  {leadTotals.yesterday}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  <span style={{ fontWeight: 600 }}>
                    Day Before Yesterday:&nbsp;
                  </span>
                  {leadTotals.dayBeforeYesterday}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  <span style={{ fontWeight: 600 }}>
                    This Week:&nbsp;
                  </span>
                  {leadTotals.oneWeek}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  <span style={{ fontWeight: 600 }}>This Month:&nbsp;</span>
                  {leadTotals.oneMonth}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  <span style={{ fontWeight: 600 }}>Total:&nbsp;</span>
                  {leadTotals.total}
                </Typography>
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
                                  Row Per Page
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
                                          {new Date(
                                            row.lead_date
                                          ).toLocaleDateString("en-US", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: true,
                                          })}
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
                                          {row.phone}
                                        </TableCell>
                                        {/* <TableCell sx={{ padding: "6px" ,  whiteSpace:'nowrap'}}>
                                      {row.email}
                                    </TableCell> */}
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
                                          {row.lead_source === null
                                            ? "Home"
                                            : row.lead_source}
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
                                          <Grid
                                            sx={{
                                              "@media (min-width: 1440px) and (max-width:2000px)":
                                                {
                                                  display: "flex",
                                                },
                                            }}
                                          >
                                            <Button
                                              onClick={() =>
                                                handleFakeButtonClick(row.id)
                                              }
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
                                                  border: "1px solid #c62828",
                                                  minWidth: 30,
                                                  py: 1,
                                                },
                                                "@media (min-width: 1440px) and (max-width:2000px)":
                                                  {
                                                    my: 0,
                                                  },
                                              }}
                                            >
                                              <DoNotDisturbAltIcon
                                                style={{
                                                  fontSize: isSmallScreen
                                                    ? 13
                                                    : 14,
                                                  color: "#c62828",
                                                }}
                                              />
                                            </Button>
                                            <Button
                                              onClick={() =>
                                                handleFollowUpButtonClick(
                                                  row.id
                                                )
                                              }
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
                                            >
                                              <ThumbUpOffAltIcon
                                                style={{
                                                  fontSize: isSmallScreen
                                                    ? 13
                                                    : 14,
                                                  color: "#1565c0",
                                                }}
                                              />
                                            </Button>
                                            <Button
                                              onClick={() =>
                                                handleConvertedButtonClick(
                                                  row.id
                                                )
                                              }
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
                                                  border: "1px solid #e65100",
                                                  minWidth: 30,
                                                  py: 1,
                                                },
                                                "@media (min-width: 1440px) and (max-width:2000px)":
                                                  {
                                                    my: 0,
                                                  },
                                              }}
                                            >
                                              <CachedIcon
                                                style={{
                                                  fontSize: isSmallScreen
                                                    ? 13
                                                    : 14,
                                                  color: "#e65100",
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
                                                  border: "1px solid #000",
                                                  minWidth: 30,
                                                  py: 1,
                                                },
                                                "@media (min-width: 1440px) and (max-width:2000px)":
                                                  {
                                                    my: 0,
                                                  },
                                              }}
                                              onClick={() =>
                                                handleOtherDetailsButtonClick(
                                                  row.id
                                                )
                                              }
                                            >
                                              <MoreVertIcon
                                                style={{
                                                  fontSize: isSmallScreen
                                                    ? 13
                                                    : 14,
                                                  color: "#000",
                                                }}
                                              />
                                            </Button>
                                          </Grid>
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

                {/* Fake dialogBox */}

                <Dialog
                  open={openDialog}
                  onClose={() => setOpenDialog(false)}
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
                      Confirm Fake Lead
                    </DialogTitle>
                    <DialogContent>
                      <Grid container>
                        <Grid item md={12} sx={{ my: 1 }}>
                          <Typography>
                            Are you sure it's a fake lead?
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
                          onClick={handleCancelFake}
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
                          onClick={() => handleConfirmFake(rows.id)}
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

                {/* Follow-up Dialog */}
                <Dialog
                  open={openFollowUpDialog}
                  onClose={() => setOpenFollowUpDialog(false)}
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
                      Follow-Up Details
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
                            Follow up Date*:
                          </InputLabel>
                          <TextField
                            type="date"
                            value={followUpDate}
                            onChange={(e) => setFollowUpDate(e.target.value)}
                            fullWidth
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: 15,
                            }}
                          >
                            Next follow up Date*:
                          </InputLabel>

                          <TextField
                            type="date"
                            value={nextFollowUpDate}
                            onChange={(e) =>
                              setNextFollowUpDate(e.target.value)
                            }
                            fullWidth
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: 15,
                            }}
                          >
                            Remarks*:
                          </InputLabel>

                          <TextField
                            multiline
                            rows={4}
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </DialogContent>

                    <DialogActions>
                      <Button
                        onClick={handleCancelFollowUp}
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
                        onClick={() => handleConfirmFollowUp(rows.id)}
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

                {/* Other Details Dialog */}
                <Dialog
                  open={openOtherDetailsDialog}
                  onClose={handleCloseOtherDetailsDialog}
                  fullWidth
                  maxWidth="md"
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
                      Lead Details
                    </DialogTitle>
                    <DialogContent>
                      <Grid container md={12} xs={12}>
                        <Grid item md={6} xs={11} sx={{ my: 1, px: 2 }}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: 15,
                            }}
                          >
                            Name:
                          </InputLabel>
                          <TextField
                            fullWidth
                            value={lead.name}
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                        </Grid>
                        <Grid item md={6} xs={11} sx={{ my: 1, px: 2 }}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: 15,
                            }}
                          >
                            Phone:
                          </InputLabel>
                          <TextField
                            fullWidth
                            value={lead.phone}
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                        </Grid>
                        <Grid item md={12} xs={11} sx={{ my: 1, px: 2 }}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: 15,
                            }}
                          >
                            Lead date:
                          </InputLabel>

                          <TextField
                            fullWidth
                            value={lead.leadDate}
                            variant="outlined"
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </Grid>
                        <Grid item md={6} xs={11} sx={{ my: 1, px: 2 }}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: 15,
                            }}
                          >
                            Email:
                          </InputLabel>

                          <TextField
                            fullWidth
                            value={lead.email}
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                        </Grid>
                        <Grid item md={6} xs={11} sx={{ my: 1, px: 2 }}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: 15,
                            }}
                          >
                            Follow update:
                          </InputLabel>

                          <TextField
                            fullWidth
                            value={lead.followUpDate}
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                        </Grid>
                        <Grid item md={6} xs={11} sx={{ my: 1, px: 2 }}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: 15,
                            }}
                          >
                            Assigned by:
                          </InputLabel>

                          <TextField
                            fullWidth
                            value={lead.assignedBy}
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                        </Grid>
                        <Grid item md={6} xs={11} sx={{ my: 1, px: 2 }}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: 15,
                            }}
                          >
                            Lead status:
                          </InputLabel>

                          <TextField
                            fullWidth
                            value={lead.leadStatus}
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                        </Grid>
                        <Grid item md={6} xs={11} sx={{ my: 1, px: 2 }}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: 15,
                            }}
                          >
                            Next follow upate:
                          </InputLabel>

                          <TextField
                            fullWidth
                            value={lead.nextFollowUpDate}
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                        </Grid>
                        <Grid item md={6} xs={11} sx={{ my: 1, px: 2 }}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: 15,
                            }}
                          >
                            Assigned to:
                          </InputLabel>

                          <TextField
                            fullWidth
                            value={lead.assignedTo}
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                            }}
                            inputProps={{
                              style: { height: "8px", fontSize: 14 },
                            }}
                          />
                        </Grid>
                        <Grid item md={12} xs={11} sx={{ my: 1, px: 2 }}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: 15,
                            }}
                          >
                            Message:
                          </InputLabel>
                          <TextareaAutosize
                            fullWidth
                            placeholder=""
                            minRows={5}
                            style={{ width: "100%" }}
                            value={lead.message}
                            InputProps={{
                              readOnly: true,
                            }}
                            inputProps={{
                              style: { fontSize: 14 },
                            }}
                          />
                        </Grid>
                        <Grid item md={12} xs={11} sx={{ my: 1, px: 2 }}>
                          <InputLabel
                            sx={{
                              fontWeight: "bold",
                              my: 1,
                              fontSize: 15,
                            }}
                          >
                            Remarks:
                          </InputLabel>
                          <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder=""
                            minRows={5}
                            style={{ width: "100%" }}
                            value={lead.remarks}
                            name="fullDescription"
                            InputProps={{
                              readOnly: true,
                            }}
                            inputProps={{
                              style: { fontSize: 14 },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </DialogContent>

                    <DialogActions>
                      <Button
                        onClick={handleCloseOtherDetailsDialog}
                        sx={{
                          // my: 2,
                          mx: 3,
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
                        Close
                      </Button>
                    </DialogActions>
                  </Container>
                </Dialog>

                {/* Converted Dialog */}
                <Dialog
                  open={openConvertDialog}
                  onClose={() => setOpenConvertDialog(false)}
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
                      Confirm Converted Lead
                    </DialogTitle>
                    <DialogContent>
                      <Grid container>
                        <Grid item md={12} sx={{ my: 1 }}>
                          <Typography>
                            Are you sure this is a convereted lead?
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
                          onClick={() => setOpenConvertDialog(false)}
                          sx={{
                            mb: 2,

                            fontSize: 12,
                            border: "1px solid #1565c0",
                            color: "#1565c0",
                            fontWeight: 600,
                            "&:hover": {
                              border: "1px solid #1565c0",
                              color: "#1565c0",
                            },
                            width: "40%",
                          }}
                        >
                          No
                        </Button>
                        <Button
                          onClick={() => handleConvertedClick(rows.id)}
                          sx={{
                            mb: 2,

                            fontSize: 12,
                            background: "#1565c0",
                            color: "#fff",
                            fontWeight: 600,
                            "&:hover": {
                              background: "#1565c0",
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
                  autoHideDuration={2000}
                  onClose={handleSnackbarClose}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  sx={{ width: "auto" }}
                >
                  <Alert
                    onClose={handleSnackbarClose}
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

      <Dialog
        open={isPopupOpen}
        onClose={handlePopupClose}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle style={{ textAlign: "center" }}>
          Download
          <CloseIcon
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              cursor: "pointer",
            }}
            onClick={handlePopupClose}
          />
        </DialogTitle>
        <DialogContent sx={{ overflow: "hidden" }}>
          <InputLabel sx={{ fontWeight: "bold", mt: 2 }}>From Date</InputLabel>
          <TextField
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <InputLabel sx={{ fontWeight: "bold", mt: 2 }}>To Date</InputLabel>
          <TextField
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <InputLabel sx={{ fontWeight: "bold", mt: 1 }}>Format</InputLabel>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Select
              labelId="format-select-label"
              id="format-select"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              fullWidth
            >
              <MenuItem value="XLS">XLS</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handlePopupClose}>
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadClick}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FreshLeads;
