import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import AuthLayout from "../components/AuthLayout";
import "./StaffLogin.css";

const staffPortals = [
    {
        role: "doctor",
        icon: "👨‍⚕️",
        title: "Doctor Portal",
        description: "Manage your appointments, patient records and clinical notes.",
        accent: "#2563eb",
        accentBg: "rgba(37,99,235,0.08)",
    },
    {
        role: "reception",
        icon: "👩‍💼",
        title: "Reception Portal",
        description: "Handle patient registrations, check-ins and appointment scheduling.",
        accent: "#ea580c",
        accentBg: "rgba(234,88,12,0.08)",
    },
    {
        role: "lab",
        icon: "🧪",
        title: "Laboratory Portal",
        description: "Access test requests, upload reports and manage lab workflow.",
        accent: "#7c3aed",
        accentBg: "rgba(124,58,237,0.08)",
    },
    {
        role: "pharmacy",
        icon: "💊",
        title: "Pharmacy Portal",
        description: "Process prescriptions and manage medicine inventory.",
        accent: "#16a34a",
        accentBg: "rgba(22,163,74,0.08)",
    },
    {
        role: "admin",
        icon: "🛡️",
        title: "Administrator Portal",
        description: "Full system control — users, reports, settings and analytics.",
        accent: "#dc2626",
        accentBg: "rgba(220,38,38,0.08)",
    },
];

const StaffLogin = () => {
    const navigate = useNavigate();

    const handlePortalSelect = (role) => {
        navigate("/login", { state: { role } });
    };

    return (
        <AuthLayout>
            <div className="sl-container">
                {/* Header */}
                <div className="sl-header">
                    <div className="sl-eyebrow">🏥 Hospital Management System</div>
                    <h1 className="sl-heading">Hospital Staff Portal</h1>
                    <p className="sl-subtitle">Select your portal to continue</p>
                </div>

                {/* Cards Grid */}
                <div className="sl-grid" role="list">
                    {staffPortals.map(({ role, icon, title, description, accent, accentBg }) => (
                        <button
                            key={role}
                            className="sl-card"
                            role="listitem"
                            aria-label={`Continue to ${title}`}
                            onClick={() => handlePortalSelect(role)}
                            style={{ "--card-accent": accent, "--card-accent-bg": accentBg }}
                        >
                            <div className="sl-card-inner">
                                <div className="sl-icon-wrapper" style={{ background: accentBg }}>
                                    <span className="sl-icon">{icon}</span>
                                </div>

                                <div className="sl-card-body">
                                    <h3 className="sl-card-title" style={{ color: accent }}>{title}</h3>
                                    <p className="sl-card-desc">{description}</p>
                                </div>

                                <div className="sl-card-arrow">
                                    <ArrowRightOutlined style={{ color: accent }} />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Footer link */}
                <p className="sl-footer-text">
                    Looking for Patient Access?{" "}
                    <button className="sl-footer-link" onClick={() => navigate("/login", { state: { role: "patient" } })}>
                        Patient Login
                    </button>{" "}
                    or{" "}
                    <button className="sl-footer-link" onClick={() => navigate("/signup")}>
                        Register here
                    </button>
                </p>
            </div>
        </AuthLayout>
    );
};

export default StaffLogin;
