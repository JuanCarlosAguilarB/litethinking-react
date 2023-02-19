import Table from 'react-bootstrap/Table';
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchWrapper } from '_helpers';
import Button from 'react-bootstrap/Button';
import {ProductForm} from '_components';
import { userActions } from '_store';
import { useSelector, useDispatch } from 'react-redux';


function SeeDetails() {

    const { nit } = useParams();
    const dispatch = useDispatch();

    const baseUrl = `${process.env.REACT_APP_API_URL}/api/v0/companies/companies`;

    const [company, setCompany] = useState({});
    const [inventory, setinventory] = useState({});
    const [isAddItems, setisAddItems] = useState(false);
    const [isEditItem, setisEditItem] = useState(false);
    const [editedItem, seteditedItem] = useState({});

    const { users } = useSelector(x => x.users);

    useEffect(() => {
        dispatch(userActions.getCurrentUser());

        fetchWrapper.get(`${baseUrl}/${nit}/`)
        .then(res => res)
        .then(data => setCompany(data))
        .catch(err => console.error(err));

        fetchWrapper.get(`${process.env.REACT_APP_API_URL}/api/v0/companies/companies/${nit}/inventory`)
        .then(res => res)
        .then(data => {setinventory({...data});})
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        console.log('isAddItemssssss', isAddItems)
        fetchWrapper.get(`${process.env.REACT_APP_API_URL}/api/v0/companies/companies/${nit}/inventory`)
        .then(res => res)
        .then(data => {setinventory({...data});})
        .catch(err => console.error(err));
    }, [isAddItems, editedItem]);

    const handleButtonClick = () => {
        setisAddItems(!isAddItems);
    }

    const deleteButtonClick = (_inventory) => {
        fetchWrapper.delete(`${process.env.REACT_APP_API_URL}/api/v0/inventories/companies/${_inventory.id}/`)
        .then(res => res)
        .catch(err => console.error(err));
        console.log('aaa')
        fetchWrapper.get(`${process.env.REACT_APP_API_URL}/api/v0/companies/companies/${nit}/inventory`)
        .then(res => res)
        .then(data => {setinventory({...data});})
        .catch(err => console.error(err));
    }


  return (
    <div>
      <h1>{company.name}</h1>
      <p><strong>Nit:</strong> {company.nit}</p>
      <p><strong>Direction:</strong> {company.direction}</p>
      <p><strong>Phone:</strong> {company.phone}</p>
      <p><strong>Created date:</strong> {company.creation_date}</p>
      <h3> List inventory details</h3>

                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th># uuid</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Last update</th>
                    {users.is_staff && <th>  <NavLink to={`${company.nit}`} className="nav-item nav-link">Actions</NavLink></th>}

                    </tr>
                    </thead>
                    <tbody>
                    { inventory && inventory?.inventory?.map(inventories =>
                        <tr key={inventories.id}>
                            <th>{inventories.id}</th>
                            <th>{inventories.name}</th>
                            <th>{inventories.description}</th>
                            <th>{inventories.quantity}</th>
                            <th>{inventories.price}</th>
                            <th>{inventories.discount}</th>
                            <th>{inventories.last_update}</th>
                            {users.is_staff &&
                                <th>
                                {/* <Button variant="outline-primary"  onClick={handleButtonClick}>
                                    <NavLink to={`${company.nit}`} className="nav-item nav-link"><AiOutlineEye/></NavLink>
                                </Button> */}
                                <Button variant="outline-danger"  onClick={() => {deleteButtonClick(inventories); }}><FaRegTrashAlt/></Button>
                                <Button variant="outline-success"  onClick={() => {seteditedItem(inventories); setisEditItem(true)}}><AiOutlineEdit/></Button>
                                </th>
                                }
                        </tr>
                    )}
                </tbody>

                </Table>
                {isAddItems && (<ProductForm nit={nit} setisAddItems={setisAddItems} editedItem={editedItem} setisEditItem={setisEditItem}  isEditItem={isEditItem} setinventory={setinventory}/>)}
                {isEditItem && (<ProductForm nit={nit} setisAddItems={setisAddItems}  editedItem={editedItem} setisEditItem={setisEditItem} isEditItem={isEditItem} setinventory={setinventory} />)}
                <Button variant="outline-primary" onClick={handleButtonClick}>Add items</Button>
    </div>
  );
}

export {SeeDetails};