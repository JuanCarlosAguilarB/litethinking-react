import Table from 'react-bootstrap/Table';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

            <h3>Users from secure api end point:</h3>
            {companies.length &&
                <ul>
                    {companies.map(user =>
                        <li key={user.id}>{user.firstName} {user.lastName}</li>
                    )}
                </ul>
            }
            {users.loading && <div className="spinner-border spinner-border-sm"></div>}
            {users.error && <div className="text-danger">Error loading users: {users.error.message}</div>}
        </div>
    );
}
