import React, { useEffect, useState } from 'react';
import { availabilityService } from '../../../services/availabilityService';
import { DAYS_OF_WEEK } from '../../../types/availability';

interface Props {
    studentId: number;
    onSuccess?: () => void;
}

const StudentAvailabilityForm: React.FC<Props> = ({ studentId, onSuccess }) => {
    const [availabilities, setAvailabilities] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvailabilities = async () => {
            try {
                setLoading(true);
                const data = await availabilityService.getByStudent(studentId);
                const availabilityMap = data.reduce((acc, curr) => ({
                    ...acc,
                    [curr.day_of_week]: curr.is_available
                }), {});
                
                // Initialize any missing days as false
                DAYS_OF_WEEK.forEach(day => {
                    if (!(day in availabilityMap)) {
                        availabilityMap[day] = false;
                    }
                });
                
                setAvailabilities(availabilityMap);
            } catch (err) {
                setError('Failed to load availability schedule');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAvailabilities();
    }, [studentId]);

    const handleToggle = (day: string) => {
        setAvailabilities(prev => ({
            ...prev,
            [day]: !prev[day]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);
            setError(null);
            setSuccessMessage(null);

            const availabilityData = DAYS_OF_WEEK.map(day => ({
                day_of_week: day,
                is_available: availabilities[day] || false
            }));

            await availabilityService.bulkUpdateStudentAvailability(
                studentId,
                availabilityData
            );

            setSuccessMessage('Availability schedule updated successfully');
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            setError('Failed to update availability schedule');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-50 text-green-600 p-3 rounded-md">
                        {successMessage}
                    </div>
                )}

                <div className="space-y-4">
                    {DAYS_OF_WEEK.map(day => (
                        <label
                            key={day}
                            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 
                                     transition-colors duration-150 cursor-pointer
                                     dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <div className="flex-1">
                                <span className="font-medium">{day}</span>
                            </div>
                            <div className="relative inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600 rounded
                                             transition-colors duration-150
                                             focus:ring-blue-500 dark:focus:ring-blue-400"
                                    checked={availabilities[day] || false}
                                    onChange={() => handleToggle(day)}
                                    disabled={saving}
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                    {availabilities[day] ? 'Available' : 'Not Available'}
                                </span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save Availability'}
                </button>
            </div>
        </form>
    );
};

export default StudentAvailabilityForm;
