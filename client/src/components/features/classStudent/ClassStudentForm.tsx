import React, { useState, useEffect } from 'react';
import { classStudentService } from '../../../services/classStudentService';
import { ClassStudent } from '../../../types/classStudent';

interface Props {
    classId?: number;
    onSuccess?: () => void;
    onCancel?: () => void;
}

const ClassStudentForm: React.FC<Props> = ({ classId, onSuccess, onCancel }) => {
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [availableStudents, setAvailableStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch available students (you'll need to create this endpoint)
        const fetchAvailableStudents = async () => {
            try {
                const response = await fetch('/api/available-students/');
                const data = await response.json();
                setAvailableStudents(data);
            } catch (err) {
                setError('Failed to fetch available students');
                console.error(err);
            }
        };

        fetchAvailableStudents();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!classId) return;

        try {
            setLoading(true);
            setError(null);

            // Create class-student relationships for all selected students
            const relationships = selectedStudents.map(studentId => ({
                classIns: classId,
                student: studentId
            }));

            await classStudentService.bulkCreate(relationships);

            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            setError('Failed to add students to class');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStudentToggle = (studentId: number) => {
        setSelectedStudents(prev => 
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Add Students to Class</h3>
                
                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                <div className="space-y-2">
                    {availableStudents.map(student => (
                        <label key={student.id} className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={selectedStudents.includes(student.id)}
                                onChange={() => handleStudentToggle(student.id)}
                            />
                            <span>
                                {student.first_name} {student.last_name} ({student.student_code})
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn-secondary"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading || selectedStudents.length === 0}
                >
                    {loading ? 'Adding Students...' : 'Add Selected Students'}
                </button>
            </div>
        </form>
    );
};

export default ClassStudentForm;
