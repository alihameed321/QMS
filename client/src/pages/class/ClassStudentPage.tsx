import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ClassStudentList from '../../components/features/classStudent/ClassStudentList';
import ClassStudentForm from '../../components/features/classStudent/ClassStudentForm';

const ClassStudentPage: React.FC = () => {
    const { id: classId } = useParams<{ id: string }>();
    const [isAddingStudents, setIsAddingStudents] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleAddSuccess = () => {
        setIsAddingStudents(false);
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="page-container">
            <div className="page-content">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Class Students</h1>
                    <button
                        className="btn-primary"
                        onClick={() => setIsAddingStudents(true)}
                    >
                        Add Students
                    </button>
                </div>

                {isAddingStudents && (
                    <div className="card mb-6">
                        <div className="card-body">
                            <ClassStudentForm
                                classId={Number(classId)}
                                onSuccess={handleAddSuccess}
                                onCancel={() => setIsAddingStudents(false)}
                            />
                        </div>
                    </div>
                )}

                <div className="card">
                    <div className="card-body">
                        <ClassStudentList 
                            key={refreshKey}
                            classId={Number(classId)} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassStudentPage;
