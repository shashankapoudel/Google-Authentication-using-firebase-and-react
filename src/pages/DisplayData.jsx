

// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebase.jsx';

// const DisplayData = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const retrieveData = await getDocs(collection(db, 'user_data'));
//                 const fetchedData = retrieveData.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data()
//                 }));
//                 setData(fetchedData);
//             } catch (error) {
//                 console.error('Error fetching data from Firestore:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div>
//             <h2>Displaying Data from Firestore</h2>
//             <ul>
//                 {data.map(item => (
//                     <li key={item.id}>
//                         <strong>User ID:</strong> {item.userId}, <strong>Name:</strong> {item.displayName}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default DisplayData;


import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const DisplayData = () => {
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({ id: '', userId: '', displayName: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'user_data'));
                const fetchedData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching data from Firestore:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = (item) => {
        setIsEditing(true);
        setEditData(item);
    };

    const handleUpdate = async () => {
        const docRef = doc(db, 'user_data', editData.id);
        try {
            await updateDoc(docRef, {
                userId: editData.userId,
                displayName: editData.displayName
            });
            setData(data.map(item => (item.id === editData.id ? editData : item)));
            setIsEditing(false);
            setEditData({ id: '', userId: '', displayName: '' });
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    const handleDelete = async (id) => {
        const docRef = doc(db, 'user_data', id);
        try {
            await deleteDoc(docRef);
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    return (
        <div className='max-w-3xl mx-auto p-4'>
            <h2 className='text-3xl font-bold text-center mb-8'>Displaying Data from Firestore</h2>
            {isEditing ? (
                <div className='mb-4 p-4 bg-gray-100 rounded shadow'>
                    <h3 className='text-xl font-bold mb-2'>Edit User</h3>
                    <input
                        className='block w-full mb-2 p-2 border rounded'
                        type='text'
                        name='userId'
                        value={editData.userId}
                        onChange={handleEditChange}
                        placeholder='User ID'
                    />
                    <input
                        className='block w-full mb-2 p-2 border rounded'
                        type='text'
                        name='displayName'
                        value={editData.displayName}
                        onChange={handleEditChange}
                        placeholder='Display Name'
                    />
                    <button
                        className='bg-blue-500 text-white py-2 px-4 rounded mr-2'
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                    <button
                        className='bg-gray-500 text-white py-2 px-4 rounded'
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <ul className='space-y-4'>
                    {data.map(item => (
                        <li key={item.id} className='p-4 bg-gray-100 rounded shadow'>
                            <p><strong>User ID:</strong> {item.userId}</p>
                            <p><strong>Name:</strong> {item.displayName}</p>
                            <button
                                className='bg-blue-500 text-white py-1 px-3 rounded mr-2'
                                onClick={() => handleEdit(item)}
                            >
                                Edit
                            </button>
                            <button
                                className='bg-red-500 text-white py-1 px-3 rounded'
                                onClick={() => handleDelete(item.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DisplayData;

