import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getProductDetails, updateProduct } from "../actions/productActions";
import {
  PRODUCT_LIST_RESET,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants";

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [options, setOptions] = useState("");
  const [optionName, setOptionName] = useState("");
  const [category, setCategory] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (!product.name || product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
  }, [dispatch, successUpdate, id, product, navigate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(
        id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
        options,
        optionName
      )
    );
    dispatch({ type: PRODUCT_LIST_RESET });
    navigate("/admin/productlist");
  };

  return (
    <>
      <Container>
        {" "}
        <Link to="/admin/productlist" className="btn btn-light my-3">
          Go Back
        </Link>
        <FormContainer>
          <h1>Edit Product</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : loadingUpdate ? (
            <Loader />
          ) : errorUpdate ? (
            <Message variant="danger">{errorUpdate}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  placeholder="Enter price"
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  value={image}
                  placeholder="Enter image url"
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.Control
                  id="image-file"
                  label="Choose File"
                  type="file"
                  onChange={uploadFileHandler}
                ></Form.Control>
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  value={brand}
                  placeholder="Enter brand "
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={countInStock}
                  placeholder="Enter Count In Stock "
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={category}
                  placeholder="Enter category "
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
                <Form.Control
                  type="text"
                  value={options}
                  placeholder="Enter options"
                  onChange={(e) => setOptions(e.target.value)}
                ></Form.Control>
                <Form.Control
                  type="text"
                  value={optionName}
                  placeholder="Enter option Name "
                  onChange={(e) => setOptionName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  placeholder="Enter description "
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
};
export default ProductEditScreen;
