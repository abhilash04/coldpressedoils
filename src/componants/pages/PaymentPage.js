import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Divider, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useCookies } from 'react-cookie';
import { Grid } from '@mui/system';
import { apiList, invokeApi } from '../../services/apiServices';
import { config } from '../../config/config';

function PaymentPage() {
  const [cookies] = useCookies();
  const [packageData, setPackageData] = useState({});
  const packageId = sessionStorage.getItem("packageId");
  console.log("jsjds====>", packageData);

  //for payment gateway
  // Function to dynamically load the Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const handlePackageData = async () => {
      const params = {
        id: packageId,
      };
      try {
        const response = await invokeApi(
          config.getMyCollege + apiList.getPackage,
          params,
          cookies
        );

        if (response?.status === 200) {
          const userData = response.data.packages;
          setPackageData(userData);
        } else {
          console.error("Something went wrong. Please try again later!!");
        }
      } catch (error) {
        console.error("Error during data fetch:", error);
        console.error("Something went wrong. Please try again later!!");
      }
    };
    handlePackageData();
  }, [])


  // generating order
  const handleCompletePayment = async () => {
    const params = {
      packageId: packageId,
    };

    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.generateOrder,
        params,
        cookies
      );

      if (response?.status === 200) {
        const paymentData = response.data.payment[0];
        await initiateRazorpayPayment(paymentData);
      } else {
        console.error("Something went wrong. Please try again later!!");
        alert("Something went wrong. Please try again later!!");
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
      alert("Something went wrong. Please try again later!!");
    }
  };

  //payment gateway
  const initiateRazorpayPayment = async (paymentData) => {
    try {
      await loadRazorpayScript();

      const options = {
        key: "rzp_live_fgITphfrAGKnyj",
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "SEO Mitra",
        description: "Package Payment",
        order_id: paymentData.orderId,
        receipt: paymentData.receipt,

        handler: function (response) {
          if (response?.razorpay_payment_id) {
            handleAddPayment(paymentData.orderId, paymentData.amount);
          } else {
            alert("Payment failed. Please try again.");
          }
        },

        prefill: {
          name: "SEO Mitra",
          email: "support@seomitra.com",
          contact: "+919876543210",
        },

        notes: {
          address: "SEO Mitra, Noida, Delhi",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

      rzp1.on("payment.failed", function (response) {
        alert("Payment failed. Please try again.");
      });
    } catch (error) {
      alert("Payment initiation failed. Please try again.");
    }
  };


  //completing payment
  const handleAddPayment = async (orderId, amount) => {

    const amountInPaisa = (amount / 100).toFixed(2);

    const params = {
      orderId: orderId,
      packageId: packageId,
      paidAmt: amountInPaisa,
    };

    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.addPayment,
        params,
        cookies
      );

      if (response?.status === 200) {
        alert("Paid Successfully!")
      } else {
        console.error("Something went wrong. Please try again later!!");
        alert("Something went wrong. Please try again later!!");
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
      alert("Something went wrong. Please try again later!!");
    }
  };


  return (
    <>
      <Box display="flex" gap={3} padding={3} flexWrap="wrap" sx={{ mt: 5 }}>
        {/* Left Side Cards */}
        <Box display="flex" flexDirection="column" gap={2} flex={1} minWidth={300}>
          {/* Card 1 - Professional Content */}
          <Card
            variant="outlined"
            sx={{
              padding: 3,
              backgroundColor: "#f9f9fb",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: 4,
              maxWidth: 400,
              margin: "auto",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "primary.main", textAlign: "center" }}
              >
                Your Selected Package
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                  padding: 1,
                  backgroundColor: "rgba(0, 123, 255, 0.05)",
                  borderRadius: 2,
                }}
              >
                <Typography sx={{ fontWeight: "bold", color: "text.secondary" }}>Name:</Typography>
                <Typography sx={{ color: "text.primary", fontSize: "1rem" }}>
                  {packageData.name}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                  padding: 1,
                  backgroundColor: "rgba(76, 175, 80, 0.05)",
                  borderRadius: 2,
                }}
              >
                <Typography sx={{ fontWeight: "bold", color: "text.secondary" }}>Price:</Typography>
                <Typography sx={{ color: "success.main", fontSize: "1rem" }}>
                  ₹ {packageData.price} /{packageData.priceType}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 1,
                  backgroundColor: "rgba(255, 193, 7, 0.1)",
                  borderRadius: 2,
                }}
              >
                <Typography sx={{ fontWeight: "bold", color: "text.secondary" }}>Features:</Typography>
                <Typography sx={{ color: "text.primary", fontSize: "0.9rem" }}>
                  {packageData.features}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right Side - Payment Summary */}
        <Card variant="outlined" sx={{ flex: 1.5, padding: 3, backgroundColor: "#f9fafc", minWidth: 300 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body1" fontWeight="bold">Taxes & Fees</Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="body1">₹ 467.82</Typography>
                <Tooltip title="Includes all applicable taxes and fees">
                  <IconButton size="small" sx={{ marginLeft: 0.5 }}>
                    <InfoIcon fontSize="small" color="action" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={1}>
              <Typography variant="body1" fontWeight="bold">Expiration Date</Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="body1">2024-12-05</Typography>
                <Tooltip title="The date your payment will expire">
                  <IconButton size="small" sx={{ marginLeft: 0.5 }}>
                    <InfoIcon fontSize="small" color="action" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={1}>
              <Typography variant="body1" fontWeight="bold">Total</Typography>
              <Typography variant="body1" fontWeight="bold">₹ 3,066.82</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <Typography variant="body1" fontWeight="bold">Coupon code</Typography>
              <Button sx={{ marginLeft: 1, color: "purple" }}>Add</Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary" gutterBottom>
              By checking out, you agree with our <a href="#" style={{ color: "purple", textDecoration: 'none' }}>Terms of Service</a> and confirm that
              you have read our <a href="#" style={{ color: "purple", textDecoration: 'none' }}>Privacy Policy</a>. You can cancel recurring payments at any time.
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button sx={{ color: "purple" }}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={handleCompletePayment}>Complete payment</Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default PaymentPage;