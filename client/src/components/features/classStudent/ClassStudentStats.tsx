import React, { useEffect, useState } from 'react';
import { classStudentService } from '../../../services/classStudentService';

interface Props {
    classStudentId: number;
}

interface Stats {
    present_count: number;
    tardy_count: number;
    absent_count: number;
}

const ClassStudentStats: React.FC<Props> = ({ classStudentId }) => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await classStudentService.getStatistics(classStudentId);
                setStats(data);
            } catch (err) {
                setError('Failed to fetch attendance statistics');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [classStudentId]);

    if (loading) {
        return <div className="animate-pulse">Loading stats...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!stats) {
        return null;
    }

    const total = stats.present_count + stats.tardy_count + stats.absent_count;
    const presentPercentage = total > 0 ? (stats.present_count / total) * 100 : 0;
    const tardyPercentage = total > 0 ? (stats.tardy_count / total) * 100 : 0;
    const absentPercentage = total > 0 ? (stats.absent_count / total) * 100 : 0;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Attendance Statistics</h3>
            
            <div className="grid grid-cols-3 gap-4">
                <div className="stat-card">
                    <div className="stat-value text-green-600">{stats.present_count}</div>
                    <div className="stat-label">Present</div>
                    <div className="stat-change">{presentPercentage.toFixed(1)}%</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value text-yellow-600">{stats.tardy_count}</div>
                    <div className="stat-label">Tardy</div>
                    <div className="stat-change">{tardyPercentage.toFixed(1)}%</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value text-red-600">{stats.absent_count}</div>
                    <div className="stat-label">Absent</div>
                    <div className="stat-change">{absentPercentage.toFixed(1)}%</div>
                </div>
            </div>

            <div className="progress-bar">
                <div 
                    className="bg-green-500 h-full transition-all" 
                    style={{ width: `${presentPercentage}%` }}
                />
                <div 
                    className="bg-yellow-500 h-full transition-all" 
                    style={{ width: `${tardyPercentage}%` }}
                />
                <div 
                    className="bg-red-500 h-full transition-all" 
                    style={{ width: `${absentPercentage}%` }}
                />
            </div>
        </div>
    );
};

export default ClassStudentStats;
