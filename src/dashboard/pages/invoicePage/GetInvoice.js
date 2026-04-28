import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import img from "../../../assets/images/log-final1.png";
import { Cookies } from "react-cookie";
import { config } from "../../../config/config";
import { apiList, invokeApi } from "../../../services/apiServices";

const InvoiceManagement = () => {
  const isMobileScreen = useMediaQuery("(max-width:500px)");
  const [invoice, setInvoice] = useState(null);
  const [invoicesList, setInvoicesList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [openDialog, setOpenDialog] = useState(true);
  const invoiceRef = useRef();

  useEffect(() => {
    fetchInvoicesList();
  }, []);

  
  const fetchInvoicesList = async () => {
    setLoadingList(true);
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getInvoices,
        {},
        Cookies
      );

      // console.log("response", response);

      if (response?.status === 200) {
        setInvoicesList(response.data.invoices || []);
      } else {
        setError(response?.responseMessage || "Failed to load invoices list");
      }
    } catch (error) {
      console.error("Error fetching invoices list:", error);
      setError("Failed to load invoices list");
    } finally {
      setLoadingList(false);
    }
  };

  const fetchInvoice = async (invoiceId) => {
    setLoading(true);
    setInvoice(null);
    try {
      const params = { invoiceId };
      const response = await invokeApi(
        config.getMyCollege + apiList.getInvoice,
        params,
        Cookies
      );

      if (response?.status === 200) {
        setInvoice(response.data.invoice);
        setOpenDialog(false);
      } else {
        setError(response?.responseMessage || "Failed to load invoice details");
      }
    } catch (error) {
      console.error("Error fetching invoice:", error);
      setError("Failed to load invoice details");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const handleInvoiceSelect = (invoiceId) => {
    fetchInvoice(invoiceId);
  };

 const handleDownloadInvoice = async () => {
  if (!invoiceRef.current) return;

  const element = invoiceRef.current;

  // Apply PDF desktop-friendly styles
  element.classList.add("pdf-mode");

  const html2canvas = await import("html2canvas");
  const jsPDF = (await import("jspdf")).default;

  // Wait for styles to apply
  setTimeout(() => {
    html2canvas.default(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice-${invoice.invoiceNumber}.pdf`);

      // Remove class after download
      element.classList.remove("pdf-mode");
    });
  }, 100); // Short delay for class to apply
};


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        padding : 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
        <Button
          variant="outlined"
          onClick={handleOpenDialog}
          size="small"
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 1,
            color: "white",
            background: "linear-gradient(185deg, #005AE2 30%, #00042a 90%)",
          }}
        >
          Select Other Invoice
        </Button>
        <Button
          variant="outlined"
          onClick={handleDownloadInvoice}
          size="small"
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 1,
            color: "white",
            background: "linear-gradient(185deg, #005AE2 30%, #00042a 90%)",
          }}
          disabled={!invoice}
        >
          Download Invoice
        </Button>
      </Box>
      {/* Invoice Selection Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        {/* <DialogTitle>Select an Invoice</DialogTitle> */}
        <DialogContent>
          {loadingList ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100px"
            >
              <CircularProgress />
            </Box>
          ) : invoicesList.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Customer Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Invoice Number
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoicesList.map((inv) => (
                  <TableRow
                    key={inv.id}
                    hover
                    onClick={() => handleInvoiceSelect(inv.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{inv.id}</TableCell>
                    <TableCell>{inv.invoiceNumber}</TableCell>
                    <TableCell>{inv.customerName}</TableCell>
                    <TableCell align="right">
                      {/* Optional action button or icon */}
                      <Typography variant="body2" color="primary">
                        Select
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="body1" align="center" sx={{ p: 2 }}>
              No invoices available
            </Typography>
          )}
        </DialogContent>
      </Dialog>

      {/* Selected Invoice Display */}
      {invoice && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            ref={invoiceRef}
            sx={{
              width: isMobileScreen? "100%":"90%",
              backgroundColor: "white",
              padding: isMobileScreen ? 2 : 4,
            }}
          >
            {/* Invoice content */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{
                mb: isMobileScreen ? 1 : 4,
                position: "relative",
                mt: isMobileScreen ? "none" :6,
                paddingX: isMobileScreen ? "none":6,
              }}
            >
              <Grid item xs={6} sm={6}>
                <Typography
                  variant={isMobileScreen ? "h6" : "h4"}
                  sx={{ fontWeight: "bold", color: "#015e70" }}
                >
                  INVOICE
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    fontSize: isMobileScreen ? "12px" : "14px",
                    color: "#333",
                    fontWeight: 600,
                    width: isMobileScreen ? "200px" : "none",
                  }}
                >
                  Kodichikkanahalli Main Rd, Opp. H.P Petrol Pump
                  <br />
                  Apartment, Kaveri Nagar
                  <br />
                  Bommanahalli, Bengaluru
                  <br />
                  Karnataka 560068
                  <br />
                  (+91) 91084 56231
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <img
                  src={img}
                  layout="fit"
                  width={isMobileScreen ? 100 : 150}
                  height={isMobileScreen ? 50 : 100}
                  alt="logo"
                  style={{ maxWidth: "150px" }}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                mt: isMobileScreen ? 2 :4,
                textAlign: "center",
                padding: 2,
                backgroundColor: "#015e70",
                color: "white",
                fontSize: "12px",
              }}
            ></Box>
            {/* Invoice Details */}
            <Paper
              elevation={2}
              sx={{
                p: isMobileScreen ? 1 : 3,
                mb: isMobileScreen ? 2 :4,
                backgroundColor: "#f2eee5",
              }}
            >
              <Grid container  spacing={isMobileScreen ? 1.5 : 2}>
                <Grid item xs={4} sm={6} md={6}>
                  <Typography variant= "body1" sx={{ fontWeight: "bold",fontSize: isMobileScreen ? "14px" : "18px" }}>
                    Invoice for
                  </Typography>
                  <Typography sx={{fontSize: isMobileScreen ? "14px" : "16px",width:isMobileScreen ? "50px" : "none"}}>{invoice.customerName}</Typography>
                  <Typography sx={{fontSize: isMobileScreen ? "14px" : "16px",}}>{invoice.customerNumber}</Typography>
                  <Typography sx={{fontSize: isMobileScreen ? "12px" : "16px",}}>{invoice.address}</Typography>
                  
                </Grid>
                <Grid item xs={4} sm={3} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: "bold",fontSize: isMobileScreen ? "14px" : "18px" }}>
                    Payable to
                  </Typography>
                  <Typography sx={{fontSize: isMobileScreen ? "14px" : "16px",}}>House Triangle</Typography>
                </Grid>
                <Grid item xs={4} sm={3} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: "bold",fontSize: isMobileScreen ? "14px" : "18px" }}>
                    Invoice #
                  </Typography>
                  <Typography sx={{fontSize: isMobileScreen ? "12px" : "16px"}}>{invoice.invoiceNumber}</Typography>

                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", mt: isMobileScreen ? 1 : 2,fontSize: isMobileScreen ? "14px" : "18px" }}
                  >
                    Due date
                  </Typography>
                  <Typography sx={{fontSize: isMobileScreen ? "14px" : "16px"}}>{invoice.dueDate}</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Table */}
            <TableContainer component={Paper} sx={{ mb:isMobileScreen ? 2 : 4 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#015e70" }}>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: isMobileScreen ? "10px" : "14px",
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: isMobileScreen ? "10px" : "14px",
                      }}
                    >
                      Qty
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: isMobileScreen ? "10px" : "14px",
                      }}
                    >
                      Unit price
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: isMobileScreen ? "10px" : "14px",
                      }}
                    >
                      Total price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(invoice.items) && invoice.items.length > 0 ? (
                    invoice.items.map((item, index) => (
                      <TableRow key={index} sx={{ backgroundColor: "#f2eee5" }}>
                        <TableCell sx={{fontSize: isMobileScreen ? "10px" : "14px",}}>{item.description || "N/A"}</TableCell>
                        <TableCell sx={{fontSize: isMobileScreen ? "10px" : "14px",}}>{item.quantity || "N/A"}</TableCell>
                        <TableCell sx={{fontSize: isMobileScreen ? "10px" : "14px",}}>
                          {formatCurrency(parseFloat(item.unit_price) || 0)}
                        </TableCell>
                        <TableCell sx={{fontSize: isMobileScreen ? "10px" : "14px",}}>
                          {formatCurrency(parseFloat(item.total_price) || 0)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No items available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Totals Section */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontSize: isMobileScreen?"12px":"15px" }}>
                  <span style={{ color: "grey" }}>Notes:</span>
                  <br />
                  <span style={{ color: "rgb(240, 101, 88)" }}>
                    {invoice.notes || "No additional notes provided."}
                  </span>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 4,
                    mb: isMobileScreen? "none":1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", color: "#00695c" }}>
                    Total Amount:
                  </Typography>
                  <Typography
                  variant="h4"
                  sx={{
                    textAlign: "right",
                    fontWeight: "bold",
                    color: "#015e70",
                  }}
                >
                  {formatCurrency(parseFloat(invoice.total) || 0)}
                </Typography>
                </Box>

              </Grid>
            </Grid>

            {/* Footer Section */}
            <Box
              sx={{
                mt: 4,
                textAlign: "center",
                padding: 2,
                backgroundColor: "#015e70",
                color: "white",
                fontSize: "12px",
              }}
            >
              Visit: www.housetriangle.com || @housetriangleservices || Ph.: +91
              9108456231
            </Box>
          </Box>
        </Box>
      )}

      {/* Loading indicator when fetching single invoice */}
      {loading && !invoice && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100px"
        >
          <CircularProgress />
        </Box>
      )}

      {/* Empty state when no invoice is selected */}
      {!loading && !invoice && !openDialog && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          {/* <Button variant="contained" onClick={handleOpenDialog}>
            Select an Invoice
          </Button> */}
        </Box>
      )}
    </Box>
  );
};

export default InvoiceManagement;
