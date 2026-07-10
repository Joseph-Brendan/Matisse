import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useColorStore } from '../store/useColorStore';
import './RoleMappingTable.css';

export const RoleMappingTable: React.FC = () => {
    const { roles, palettes, updateRoleReference } = useColorStore();
    const [activeTab, setActiveTab] = useState<'light' | 'dark'>('light');
    const [isExpanded, setIsExpanded] = useState(true);

    const currentRoles = roles[activeTab];

    const paletteOptions = palettes.flatMap((p) =>
        p.tones.map((t) => ({
            label: `{color.palette.${p.keyColor}.${t.tone}}`,
            value: `{color.palette.${p.keyColor}.${t.tone}}`,
        }))
    );

    return (
        <div className="role-table-card">
            {/* Header */}
            <div className="role-table-header">
                <div className="role-table-header-left" onClick={() => setIsExpanded(!isExpanded)}>
                    <div className="role-table-title-row">
                        <h2 className="role-table-title">Role Mapping</h2>
                        {isExpanded ? <ChevronUp size={18} color="#6b7280" /> : <ChevronDown size={18} color="#6b7280" />}
                    </div>
                    <p className="role-table-subtitle">Assign palette tones to semantic roles.</p>
                </div>

                {/* Light / Dark toggle */}
                <div className="role-table-theme-toggle">
                    <button
                        className={`role-table-theme-btn${activeTab === 'light' ? ' active' : ''}`}
                        onClick={() => setActiveTab('light')}
                    >
                        Light
                    </button>
                    <button
                        className={`role-table-theme-btn${activeTab === 'dark' ? ' active' : ''}`}
                        onClick={() => setActiveTab('dark')}
                    >
                        Dark
                    </button>
                </div>
            </div>

            {/* Table */}
            {isExpanded && (
                <div className="role-table-scroll">
                    <table className="role-table">
                        <thead>
                            <tr>
                                <th>Role Name</th>
                                <th>Swatch</th>
                                <th>Source Reference</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRoles.map((role) => (
                                <tr key={role.name}>
                                    <td>
                                        <span className="role-name">{role.name}</span>
                                    </td>
                                    <td>
                                        <div className="role-swatch-cell">
                                            <div
                                                className="role-swatch"
                                                style={{ backgroundColor: role.resolvedValue }}
                                            />
                                            <span className="role-swatch-value">{role.resolvedValue}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {role.name === 'primary' ? (
                                            <div className="role-override-cell">
                                                <span className="role-reference-badge">{role.reference}</span>
                                                <span
                                                    className="role-override-label"
                                                    title="Custom override: primary role uses the exact seed color, not standard Material tone mapping."
                                                >
                                                    ⚠️ Override
                                                </span>
                                            </div>
                                        ) : (
                                            <select
                                                className="role-select"
                                                value={role.reference}
                                                onChange={(e) => updateRoleReference(activeTab, role.name, e.target.value)}
                                            >
                                                <option value={role.reference}>{role.reference}</option>
                                                <option disabled>──────────</option>
                                                {paletteOptions.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
