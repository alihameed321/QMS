import React, { useState} from 'react';

interface DepartmentFormProps {
    initialData?: { id?: number; name?: string; description?: string; status?: number };
    onSubmit: (data: { name: string; description: string; status: number }) => void;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ initialData, onSubmit }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [status, setStatus] = useState(initialData?.status || 1); // Default to active

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, description, status });
        setName('');
        setDescription('');
        setStatus(1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Department Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
            </select>
            <button type="submit">Save Department</button>
        </form>
    );
};

export default DepartmentForm;
