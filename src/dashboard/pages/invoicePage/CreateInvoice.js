import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const CreateInvoice = () => {
  const isMobileScreen = useMediaQuery("(max-width:500px)");
  const navigate = useNavigate();
  const [cookies] = useCookies();

  // State for invoice details
  const [invoice, setInvoice] = useState({
    customerName: "",
    customerNumber: "",
    address: "",
    dueDate: "",
    notes: "",
    items: [],
    subtotal: 0,
    total: "",
  });

  // State for a new item
  const [newItem, setNewItem] = useState({
    description: "",
    quantity: 1,
    unitPrice: 0,
    totalPrice: 0,
  });

  // Handle input changes for invoice details
  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for new item
  const handleItemChange = (e) => {
    const { name, value } = e.target;

    setNewItem((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      const quantity = parseFloat(updated.quantity) || 0;
      const unitPrice = parseFloat(updated.unitPrice) || 0;
      updated.totalPrice = quantity * unitPrice;

      return updated;
    });
  };

  // Add a new item to the invoice
  const addItem = () => {
    if (!newItem.description || !newItem.quantity || !newItem.unitPrice) {
      alert("Please fill all item fields.");
      return;
    }

    const updatedItems = [...invoice.items, newItem];
    const subtotal = updatedItems.reduce(
      (sum, item) => sum + parseFloat(item.totalPrice),
      0
    );
    const total = subtotal;

    setInvoice((prev) => ({
      ...prev,
      items: updatedItems,
      subtotal,
      total,
    }));

    // Reset new item fields
    setNewItem({
      description: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
    });
  };

  // Remove an item from the invoice
  const removeItem = (index) => {
    const updatedItems = invoice.items.filter((_, i) => i !== index);
    const subtotal = updatedItems.reduce(
      (sum, item) => sum + parseFloat(item.totalPrice),
      0
    );
    const total = subtotal;

    setInvoice((prev) => ({
      ...prev,
      items: updatedItems,
      subtotal,
      total,
    }));
  };

  

  // Submit the invoice
  const handleSubmit = async () => {
    if (
      !invoice.customerName ||
      !invoice.customerNumber ||
      !invoice.address ||
      !invoice.dueDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (invoice.items.length === 0) {
      alert("Please add at least one item.");
      return;
    }

    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.createInvoice,
        invoice,
        cookies
      );

      if (response?.status === 200) {
        // console.log("Invoice Payload:", invoice);
        alert("Invoice created successfully! You can view it in the GetInvoice.");
        // navigate(`/dashboard/invoice/${response.data.invoiceId}`); 
      } else {
        alert(
          response?.responseMessage ||
            "Failed to create invoice. Please try again."
        );
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        padding: isMobileScreen ? 1 : 2,
      }}
    >
      <Box
        sx={{
          width: isMobileScreen ? "90%" : "100%",
          backgroundColor: "white",
        }}
      >
        {/* Invoice Details Form */}
        <Paper elevation={2} sx={{ p: isMobileScreen ? 2 : 3, mb: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Customer Name"
                name="customerName"
                size="small"
                value={invoice.customerName}
                onChange={handleInvoiceChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                size="small"
                multiline
                rows={3}
                value={invoice.address}
                onChange={handleInvoiceChange}
                required
                sx={{
                  // mb: 2,
                  "& .MuiInputBase-root": {
                    height: "95px",
                    alignItems: "flex-start",
                  },
                  "& .MuiInputBase-inputMultiline": {
                    // padding: "8px 14px",
                    overflow: "auto",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Customer Number"
                name="customerNumber"
                size="small"
                value={invoice.customerNumber}
                onChange={handleInvoiceChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Due Date"
                name="dueDate"
                type="date"
                size="small"
                value={invoice.dueDate}
                onChange={handleInvoiceChange}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ mb: 2 }}
              />
              
            </Grid>
          </Grid>
        </Paper>

        {/* Add Item Form */}
        <Paper elevation={2} sx={{ p: isMobileScreen ? 2 : 3, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Add Item
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                size="small"
                value={newItem.description}
                onChange={handleItemChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                size="small"
                value={newItem.quantity}
                onChange={handleItemChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Unit Price"
                name="unitPrice"
                type="number"
                size="small"
                value={newItem.unitPrice}
                onChange={handleItemChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={addItem}
                sx={{ height: "40px", backgroundColor: "#00695c" }}
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Items Table */}
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#00695c" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Description
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Quantity
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Unit Price
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Total Price
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.unitPrice}</TableCell>
                  <TableCell>₹{item.totalPrice}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Paper elevation={2} sx={{ p: isMobileScreen ? 2 : 3, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                sx={{ textAlign: "right", fontWeight: "bold" }}
              >
                Total: ₹{Number(invoice.total).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Notes */}
        <TextField
          fullWidth
          label="Notes"
          name="notes"
          value={invoice.notes}
          onChange={handleInvoiceChange}
          multiline
          rows={2}
          sx={{ mb: 4 }}
        />

        {/* Submit Button */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ backgroundColor: "#00695c", padding: "10px 20px" }}
          >
            Create Invoice
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateInvoice;
