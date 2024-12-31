export interface Availability {
    id: number;
    student: number;
    day_of_week: string;
    is_available: boolean;
}

export interface AvailabilityDetail extends Omit<Availability, 'student'> {
    student: {
        id: number;
        first_name: string;
        last_name: string;
        student_code: string;
    };
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const DAYS_OF_WEEK: DayOfWeek[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];
