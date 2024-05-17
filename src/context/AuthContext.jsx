import { useContext, createContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,

} from 'firebase/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';
// import firebase from 'firebase/compat/app';
// import firebase from 'firebase/app';
// import 'firebase/auth';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const googleSignIn = async () => {
        await signOut(auth);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
        // signInWithRedirect(auth, provider)
    };

    const logOut = async () => {
        try {
            await signOut(auth); // Sign out the user
            // await firebase.auth().signOut();
        } catch (error) {
            console.log('Error logging out:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (user) {

                setUser(currentUser);
                console.log('user', currentUser)
                localStorage.setItem('authToken', user.uid);
            } else {
                setUser(null)
                localStorage.removeItem('authToken');
                Navigate('/account')
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);
    // useEffect(() => {
    //     const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
    //         if (authUser) {
    //             // User is signed in
    //             setUser(authUser);
    //             // Store the authentication token securely (e.g., in localStorage)
    //             localStorage.setItem('authToken', authUser.uid);
    //         } else {
    //             // User is signed out
    //             setUser(null);
    //             // Clear the authentication token from localStorage
    //             localStorage.removeItem('authToken');
    //         }
    //     }
    //     )

    // }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};

