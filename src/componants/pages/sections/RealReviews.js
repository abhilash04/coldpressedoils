import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  CardMedia,
  IconButton,
  useMediaQuery,
  useTheme,
  Slider,
  Button,
  Divider,
  TextField,
  Stack,
  Avatar,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Paper } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PushPinIcon from "@mui/icons-material/PushPin";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import img1 from "../../../assets/reviewimg1.jpg";
import img2 from "../../../assets/reviewimg2.jpg";
import img3 from "../../../assets/reviewimg3.jpg";
import img4 from "../../../assets/reviewimg4.jpg";
import img5 from "../../../assets/reviewimg5.jpg";
import img6 from "../../../assets/reviewimg6.jpg";
import img7 from "../../../assets/reviewimg7.jpg";
import img8 from "../../../assets/reviewimg8.jpg";
import img9 from "../../../assets/reviewimg9.jpg";
import { BorderBottom } from "@mui/icons-material";

const reviewsData = [
  {
    img: img1,
    name: "Meenakshi Panchal",
    stars: 4.7,
    review: "Pure and natural, exactly what I was looking for",
  },
  {
    img: img2,
    name: "Rajiv Sharma",
    stars: 5.0,
    review: "Excellent quality and fast delivery!",
  },
  {
    img: img3,
    name: "Anita Joshi",
    stars: 4.5,
    review: "Tastes authentic. Worth every rupee.",
  },
  {
    img: img4,
    name: "Vikas Mehra",
    stars: 4.8,
    review: "Feels homemade. Loved it!",
  },
  {
    img: img5,
    name: "Rahul",
    stars: 4.9,
    review: "My family loved it. Will buy again.",
  },
  {
    img: img6,
    name: "Kishore",
    stars: 4.9,
    review: "My family loved it. Will buy again.",
  },
  {
    img: img7,
    name: "Ramya",
    stars: 4.9,
    review: "My family loved it. Will buy again.",
  },
  {
    img: img8,
    name: "Pallavi",
    stars: 4.9,
    review: "My family loved it. Will buy again.",
  },
  {
    img: img9,
    name: "Ravi",
    stars: 4.9,
    review: "My family loved it. Will buy again.",
  },
];

