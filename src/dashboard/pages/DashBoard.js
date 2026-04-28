import React, { useEffect, useState } from "react";
import Sidenav from "../common/Sidenav";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import Header from "../common/Header";
import {
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Description as DescriptionIcon,
  Assessment as AssessmentIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { apiList, invokeApi } from "../../services/apiServices";

const StatCard = ({ title, value, icon, color, loading }) => (
  <Card elevation={0} sx={{ border: "1px solid #EAEAEA", borderRadius: 0, height: "100%" }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography color="text.secondary" variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.2 }}>
            {title}
          </Typography>
          <Typography variant="h3" sx={{ mt: 1, fontWeight: 700, fontFamily: "Playfair Display", color: "#2D6A4F" }}>
            {loading ? <CircularProgress size={24} sx={{ color: "#2D6A4F" }} /> : value}
          </Typography>
        </Box>
        <Box sx={{ p: 1.5, bgcolor: `${color}15`, borderRadius: 0 }}>
          {React.cloneElement(icon, { sx: { color: color, fontSize: 32 } })}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, leads: 0, blogs: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Parallel fetching for performance
      const [prodRes, leadRes, blogRes, userRes] = await Promise.all([
        invokeApi(apiList.getAllProducts, {}),
        invokeApi(apiList.getLeads, { status: "Fresh" }),
        invokeApi(apiList.getBlogs, { status: "Active" }),
        invokeApi(apiList.getUsers, {})
      ]);

      setStats({
        products: prodRes.data?.products?.length || 0,
        leads: leadRes.data?.leads?.length || 0,
        blogs: blogRes.data?.blogs?.length || 0,
        users: userRes.data?.users?.length || 0,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <Box sx={{ display: "flex", bgcolor: "#F9FAF4", minHeight: "100vh" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Typography variant="h3" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#2D6A4F" }}>
              Admin Overview
            </Typography>
            <IconButton onClick={fetchDashboardData} sx={{ color: "#2D6A4F" }}><RefreshIcon /></IconButton>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Total Products" value={stats.products} icon={<InventoryIcon />} color="#2D6A4F" loading={loading} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Fresh Leads" value={stats.leads} icon={<AssessmentIcon />} color="#B7791F" loading={loading} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Active Blogs" value={stats.blogs} icon={<DescriptionIcon />} color="#2D6A4F" loading={loading} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Total Employees" value={stats.users} icon={<PeopleIcon />} color="#666" loading={loading} />
            </Grid>
          </Grid>

          <Box sx={{ mt: 6, p: 6, textAlign: "center", bgcolor: "#FFF", border: "1px solid #EAEAEA" }}>
             <Typography variant="h5" sx={{ color: "#999", fontStyle: "italic" }}>
                Welcome to the Amrutha Dharee Control Center. Use the sidebar to manage your botanical empire.
             </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
