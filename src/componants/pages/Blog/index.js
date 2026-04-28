import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button, Chip, Skeleton, Breadcrumbs, Link } from '@mui/material';
import { apiList, invokeApi, invokeGetApi } from '../../../services/apiServices';
import SEO from '../../common/SEO';



const dummyBlogs = [
  {
    id: 1,
    blog_title: 'Why Wood-Pressed Oils are Superior to Refined Oils',
    og_url: 'why-wood-pressed-oils-superior',
    category: 'Health',
    featured_url: '',
    created_date: '2026-04-01',
  },
  {
    id: 2,
    blog_title: '5 Reasons to Switch to Groundnut Oil for Daily Cooking',
    og_url: 'switch-to-groundnut-oil',
    category: 'Nutrition',
    featured_url: '',
    created_date: '2026-04-10',
  },
  {
    id: 3,
    blog_title: 'The Ancient Science of Vaagai Wood Churners',
    og_url: 'vaagai-wood-churners-science',
    category: 'Tradition',
    featured_url: '',
    created_date: '2026-04-18',
  },
];

const CATEGORY_COLORS = {
  Health: '#2D6A4F',
  Nutrition: '#B7791F',
  Tradition: '#553C9A',
  Recipe: '#C53030',
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        // Try new GET endpoint first
        const response = await invokeGetApi(apiList.getBlogs, { status: 'Active' });
        if (response.data.responseCode === '200' && response.data.blogs.length > 0) {
          setBlogs(response.data.blogs);
        } else {
          // Legacy fallback
          const legacy = await invokeApi(apiList.getArticles, { status: 'Active' });
          if (legacy.data.responseCode === '200') {
            setBlogs(legacy.data.blogs || []);
          } else {
            setBlogs(dummyBlogs);
          }
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs(dummyBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Box sx={{ py: 6 }}>
      <SEO
        title="Health Blog"
        description="Explore our collection of health guides, traditional recipes, and wellness tips to help you live a purer, chemical-free life."
      />

      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="/">Home</Link>
          <Typography color="text.primary">Health Blog</Typography>
        </Breadcrumbs>

        <Typography variant="h2" sx={{ mb: 2, fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' } }}>
          Health Tips & Recipes
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: '700px', lineHeight: 1.8 }}>
          Explore our collection of health guides, traditional recipes, and wellness tips
          to help you live a purer, chemical-free life.
        </Typography>

        <Grid container spacing={4}>
          {loading ? (
            [1, 2, 3].map((n) => (
              <Grid item xs={12} sm={6} md={4} key={n}>
                <Skeleton variant="rectangular" height={220} />
                <Skeleton variant="text" sx={{ mt: 2 }} />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 0,
                    border: '1px solid #EEE',
                    transition: 'all 0.3s',
                    '&:hover': { boxShadow: '0 8px 30px rgba(0,0,0,0.1)', transform: 'translateY(-4px)' }
                  }}
                >
                  {blog.featured_url ? (
                    <CardMedia component="img" height="200" image={blog.featured_url} alt={blog.blog_title || blog.blogTitle} />
                  ) : (
                    <Box sx={{ height: 200, bgcolor: '#F0F4F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h1" sx={{ fontSize: '4rem', opacity: 0.3 }}>🌿</Typography>
                    </Box>
                  )}
                  <CardContent sx={{ p: 3 }}>
                    <Chip
                      label={blog.category}
                      size="small"
                      sx={{
                        mb: 2,
                        borderRadius: 0,
                        bgcolor: CATEGORY_COLORS[blog.category] || '#2D6A4F',
                        color: '#FFF',
                        fontWeight: 600
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {blog.blog_title || blog.blogTitle}
                    </Typography>
                    {blog.created_date && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        {new Date(blog.created_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </Typography>
                    )}
                    <Button
                      href={`/blog/${blog.og_url || blog.ogUrl}`}
                      variant="text"
                      color="primary"
                      sx={{ p: 0, fontWeight: 700, mt: 1 }}
                    >
                      READ MORE →
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ width: '100%', textAlign: 'center', py: 12 }}>
              <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>✍️</Typography>
              <Typography variant="h5" color="text.secondary">No blog posts published yet.</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Check back soon for health tips and recipes!</Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogList;
