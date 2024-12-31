import api from './api';
import { Availability, AvailabilityDetail } from '../types/availability';

export const availabilityService = {
    // Get all availabilities for a student
    getByStudent: async (studentId: number): Promise<AvailabilityDetail[]> => {
        const response = await api.get(`/availabilities/?student=${studentId}`);
        return response.data;
    },

    // Update single availability
    update: async (id: number, data: Partial<Availability>): Promise<AvailabilityDetail> => {
        const response = await api.patch(`/availabilities/${id}/`, data);
        return response.data;
    },

    // Create new availability
    create: async (data: Omit<Availability, 'id'>): Promise<AvailabilityDetail> => {
        const response = await api.post('/availabilities/', data);
        return response.data;
    },

    // Bulk update student availabilities
    bulkUpdateStudentAvailability: async (
        studentId: number, 
        availabilities: { day_of_week: string; is_available: boolean; }[]
    ): Promise<AvailabilityDetail[]> => {
        const response = await api.post(`/availabilities/bulk-update/`, {
            student_id: studentId,
            availabilities
        });
        return response.data;
    }
};
