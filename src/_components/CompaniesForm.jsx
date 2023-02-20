import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { fetchWrapper } from '_helpers';
import { userActions, companyActions } from '_store';


function CompaniesForm({nit, setisAddItems, editedItem, setisEditItem, isEditItem, dispatch}) {

  const companies = useSelector((state) => state.companies);
  const [formData, setFormData] = useState({
    name: "",
    nit: 0,
    direction: "",
    phone: 0,
  });

  const [isAddProduct, setIsAddProduct] = useState(false);

  const baseUrl = `${process.env.REACT_APP_API_URL}/api/v0/companies/companies`;

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
        const editProduct = await fetchWrapper.put(`${baseUrl}/${editedItem.nit}/`, {...formData, nit: editedItem.nit})
      }
      else{
          const productAdd = await fetchWrapper.post(`${baseUrl}/`, {...formData})
      }
      // setIsAddProduct(productAdd)
      setFormData({
        name: "",
        nit: 0,
        direction: "",
        phone: 0,
      });
      // let response = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}`)
      dispatch(companyActions.getAllCompanies());
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
          required
        />
      </Form.Group>
       { !isEditItem &&
      <Form.Group controlId="nit">
        <Form.Label>Nit</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the nit of company"
          name="nit"
          value={formData.nit}
          onChange={handleChange}
          required
          />
          </Form.Group>
        }
      <Form.Group controlId="direction">
        <Form.Label>Direction</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the direction of the company"
          name="direction"
          value={formData.direction}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the phoneof the company"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Save
      </Button>
    </Form>
  );
}

export {CompaniesForm};