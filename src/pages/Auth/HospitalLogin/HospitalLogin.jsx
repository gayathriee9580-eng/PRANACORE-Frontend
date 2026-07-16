import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import './HospitalLogin.css';

const portalOptions = [
    {
        id: 'doctor',
        title: 'Doctor Portal',
        description: 'Access patient records, appointments and consultations.',
        role: 'doctor',
        emoji: '👨‍⚕️'
    },
    {
        id: 'reception',
        title: 'Reception Portal',
        description: 'Manage registrations, appointments and check-ins.',
        role: 'reception',
        emoji: '👩‍💼'
    },
    {
        id: 'lab',
        title: 'Laboratory Portal',
        description: 'Manage lab tests, reports and results.',
        role: 'lab',
        emoji: '🧪'
    },
    {
        id: 'pharmacy',
        title: 'Pharmacy Portal',
        description: 'Dispense medicines, inventory and prescriptions.',
        role: 'pharmacy',
        emoji: '💊'
    },
    {
        id: 'admin',
        title: 'Administrator Portal',
        description: 'Manage users, analytics and system settings.',
        role: 'admin',
        emoji: '🛡️'
    }
];

const HospitalLogin = () => {
    const navigate = useNavigate();

    const handlePortalSelect = (role) => {
        navigate('/login', { state: { role } });
    };

    const handleKeyDown = (e, role) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePortalSelect(role);
        }
    };

    return (
        <div className="hospital-portal-container">
            <div className="hospital-portal-header">
                <h1 className="hospital-portal-title">Hospital Portal</h1>
                <p className="hospital-portal-subtitle">Select your portal to continue</p>
            </div>

            <div className="portal-cards-grid">
                {portalOptions.map((portal) => (
                    <div
                        key={portal.id}
                        className="portal-card"
                        onClick={() => handlePortalSelect(portal.role)}
                        onKeyDown={(e) => handleKeyDown(e, portal.role)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Login to ${portal.title}`}
                    >
                        <div className="portal-card-icon">
                            <span className="portal-emoji">{portal.emoji}</span>
                        </div>
                        <h3 className="portal-card-title">{portal.title}</h3>
                        <p className="portal-card-desc">{portal.description}</p>
                        <div className="portal-card-action">
                            <ArrowRightOutlined className="portal-arrow" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HospitalLogin;