const RealReviews = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // mobile: 1 item
  const isMd = useMediaQuery(theme.breakpoints.down("md")); // tablet: 2 items
  const itemsPerPage = isXs ? 1 : isMd ? 2 : 4;
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const maxIndex = Math.max(0, reviewsData.length - itemsPerPage);

  const averageRating = 4.76;
  const totalReviews = 254;
  const ratingDistribution = [
    { stars: 5, count: 209, percentage: (209 / 254) * 100 },
    { stars: 4, count: 36, percentage: (36 / 254) * 100 },
    { stars: 3, count: 5, percentage: (5 / 254) * 100 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 4, percentage: (4 / 254) * 100 },
  ];

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setFileName("");
    fileInputRef.current.value = null; // clear input
  };
  const handleBoxClick = () => {
    fileInputRef.current.click(); // Trigger hidden input
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <StarIcon key={i} sx={{ color: "#FFD700", fontSize: "1.2rem" }} />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <StarHalfIcon key={i} sx={{ color: "#FFD700", fontSize: "1.2rem" }} />
        );
      } else {
        stars.push(
          <StarBorderIcon
            key={i}
            sx={{ color: "#FFD700", fontSize: "1.2rem" }}
          />
        );
      }
    }

    return stars;
  };

  const handleSubmit = () => {
    // Submit logic here
    console.log({ rating, title, review, name, email });
    setShowForm(false);
    // Reset form
    setRating(0);
    setTitle("");
    setReview("");
    setName("");
    setEmail("");
  };
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    const newIndex = Math.round((newValue / 100) * maxIndex);
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSliderValue((newIndex / maxIndex) * 100);
  };

  const handleNext = () => {
    const newIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSliderValue((newIndex / maxIndex) * 100);
  };

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const itemWidth = container.firstChild?.offsetWidth || 300;
      const scrollPosition = currentIndex * (itemWidth + 16); // 16px gap

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <Box
      component="section"
      sx={{
        py: 4,
        px: 2,
        backgroundColor: "#fff",
        maxWidth: "100%",
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.5rem", md: "2rem" },
          mb: 2,
          fontFamily: "Montserrat, sans-serif",
          color: "#00584b",
        }}
      >
        Real People. Real Reviews.
      </Typography>

      <Box
        sx={{
          position: "relative",
          maxWidth: "1400px",
          mx: "auto",
          "&:hover .nav-arrow": {
            opacity: 1,
          },
        }}
      >
        {/* Left Arrow */}
        <IconButton
          onClick={handlePrev}
          className="nav-arrow"
          sx={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "#00584b",
            boxShadow: 3,
            color: "white",
            opacity: 0,
            transition: "opacity 0.3s ease",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              opacity: 1,
            },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        {/* Reviews Container */}
        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "hidden",
            scrollBehavior: "smooth",
            py: 2,
            px: 1,
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {reviewsData.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                flex: "0 0 auto",
                position: "relative",
                width: { xs: 240, sm: 260, md: 280 },
                height: 350,
                borderRadius: 2,
                boxShadow: 2,
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                src={item.img}
                alt={`Review by ${item.name}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    backgroundColor: "white",
                    color: "#000",
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    textAlign: "center",
                    maxWidth: "85%",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#00695c", mb: 0.5 }}
                  >
                    {item.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                      mb: 0.5,
                    }}
                  >
                    <Typography sx={{ color: "#FFD700" }}>★★★★★</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {item.stars} Stars
                    </Typography>
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      fontStyle: "italic",
                      display: "block",
                      color: "gray",
                      mb: 1,
                    }}
                  >
                    Verified Purchase
                  </Typography>

                  <Typography variant="body2">{item.review}</Typography>
                </Paper>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Right Arrow */}
        <IconButton
          onClick={handleNext}
          className="nav-arrow"
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: " #00584b",
            color: "white",
            boxShadow: 3,
            opacity: 0,
            transition: "opacity 0.3s ease",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              opacity: 1,
            },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Custom Scrollbar */}
      <Box sx={{ width: "100%", px: 2, mt: 2, maxWidth: "1200px", mx: "auto" }}>
        <Slider
          value={sliderValue}
          onChange={handleSliderChange}
          aria-labelledby="reviews-slider"
          sx={{
            color: "#00584b",
            height: 6,
            "& .MuiSlider-thumb": {
              width: 16,
              height: 16,
              backgroundColor: "#00584b",
              "&:hover, &.Mui-focusVisible": {
                boxShadow: "0 0 0 8px rgba(0, 88, 75, 0.16)",
              },
              "&.Mui-active": {
                boxShadow: "0 0 0 14px rgba(0, 88, 75, 0.16)",
              },
            },
            "& .MuiSlider-track": {
              height: 6,
            },
            "& .MuiSlider-rail": {
              height: 6,
              opacity: 0.5,
              backgroundColor: "#d1d1d1",
            },
          }}
        />
      </Box>

      <Box mt={2} maxWidth={1200} mx="auto">
        <Typography sx={{ fontSize: "24px", lineHeight: 1.4 }}>
          Customer Reviews
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3.5}
          sx={{ borderBottom: "1px solid #ddd", pb: 2 }}
        >
          <Box sx={{ maxWidth: 400, mx: "auto" }}>
            {/* Average Rating */}
            <Box display="flex" alignItems="center">
              <Box
                display="flex"
                mr={1}
                sx={{ fontSize: "28px", lineHeight: 1.4 }}
              >
                {renderStars(averageRating)}
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  color: "grey",
                }}
              >
                {averageRating.toFixed(2)} out of 5
              </Typography>
            </Box>
            <Typography
              color="text.secondary"
              mb={1}
              display="block"
              sx={{ fontSize: "16px" }}
            >
              Based on {totalReviews} reviews ✅
            </Typography>
          </Box>
          <Box sx={{ maxWidth: 400, mx: "auto" }}>
            {/* Rating Distribution */}
            <Box>
              {ratingDistribution.map((item, index) => (
                <Box key={index} display="flex" alignItems="center" mb={0.5}>
                  {/* Stars */}
                  <Box display="flex" width={100} mr={1}>
                    {renderStars(item.stars)}
                  </Box>

                  {/* Background bar */}
                  <Box
                    sx={{
                      position: "relative",
                      width: 150,
                      height: 15,
                      backgroundColor: "#eee",
                      borderRadius: 5,
                      mr: 1,
                    }}
                  >
                    {/* Filled bar */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: `${item.percentage}%`,
                        backgroundColor: "#00584b",
                      }}
                    />
                  </Box>

                  {/* Count */}
                  <Typography
                    minWidth={30}
                    sx={{ fontSize: "14px", color: "grey" }}
                  >
                    {item.count}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ maxWidth: 400, mx: "auto" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#00584b",
                px: 4,
                color: "#fff",
                border: showForm ? "1px solid #00584b" : "none",
                "&:hover": {
                  backgroundColor: "#004d40",
                },
              }}
              onClick={toggleForm}
            >
              <Typography sx={{ fontSize: "16px", textDecoration: "none" }}>
                {showForm ? "Cancel review" : "Write a review"}
              </Typography>
            </Button>
          </Box>
        </Box>

        {showForm && (
          <Box p={3} sx={{ maxWidth: 600, mx: "auto" }}>
            <Box mb={1}>
              <Typography variant="h5" fontWeight={600} sx={{ color: "grey" }}>
                Write a review
              </Typography>
            </Box>

            {/* Rating */}
            <Typography mb={0.5} sx={{ color: "#7d7d7d" }}>
              Rating
            </Typography>
            <Box mb={3} gap={1}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  sx={{
                    fontSize: 26,
                    cursor: "pointer",
                    stroke: "#2d2d2d",
                    strokeWidth: 1,
                    color:
                      star <= (hoverRating || rating) ? "#FFD700" : "white",
                    transition: "color 0.2s",
                  }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </Box>

            {/* Review Title */}
            <Typography variant="body1" mb={1} sx={{ color: "#7b7b7b" }}>
              Review Title <Typography variant="caption">(100)</Typography>
            </Typography>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Give your review a title"
              inputProps={{ maxLength: 100 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* Review Text */}
            <Typography variant="body2" mb={1} sx={{ color: "#7b7b7b" }}>
              Review
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Write your comments here"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              sx={{ mb: 3 }}
            />

            {/* Picture/Video Upload */}
            <Typography variant="body1" mb={1} sx={{ color: "#7b7b7b" }}>
              Picture/Video (optional)
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={handleBoxClick}
              sx={{
                border: "1px dashed #ccc",
                width: 120,
                height: 120,
                mb: 1,
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                textAlign: "center",
                lineHeight: 0,
                position: "relative",
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <AddPhotoAlternateIcon fontSize="large" color="disabled" />
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Box>
            {preview && (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mb={2}
              >
                <Typography variant="caption" mb={0.5}>
                  {fileName}
                </Typography>
                <Button
                  size="small"
                  variant="text"
                  color="error"
                  onClick={handleRemoveImage}
                  sx={{ textTransform: "none", fontSize: "0.85rem" }}
                >
                  Remove image
                </Button>
              </Box>
            )}

            {/* Name Field */}
            <Typography variant="body2" mb={1} sx={{ color: "#7b7b7b" }}>
              Name (displayed publicly like <strong>{name}</strong>)
            </Typography>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Enter your name (public)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* Email Field */}
            <Typography variant="body2" mb={1} sx={{ color: "#7b7b7b" }}>
              Email
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="email"
              variant="outlined"
              placeholder="Enter your email (private)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />

            {/* Privacy Notice */}
            <Typography color="text.secondary" mb={3} sx={{ fontSize: "16px" }}>
              How we use your data: We'll only contact you about the review you
              left, and only if necessary. By submitting your review, you agree
              to Judge.me's{" "}
              <Typography
                component="span"
                variant="caption"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "text.secondary",
                }}
              >
                terms
              </Typography>
              ,{" "}
              <Typography
                component="span"
                variant="caption"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "text.secondary",
                }}
              >
                privacy
              </Typography>
              , and{" "}
              <Typography
                component="span"
                variant="caption"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "text.secondary",
                }}
              >
                content
              </Typography>{" "}
              policies.
            </Typography>

            {/* Buttons */}
            <Box display="flex" justifyContent="center" gap={2}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#00584b",
                  color: "#00584b",
                }}
                onClick={() => setShowForm(false)}
              >
                Cancel review
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#00584b",
                  fontWeight: "bold",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#004d40" },
                }}
                onClick={handleSubmit}
              >
                Submit Review
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          p: 2,
          backgroundColor: "#fff",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* Sort label */}
        <Typography variant="body2" sx={{ color: "#00695c", fontWeight: 500,textAlign:'left' }}>
          Most Helpful ▼
        </Typography>

        <Divider sx={{ my: 1}} />

        {/* Review Content */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Left part (Stars, Avatar, Name, Content) */}
          <Box>
            {/* Stars */}
            <Box display="flex" alignItems="center" mb={0.5}>
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} sx={{ color: "#FFD700", fontSize: 20 }} />
              ))}
            </Box>

            {/* Avatar and Name */}
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#f2f2f2", mr: 1 }}>
                <Typography color="#00695c" >
                  <PermIdentityIcon />
                </Typography>
              </Avatar>
              <Typography variant="body2" color="#00695c">
                Roma Srivastav
              </Typography>
            </Box>

            {/* Title */}
            <Typography variant="subtitle1" fontWeight={600}  textAlign='left' color='grey'>
              Pure Bliss in Every Spoon!
            </Typography>

            {/* Review Body */}
            <Typography variant="body1" color="text.secondary">
              If you need ghee this is the place where we get quality assurance
              and the tatse of ghee is so good.
            </Typography>
          </Box>

          {/* Right part: Date and Pin */}
          <Box textAlign="right">
            <Typography variant="caption" color="text.secondary">
              24/03/2025
            </Typography>
            <IconButton size="small" sx={{ color: "#00695c", ml: 1 }}>
              <PushPinIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{display:'flex', justifyContent:'right', borderBottom: "1px solid #ddd",pb:1}}>
        {/* Like / Dislike */}
        <Stack direction="row" spacing={2} mt={2} a>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <ThumbUpIcon fontSize="small" sx={{ color: "#00695c" }} />
            <Typography variant="body2">11</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <ThumbDownIcon fontSize="small" sx={{ color: "#00695c" }} />
            <Typography variant="body2">22</Typography>
          </Stack>
        </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default RealReviews;
