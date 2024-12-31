import api from './api';
import { ClassStudent, ClassStudentDetail } from '../types/classStudent';

export const classStudentService = {
    // Get all class-student relationships
    getAll: async (): Promise<ClassStudentDetail[]> => {
        const response = await api.get('/classstudents/');
        return response.data;
    },

    // Get class-student relationship by ID
    getById: async (id: number): Promise<ClassStudentDetail> => {
        const response = await api.get(`/classstudents/${id}/`);
        return response.data;
    },

    // Get students by class ID
    getByClassId: async (classId: number): Promise<ClassStudentDetail[]> => {
        const response = await api.get(`/classstudents/?classIns=${classId}`);
        return response.data;
    },

    // Get classes by student ID
    getByStudentId: async (studentId: number): Promise<ClassStudentDetail[]> => {
        const response = await api.get(`/classstudents/?student=${studentId}`);
        return response.data;
    },

    // Create new class-student relationship
    create: async (data: Omit<ClassStudent, 'id'>): Promise<ClassStudentDetail> => {
        const response = await api.post('/classstudents/', data);
        return response.data;
    },

    // Update class-student relationship
    update: async (id: number, data: Partial<ClassStudent>): Promise<ClassStudentDetail> => {
        const response = await api.patch(`/classstudents/${id}/`, data);
        return response.data;
    },

    // Delete class-student relationship
    delete: async (id: number): Promise<void> => {
        await api.delete(`/classstudents/${id}/`);
    },

    // Bulk create class-student relationships
    bulkCreate: async (data: Omit<ClassStudent, 'id'>[]): Promise<ClassStudentDetail[]> => {
        const response = await api.post('/classstudents/bulk-create/', data);
        return response.data;
    },

    // Get attendance statistics for a class-student
    getStatistics: async (id: number): Promise<{
        present_count: number;
        tardy_count: number;
        absent_count: number;
    }> => {
        const response = await api.get(`/classstudents/${id}/statistics/`);
        return response.data;
    }
};
