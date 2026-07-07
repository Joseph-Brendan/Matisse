import React, { useState, useEffect } from 'react';
import { useColorStore } from '../store/useColorStore';
import { GlossyButton } from '../design-system/components/Button/GlossyButton';
import { showToast } from '../store/useToastStore';
import './ExportPanel.css';

interface ExportPanelProps {
    isOpen: boolean;
    onClose: () => void;
    defaultScope?: 'all' | 'color' | 'typography' | 'spacing' | 'shadows';
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ isOpen, onClose, defaultScope = 'all' }) => {
    const { roles, typography, spacing, borderRadius, shadows, elevation } = useColorStore();
    const [scope, setScope] = useState<'all' | 'color' | 'typography' | 'spacing' | 'shadows'>(defaultScope);
    const [format, setFormat] = useState<'json' | 'css' | 'tailwind'>('json');

    useEffect(() => {
        if (isOpen) {
            setScope(defaultScope);
        }
    }, [isOpen, defaultScope]);

    if (!isOpen) return null;

    const getKebabCaseName = (str: string) => {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    };

    const getExportData = (activeScope: typeof scope) => {
        const data: Record<string, unknown> = {};

        if (activeScope === 'all' || activeScope === 'color') {
            const activeLightRoles: Record<string, string> = {};
            roles.light.forEach(r => {
                activeLightRoles[getKebabCaseName(r.name) + '-color'] = r.resolvedValue;
            });
            const activeDarkRoles: Record<string, string> = {};
            roles.dark.forEach(r => {
                activeDarkRoles[getKebabCaseName(r.name) + '-color'] = r.resolvedValue;
            });
            data.color = { light: activeLightRoles, dark: activeDarkRoles };
        }

        if (activeScope === 'all' || activeScope === 'typography') {
            const typoData: Record<string, unknown> = {};
            for (const [key, val] of Object.entries(typography.fontFamily)) {
                typoData[`font-family-${getKebabCaseName(key)}`] = val;
            }
            for (const [key, val] of Object.entries(typography.fontSize)) {
                typoData[`font-size-${getKebabCaseName(key)}`] = val;
            }
            for (const [key, val] of Object.entries(typography.fontWeight)) {
                typoData[`font-weight-${getKebabCaseName(key)}`] = val;
            }
            for (const [key, val] of Object.entries(typography.lineHeight)) {
                typoData[`line-height-${getKebabCaseName(key)}`] = val;
            }
            for (const [key, val] of Object.entries(typography.letterSpacing)) {
                typoData[`letter-spacing-${getKebabCaseName(key)}`] = val;
            }
            data.typography = typoData;
        }

        if (activeScope === 'all' || activeScope === 'spacing') {
            const spacingData: Record<string, string> = {};
            for (const [key, val] of Object.entries(spacing)) {
                spacingData[`spacing-${getKebabCaseName(key)}`] = val;
            }
            const radiusData: Record<string, string> = {};
            for (const [key, val] of Object.entries(borderRadius)) {
                radiusData[`radius-${getKebabCaseName(key)}`] = val;
            }
            data.spacing = spacingData;
            data.borderRadius = radiusData;
        }

        if (activeScope === 'all' || activeScope === 'shadows') {
            const shadowData: Record<string, string> = {};
            for (const [key, val] of Object.entries(shadows)) {
                if (typeof val === 'string') {
                    shadowData[`shadow-${getKebabCaseName(key)}`] = val;
                }
            }
            for (const [key, val] of Object.entries(shadows.glow)) {
                shadowData[`shadow-glow-${getKebabCaseName(key)}`] = val;
            }
            const elevData: Record<string, string> = {};
            for (const [key, val] of Object.entries(elevation)) {
                elevData[`elevation-${getKebabCaseName(key)}`] = val;
            }
            data.shadows = shadowData;
            data.elevation = elevData;
        }

        return data;
    };

    const generateCSS = (activeScope: typeof scope) => {
        const data = getExportData(activeScope);
        let output = '/* Matisse Design Tokens CSS */\n\n:root {\n';

        const typo = data.typography as Record<string, unknown> | undefined;
        const spac = data.spacing as Record<string, unknown> | undefined;
        const rad  = data.borderRadius as Record<string, unknown> | undefined;
        const shad = data.shadows as Record<string, unknown> | undefined;
        const elev = data.elevation as Record<string, unknown> | undefined;
        const col  = data.color as { light: Record<string, string>; dark: Record<string, string> } | undefined;

        if (typo) {
            output += '  /* Typography */\n';
            for (const [name, val] of Object.entries(typo)) {
                output += `  --matisse-${name}: ${val};\n`;
            }
            output += '\n';
        }
        if (spac) {
            output += '  /* Spacing */\n';
            for (const [name, val] of Object.entries(spac)) {
                output += `  --matisse-${name}: ${val};\n`;
            }
            output += '\n';
        }
        if (rad) {
            output += '  /* Border Radius */\n';
            for (const [name, val] of Object.entries(rad)) {
                output += `  --matisse-${name}: ${val};\n`;
            }
            output += '\n';
        }
        if (shad) {
            output += '  /* Shadows */\n';
            for (const [name, val] of Object.entries(shad)) {
                output += `  --matisse-${name}: ${val};\n`;
            }
            output += '\n';
        }
        if (elev) {
            output += '  /* Elevation */\n';
            for (const [name, val] of Object.entries(elev)) {
                output += `  --matisse-${name}: ${val};\n`;
            }
            output += '\n';
        }
        if (col?.light) {
            output += '  /* Color Roles (Light Theme) */\n';
            for (const [name, val] of Object.entries(col.light)) {
                output += `  --md-ref-role-${name}: ${val};\n`;
            }
        }
        output += '}\n\n';
        if (col?.dark) {
            output += '[data-theme="dark"] {\n';
            output += '  /* Color Roles (Dark Theme) */\n';
            for (const [name, val] of Object.entries(col.dark)) {
                output += `  --md-ref-role-${name}: ${val};\n`;
            }
            output += '}\n';
        }
        return output;
    };

    const generateTailwind = (activeScope: typeof scope) => {
        const data = getExportData(activeScope);
        const col = data.color as { light: Record<string, string> } | undefined;
        let output = '// tailwind.config.js - Matisse Design Tokens Extension\n\n';
        output += 'module.exports = {\n  theme: {\n    extend: {\n';

        if (col) {
            output += '      colors: {\n';
            Object.keys(col.light).forEach(k => {
                const baseName = k.replace(/-color$/, '');
                output += `        "${baseName}": "var(--md-ref-role-${k})",\n`;
            });
            output += '      },\n';
        }
        if (data.typography) {
            output += '      fontFamily: {\n';
            for (const key of Object.keys(typography.fontFamily)) {
                output += `        "${key}": ["var(--matisse-font-family-${key})", "sans-serif"],\n`;
            }
            output += '      },\n      fontSize: {\n';
            for (const key of Object.keys(typography.fontSize)) {
                output += `        "${key}": "var(--matisse-font-size-${key})",\n`;
            }
            output += '      },\n';
        }
        if (data.spacing) {
            output += '      spacing: {\n';
            for (const key of Object.keys(spacing)) {
                output += `        "${key}": "var(--matisse-spacing-${key})",\n`;
            }
            output += '      },\n';
        }
        if (data.borderRadius) {
            output += '      borderRadius: {\n';
            for (const key of Object.keys(borderRadius)) {
                output += `        "${key}": "var(--matisse-radius-${key})",\n`;
            }
            output += '      },\n';
        }
        if (data.shadows) {
            output += '      boxShadow: {\n';
            for (const key of Object.keys(shadows)) {
                if (typeof shadows[key as keyof typeof shadows] === 'string') {
                    output += `        "${key}": "var(--matisse-shadow-${key})",\n`;
                }
            }
            for (const key of Object.keys(shadows.glow)) {
                output += `        "glow-${key}": "var(--matisse-shadow-glow-${key})",\n`;
            }
            output += '      },\n';
        }
        output += '    }\n  }\n};';
        return output;
    };

    const generateText = () => {
        if (format === 'json') return JSON.stringify(getExportData(scope), null, 2);
        if (format === 'css') return generateCSS(scope);
        return generateTailwind(scope);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateText());
        showToast('success', 'Copied to clipboard!');
    };

    return (
        <div className="export-overlay">
            <div className="export-panel">
                <div className="export-panel__header">
                    <h2 className="export-panel__title">Export Design System Tokens</h2>
                    <button onClick={onClose} className="export-panel__close-btn" aria-label="Close">
                        &times;
                    </button>
                </div>

                <div className="export-panel__controls">
                    <div className="export-panel__control-group">
                        <label className="export-panel__control-label">Token Scope</label>
                        <select
                            className="export-panel__control-select"
                            value={scope}
                            onChange={(e) => setScope(e.target.value as typeof scope)}
                        >
                            <option value="all">All Tokens (Unified)</option>
                            <option value="color">Colors Only</option>
                            <option value="typography">Typography Only</option>
                            <option value="spacing">Spacing &amp; Radius Only</option>
                            <option value="shadows">Shadows &amp; Elevation Only</option>
                        </select>
                    </div>

                    <div className="export-panel__control-group">
                        <label className="export-panel__control-label">Export Format</label>
                        <select
                            className="export-panel__control-select"
                            value={format}
                            onChange={(e) => setFormat(e.target.value as typeof format)}
                        >
                            <option value="json">JSON Tokens Format</option>
                            <option value="css">CSS Variables (:root)</option>
                            <option value="tailwind">Tailwind v4 Config Extend</option>
                        </select>
                    </div>
                </div>

                <div className="export-panel__code">
                    {generateText()}
                </div>

                <div className="export-panel__footer">
                    <GlossyButton variant="outline" size="sm" onClick={onClose}>Close</GlossyButton>
                    <GlossyButton size="sm" onClick={handleCopy}>Copy to Clipboard</GlossyButton>
                </div>
            </div>
        </div>
    );
};
