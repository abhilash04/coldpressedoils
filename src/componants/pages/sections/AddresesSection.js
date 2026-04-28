import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Link, 
  Button, 
  Card, 
  IconButton, 
  Dialog,
  DialogContent,
  InputBase,
  DialogActions,
  FormHelperText
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import { apiList, invokeApi } from '../../../services/apiServices';
import { config } from '../../../config/config';
import { useCookies } from 'react-cookie';
import SnackbarNotification from '../../common/Notification/SnackbarNotification';

const AddressesSection = () => {
  const [addresses, setAddresses] = useState([]);
  const [cookies] = useCookies();
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({
    fullName: '',
    address: '',
    receiverNumber: '',
    pincode: '',
    city: '',
    state: '',
    otherType: ''
  });

  //show snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const showSnackbar = (msg, severity = 'success') => {
    setSnackbarMessage(msg);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    receiverNumber: '',
    receiverEmail: '',
    pincode: '',
    city: '',
    state: '',
    addressType: 'Home',
    otherType: ''
  });

  const userId = cookies?.org_user?.loginUserId;

  const fetchAllAddressData = async () => {
    const params = { userId };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getAllAddress,
        params,
        cookies
      );
      if (response?.status === 200) {
        setAddresses(response.data.addressManager);
      } else if (response?.status === 400) {
        showSnackbar("Failed to get data. Please try again later!!",'error');
      }
    } catch (error) {
      showSnackbar("Failed to get data. Please try again later!!",'error');
    }
  };

  const fetchAddressById = async (id) => {
    setLoading(true);
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getAddress,
        { id },
        cookies
      );
      if (response?.status === 200) {
        const address = response.data.addressManager;
        setFormData({
          fullName: address.fullName,
          address: address.address,
          receiverNumber: address.receiverNumber,
          receiverEmail: address.receiverEmail,
          pincode: address.pincode,
          city: address.city,
          state: address.state,
          addressType: address.addressType === 'Home' || address.addressType === 'Work' ? address.addressType : 'Others',
          otherType: address.addressType !== 'Home' && address.addressType !== 'Work' ? address.addressType : ''
        });
      } else {
        showSnackbar("Failed to fetch address details", 'error');
      }
    } catch (error) {
      showSnackbar("Failed to fetch address details", 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAddressData();
  }, []);

  const handleAddNew = () => {
    setEditingAddress(null);
    setFormData({
      fullName: '',
      address: '',
      receiverNumber: '',
      receiverEmail: '',
      pincode: '',
      city: '',
      state: '',
      addressType: 'Home',
      otherType: ''
    });
    setErrors({
      fullName: '',
      address: '',
      receiverNumber: '',
      pincode: '',
      city: '',
      state: '',
      otherType: ''
    });
    setAddressModalOpen(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    fetchAddressById(address.id);
    setAddressModalOpen(true);
  };

  const handleClose = () => {
    setAddressModalOpen(false);
  };

  const validateField = (field, value) => {
    let error = '';
    
    switch(field) {
      case 'fullName':
        if (!value.trim()) error = 'Receiver name is required';
        else if (value.length > 100) error = 'Name is too long';
        break;
      case 'address':
        if (!value.trim()) error = 'Address is required';
        else if (value.length > 200) error = 'Address is too long';
        break;
      case 'receiverNumber':
        if (!value.trim()) error = 'Phone number is required';
        else if (!/^[0-9]{10}$/.test(value)) error = 'Invalid phone number';
        break;
      case 'pincode':
        if (!value.trim()) error = 'Pincode is required';
        else if (!/^[0-9]{6}$/.test(value)) error = 'Invalid pincode';
        break;
      case 'city':
        if (!value.trim()) error = 'City is required';
        else if (value.length > 50) error = 'City name is too long';
        break;
      case 'state':
        if (!value.trim()) error = 'State is required';
        else if (value.length > 50) error = 'State name is too long';
        break;
      case 'otherType':
        if (formData.addressType === 'Others' && !value.trim()) 
          error = 'Address type is required';
        break;
      case 'receiverEmail':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) 
          error = 'Invalid email format';
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (field, value) => {
    // Validate the field
    const error = validateField(field, value);
    
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      addressType: type,
      otherType: type === 'Others' ? prev.otherType : ''
    }));

    // Clear otherType error if switching away from Others
    if (type !== 'Others') {
      setErrors(prev => ({
        ...prev,
        otherType: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validateField('fullName', formData.fullName),
      address: validateField('address', formData.address),
      receiverNumber: validateField('receiverNumber', formData.receiverNumber),
      pincode: validateField('pincode', formData.pincode),
      city: validateField('city', formData.city),
      state: validateField('state', formData.state),
      otherType: formData.addressType === 'Others' ? validateField('otherType', formData.otherType) : '',
      receiverEmail: validateField('receiverEmail', formData.receiverEmail)
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    // Determine the final address type
    const finalAddressType = formData.addressType === 'Others' 
      ? formData.otherType 
      : formData.addressType;

    const payload = {
      userId,
      fullName: formData.fullName,
      address: formData.address,
      receiverNumber: formData.receiverNumber,
      receiverEmail: formData.receiverEmail,
      pincode: formData.pincode,
      city: formData.city,
      state: formData.state,
      addressType: finalAddressType
    };

    try {
      let response;
      if (editingAddress) {
        // Update existing address
        response = await invokeApi(
          config.getMyCollege + apiList.updateAddress,
          { ...payload, id: editingAddress.id },
          cookies
        );
      } else {
        // Add new address
        response = await invokeApi(
          config.getMyCollege + apiList.addAddress,
          payload,
          cookies
        );
      }

      if (response?.status === 200) {
        fetchAllAddressData();
        handleClose();
        showSnackbar(editingAddress ? 'Address updated successfully' : 'Address added successfully');
      } else {
        showSnackbar("Failed to save address", 'error');
      }
    } catch (error) {
      console.error("Error saving address:", error);
      showSnackbar("Failed to save address", 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.deleteAddress,
        { id },
        cookies
      );
      if (response?.status === 200) {
        fetchAllAddressData();
        showSnackbar('Address deleted successfully');
      } else {
        showSnackbar("Failed to delete address", 'error');
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      showSnackbar("Failed to delete address", 'error');
    }
  };

  return (
    <Box sx={{ maxWidth: '1250px', mx: 'auto' }}>
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={1}
          sx={{
            fontSize: '1.75rem',
            color: '#292929'
          }}
        >
          Addresses
        </Typography>

        {/* Link */}
        <Link
          href="#"
          underline="hover"
          color="#064d41"
          sx={{ display: 'inline-block', mb: 4, fontWeight: 500 }}
        >
          Return to Account details
        </Link>

        {/* Button */}
        <Box mt={2}>
          <Box
            sx={{
              py: 4,
              px: 3,
              mx: 4,
              borderRadius: 6,
              border: '1px solid #e0e0e0',
              overflow: 'hidden',
              minHeight: '350px',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ fontWeight: 800, fontSize: '18px', color: '#292929' }}>
                Saved Address
              </Typography>

              <Button
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  borderColor: "#064d41",
                  color: "#064d41",
                  fontWeight: 700,
                  textTransform: 'none',
                  px: 3,
                  '&:hover': {
                    backgroundColor: 'rgba(6, 77, 65, 0.05)',
                    borderColor: "#064d41"
                  }
                }}
                onClick={handleAddNew}
              >
                Add New Address
              </Button>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                  xl: 'repeat(4, 1fr)',
                },
                gap: { xs: 2, sm: 3 },
              }}
            >
              {addresses.map((item) => (
                <Card
                  elevation={0}
                  key={item.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    border: '1px solid #e0e0e0',
                    borderRadius: 4,
                    px: { xs: 2, sm: 2 },
                    pt: { xs: 3, sm: 2 },
                    pb: { xs: 2, sm: 2 },
                  }}
                >
                  {/* Ribbon */}
                  {item.isPrimary && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100px',
                        height: '100px',
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        zIndex: 1,
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: -35,
                          background: '#ffe4d9',
                          color: '#ff6b35',
                          fontWeight: 700,
                          fontSize: '12px',
                          transform: 'rotate(45deg)',
                          width: '120px',
                          textAlign: 'center',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        }}
                      >
                        Primary
                      </Box>
                    </Box>
                  )}

                  {/* Content */}
                  <Box>
                    <Typography sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#292929' }}>
                      {item.addressType === 'Home' ? <HomeOutlinedIcon /> :
                        item.addressType === 'Work' ? <BusinessCenterOutlinedIcon /> :
                          <LocationOnOutlinedIcon />}
                      {item.addressType}
                    </Typography>

                    <Typography sx={{ fontSize: 14, color: '#666', mb: 1 }}>
                      {item.fullName}
                    </Typography>

                    <Typography sx={{ fontSize: 14, color: '#666' }}>
                      {item.address}
                    </Typography>

                    <Typography sx={{ fontSize: 14, color: '#666', mt: 1 }}>
                      {item.city}, {item.state} - {item.pincode}
                    </Typography>

                    <Typography sx={{ fontSize: 14, color: '#666', mt: 1 }}>
                      Phone: {item.receiverNumber}
                    </Typography>
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', justifyContent: item.isPrimary ? 'flex-start' : 'space-between', mt: 2 }}>
                    <Button
                      size="small"
                      sx={{
                        color: "#064d41",
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                      onClick={() => handleEdit(item)}
                    >
                      <EditRoundedIcon sx={{ fontSize: 18, mr: 0.5 }} />
                      Edit
                    </Button>

                    {!item.isPrimary && (
                      <Button
                        size="small"
                        sx={{
                          color: "#064d41",
                          textTransform: 'none',
                          fontWeight: 700,
                          fontSize: 14,
                        }}
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteRoundedIcon sx={{ fontSize: 18, mr: 0.5 }} />
                        Delete
                      </Button>
                    )}
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Add/Edit Address Dialog */}
      <Dialog
        open={addressModalOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: 1, width: "750px" }
        }}
      >
        <DialogContent sx={{ p: { md: 3 } }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography sx={{ fontSize: "23px", fontWeight: 800, color: '#292929' }}>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </Typography>
            <IconButton
              size="small"
              onClick={handleClose}
              sx={{ borderRadius: '50%', padding: '4px' }}
            >
              <HighlightOffIcon sx={{ fontSize: '30px', color: '#292929' }} />
            </IconButton>
          </Box>
          <Box sx={{ borderBottom: '1px solid #e0e0e0', mb: 2.5 }} />

          <Box sx={{ px: 2 }}>
            {/* Map */}
            <Box
              sx={{
                width: '100%',
                height: 180,
                borderRadius: 2,
                overflow: 'hidden',
                mb: 2
              }}
            >
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=Koramangala%20Bangalore&t=&z=13&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
              ></iframe>
            </Box>

            <Typography sx={{ fontWeight: 700, fontSize: '18px', mb: 1, color: '#292929' }}>
              Address Details
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
              {/* Receiver Name */}
              <Box sx={{ position: 'relative', width: '100%' }}>
                <InputBase
                  fullWidth
                  size='small'
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  sx={{
                    border: `1px solid ${errors.fullName ? '#d32f2f' : '#e0e0e0'}`,
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    padding: '10px 12px',
                    fontSize: '14px',
                    height: "40px"
                  }}
                  placeholder="Receiver Name*"
                />
                {errors.fullName && (
                  <FormHelperText error sx={{ ml: 1 }}>
                    {errors.fullName}
                  </FormHelperText>
                )}
              </Box>

              {/* Address */}
              <Box sx={{ position: 'relative', width: '100%' }}>
                <InputBase
                  fullWidth
                  size='small'
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  sx={{
                    border: `1px solid ${errors.address ? '#d32f2f' : '#e0e0e0'}`,
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    padding: '10px 12px',
                    fontSize: '14px',
                    height: "40px"
                  }}
                  placeholder="Street Address*"
                />
                {errors.address && (
                  <FormHelperText error sx={{ ml: 1 }}>
                    {errors.address}
                  </FormHelperText>
                )}
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                {/* City */}
                <Box sx={{ position: 'relative', width: '100%' }}>
                  <InputBase
                    fullWidth
                    size='small'
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    sx={{
                      border: `1px solid ${errors.city ? '#d32f2f' : '#e0e0e0'}`,
                      borderRadius: '12px',
                      backgroundColor: '#fff',
                      padding: '10px 12px',
                      fontSize: '14px',
                      height: "40px"
                    }}
                    placeholder="City*"
                  />
                  {errors.city && (
                    <FormHelperText error sx={{ ml: 1 }}>
                      {errors.city}
                    </FormHelperText>
                  )}
                </Box>
                
                {/* State */}
                <Box sx={{ position: 'relative', width: '100%' }}>
                  <InputBase
                    fullWidth
                    size='small'
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    sx={{
                      border: `1px solid ${errors.state ? '#d32f2f' : '#e0e0e0'}`,
                      borderRadius: '12px',
                      backgroundColor: '#fff',
                      padding: '10px 12px',
                      fontSize: '14px',
                      height: "40px"
                    }}
                    placeholder="State*"
                  />
                  {errors.state && (
                    <FormHelperText error sx={{ ml: 1 }}>
                      {errors.state}
                    </FormHelperText>
                  )}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Pincode */}
                <Box sx={{ position: 'relative', width: '100%' }}>
                  <InputBase
                    fullWidth
                    size='small'
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    sx={{
                      border: `1px solid ${errors.pincode ? '#d32f2f' : '#e0e0e0'}`,
                      borderRadius: '12px',
                      backgroundColor: '#fff',
                      padding: '10px 12px',
                      fontSize: '14px',
                      height: "40px"
                    }}
                    placeholder="Pincode*"
                  />
                  {errors.pincode && (
                    <FormHelperText error sx={{ ml: 1 }}>
                      {errors.pincode}
                    </FormHelperText>
                  )}
                </Box>

                {/* Phone Number */}
                <Box sx={{ position: 'relative', width: '100%' }}>
                  <InputBase
                    fullWidth
                    size='small'
                    value={formData.receiverNumber}
                    onChange={(e) => handleInputChange('receiverNumber', e.target.value)}
                    sx={{
                      border: `1px solid ${errors.receiverNumber ? '#d32f2f' : '#e0e0e0'}`,
                      borderRadius: '12px',
                      backgroundColor: '#fff',
                      padding: '10px 12px',
                      fontSize: '14px',
                      height: "40px"
                    }}
                    placeholder="Phone Number*"
                  />
                  {errors.receiverNumber && (
                    <FormHelperText error sx={{ ml: 1 }}>
                      {errors.receiverNumber}
                    </FormHelperText>
                  )}
                </Box>
              </Box>

              {/* Email */}
              <Box sx={{ position: 'relative', width: '100%' }}>
                <InputBase
                  fullWidth
                  size='small'
                  value={formData.receiverEmail}
                  onChange={(e) => handleInputChange('receiverEmail', e.target.value)}
                  sx={{
                    border: `1px solid ${errors.receiverEmail ? '#d32f2f' : '#e0e0e0'}`,
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    padding: '10px 12px',
                    fontSize: '14px',
                    height: "40px"
                  }}
                  placeholder="Email"
                />
                {errors.receiverEmail && (
                  <FormHelperText error sx={{ ml: 1 }}>
                    {errors.receiverEmail}
                  </FormHelperText>
                )}
              </Box>
            </Box>

            {/* Address Type Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              {[
                { label: 'Home', icon: <HomeIcon sx={{ fontSize: 20 }} /> },
                { label: 'Work', icon: <WorkIcon sx={{ fontSize: 20 }} /> },
                { label: 'Others', icon: <LocationOnOutlinedIcon sx={{ fontSize: 20 }} /> },
              ].map(({ label, icon }) => {
                const isSelected = formData.addressType === label;

                return (
                  <Button
                    key={label}
                    variant={isSelected ? "contained" : "outlined"}
                    onClick={() => handleAddressTypeSelect(label)}
                    sx={{
                      borderRadius: 4,
                      textTransform: 'none',
                      px: 2,
                      fontWeight: 500,
                      fontSize: '15px',
                      color: isSelected ? '#fff' : '#064d41',
                      backgroundColor: isSelected ? '#064d41' : 'transparent',
                      borderColor: isSelected ? '#064d41' : '#064d41',
                      '&:hover': {
                        backgroundColor: isSelected ? '#053a31' : 'rgba(6, 77, 65, 0.08)',
                        borderColor: '#064d41',
                      },
                      gap: 1
                    }}
                  >
                    {icon}
                    {label}
                  </Button>
                );
              })}
            </Box>

            {/* Other Address Type Input */}
            {formData.addressType === 'Others' && (
              <Box sx={{ mb: 2 }}>
                <InputBase
                  fullWidth
                  size='small'
                  value={formData.otherType}
                  onChange={(e) => handleInputChange('otherType', e.target.value)}
                  sx={{
                    border: `1px solid ${errors.otherType ? '#d32f2f' : '#e0e0e0'}`,
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    padding: '10px 12px',
                    fontSize: '14px',
                    height: "40px"
                  }}
                  placeholder="Enter address type (e.g. Villa, Apartment)*"
                />
                {errors.otherType && (
                  <FormHelperText error sx={{ ml: 1 }}>
                    {errors.otherType}
                  </FormHelperText>
                )}
              </Box>
            )}
          </Box>

          <DialogActions sx={{ mt: 2, justifyContent: 'space-between', px: 2 }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                px: 4,
                borderRadius: 4,
                fontWeight: 800,
                fontSize: '14px',
                height: '40px',
                width: "150px",
                borderColor: "#064d41",
                color: "#064d41",
                textTransform: 'none',
                '&:hover': {
                  borderColor: "#064d41",
                  backgroundColor: 'rgba(6, 77, 65, 0.08)'
                }
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
              sx={{
                px: 4,
                borderRadius: 4,
                height: '40px',
                width: "150px",
                backgroundColor: "#064d41",
                '&:hover': {
                  backgroundColor: "#053a31"
                },
                textTransform: 'none',
                fontWeight: 800,
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
            >
              Save Address
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <SnackbarNotification
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default AddressesSection;