import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { availabilityService } from '../../services/availabilityService';
import { AvailabilityDetail } from '../../types/availability';

const AvailabilityPage: React.FC = () => {
    const [availabilities, setAvailabilities] = useState<AvailabilityDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvailabilities = async () => {
            try {
                setLoading(true);
                // Note: You might need to implement this endpoint in your API
                const response = await availabilityService.getAll();
                setAvailabilities(response);
            } catch (err) {
                setError('Failed to load availabilities');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAvailabilities();
    }, []);

    if (loading) {
        return (
            <div className="page-container">
                <div className="page-content">
                    <div className="animate-pulse space-y-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="h-20 bg-gray-200 rounded dark:bg-gray-700" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container">
                <div className="page-content">
                    <div className="bg-red-50 text-red-600 p-4 rounded-md dark:bg-red-900/20">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="page-content">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Student Availabilities</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {availabilities.map((availability) => (
                        <Link 
                            key={availability.id}
                            to={`/students/${availability.student.id}/availability`}
                            className="card hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="card-body">
                                <h3 className="text-lg font-semibold mb-2">
                                    {availability.student.first_name} {availability.student.last_name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Student Code: {availability.student.student_code}
                                </p>
                                <div className="mt-4">
                                    <span 
                                        className={`
                                            px-3 py-1 rounded-full text-sm font-medium
                                            ${availability.is_available
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                            }
                                        `}
                                    >
                                        {availability.day_of_week}: {availability.is_available ? 'Available' : 'Not Available'}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {availabilities.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">
                            No availability records found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailabilityPage;
