import React, { useState, useEffect } from 'react';
import BlockchainService from '../../services/BlockchainService';
import { useAuth } from '../auth/AuthProvider';

export default function BlockchainTransactionRecord() {
    const [blockData, setBlockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuth();
    const userId = user.id;

    useEffect(() => {
        const fetchBlockData = async () => {
            try {
                const response = await BlockchainService.getBlock(userId);
                console.log('Block data:', response.data);
                setBlockData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBlockData();

        // Cleanup function
        return () => {
            // Perform cleanup if needed
        };
    }, [userId]); 

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-semibold mb-8 text-center">Blockchain Transaction Record</h2>
            {!blockData ? (
                <p className="text-center">Transaction not found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse table-auto">
                        <thead>
                            <tr className="bg-gray-800 text-white">

                                <th className="px-4 py-2 text-left whitespace-nowrap">Transaction Hash</th>
                                <th className="px-4 py-2 text-left whitespace-nowrap">Action</th>
                                <th className="px-4 py-2 text-left whitespace-nowrap">Block No.</th>
                                <th className="px-4 py-2 text-left whitespace-nowrap">File ID</th>
                                <th className="px-4 py-2 text-left whitespace-nowrap">Gas Used</th>
                                <th className="px-4 py-2 text-left whitespace-nowrap">To</th>
                                <th className="px-4 py-2 text-left whitespace-nowrap">Timestamp</th>
                                
                                <th className="px-4 py-2 text-left whitespace-nowrap">Status</th>
                                <th className="px-4 py-2 text-left whitespace-nowrap">Balance ETH</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blockData.map((block, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100 text-gray-800 '}>
                                    <td className="border px-4 py-2 whitespace-nowrap font-bold overflow-x-auto" style={{ maxWidth: '150px' }}>{block.transaction_hash}</td>
                                    <td className="border px-4 py-2 whitespace-nowrap overflow-x-auto" style={{ maxWidth: '150px' }}>{block.action}</td>
                                    <td className="border px-4 py-2 whitespace-nowrap overflow-x-auto" style={{ maxWidth: '150px' }}>{block.block_number}</td>
                                    <td className="border px-4 py-2 whitespace-nowrap overflow-x-auto" style={{ maxWidth: '100px' }}>{block.file_id}</td>
                                    <td className="border px-4 py-2 whitespace-nowrap overflow-x-auto" style={{ maxWidth: '150px' }}>{block.gas_used}</td>
                                    <td className="border px-4 py-2 whitespace-nowrap overflow-x-auto" style={{ maxWidth: '150px' }}>{block.to_address}</td>
                                    <td className="border px-4 py-2 whitespace-nowrap overflow-x-auto" style={{ maxWidth: '150px' }}>{block.timestamp}</td>
                                    
                                    <td className="border px-4 py-2 text-green-700 font-bold whitespace-nowrap overflow-x-auto" style={{ maxWidth: '150px' }}>{block.status}</td>
                                    <td className="border px-4 py-2 whitespace-nowrap overflow-x-auto" style={{ maxWidth: '150px' }}>{block.balance_eth}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
