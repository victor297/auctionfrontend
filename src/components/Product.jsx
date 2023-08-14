import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { setHeaders, url } from "../../features/api";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import { addToCart } from "../../features/cartSlice";
import { setHeaders, url } from "../slices/api";
import { addToCart } from "../slices/cartSlice";

const Product = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(product);
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(
          `${url}/products/find/${params.id}`,
          setHeaders()
        );
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  return (
    <Row>
      {loading ? (
        <p>Loading.....</p>
      ) : (
        <>
          <Row className='text-center m-auto p-0'>
            <Row>
              <Col md={3}>
                <img
                  src={product.image?.url}
                  alt='product'
                  style={{ maxHeight: "500px" }}
                  width={340}
                />
              </Col>
              <Col md={6}>
                <div className='card-body'>
                  <h5 className='card-title'>{product.name}</h5>
                  <p className='card-text'>Brand: {product.brand}</p>
                  <p>Description: {product.desc} </p>
                  <p>price: {product.price?.toLocaleString()} </p>
                  <Button
                    variant='warning'
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </Button>
                </div>
              </Col>
            </Row>
          </Row>
        </>
      )}
    </Row>
  );
};

export default Product;
