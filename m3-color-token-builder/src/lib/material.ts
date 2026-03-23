import { argbFromHex, hexFromArgb, TonalPalette } from "@material/material-color-utilities";
import { hslToHex, hexToHsl } from "./colorUtils";

export const DEFAULT_TONE_SCALE = [0, 10, 20, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100];

export function generateTones(value: string): { tone: number; value: string }[] {
    try {
        const hex = hslToHex(value);
        const argb = argbFromHex(hex);
        const palette = TonalPalette.fromInt(argb);

        return DEFAULT_TONE_SCALE.map((tone) => ({
            tone,
            value: hexToHsl(hexFromArgb(palette.tone(tone))),
        }));
    } catch (error) {
        console.error("Invalid color:", value);
        return DEFAULT_TONE_SCALE.map((tone) => ({
            tone,
            value: "hsl(0, 0%, 0%)",
        }));
    }
}
