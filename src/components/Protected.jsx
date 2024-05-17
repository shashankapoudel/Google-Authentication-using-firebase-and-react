// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { UserAuth } from '../context/AuthContext';

// const Protected = ({ children }) => {
//     const { user } = UserAuth();
//     if (!user) {
//         return <Navigate to='/' />;
//     }

//     return children;
// };

// export default Protected;


import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Protected = ({ children }) => {
    const { user } = UserAuth();
    if (!user) {
        return <Navigate to='/' />; // Redirect to home page if not authenticated
    }

    return children; // Render children components if authenticated
};

export default Protected;
