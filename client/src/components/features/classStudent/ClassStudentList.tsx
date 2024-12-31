import React, { useEffect, useState } from 'react';
import { ClassStudentDetail } from '../../../types/classStudent';
import { classStudentService } from '../../../services/classStudentService';

interface Props {
    classId?: number;
    studentId?: number;
}

const ClassStudentList: React.FC<Props> = ({ classId, studentId }) => {
    const [students, setStudents] = useState<ClassStudentDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                let data: ClassStudentDetail[];
                
                if (classId) {
                    data = await classStudentService.getByClassId(classId);
                } else if (studentId) {
                    data = await classStudentService.getByStudentId(studentId);
                } else {
                    data = await classStudentService.getAll();
                }
                
                setStudents(data);
            } catch (err) {
                setError('Failed to fetch students');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [classId, studentId]);

    if (loading) {
        return <div className="flex justify-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead className="table-header">
                    <tr>
                        <th className="table-header-cell">Student Code</th>
                        <th className="table-header-cell">Student Name</th>
                        <th className="table-header-cell">Class</th>
                        <th className="table-header-cell">Responsible</th>
                        <th className="table-header-cell">Present</th>
                        <th className="table-header-cell">Tardy</th>
                        <th className="table-header-cell">Absent</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {students.map((student) => (
                        <tr key={student.id} className="table-row">
                            <td className="table-cell">{student.student.student_code}</td>
                            <td className="table-cell">
                                {student.student.first_name} {student.student.last_name}
                            </td>
                            <td className="table-cell">
                                {student.classIns.name} ({student.classIns.school_year})
                            </td>
                            <td className="table-cell">
                                {student.classIns.assigned_responsible.user.first_name} {student.classIns.assigned_responsible.user.last_name}
                            </td>
                            <td className="table-cell">{student.present_count || 0}</td>
                            <td className="table-cell">{student.tardy_count || 0}</td>
                            <td className="table-cell">{student.absent_count || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClassStudentList;
