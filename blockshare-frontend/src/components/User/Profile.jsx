import React from 'react';

const Profile = () => {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));

    // Check if user data exists
    if (!userData || !userData.username || !userData.email) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-center text-red-500">Error: User data not found!</h1>
            </div>
        );
    }

    // Destructure user data
    const { username, email } = userData;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-md p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {username}!</h2>
                    <div className="border-b-2 border-gray-200 mb-4"></div>
                    <p className="text-lg text-gray-600 mb-2">Your email address:</p>
                    <p className="text-lg font-semibold text-blue-600 mb-6">{email}</p>
                    <p className="text-sm text-gray-500">Thank you for being part of our community. Enjoy your experience!</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
