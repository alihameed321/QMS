export interface ClassStudent {
    id: number;
    classIns: number;
    student: number;
}

export interface ClassStudentDetail {
    id: number;
    classIns: {
        id: number;
        name: string;
        school_year: string;
        level: string;
        assigned_responsible: {
            id: number;
            user: {
                id: number;
                username: string;
                first_name: string;
                last_name: string;
            };
        };
    };
    student: {
        id: number;
        student_code: string;
        first_name: string;
        last_name: string;
    };
    present_count?: number;
    tardy_count?: number;
    absent_count?: number;
}
