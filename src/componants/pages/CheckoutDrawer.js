import React, { use, useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  Divider,
  List,
  ListItem,
  ListItemText,
  FormHelperText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DiscountIcon from "@mui/icons-material/Discount";
import logo from "../../assets/logoname1.png";
import soonImg from "../../assets/soon.png";
import PhoneIcon from "@mui/icons-material/Phone";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import { apiList, invokeApi } from "../../services/apiServices";
import SnackbarNotification from "../common/Notification/SnackbarNotification";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CheckoutDrawer = ({
  cartItems,
  openCheckout,
  onCloseCheckout,
  savings,
  payAmount,
}) => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([config.cookieName]);
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState("auth");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [showPassword, setShowPassword] = useState(false);


  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Auth form state
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: ""
  });

  // Address form state
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    address: "",
    receiverNumber: "",
    receiverEmail: "",
    pincode: "",
    city: "",
    state: "",
    addressType: "Home",
    otherType: ""
  });

  // Error states
  const [errors, setErrors] = useState({
    auth: {},
    address: {}
  });

  const showSnackbar = (msg, severity = 'success') => {
    setSnackbarMessage(msg);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  const userId = cookies[config.cookieName]?.loginUserId;
  // generating order
  const fetchUser = async () => {
    const params = {
      id: userId,
    };

    try {
      const response = await invokeApi(apiList.getUser, params);

      if (response?.status === 200) {
        setUserDetails(response.data.users)
      } else {
        console.error("Something went wrong. Please try again later!!");
        alert("Something went wrong. Please try again later!!");
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
      alert("Something went wrong. Please try again later!!");
    }
  };

  const isAuthenticatedUser = cookies[config.cookieName]?.token && cookies[config.cookieName]?.loginUserId;
  useEffect(() => {
    if (isAuthenticatedUser) {
      fetchUser();
    }
  }, [isAuthenticatedUser])

  useEffect(() => {
    // const isAuthenticated = cookies[config.cookieName]?.token && cookies[config.cookieName]?.loginUserId;
    if (isAuthenticatedUser) {
      setStep("addressList");
      fetchUserAddresses();
    } else {
      setStep("auth");
    }
  }, [isAuthenticatedUser]);

  const fetchUserAddresses = async () => {
    try {
      if (isAuthenticatedUser) {
        const userId = cookies[config.cookieName]?.loginUserId;
        setLoading(true);
        const params = {
          userId
        };
        const response = await invokeApi(apiList.getAllAddress, params);

        if (response?.status === 200) {
          setUserAddresses(response.data.addressManager || []);
        } else {
          showSnackbar("Failed to fetch addresses", "error");
        }
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      showSnackbar("Failed to fetch addresses", "error");
    } finally {
      setLoading(false);
    }
  };

  const validateAuthForm = () => {
    const newErrors = {};

    if (isLogin) {
      if (!authForm.email) newErrors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(authForm.email)) newErrors.email = "Invalid email format";
      if (!authForm.password) newErrors.password = "Password is required";
    } else {
      if (!authForm.fullName) newErrors.fullName = "Full name is required";
      if (!authForm.email) newErrors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(authForm.email)) newErrors.email = "Invalid email format";
      if (!authForm.phone) newErrors.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(authForm.phone)) newErrors.phone = "Invalid phone number";
      if (!authForm.password) newErrors.password = "Password is required";
      else if (authForm.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(prev => ({ ...prev, auth: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateAddressForm = () => {
    const newErrors = {};

    if (!addressForm.fullName) newErrors.fullName = "Receiver name is required";
    if (!addressForm.address) newErrors.address = "Address is required";
    if (!addressForm.receiverNumber) newErrors.receiverNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(addressForm.receiverNumber)) newErrors.receiverNumber = "Invalid phone number";
    if (!addressForm.pincode) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(addressForm.pincode)) newErrors.pincode = "Invalid pincode";

    if (!addressForm.city) newErrors.city = "City is required";
    if (!addressForm.state) newErrors.state = "State is required";
    if (addressForm.addressType === "Others" && !addressForm.otherType) {
      newErrors.otherType = "Address type is required";
    }
    if (!addressForm.receiverEmail && !/^\S+@\S+\.\S+$/.test(addressForm.receiverEmail)) {
      newErrors.receiverEmail = "Invalid email format";
    }

    setErrors(prev => ({ ...prev, address: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateAuthForm()) return;

    setLoading(true);
    const { email, password } = authForm;

    try {
      const response = await invokeApi(apiList.userLogin, { email, password });

      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          setCookie(
            config.cookieName,
            JSON.stringify({
              token: response.data.token,
              loginUserId: response.data.userId,
            }),
            { path: "/", maxAge: 3000000, sameSite: "strict" }
          );
          setStep("addressList");
          fetchUserAddresses();
        } else if (response.data.responseCode === "HE001") {
          showSnackbar("Invalid credentials. Please check your email and password.", "error");
        } else {
          showSnackbar("Please try again later!", "error");
        }
      } else if (response.data.responseMessage?.includes("Password missMatch")) {
        showSnackbar("Password mismatch. Please check your password.", "error");
      } else if (response.data.responseMessage?.includes("No user found")) {
        showSnackbar("No user found with the provided email.", "error");
      } else {
        showSnackbar("Please try again later!", "error");
      }
    } catch (error) {
      console.error("Error during login:", error);
      showSnackbar("Please try again later!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!validateAuthForm()) return;

    setLoading(true);
    const { email, password, fullName, phone } = authForm;

    try {
      const response = await invokeApi(apiList.signup, { email, name: fullName, phoneNumber: phone, password });

      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          showSnackbar("User Registered Successfully", "success");
          setIsLogin(true);
          setAuthForm(prev => ({ ...prev, password: "" }));
        } else if (response.data.responseCode === "GM001") {
          showSnackbar("Email already exists.", "error");
        } else if (response.data.responseCode === "HE001") {
          showSnackbar("Invalid credentials. Please check your details.", "error");
        } else {
          showSnackbar("Something went wrong. Please try again later!", "error");
        }
      } else if (response.data.responseCode === "GM001") {
        showSnackbar("Email already exists.", "error");
      } else {
        showSnackbar("Something went wrong. Please try again later!", "error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      showSnackbar("Something went wrong. Please try again later!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSubmit = () => {
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleAddressSubmit = async () => {
    if (!validateAddressForm()) return;

    try {
      setLoading(true);
      const userId = cookies[config.cookieName]?.loginUserId;
      const finalAddressType = addressForm.addressType === "Others"
        ? addressForm.otherType
        : addressForm.addressType;

      const payload = {
        userId,
        fullName: addressForm.fullName,
        address: addressForm.address,
        receiverNumber: addressForm.receiverNumber,
        receiverEmail: addressForm.receiverEmail,
        pincode: addressForm.pincode,
        city: addressForm.city,
        state: addressForm.state,
        addressType: finalAddressType
      };

      const response = await invokeApi(apiList.addAddress, payload);

      if (response?.status === 200) {
        showSnackbar("Address added successfully");
        fetchUserAddresses();
        setStep("addressList");
      } else {
        showSnackbar("Failed to save address", "error");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      showSnackbar("Failed to save address", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const response = await invokeApi(apiList.deleteAddress, { id });
      if (response?.status === 200) {
        showSnackbar("Address deleted successfully");
        fetchUserAddresses();
      } else {
        showSnackbar("Failed to delete address", "error");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      showSnackbar("Failed to delete address", "error");
    }
  };

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors.auth[name]) {
      setErrors(prev => ({
        ...prev,
        auth: {
          ...prev.auth,
          [name]: undefined
        }
      }));
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors.address[name]) {
      setErrors(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: undefined
        }
      }));
    }
  };

  const handleAddressTypeSelect = (type) => {
    setAddressForm(prev => ({
      ...prev,
      addressType: type,
      otherType: type === "Others" ? prev.otherType : ""
    }));

    // Clear otherType error if switching away from Others
    if (type !== "Others") {
      setErrors(prev => ({
        ...prev,
        address: {
          ...prev.address,
          otherType: undefined
        }
      }));
    }
  };

  const handleProceedToPayment = () => {
    if (userAddresses.length > 0 && !selectedAddress) {
      showSnackbar("Please select an address", "error");
      return;
    }

    // 1. Format shipping address as comma-separated string
    const addressToUse = selectedAddress || addressForm;
    const shippingAddressString = [
      `${addressToUse.fullName}`,
      `${addressToUse.address}`,
      `${addressToUse.city}, ${addressToUse.state} ${addressToUse.pincode}`,
      `${addressToUse.receiverNumber}`,
      `${addressToUse.receiverEmail || authForm.email || 'N/A'}`,
      `${addressToUse.addressType === "Others"
        ? addressToUse.otherType
        : addressToUse.addressType}`
    ].join(', ');



    // 2. Prepare cart data with all product details
    const cartData = cartItems.map(item => ({
      id: item.id,
      name: item.productName,
      price: parseFloat(item.price),
      originalPrice: parseFloat(item.scratchPrice),
      quantity: item.quantity,
      image: item.featuredImage,
      gallery: item.productGallery?.map(g => g.imageUrl) || [],
      category: item.category,
      description: item.shortDescription.replace(/<[^>]*>/g, '') // Remove HTML tags
    }));

    // 3. Calculate order summary
    const subtotal = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalTotal = cartData.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const savings = originalTotal - subtotal;
    const itemCount = cartData.reduce((sum, item) => sum + item.quantity, 0);

    // 4. Prepare complete checkout data
    const checkoutData = {
      cart: cartData, // Stringified to prevent issues
      summary: {
        items: itemCount,
        subtotal: subtotal,
        originalTotal: originalTotal,
        savings: savings,
        total: subtotal
      },
      shipping: shippingAddressString,
      timestamp: new Date().toISOString()
    };

    // 5. Store data (both methods shown)
    const storageString = JSON.stringify(checkoutData);

    // Session Storage (temporary)
    sessionStorage.setItem('checkoutData', storageString);

    // Cookies (persistent)
    setCookie(
      'checkoutData',
      storageString,
      {
        path: '/',
        maxAge: 86400, // 1 day expiry
        sameSite: 'strict'
      }
    );

    // navigate('/account/payment');
    handleCompletePayment();

    console.log("Structured Checkout Data:", checkoutData);
    onCloseCheckout();
  };


  // Payment API START

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

  // generating order
  const handleCompletePayment = async () => {
    const params = {
      payableAmt: payAmount,
    };

    try {
      const response = await invokeApi(apiList.generateOrder, params);

      if (response?.status === 200) {
        const paymentData = response.data.productOrder[0];
        await initiateRazorpayPayment(paymentData);
      } else {
        console.error("Something went wrong. Please try again later!!");
        showSnackbar("Something went wrong. Please try again later!!", 'error');
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
      showSnackbar("Something went wrong. Please try again later!!", 'error');
    }
  };

  //payment gateway
  const initiateRazorpayPayment = async (paymentData) => {
    try {
      await loadRazorpayScript();

      const options = {
        key: "rzp_live_Wvc0xySfe39eNS",
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "Organica Oils",
        description: "Payment of products",
        order_id: paymentData.orderId,
        receipt: paymentData.receipt,

        handler: function (response) {
          if (response?.razorpay_payment_id) {
            handleAddPayment(paymentData.orderId);
          } else {
            showSnackbar("Payment failed. Please try again.", 'error');
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phoneNumber,
        },
        // notes: {
        //   address: "SEO Mitra, Noida, Delhi",
        // },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

      rzp1.on("payment.failed", function (response) {
        showSnackbar("Payment failed. Please try again.", 'error');
      });
    } catch (error) {
      showSnackbar("Payment initiation failed. Please try again.", 'error');
    }
  };


  // completing payment
  const handleAddPayment = async (orderId) => {

    // 1. Format shipping address as comma-separated string
    const addressToUse = selectedAddress || addressForm;
    const shippingAddressString = [
      `${addressToUse.fullName}`,
      `${addressToUse.address}`,
      `${addressToUse.city}, ${addressToUse.state} ${addressToUse.pincode}`,
      `${addressToUse.receiverNumber}`,
      `${addressToUse.receiverEmail || authForm.email || 'N/A'}`,
      `${addressToUse.addressType === "Others"
        ? addressToUse.otherType
        : addressToUse.addressType}`
    ].join(', ');

    const params = {
      orderId: orderId,
      productIds: cartItems.map((item) => item.id).join(','),
      totalAmt: payAmount + savings,
      discountAmt: savings,
      shippingAmt: "0",
      payableAmt: payAmount,
      paymentStatus: "Pending",
      deliveryAddress: shippingAddressString,

    };

    try {
      const response = await invokeApi(apiList.addProductOrder, params);

      if (response?.status === 200) {
        showSnackbar("Paid Successfully!", 'success')
      } else {
        console.error("Something went wrong. Please try again later!!");
        showSnackbar("Something went wrong. Please try again later!!", 'error');
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
      showSnackbar("Something went wrong. Please try again later!!", 'error');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const stepsOrder = [ "addressList"];


  return (
    <Modal
      open={openCheckout}
      onClose={onCloseCheckout}
      closeAfterTransition
      sx={{
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 480,
          bgcolor: "background.paper",
          p: 0,
          position: "relative",
          maxHeight: "100vh",
          overflowY: "auto",
          scrollbarWidth: "thin",
        }}
      >
        {/* Back Arrow */}
        <IconButton
          onClick={() => {
            const currentIndex = stepsOrder.indexOf(step);
            if (currentIndex > 0) {
              setStep(stepsOrder[currentIndex - 1]);
            } else {
              onCloseCheckout(); 
            }
          }}
          sx={{ position: "absolute", top: 8, left: 8, zIndex: 10 }}
        >
          <ArrowBackIcon sx={{ color: "#fff" }} />
        </IconButton>

        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(to right, #21413dff 50%, #ffffff 100%)",
            py: 1.5,
            px: 2,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Organica Oils"
            sx={{ height: 50, width: "auto" }}
          />
        </Box>

        {/* Discount Banner */}
        <Typography
          variant="body2"
          sx={{
            px: 2,
            py: 1,
            backgroundColor: "#00695c",
            color: "white",
            fontWeight: 600,
            fontSize: "0.85rem",
            textAlign: "center",
          }}
        >
          🎉 FLAT 15% Off | USE: SUMMER15
        </Typography>

        <Box sx={{ px: 2, py: 2, backgroundColor: "#c4dfdb" }}>
          {/* Order Summary */}
          <Box
            sx={{
              backgroundColor: "#f6f6f6",
              p: 1,
              borderRadius: 2,
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Order summary ({cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0} Item)
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through", color: "grey" }}
                >
                  ₹{payAmount + savings}
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  ₹{payAmount}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Auth Section (shown only for non-logged in users) */}
          {step === "auth" && (
            <Box
              sx={{
                backgroundColor: "white",
                p: 2,
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2} textAlign="center">
                {isLogin ? "Login to continue" : "Create an account"}
              </Typography>

              {!isLogin && (
                <TextField
                  fullWidth
                  size="small"
                  label="Full Name"
                  variant="outlined"
                  name="fullName"
                  value={authForm.fullName}
                  onChange={(e) => handleAuthChange(e)}
                  error={!!errors.auth.fullName}
                  helperText={errors.auth.fullName}
                  sx={{ mb: 2 }}
                />
              )}

              <TextField
                fullWidth
                size="small"
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={authForm.email}
                onChange={(e) => handleAuthChange(e)}
                error={!!errors.auth.email}
                helperText={errors.auth.email}
                sx={{ mb: 2 }}
              />

              {!isLogin && (
                <TextField
                  fullWidth
                  size="small"
                  label="Phone Number"
                  variant="outlined"
                  name="phone"
                  value={authForm.phone}
                  onChange={(e) => handleAuthChange(e)}
                  inputProps={{ maxLength: 10 }}
                  error={!!errors.auth.phone}
                  helperText={errors.auth.phone}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                  }}
                />
              )}

              <TextField
                fullWidth
                size="small"
                label="Password"
                variant="outlined"
                name="password"
                type={showPassword ? "text" : "password"}
                value={authForm.password}
                onChange={(e) => handleAuthChange(e)}
                error={!!errors.auth.password}
                helperText={errors.auth.password}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleTogglePasswordVisibility}
                        sx={{
                          color: "#1e272e",
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAuthSubmit}
                disabled={loading}
                sx={{
                  backgroundColor: "#235a49",
                  "&:hover": { backgroundColor: "#2d5a54" },
                  py: 1.5,
                  mb: 2,
                }}
              >
                {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
              </Button>

              <Divider sx={{ my: 2 }} />

              <Typography textAlign="center">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Button
                  onClick={() => setIsLogin(!isLogin)}
                  sx={{
                    textTransform: "none",
                    color: "#235a49",
                    fontWeight: "bold",
                  }}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </Button>
              </Typography>
            </Box>
          )}

          {/* Address List Section (shown for logged in users) */}
          {step === "addressList" && (
            <Box
              sx={{
                backgroundColor: "white",
                p: 2,
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Select Delivery Address
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => setStep("addressForm")}
                  sx={{
                    color: "#235a49",
                    fontWeight: "bold",
                    textTransform: 'none'
                  }}
                >
                  Add New
                </Button>
              </Box>

              {loading ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography>Loading addresses...</Typography>
                </Box>
              ) : userAddresses.length > 0 ? (
                <List>
                  {userAddresses.map((address) => (
                    <ListItem
                      key={address.id}
                      sx={{
                        border: '1px solid',
                        borderColor: selectedAddress?.id === address.id ? '#235a49' : '#e0e0e0',
                        borderRadius: 1,
                        mb: 1,
                        cursor: 'pointer',
                        backgroundColor: selectedAddress?.id === address.id ? '#e8f5e9' : 'white',
                        '&:hover': {
                          borderColor: '#235a49'
                        }
                      }}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <ListItemText
                        primary={
                          <Typography fontWeight="bold">
                            {address.fullName}
                            <Typography
                              component="span"
                              sx={{
                                ml: 1,
                                fontSize: '0.75rem',
                                backgroundColor: '#e0e0e0',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                textTransform: 'capitalize'
                              }}
                            >
                              {address.addressType}
                            </Typography>
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2">
                              {address.address}
                            </Typography>
                            <Typography variant="body2">
                              {address.city}, {address.state} - {address.pincode}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              Phone: {address.receiverNumber}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="textSecondary" mb={2}>
                    No addresses saved yet
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setStep("addressForm")}
                    sx={{
                      backgroundColor: "#235a49",
                      "&:hover": { backgroundColor: "#2d5a54" },
                    }}
                  >
                    Add New Address
                  </Button>
                </Box>
              )}

              {(userAddresses.length > 0 || step === "addressForm") && (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleProceedToPayment}
                  // onClick={() => setStep("noPaymentImg")}
                  disabled={userAddresses.length > 0 && !selectedAddress}
                  sx={{
                    backgroundColor: "#235a49",
                    "&:hover": { backgroundColor: "#2d5a54" },
                    mt: 2,
                    py: 1.5,
                  }}
                >
                  Proceed to Payment
                </Button>
              )}
            </Box>
          )}

          {/* No Payment Image */}
          {/* {step === "noPaymentImg" && (
            <Box
              sx={{
                width: "100%",
                maxWidth: 400,
                margin: "auto",
                p: 2,
                backgroundColor: "#f9f9f9",
                borderRadius: "6px",
                boxShadow: "0 0 10px rgba(0,0,0,0.05)",
              }}
            >
              <img
                src={soonImg}
                alt='soonImg'
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </Box>
          )} */}

          {/* Address Form Section */}
          {step === "addressForm" && (
            <Box
              sx={{
                width: "100%",
                maxWidth: 400,
                margin: "auto",
                p: 2,
                backgroundColor: "#f9f9f9",
                borderRadius: "6px",
                boxShadow: "0 0 10px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
                sx={{ fontSize: "1rem", textAlign: "left" }}
              >
                {userAddresses.length > 0 ? "Add new address" : "Add shipping address"}
              </Typography>

              <TextField
                fullWidth
                size="small"
                label="Full name*"
                variant="outlined"
                name="fullName"
                value={addressForm.fullName}
                onChange={handleAddressChange}
                error={!!errors.address.fullName}
                helperText={errors.address.fullName}
                sx={{
                  mb: 2,
                  backgroundColor: "white",
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  input: { fontSize: "0.9rem" },
                }}
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
              />

              <TextField
                fullWidth
                size="small"
                label="Address*"
                variant="outlined"
                name="address"
                value={addressForm.address}
                onChange={handleAddressChange}
                error={!!errors.address.address}
                helperText={errors.address.address}
                multiline
                rows={2}
                sx={{
                  mb: 2,
                  backgroundColor: "white",
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  textarea: { fontSize: "0.9rem" },
                }}
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
              />

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="City*"
                    variant="outlined"
                    name="city"
                    value={addressForm.city}
                    onChange={handleAddressChange}
                    error={!!errors.address.city}
                    helperText={errors.address.city}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "4px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                      },
                      input: { fontSize: "0.9rem" },
                    }}
                    InputLabelProps={{
                      style: { fontSize: "0.9rem" },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="State*"
                    variant="outlined"
                    name="state"
                    value={addressForm.state}
                    onChange={handleAddressChange}
                    error={!!errors.address.state}
                    helperText={errors.address.state}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "4px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                      },
                      input: { fontSize: "0.9rem" },
                    }}
                    InputLabelProps={{
                      style: { fontSize: "0.9rem" },
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Pincode*"
                    variant="outlined"
                    name="pincode"
                    value={addressForm.pincode}
                    onChange={handleAddressChange}
                    error={!!errors.address.pincode}
                    helperText={errors.address.pincode}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "4px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                      },
                      input: { fontSize: "0.9rem" },
                    }}
                    InputLabelProps={{
                      style: { fontSize: "0.9rem" },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Phone Number*"
                    variant="outlined"
                    name="receiverNumber"
                    value={addressForm.receiverNumber}
                    onChange={handleAddressChange}
                    error={!!errors.address.receiverNumber}
                    helperText={errors.address.receiverNumber}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "4px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                      },
                      input: { fontSize: "0.9rem" },
                    }}
                    InputLabelProps={{
                      style: { fontSize: "0.9rem" },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+91</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                size="small"
                label="Email *"
                variant="outlined"
                name="receiverEmail"
                value={addressForm.receiverEmail}
                onChange={handleAddressChange}
                error={!!errors.address.receiverEmail}
                helperText={errors.address.receiverEmail}
                sx={{
                  mb: 2,
                  backgroundColor: "white",
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  input: { fontSize: "0.9rem" },
                }}
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
              />

              <Typography
                variant="body1"
                fontWeight="bold"
                mb={1}
                sx={{
                  fontSize: "0.8rem",
                  color: "#19312eff",
                  textAlign: "left",
                }}
              >
                Address type
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Button
                  variant={addressForm.addressType === "Home" ? "contained" : "outlined"}
                  onClick={() => handleAddressTypeSelect("Home")}
                  sx={{
                    borderRadius: 4,
                    textTransform: 'none',
                    px: 2,
                    fontWeight: 500,
                    fontSize: '15px',
                    color: addressForm.addressType === "Home" ? '#fff' : '#064d41',
                    backgroundColor: addressForm.addressType === "Home" ? '#064d41' : 'transparent',
                    borderColor: addressForm.addressType === "Home" ? '#064d41' : '#064d41',
                    '&:hover': {
                      backgroundColor: addressForm.addressType === "Home" ? '#053a31' : 'rgba(6, 77, 65, 0.08)',
                      borderColor: '#064d41',
                    },
                    gap: 1
                  }}
                >
                  <HomeIcon sx={{ fontSize: 20 }} />
                  Home
                </Button>

                <Button
                  variant={addressForm.addressType === "Work" ? "contained" : "outlined"}
                  onClick={() => handleAddressTypeSelect("Work")}
                  sx={{
                    borderRadius: 4,
                    textTransform: 'none',
                    px: 2,
                    fontWeight: 500,
                    fontSize: '15px',
                    color: addressForm.addressType === "Work" ? '#fff' : '#064d41',
                    backgroundColor: addressForm.addressType === "Work" ? '#064d41' : 'transparent',
                    borderColor: addressForm.addressType === "Work" ? '#064d41' : '#064d41',
                    '&:hover': {
                      backgroundColor: addressForm.addressType === "Work" ? '#053a31' : 'rgba(6, 77, 65, 0.08)',
                      borderColor: '#064d41',
                    },
                    gap: 1
                  }}
                >
                  <WorkIcon sx={{ fontSize: 20 }} />
                  Work
                </Button>

                <Button
                  variant={addressForm.addressType === "Others" ? "contained" : "outlined"}
                  onClick={() => handleAddressTypeSelect("Others")}
                  sx={{
                    borderRadius: 4,
                    textTransform: 'none',
                    px: 2,
                    fontWeight: 500,
                    fontSize: '15px',
                    color: addressForm.addressType === "Others" ? '#fff' : '#064d41',
                    backgroundColor: addressForm.addressType === "Others" ? '#064d41' : 'transparent',
                    borderColor: addressForm.addressType === "Others" ? '#064d41' : '#064d41',
                    '&:hover': {
                      backgroundColor: addressForm.addressType === "Others" ? '#053a31' : 'rgba(6, 77, 65, 0.08)',
                      borderColor: '#064d41',
                    },
                    gap: 1
                  }}
                >
                  <LocationOnOutlinedIcon sx={{ fontSize: 20 }} />
                  Others
                </Button>
              </Box>

              {addressForm.addressType === "Others" && (
                <TextField
                  fullWidth
                  size="small"
                  label="Specify address type*"
                  variant="outlined"
                  name="otherType"
                  value={addressForm.otherType}
                  onChange={handleAddressChange}
                  error={!!errors.address.otherType}
                  helperText={errors.address.otherType}
                  sx={{
                    mb: 2,
                    backgroundColor: "white",
                    borderRadius: "4px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "4px",
                    },
                    input: { fontSize: "0.9rem" },
                  }}
                  InputLabelProps={{
                    style: { fontSize: "0.9rem" },
                  }}
                />
              )}

              <Button
                fullWidth
                size="small"
                variant="contained"
                color="primary"
                onClick={handleAddressSubmit}
                disabled={loading}
                sx={{
                  backgroundColor: "#235a49",
                  "&:hover": { backgroundColor: "#2d5a54" },
                  mb: 2,
                  py: 1,
                  borderRadius: "4px",
                  textTransform: "none",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Saving..." : "Save Address"}
              </Button>
            </Box>
          )}

          {/* Footer */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              maxWidth: 320,
              mb: 2,
              mt: 6.5,
            }}
          >
            {["Secure payments", "Assured delivery", "Verified seller"].map(
              (text, i) => (
                <Typography key={i} variant="caption" fontSize="0.75rem">
                  {text}
                </Typography>
              )
            )}
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            fontSize="0.7rem"
            display="block"
          >
            T&C | Privacy Policy | 9452db7c
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            fontSize="0.7rem"
            display="block"
            mb={1}
          >
            Powered By Shiprocket
          </Typography>
        </Box>

        <SnackbarNotification
          open={openSnackbar}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
        />
      </Box>
    </Modal>
  );
};

export default CheckoutDrawer;