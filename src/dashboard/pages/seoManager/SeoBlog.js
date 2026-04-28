import {
  Box,
  Button,
  TableContainer,
  CircularProgress,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody,
  DialogTitle,
  DialogContent,
  Dialog,
  Grid,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import Sidenav from "../../common/Sidenav";
import Header from "../../common/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { SeoButtons } from "./SeoButtons";
import CloseIcon from "@mui/icons-material/Close";
import IconSidenav from "../../common/IconSidenav";

export const SeoBlog = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [loading, setloading] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const handleAdd = (id) => {
    console.log(`Viewing/editing item with id ${id}`);
    navigate("/seo-manager/static-page/add-form" + id);
  };
  const handleView = (id) => {
    console.log(`Viewing/editing item with id ${id}`);
    navigate("/seo-manager/view-form" + id);
  };
  const handleOpenDeletePopup = (getId) => {
    setDeleteId(getId);
    setOpenDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
  };
  const handleDeleteSubmitClicked = () => {};

  const rows = [
    {
      id: 1,
      page: "About-Us",
      url: "http://www.getmycollge.com",
      status: "pending",
      roles: "Admin",
    },
    {
      id: 2,
      page: "contact",
      url: "http://www.getmycollege.com",
      status: "pending",
      roles: "Admin",
    },
    {
      id: 3,
      page: "About-Us",
      url: "http://www.getmycollege.com",
      status: "pending",
      roles: "Admin",
    },
    {
      id: 4,
      page: "contact",
      url: "http://www.getmycollge.com",
      status: "pending",
      roles: "Admin",
    },
    {
      id: 5,
      page: "About-Us",
      url: "http://www.getmycollge.com",
      status: "pending",
      roles: "Admin",
    },
    {
      id: 6,
      page: "contact",
      url: "http://www.getmycollge.com",
      status: "pending",
      roles: "Admin",
    },
    {
      id: 7,
      page: "About-Us",
      url: "http://www.getmycollge.com",
      status: "pending",
      roles: "Admin",
    },
    {
      id: 8,
      page: "contact",
      url: "http://www.getmycollge.com",
      status: "pending",
      roles: "Admin",
    },
    {
      id: 9,
      page: "About-Us",
      url: "http://www.getmycollge.com",
      status: "pending",
      roles: "Admin",
    },
  ];

  const columns = [
    { id: "item1", label: "Sl. No" },
    { id: "item2", label: "Page" },
    { id: "item3", label: "URL" },
    { id: "item4", label: "Status" },
    { id: "item6", label: "Action" },
  ];

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        {isMobileScreen ? (
          <IconSidenav />
        ) : showSideNav ? (
          <IconSidenav />
        ) : (
          <Sidenav />
        )}
        <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
          <Header toggleSideNav={toggleSideNav} />
          {showSideNav ? (
            <SeoButtons />
          ) : isMobileScreen ? (
            <SeoButtons />
          ) : null}

          <TableContainer sx={{ mt: 2 }}>
            <Table sx={{ borderCollapse: "collapse", width: "100%" }}>
              <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        fontWeight: "bold",
                        width: `${100 / columns.length}%`,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell
                        sx={{ border: "1px solid #ccc", padding: "15px" }}
                      >
                        {index + 1 + page * rowsPerPage}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #ccc", padding: "15px" }}
                      >
                        {row.page}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #ccc", padding: "15px" }}
                      >
                        {row.url}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #ccc", padding: "15px" }}
                      >
                        {row.status}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #ccc", padding: "15px" }}
                      >
                        <div style={{ display: "flex" }}>
                          <Button
                            variant="contained"
                            color="success"
                            startIcon={<AddIcon />}
                            size="small"
                            sx={{ marginRight: 1, fontSize: "0.75rem" }}
                            onClick={() => handleAdd(row.id)}
                          >
                            Add
                          </Button>
                          <Button
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
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Dialog
        open={openDeletePopup}
        onClose={handleCloseDeletePopup}
        maxWidth="xs"
        fullWidth
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CloseIcon onClick={handleCloseDeletePopup} />
        </Box>
        <DialogTitle sx={{ textAlign: "center" }}>ARE YOU SURE?</DialogTitle>
        <DialogContent>
          <Grid style={{ marginTop: "10px" }}>
            <Typography variant="h5" textAlign="center">
              this delete will happen only to the meta title,keywords,ect.site
              can't be deleted.
            </Typography>
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              style={{ marginRight: "10px" }}
              onClick={handleCloseDeletePopup}
            >
              NO
            </Button>
            {!loading && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteSubmitClicked}
              >
                YES
              </Button>
            )}
            {loading && (
              <Stack sx={{ alignItems: "center", mb: 5 }}>
                <CircularProgress sx={{ color: "black" }} />
              </Stack>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
