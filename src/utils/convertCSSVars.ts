import type { CSSThemeOverride } from "../types";

/**
 * Converts a CSS theme override object into a flat record of CSS variables.
 * Each key in the theme becomes a CSS variable in the format `--key`.
 * Undefined or null values are ignored.
 *
 * @param {CSSThemeOverride} theme - The theme object containing optional CSS property overrides.
 * @returns {Record<string, string>} A record of CSS variable names mapped to string values.
 */
function convertThemeToCSSVars(theme: CSSThemeOverride) {
    const CSSvariables: Record<string, string> = {};

    for (const key in theme) {
        const value = theme[key as keyof CSSThemeOverride];

        if (value === undefined || value === null) continue;

        CSSvariables[`--${key}`] = String(value);
    }

    return CSSvariables;
}

export {
    convertThemeToCSSVars,
}