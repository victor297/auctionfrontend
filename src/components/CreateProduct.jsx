import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { productsCreate } from "../slices/productsSlice";

const CreateProduct = () => {
  const [productImg, setProductImg] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  // const [userName, setuserName] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createStatus } = useSelector((state) => state.products);
  const { userName } = useSelector((state) => state.auth);
  console.log(productImg);
  console.log(userName);
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);

    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();
    console.log(reader);
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      productsCreate({
        name,
        brand,
        price,
        desc,
        image: productImg,
        userName,
        phone,
      })
    );
    // navigate("/");
  };
  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <Form className='col-xs-12 mt-4' onSubmit={handleSubmit}>
            <h4>Create a Product</h4>
            <Form.Group className='mb-2'>
              <Form.Control
                className='mb-2'
                type='file'
                placeholder='name'
                onChange={handleProductImageUpload}
                accept='image/'
              />
              <Form.Select
                className='mb-2'
                onChange={(e) => setBrand(e.target.value)}
                required
              >
                <option value=''>Select Brand</option>
                <option value='iphone'>iPhone</option>
                <option value='samsung'>Samsung</option>
                <option value='xiomi'>Xiomi</option>
                <option value='other'>Other</option>
              </Form.Select>
              <Form.Control
                className='mb-2'
                type='text'
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                accept='image/'
              />
              <Form.Control
                className='mb-2'
                type='number'
                placeholder='Enter phone number'
                onChange={(e) => setPhone(e.target.value)}
                accept='image/'
              />
              <Form.Control
                className='mb-2'
                type='text'
                placeholder='Price'
                onChange={(e) => setPrice(e.target.value)}
                accept='image/'
              />

              <Form.Control
                className='mb-2'
                type='text'
                placeholder='Short Description'
                onChange={(e) => setDesc(e.target.value)}
                accept='image/'
              />
            </Form.Group>
            <div className='d-grid'>
              <Button type='submit'>submit</Button>
            </div>
          </Form>
        </Col>

        <Col xs={12} md={4}>
          {productImg ? (
            <>
              <img
                className='mt-5 border p-3 align-middle h-50'
                src={productImg}
                alt='product image!'
                width='100%'
              />
            </>
          ) : (
            <p className='mt-5 p-3 align-middle'>
              Product image upload preview will appear here!
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProduct;
