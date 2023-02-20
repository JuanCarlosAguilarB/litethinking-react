import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { fetchWrapper } from '_helpers';


function ProductForm({nit, setisAddItems, editedItem, setisEditItem, isEditItem, setinventory}) {

  const companies = useSelector((state) => state.companies);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    company: "",
    quantity: 0,
    price: 0,
    discount: 0,
  });

  const [isAddProduct, setIsAddProduct] = useState(false);

  const baseUrl = `${process.env.REACT_APP_API_URL}/api/v0/inventories/companies/`;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsAddProduct(!isAddProduct)
    if (formData){
      if (isEditItem){
        const editProduct = await fetchWrapper.put(`${baseUrl}${editedItem.id}/`, {...formData, 'company': nit})

      }
      const productAdd = await fetchWrapper.post(`${baseUrl}`, {...formData, 'company': nit})
      setIsAddProduct(productAdd)
      setFormData({
        name: "",
        description: "",
        company: "",
        quantity: 0,
        price: 0,
        discount: 0,
      });
      let response = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/api/v0/companies/companies/${nit}/inventory`)
      setinventory({...response});
      setisAddItems(false);
      setisEditItem(false);
  }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the name of the product"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the product description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>
      <input type="hidden" id="custId" name="company" value={nit}></input>

      <Form.Group controlId="quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the quantity of the product"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the price of the product"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="discount">
        <Form.Label>Discount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the product discount"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Save
      </Button>
    </Form>
  );
}

export {ProductForm};