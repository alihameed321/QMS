import React, { useEffect, useState } from 'react';
import { availabilityService } from '../../../services/availabilityService';
import { AvailabilityDetail, DAYS_OF_WEEK } from '../../../types/availability';

interface Props {
    studentId: number;
    readonly?: boolean;
}

const AvailabilityDisplay: React.FC<Props> = ({ studentId, readonly = true }) => {
    const [availabilities, setAvailabilities] = useState<AvailabilityDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvailabilities = async () => {
            try {
                setLoading(true);
                const data = await availabilityService.getByStudent(studentId);
                setAvailabilities(data);
            } catch (err) {
                setError('Failed to load availability schedule');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAvailabilities();
    }, [studentId]);

    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                {DAYS_OF_WEEK.map(day => (
                    <div key={day} className="h-12 bg-gray-200 rounded dark:bg-gray-700"></div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 p-4 bg-red-50 rounded-md dark:bg-red-900/20">
                {error}
            </div>
        );
    }

    const availabilityMap = availabilities.reduce((acc, curr) => ({
        ...acc,
        [curr.day_of_week]: curr.is_available
    }), {} as Record<string, boolean>);

    return (
        <div className="space-y-2">
            {DAYS_OF_WEEK.map(day => (
                <div
                    key={day}
                    className={`
                        flex items-center justify-between p-3 rounded-lg
                        ${availabilityMap[day] 
                            ? 'bg-green-50 dark:bg-green-900/20' 
                            : 'bg-red-50 dark:bg-red-900/20'}
                    `}
                >
                    <span className="font-medium">{day}</span>
                    <span 
                        className={`
                            px-3 py-1 rounded-full text-sm font-medium
                            ${availabilityMap[day]
                                ? 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/40'
                                : 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/40'}
                        `}
                    >
                        {availabilityMap[day] ? 'Available' : 'Not Available'}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default AvailabilityDisplay;
