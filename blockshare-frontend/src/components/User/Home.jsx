import React from 'react';
import { useAuth } from '../auth/AuthProvider';

export default function Home() {
    const { user } = useAuth();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Welcome, {user.username}!</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <div className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out rounded-lg shadow-md p-6 cursor-pointer text-white">
                    <h2 className="text-2xl font-semibold mb-4">Upload Files</h2>
                    <p className="text-lg">Securely upload files to our blockchain-based cloud storage with encryption.</p>
                </div>
                <div className="bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out rounded-lg shadow-md p-6 cursor-pointer text-white">
                    <h2 className="text-2xl font-semibold mb-4">View Files</h2>
                    <p className="text-lg">Access and manage your uploaded files with ease.</p>
                </div>
                <div className="bg-yellow-600 hover:bg-yellow-700 transition duration-300 ease-in-out rounded-lg shadow-md p-6 cursor-pointer text-white">
                    <h2 className="text-2xl font-semibold mb-4">Blockchain Integration</h2>
                    <p className="text-lg">All actions are transparently recorded on the blockchain.</p>
                    <p className="text-lg">Share files with access levels and revoke access anytime.</p>
                    
                </div>
                <div className="bg-purple-600 hover:bg-purple-700 transition duration-300 ease-in-out rounded-lg shadow-md p-6 cursor-pointer text-white">
                    <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
                    <p className="text-lg">Stay informed about recent activity related to your files.</p>
                </div>
            </div>
        </div>
    );
}
