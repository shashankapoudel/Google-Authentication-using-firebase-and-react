import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user != null) {
            navigate('/account');
        }
    }, [user]);

    return (
        <div>
            <h1 className='text-center text-3xl font-bold py-8'>Sign in</h1>
            <div className='max-w-[240px] m-auto py-4'>
                <GoogleButton onClick={handleGoogleSignIn} />
            </div>
        </div>
    );
};

export default Signin;



// import React, { useEffect } from 'react';
// import { GoogleButton } from 'react-google-button';
// import { UserAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Signin = () => {
//     const { googleSignIn, user } = UserAuth();
//     const navigate = useNavigate();

//     // const handleGoogleSignIn = async () => {
//     //     try {
//     //         await googleSignIn();
//     //         // await googleSignIn();  // Proceed with Google sign-in
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // };

//     const handleGoogleSignIn = async () => {
//         try {
//             if (user) {
//                 await logOut();  // Ensure the current user is logged out
//             }
//             await googleSignIn();  // Proceed with Google sign-in
//         } catch (error) {
//             console.log('Error during sign-in:', error);
//         }
//     };

//     useEffect(() => {
//         if (user != null) {
//             navigate('/account');
//         }
//     }, [user, navigate]);

//     return (
//         <div>
//             <h1 className='text-center text-3xl font-bold py-8'>Sign in</h1>
//             <div className='max-w-[240px] m-auto py-4'>
//                 <GoogleButton onClick={handleGoogleSignIn} />
//             </div>
//         </div>
//     );
// };

// export default Signin;
