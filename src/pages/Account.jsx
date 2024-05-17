// import React from 'react';
// import { UserAuth } from '../context/AuthContext';

// const Account = () => {
//     const { logOut, user } = UserAuth();

//     const handleSignOut = async () => {
//         try {
//             await logOut();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div className='w-[300px] m-auto'>
//             <h1 className='text-center text-2xl font-bold pt-12'>Account</h1>
//             <div>
//                 <p>Welcome, {user?.displayName}</p>
//             </div>
//             <button onClick={handleSignOut} className='border py-2 px-5 mt-10'>
//                 Logout
//             </button>
//         </div>
//     );
// };

// export default Account;



// import React from 'react';
// import { UserAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Account = () => {
//     const { logOut, user } = UserAuth();
//     const navigate = useNavigate();

//     const handleSignOut = async () => {
//         try {
//             await logOut();
//             navigate('/signin'); // Redirect to the sign-in page after logging out
//         } catch (error) {
//             console.log('Error signing out:', error);
//         }
//     };

//     return (
//         <div className='w-[300px] m-auto'>
//             <h1 className='text-center text-2xl font-bold pt-12'>Account</h1>
//             <div>
//                 <p>Welcome, {user ? user.displayName : 'Guest'}</p>
//             </div>
//             <button onClick={handleSignOut} className='border py-2 px-5 mt-10'>
//                 Logout
//             </button>
//         </div>
//     );
// };

// export default Account;


import React, { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase.jsx';

const Account = () => {
    const { logOut, user } = UserAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await logOut();
            navigate('/signin'); // Redirect to the sign-in page after logging out
        } catch (error) {
            console.log('Error signing out:', error);
        }
    };

    useEffect(() => {
        const addDataToFirestore = async () => {
            try {
                if (user) {
                    const collectionRef = collection(db, 'user_data'); // Replace 'user_data' with your collection name
                    await addDoc(collectionRef, {
                        userId: user.uid,
                        displayName: user.displayName,
                        // Add more fields as needed
                    });
                    console.log('Data added to Firestore successfully');
                }
            } catch (error) {
                console.error('Error adding data to Firestore:', error);
            }
        };

        addDataToFirestore();
    }, [user]); // Add user as a dependency to trigger the effect when user changes

    return (
        <div className='w-[300px] m-auto'>
            <h1 className='text-center text-2xl font-bold pt-12'>Account</h1>
            <div>
                <p>Welcome, {user ? user.displayName : 'Guest'}</p>
            </div>
            <button onClick={handleSignOut} className='border py-2 px-5 mt-10'>
                Logout
            </button>
        </div>
    );
};

export default Account;
