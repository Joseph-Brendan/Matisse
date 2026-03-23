import { create } from 'zustand';
import type { KeyColor, TonalPalette, RoleToken, KeyColorName } from '../types';
import { DEFAULT_KEY_COLORS, DEFAULT_LIGHT_ROLES, DEFAULT_DARK_ROLES } from '../lib/defaults';
import { generateTones } from '../lib/material';

interface ColorState {
    keyColors: KeyColor[];
    palettes: TonalPalette[];
    roles: { light: RoleToken[]; dark: RoleToken[] };
    theme: 'light' | 'dark';

    updateKeyColor: (name: KeyColorName, value: string) => void;
    addOptionalColor: (name: string, value: string) => void;
    removeOptionalColor: (name: string) => void;
    updateRoleReference: (theme: 'light' | 'dark', name: string, reference: string) => void;
    setTheme: (theme: 'light' | 'dark') => void;

    // Tone editing
    addTone: (keyColor: string, tone: number, value: string) => void;
    updateToneHex: (keyColor: string, tone: number, value: string) => void;
    deleteTone: (keyColor: string, tone: number) => void;
}

// Helpers
const resolveReference = (ref: string, keyColors: KeyColor[], palettes: TonalPalette[]): string => {
    if (ref.startsWith('{color.key.')) {
        const keyName = ref.split('.')[2].replace('}', '');
        return keyColors.find((c) => c.name === keyName)?.value || 'hsl(300, 100%, 50%)'; // Error magenta
    }
    if (ref.startsWith('{color.palette.')) {
        const parts = ref.split('.');
        const keyName = parts[2];
        const toneVal = parseInt(parts[3].replace('}', ''), 10);
        const palette = palettes.find((p) => p.keyColor === keyName);
        if (palette) {
            return palette.tones.find((t) => t.tone === toneVal)?.value || 'hsl(300, 100%, 50%)';
        }
    }
    return 'hsl(300, 100%, 50%)';
};

const buildRolesList = (mapping: Record<string, string>, theme: 'light' | 'dark', keyColors: KeyColor[], palettes: TonalPalette[]): RoleToken[] => {
    return Object.entries(mapping).map(([name, reference]) => ({
        name,
        reference,
        resolvedValue: resolveReference(reference, keyColors, palettes),
        theme,
        editable: true,
    }));
};

const resolveAllRoles = (roles: RoleToken[], keyColors: KeyColor[], palettes: TonalPalette[]) => {
    return roles.map(r => ({
        ...r,
        resolvedValue: resolveReference(r.reference, keyColors, palettes)
    }));
};

export const useColorStore = create<ColorState>((set) => {
    const initPalettes = DEFAULT_KEY_COLORS.map(kc => ({
        keyColor: kc.name,
        tones: generateTones(kc.value)
    }));

    const initLightRoles = buildRolesList(DEFAULT_LIGHT_ROLES, 'light', DEFAULT_KEY_COLORS, initPalettes);
    const initDarkRoles = buildRolesList(DEFAULT_DARK_ROLES, 'dark', DEFAULT_KEY_COLORS, initPalettes);

    return {
        keyColors: DEFAULT_KEY_COLORS,
        palettes: initPalettes,
        roles: { light: initLightRoles, dark: initDarkRoles },
        theme: 'light',

        updateKeyColor: (name, value) => {
            set((state) => {
                const newKeyColors = state.keyColors.map(c => c.name === name ? { ...c, value } : c);
                const newPalettes = state.palettes.map(p => p.keyColor === name ? { ...p, tones: generateTones(value) } : p);

                const newLightRoles = resolveAllRoles(state.roles.light, newKeyColors, newPalettes);
                const newDarkRoles = resolveAllRoles(state.roles.dark, newKeyColors, newPalettes);

                return {
                    keyColors: newKeyColors,
                    palettes: newPalettes,
                    roles: { light: newLightRoles, dark: newDarkRoles }
                };
            });
        },

        addOptionalColor: (name, value) => {
            set((state) => {
                if (state.keyColors.some(k => k.name === name)) return state;
                const newKeyColors = [...state.keyColors, { name, value }];
                const newPalettes = [...state.palettes, { keyColor: name, tones: generateTones(value) }];
                return { keyColors: newKeyColors, palettes: newPalettes };
            });
        },

        removeOptionalColor: (name) => {
            set((state) => {
                const required = ['primary', 'secondary', 'tertiary', 'neutral', 'neutralVariant'];
                if (required.includes(name)) return state;
                return {
                    keyColors: state.keyColors.filter(k => k.name !== name),
                    palettes: state.palettes.filter(p => p.keyColor !== name)
                };
            });
        },

        updateRoleReference: (theme, name, reference) => {
            set((state) => {
                const currentRoles = state.roles[theme];
                const updatedRoles = currentRoles.map(r => r.name === name ? { ...r, reference } : r);
                const resolvedUpdatedRoles = resolveAllRoles(updatedRoles, state.keyColors, state.palettes);
                return {
                    roles: {
                        ...state.roles,
                        [theme]: resolvedUpdatedRoles,
                    }
                };
            });
        },

        setTheme: (theme) => set({ theme }),

        addTone: (keyColor, tone, value) => {
            set((state) => {
                const newPalettes = state.palettes.map(p => {
                    if (p.keyColor !== keyColor) return p;
                    if (p.tones.find(t => t.tone === tone)) return p; // prevent duplicate
                    const newTones = [...p.tones, { tone, value }].sort((a, b) => a.tone - b.tone);
                    return { ...p, tones: newTones };
                });
                return {
                    palettes: newPalettes,
                    roles: {
                        light: resolveAllRoles(state.roles.light, state.keyColors, newPalettes),
                        dark: resolveAllRoles(state.roles.dark, state.keyColors, newPalettes)
                    }
                };
            });
        },

        updateToneHex: (keyColor, tone, value) => {
            set((state) => {
                const newPalettes = state.palettes.map(p => {
                    if (p.keyColor !== keyColor) return p;
                    const newTones = p.tones.map(t => t.tone === tone ? { ...t, value } : t);
                    return { ...p, tones: newTones };
                });
                return {
                    palettes: newPalettes,
                    roles: {
                        light: resolveAllRoles(state.roles.light, state.keyColors, newPalettes),
                        dark: resolveAllRoles(state.roles.dark, state.keyColors, newPalettes)
                    }
                };
            });
        },

        deleteTone: (keyColor, tone) => {
            set((state) => {
                const newPalettes = state.palettes.map(p => {
                    if (p.keyColor !== keyColor) return p;
                    return { ...p, tones: p.tones.filter(t => t.tone !== tone) };
                });
                return {
                    palettes: newPalettes,
                    roles: {
                        light: resolveAllRoles(state.roles.light, state.keyColors, newPalettes),
                        dark: resolveAllRoles(state.roles.dark, state.keyColors, newPalettes)
                    }
                };
            });
        }
    };
});
