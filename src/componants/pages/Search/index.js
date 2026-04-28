import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography, Grid, Box, Skeleton, Breadcrumbs, Link } from '@mui/material';
import ProductCard from '../../common/ProductCard';
import { apiList, invokeGetApi } from '../../../services/apiServices';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await invokeGetApi(apiList.getAllProducts);
        if (response.status === 200) {
          // Simple client-side search simulation
          const filtered = response.data.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) || 
            (p.category_name && p.category_name.toLowerCase().includes(query.toLowerCase()))
          );
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [query]);


  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" href="/">Home</Link>
        <Typography color="text.primary">Search Results</Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ mb: 6 }}>
        Search results for: <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>"{query}"</Box>
      </Typography>

      {loading ? (
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map(n => (
            <Grid item xs={12} sm={6} md={3} key={n}>
              <Skeleton variant="rectangular" height={250} />
              <Skeleton variant="text" sx={{ mt: 1 }} />
            </Grid>
          ))}
        </Grid>
      ) : products.length > 0 ? (
        <Grid container spacing={4}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ py: 10, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">No products found matching your search.</Typography>
          <Link href="/shop" sx={{ mt: 2, display: 'inline-block' }}>Continue shopping all products</Link>
        </Box>
      )}
    </Container>
  );
};

export default SearchResults;
