import React from 'react';
import { useParams } from 'react-router-dom';
import StudentAvailabilityForm from '../../components/features/availability/StudentAvailabilityForm';

const StudentAvailabilityPage: React.FC = () => {
    const { id: studentId } = useParams<{ id: string }>();

    return (
        <div className="page-container">
            <div className="page-content">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">Availability Schedule</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Select the days when you are available to attend classes.
                        </p>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <StudentAvailabilityForm 
                                studentId={Number(studentId)}
                                onSuccess={() => {
                                    // Handle success if needed
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentAvailabilityPage;
