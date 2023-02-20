import Table from 'react-bootstrap/Table';
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { fetchWrapper } from '_helpers';
import { history } from '_helpers';

import { userActions, companyActions } from '_store';
import { CompaniesForm } from '_components';

export { Home };


function Home() {
    const dispatch = useDispatch();
    // const { user: authUser } = useSelector(x => x.auth);
    const { users } = useSelector(x => x.users);
    const { companies } = useSelector(x => x.companies);
    const [isAddItems, setisAddItems] = useState(false);
    const [isEditItem, setisEditItem] = useState(false);
    const [editedItem, seteditedItem] = useState({});

    useEffect(() => {
        dispatch(userActions.getCurrentUser());
        dispatch(companyActions.getAllCompanies());
    }, []);

    const handleButtonClick = () => {
        setisAddItems(!isAddItems);
    }

    const deleteButtonClick = async (_inventory) => {
        let response = await fetchWrapper.delete(`${process.env.REACT_APP_API_URL}/api/v0/companies/companies/${_inventory.nit}/`)
        dispatch(companyActions.getAllCompanies());
    }

    return (
        <div>
            <h1>Hi {users?.first_name}!</h1>

            <h3>Here you can see the information of the companies:</h3>

            {companies.length &&
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th># Nit</th>
                    <th>Name</th>
                    <th>Direction</th>
                    <th>Phone</th>
                    <th>Creation date</th>
                    <th>Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                    {companies.map(company =>
                        <tr key={company.nit}>
                            <th>{company.nit}</th>
                            <th>{company.name}</th>
                            <th>{company.direction}</th>
                            <th>{company.phone}</th>
                            <th>{company.creation_date}</th>
                            <th>
                                  {/* <NavLink to={`${company.nit}`} className="nav-item nav-link"><AiOutlineEye/></NavLink> */}
                                <Button variant="outline-primary" onClick={() => {history.navigate(`${company.nit}`); }} >
                                <NavLink to={`${company.nit}`} className="nav-item nav-link"><AiOutlineEye/></NavLink>
                                </Button>
                                  {users.is_staff && 
                                  <>
                                    <Button variant="outline-danger"  onClick={() => {deleteButtonClick(company); }}><FaRegTrashAlt/></Button>
                                    <Button variant="outline-success"  onClick={() => {seteditedItem(company); setisEditItem(true)}}><AiOutlineEdit/></Button>
                                </>}
                            </th>
                            {/* {users.is_staff && <th>  <NavLink to={`${company.nit}`} className="nav-item nav-link"><AiOutlineEye/></NavLink></th>} */}
                        </tr>
                    )}
                </tbody>
                </Table>

            }
                {isAddItems && (<CompaniesForm nit={'nit'} setisAddItems={setisAddItems} editedItem={editedItem} setisEditItem={setisEditItem}  isEditItem={isEditItem} dispatch={dispatch}/>)}
                {isEditItem && (<CompaniesForm nit={'nit'} setisAddItems={setisAddItems}  editedItem={editedItem} setisEditItem={setisEditItem} isEditItem={isEditItem} dispatch={dispatch} />)}
                {users.is_staff &&
                    <Button variant="outline-primary" onClick={handleButtonClick}>Add items</Button>
                }
            {companies.loading && <div className="spinner-border spinner-border-sm"></div>}
            {companies.error && <div className="text-danger">Error loading companies: {companies.error.message}</div>}
        </div>
    );
}
