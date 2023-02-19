import Table from 'react-bootstrap/Table';
import { AiOutlineEye } from "react-icons/ai";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { userActions, companyActions } from '_store';

export { Home };


function Home() {
    const dispatch = useDispatch();
    // const { user: authUser } = useSelector(x => x.auth);
    const { users } = useSelector(x => x.users);
    const { companies } = useSelector(x => x.companies);

    useEffect(() => {
        dispatch(userActions.getCurrentUser());
        dispatch(companyActions.getAllCompanies());
    }, []);

    console.log(companies, 'siiiasdasi');
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
                            {users.is_staff && <th>  <NavLink to={`${company.nit}`} className="nav-item nav-link"><AiOutlineEye/></NavLink></th>}
                        </tr>
                    )}
                </tbody>
                </Table>
            }
            {companies.loading && <div className="spinner-border spinner-border-sm"></div>}
            {companies.error && <div className="text-danger">Error loading companies: {companies.error.message}</div>}
        </div>
    );
}
