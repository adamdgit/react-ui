import type { CSSThemeOverride } from "../types";

function convertThemeToCSSVars(theme: CSSThemeOverride) {
    const CSSvariables: Record<string, string> = {};

    for (const key in theme) {
        const value = theme[key as keyof CSSThemeOverride];

        if (typeof value === "object" && value !== null) {
            // handle nested textColor: { c1, c2 }
            for (const subKey in value) {
                CSSvariables[`--${key}-${subKey}`] = value[subKey as keyof typeof value] ?? "";
            }
        } else if (value) {
            CSSvariables[`--${key}`] = value;
        }
    }

    return CSSvariables;
}

export {
    convertThemeToCSSVars,
}