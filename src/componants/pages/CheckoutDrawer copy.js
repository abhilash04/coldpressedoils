import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DiscountIcon from "@mui/icons-material/Discount";
import logo from "../../assets/logoname1.png";
import PhoneIcon from "@mui/icons-material/Phone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BorderColorIcon from '@mui/icons-material/BorderColor';
const CheckoutDrawer = ({ openCheckout, onCloseCheckout }) => {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [message, setMessage] = useState("");
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [step, setStep] = useState("mobile");
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    address: "",
    email: "",
    city: "",
    state: "",
    addressType: "home",
  });

  useEffect(() => {
    if (/^\d{10}$/.test(mobile)) {
      if (!otpSent) {
        setOtpSent(true);
        setOtp("");
        setVerificationStatus("");
        setMessage(`OTP sent to +91 ${mobile}`);
        console.log("OTP sent: 123456");
        setStep("verifyOtp");
        setTimer(30);
      }
    } else {
      setOtpSent(false);
      setMessage("");
      setOtp("");
    }
  }, [mobile]);

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow one digit
    const updatedOtp = [...otpArray];
    updatedOtp[index] = value;
    setOtpArray(updatedOtp);

    // Auto focus next input
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }

    // Auto submit when all fields filled
    if (updatedOtp.every((digit) => digit !== "")) {
      const fullOtp = updatedOtp.join("");
      if (fullOtp === "123456") {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
      }
    }
  };

  useEffect(() => {
    if (otpArray.every((digit) => digit !== "")) {
      const fullOtp = otpArray.join("");
      if (fullOtp === "123456") {
        setVerificationStatus("success");
        setStep("addressForm"); // Add this line to automatically go to address form
      } else {
        setVerificationStatus("error");
      }
    } else {
      setVerificationStatus("");
    }
  }, [otpArray]);

  const handleSubmit = () => {
    // Simple validation example (can be extended)
    const { fullName, address, city, state } = addressForm;
    if (!fullName || !address || !city || !state) {
      alert("Please fill all required fields");
      return;
    }
    console.log("Address submitted:", {
      ...addressForm,
      mobile: `+91${mobile}`,
    });
    // You can add API call or next step logic here
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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
          onClick={onCloseCheckout}
          sx={{ position: "absolute", top: 8, left: 8, zIndex: 10 }}
        >
          <ArrowBackIcon sx={{ color: "#fff" }} />
        </IconButton>

        {/* Header */}
        <Box
          sx={{
            background:
              "linear-gradient(to right, #21413dff 50%, #ffffff 100%)",
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
                Order summary (1 Item)
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through", color: "grey" }}
                >
                  ₹2400.00
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  ₹2306.70
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Coupon Box */}
          <Box
            sx={{
              backgroundColor: "white",
              p: 2,
              borderRadius: 2,
              mb: 2,
            }}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item xs>
                <Box display="flex" alignItems="center" gap={1}>
                  <DiscountIcon fontSize="small" sx={{ color: "#3C9726" }} />
                  <Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography fontWeight="bold" fontSize="0.9rem">
                        RAKHI15
                      </Typography>
                      <Typography
                        sx={{
                          borderRadius: "4px",
                          backgroundColor: "#3C9726",
                          color: "white",
                          px: 1,
                          py: 0.2,
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        Save ₹352.80
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      color="primary"
                      sx={{
                        fontSize: "0.75rem",
                        mt: 0.5,
                        display: "inline-block",
                      }}
                    >
                      View 1 more coupon(s) &gt;
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  sx={{
                    color: "#235a49",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Mobile Input & OTP Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              textAlign: "center",
            }}
          >
            {step === "mobile" && (
              <>
                <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                  Enter mobile number
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={1}
                  fontSize="0.8rem"
                >
                  Provide your mobile number to continue
                </Typography>

                <TextField
                  variant="outlined"
                  placeholder="10-digit mobile number"
                  fullWidth
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  sx={{
                    maxWidth: 420,
                    mb: 3,
                    backgroundColor: "white",
                    borderRadius: "10px",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            component="img"
                            src="https://flagcdn.com/w20/in.png"
                            alt="India"
                            sx={{ width: 20, height: "auto", mr: 0.5 }}
                          />
                          <Typography
                            sx={{ ml: 0.5, mr: 1, whiteSpace: "nowrap" }}
                          >
                            +91
                          </Typography>
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}

            {step === "verifyOtp" && (
              <>
                {/* Step 2: OTP Verification */}
                <Typography variant="body1" fontWeight={500} mb={0.5}>
                  <span style={{ fontWeight: "bold" }}>Verify</span> Phone
                  Number
                </Typography>
                <Typography
                  variant="body2"
                  color="grey"
                  mb={1.5}
                  fontSize="0.8rem"
                  fontWeight="bold"
                >
                  Enter OTP sent to{" "}
                  <span style={{ color: "black", fontSize: "16px" }}>
                    +91 {mobile}
                  </span>
                </Typography>

                <Box display="flex" justifyContent="center" gap={2} mb={2}>
                  {otpArray.map((digit, index) => (
                    <TextField
                      size="small"
                      key={index}
                      id={`otp-input-${index}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      inputProps={{
                        maxLength: 1,
                        style: {
                          textAlign: "center",
                          fontSize: "18px",
                          width: "30px",
                          height: "30px",
                          backgroundColor: "white",
                          borderRadius: "10px",
                        },
                      }}
                      variant="outlined"
                    />
                  ))}
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#00695c",
                    fontSize: "0.8rem",
                    textAlign: "center",
                    mt: 1,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box component="span" sx={{ mr: 0.5 }}>
                    Resend OTP via SMS or
                  </Box>
                  <Box
                    component="img"
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="whatsapp"
                    sx={{ width: 20, height: 20, ml: 0.5 }}
                  />
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.75rem",
                    my: 1,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                    justifyContent: "center",
                    color: "#333",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      backgroundColor: "#00584b",
                      borderRadius: "3px",
                      width: 16,
                      height: 16,
                      mr: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </Typography>
                  </Box>
                  Keep me logged in on this device.
                </Typography>
              </>
            )}

            {step === "addressForm" && (
              <>
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
                    Add shipping address
                  </Typography>

                  {/* Pincode Field */}
                  <TextField
                    fullWidth
                    size="small"
                    label="Pincode*"
                    variant="outlined"
                    name="pincode"
                    value={addressForm.pincode}
                    onChange={handleAddressChange}
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
                    label="Full name*"
                    variant="outlined"
                    name="fullName"
                    value={addressForm.fullName}
                    onChange={handleAddressChange}
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

                  <TextField
                    fullWidth
                    size="small"
                    label="Receiver's number*"
                    variant="standard"
                    value={mobile}
                    disabled
                    sx={{
                      mb: 0.25,
                      backgroundColor: "#f1f1f1ff",
                      color: "#474646ff", // light black color
                      borderRadius: "4px",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                      },
                      input: {
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "#474646ff", // light black for input text
                        WebkitTextFillColor: "#474646ff", // for disabled input text
                      },
                      "& .Mui-disabled": {
                        WebkitTextFillColor: "#474646ff", // keep light black for disabled input
                        opacity: 1, // no faded effect
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+91</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: { fontSize: "0.9rem", fontWeight: "bold" },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="#474646ff"
                    sx={{
                      display: "block",
                      mb: 2,
                      fontSize: "0.68rem",
                      textAlign: "left",
                    }}
                  >
                    We'll contact you on this number during delivery
                  </Typography>

                  <TextField
                    fullWidth
                    size="small"
                    label="E-mail (optional)"
                    variant="outlined"
                    name="email"
                    value={addressForm.email}
                    onChange={handleAddressChange}
                    sx={{
                      mb: 0.25,
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
                    variant="caption"
                    color="#474646ff"
                    sx={{
                      display: "block",
                      mb: 2,
                      fontSize: "0.68rem",
                      textAlign: "left",
                    }}
                  >
                    Order delivery details will be sent heres
                  </Typography>

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

                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    mb={0.6}
                    sx={{
                      fontSize: "0.8rem",
                      color: "#19312eff",
                      textAlign: "left",
                    }}
                  >
                    Address type
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "left" }}>
                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                      <RadioGroup
                        row
                        name="addressType"
                        value={addressForm.addressType}
                        onChange={handleAddressChange}
                        sx={{ gap: 2 }}
                      >
                        <FormControlLabel
                          value="home"
                          control={<Radio size="small" color="#122e2bff" />}
                          label="Home"
                          sx={{
                            "& .MuiTypography-root": { fontSize: "0.9rem" },
                          }}
                        />
                        <FormControlLabel
                          value="office"
                          control={<Radio size="small" color="#122e2bff" />}
                          label="Office"
                          sx={{
                            "& .MuiTypography-root": { fontSize: "0.9rem" },
                          }}
                        />
                        <FormControlLabel
                          value="others"
                          control={<Radio size="small" color="#122e2bff" />}
                          label="Others"
                          sx={{
                            "& .MuiTypography-root": { fontSize: "0.9rem" },
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>

                  <Button
                    fullWidth
                    size="small"
                    variant="contained"
                    color="primary"
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
                    onClick={handleSubmit}
                  >
                    Add address
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    backgroundColor: "#f6f6f6",
                    p: 1,
                    borderRadius: 2,
                    m: 2,

                  }}
                >
                  {/* Left side: phone icon + number */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "#21413d",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    <PhoneIcon fontSize="small" />
                    +91 {mobile}
                  </Box>

                  {/* Right side: copy icon */}
                  <BorderColorIcon
                    sx={{ cursor: "pointer", color: "#21413d",fontSize:'18px' }}
                    onClick={() => {
                      navigator.clipboard.writeText(`+91${mobile}`);
                    }}
                  />
                </Box>
              </>
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
        </Box>
      </Box>
    </Modal>
  );
};

export default CheckoutDrawer;
