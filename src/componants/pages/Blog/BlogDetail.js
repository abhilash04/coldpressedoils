import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Avatar, Divider, Skeleton, Breadcrumbs, Link, Chip } from '@mui/material';
import SEO from '../../common/SEO';
import { apiList, invokeApi } from '../../../services/apiServices';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      setLoading(true);
      try {
        const response = await invokeApi(apiList.getArticleByOgUrl, { ogUrl: slug });
        if (response.status === 200 && response.data.blog?.length > 0) {
          const b = response.data.blog[0];
          setBlog({
            blogTitle: b.blogTitle || b.blog_title,
            ogUrl: b.ogUrl || b.og_url,
            category: b.category,
            blogContent: b.blogContent || b.blog_content,
            bannerUrl: b.bannerUrl || b.banner_url,
            featuredUrl: b.featuredUrl || b.featured_url,
            date: b.date || b.created_date,
            metaDescription: b.meta_description || '',
          });
        }
      } catch (error) {
        console.error('Error fetching blog detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetail();
  }, [slug]);

  if (loading) return (
    <Container sx={{ py: 10 }}>
      <Skeleton variant="rectangular" height={400} sx={{ mb: 4 }} />
      <Skeleton variant="text" height={60} />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
    </Container>
  );

  if (!blog) return (
    <Container sx={{ py: 12, textAlign: 'center' }}>
      <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>📄</Typography>
      <Typography variant="h5">Blog post not found.</Typography>
      <Link component={RouterLink} to="/blog" sx={{ mt: 2, display: 'inline-block' }}>← Back to Blog</Link>
    </Container>
  );

  return (
    <Box sx={{ borderTop: '1px solid #EEE' }}>
      <SEO
        title={blog.blogTitle}
        description={blog.metaDescription || `${blog.blogTitle} - ${blog.category} | Amrutha Dharee Health Blog`}
        ogImage={blog.bannerUrl || blog.featuredUrl}
        article={{
          publishedDate: blog.date,
          author: 'Amrutha Dharee Editorial',
        }}
      />

      {/* Blog Hero */}
      <Box sx={{ position: 'relative', height: { xs: '250px', md: '420px' }, mb: 8 }}>
        {blog.bannerUrl ? (
          <Box
            component="img"
            src={blog.bannerUrl}
            alt={blog.blogTitle}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box sx={{ width: '100%', height: '100%', bgcolor: '#1B2F23' }} />
        )}
        <Box
          sx={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.65))',
            display: 'flex', alignItems: 'flex-end',
          }}
        >
          <Container sx={{ pb: { xs: 3, md: 5 } }}>
            {blog.category && (
              <Chip
                label={blog.category}
                size="small"
                sx={{ mb: 2, borderRadius: 0, bgcolor: 'primary.main', color: '#FFF', fontWeight: 600 }}
              />
            )}
            <Typography
              variant="h2"
              sx={{
                color: '#FFF',
                maxWidth: '800px',
                fontWeight: 800,
                fontSize: { xs: '1.6rem', md: '3rem' },
                lineHeight: 1.2,
              }}
            >
              {blog.blogTitle}
            </Typography>
          </Container>
        </Box>
      </Box>

      <Container maxWidth="md" sx={{ mb: 12 }}>
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="/">Home</Link>
          <Link underline="hover" color="inherit" href="/blog">Blog</Link>
          <Typography color="text.primary">{blog.category}</Typography>
        </Breadcrumbs>

        {/* Author + Date */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 700 }}>AD</Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Amrutha Dharee Editorial</Typography>
            {blog.date && (
              <Typography variant="caption" color="text.secondary">
                {new Date(blog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </Typography>
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 6 }} />

        {/* Blog Content */}
        <Box
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.blogContent }}
          sx={{
            lineHeight: 1.9,
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: '#333',
            '& h2': { mt: 5, mb: 2, fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.8rem' } },
            '& h3': { mt: 4, mb: 1.5, fontWeight: 700 },
            '& p': { mb: 3 },
            '& ul, & ol': { pl: 3, mb: 3 },
            '& li': { mb: 1 },
            '& blockquote': {
              borderLeft: '4px solid',
              borderColor: 'primary.main',
              pl: 3,
              py: 1,
              my: 4,
              bgcolor: '#F9FAF4',
              fontStyle: 'italic',
            },
            '& img': { maxWidth: '100%', height: 'auto', my: 3 },
          }}
        />

        <Divider sx={{ my: 6 }} />

        {/* Back Link */}
        <Link component={RouterLink} to="/blog" color="primary" sx={{ fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          ← Back to Health Blog
        </Link>
      </Container>
    </Box>
  );
};

export default BlogDetail;
