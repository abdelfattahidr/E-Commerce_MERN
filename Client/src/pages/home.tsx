import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import { Product } from "../types/product.type";
import { Box } from "@mui/system";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3001/products/")
      .then(async (response) => {
        const data = await response.json();
        setProducts(data);
        setError(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(true);
      });
  }, []);
  if (error) {
    return <Box>Something went wrong, plase try again</Box>;
  }
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid key={p._id}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
