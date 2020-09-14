import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './UserContext';



const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    const [isAuthenticated, dispatch] = useContext(UserContext);
    return (
        <Route {...rest} component={(props) => (       
            isAuthenticated? (
               <Component {...props} />
            ) : (
                <Redirect to="/accounts/login" />
            ))} 
        />
    )
        
}


export default PrivateRoute;