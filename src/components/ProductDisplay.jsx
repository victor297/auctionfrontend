import React, { useEffect, useState } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { Row, Col, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import CountdownTimer from "./CountdownTimer";
import AuctionTimeOut from "./AuctionTimeOut";
import HomeCarousel from "./HomeCarousel";

const ProductDisplay = () => {
  // const { data, error, isLoading } = useGetAllProductsQuery();
  const { items: data, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayProduct, setDisplayProduct] = useState(false);
  const date = new Date();
  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  console.log(showTime);
  console.log(date.getHours());

  const handleAddTocCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour > 8 && hour < 22) {
      setDisplayProduct(true);
    }
  }, []);
  const targetTime = new Date().getTime() + 1000 * 60 * 60 * 24;
  return (
    <div className='container'>
      {displayProduct ? (
        status === "success" ? (
          <>
            <Row>
              {" "}
              <strong className=' text-start bold'>Recomended</strong>
              <AuctionTimeOut />
            </Row>
            <Col className='py-3'>
              <Button variant='outline-warning' size='sm'>
                All Product
              </Button>{" "}
              <Button variant='outline-dark' size='sm'>
                Gadget
              </Button>{" "}
              <Button variant='outline-dark' size='sm'>
                Sofa
              </Button>{" "}
              <Button variant='outline-dark' size='sm'>
                Generator
              </Button>
            </Col>
            <Row className='products'>
              <Row className='m-auto'>
                {data?.map((product) => (
                  <Col
                    xs={4}
                    md={3}
                    lg={2}
                    key={product._id}
                    className='shadow-sm p-2 my-4'
                  >
                    <Link to={`/product/${product._id}`}>
                      <Image
                        width='100%'
                        height='100vh'
                        src={product.image.url}
                        alt={product.name}
                      />
                    </Link>
                    <Row>
                      <small>
                        <i>{product.name} </i>
                      </small>
                      <section className='text-warning'>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar /> <span>4</span>
                      </section>
                      <span>₦{product.price}</span>
                    </Row>

                    <section>
                      <Link
                        onClick={() => handleAddTocCart(product)}
                        className='text-warning text-decoration-none'
                      >
                        <BsFillCartCheckFill />
                      </Link>
                      <Link
                        onClick={() => {
                          navigate("/cart");
                          handleAddTocCart(product);
                        }}
                        className='text-warning text-decoration-none ms-5'
                      >
                        {" "}
                        Buy
                      </Link>
                    </section>
                  </Col>
                ))}
              </Row>
            </Row>
          </>
        ) : status === "pending" ? (
          <p>Loading...</p>
        ) : (
          <p>Unexpected error occured...</p>
        )
      ) : (
        <span>
          <span>Countdown to next auction in: </span>
          <CountdownTimer />
          <div className='text-info pb-4'>
            upload of product is available right now
          </div>
          <HomeCarousel />
        </span>
      )}
    </div>
  );
};

export default ProductDisplay;
