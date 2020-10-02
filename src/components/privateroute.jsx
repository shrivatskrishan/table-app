import React from 'react'
import { Redirect,Route } from 'react-router-dom'

class PrivateRoute extends React.Component {

    render() {
        const {path,name} = this.props;
        const Component =this.props.component;
        const isAuthenticated =JSON.parse(localStorage.getItem('user'));

        return isAuthenticated ? (
            <Route exact path={path} name={name} component={(e) => { return <Component/> }} />
        ) : (
            <Redirect to='/signup'/>
           
        );
    }
}

export default PrivateRoute;