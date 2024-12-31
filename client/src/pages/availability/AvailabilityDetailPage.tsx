import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { availabilityService } from '../../services/availabilityService';
import { AvailabilityDetail } from '../../types/availability';
import StudentAvailabilityForm from '../../components/features/availability/StudentAvailabilityForm';
import AvailabilityDisplay from '../../components/features/availability/AvailabilityDisplay';

const AvailabilityDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [availability, setAvailability] = useState<AvailabilityDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                setLoading(true);
                const data = await availabilityService.getByStudent(Number(id));
                setAvailability(data[0]); // Get the first availability record
            } catch (err) {
                setError('Failed to load availability details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAvailability();
        }
    }, [id]);

    const handleEditSuccess = () => {
        setIsEditing(false);
        // Refresh the data
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="page-container">
                <div className="page-content">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-1/4 dark:bg-gray-700" />
                        <div className="h-4 bg-gray-200 rounded w-1/2 dark:bg-gray-700" />
                        <div className="h-64 bg-gray-200 rounded dark:bg-gray-700" />
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
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">
                                {availability?.student.first_name} {availability?.student.last_name}'s Availability
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Student Code: {availability?.student.student_code}
                            </p>
                        </div>
                        <div className="space-x-4">
                            <button
                                onClick={() => navigate('/availabilities')}
                                className="btn-secondary"
                            >
                                Back to List
                            </button>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="btn-primary"
                            >
                                {isEditing ? 'Cancel Edit' : 'Edit Schedule'}
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="card">
                        <div className="card-body">
                            {isEditing ? (
                                <StudentAvailabilityForm
                                    studentId={Number(id)}
                                    onSuccess={handleEditSuccess}
                                />
                            ) : (
                                <AvailabilityDisplay
                                    studentId={Number(id)}
                                    readonly={true}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityDetailPage;
