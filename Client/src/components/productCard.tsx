import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
interface Props {
  _id: string;
  title: string;
  image: string;
  price: string;
}

const ProductCard = ({ title, price }: Props) => {
  return (
    <Card>
      <CardMedia sx={{ height: 200 }} image={"contemplative-reptile.jpg"} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {price} DH
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small">
          Add To Cart
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
