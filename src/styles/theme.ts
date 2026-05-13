import type { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
    colors: {
        background: {
            default: "#F3F3F6",
            paper: "#FFFFFF",
        },
        text: {
            default: "#1F2937",
            disabled: "#9CA3AF",
        },
        divider: "#E5E7E8",
        primary: "#2563EB",
        secondary: "#4B5563",
        success: "#10B981",
        error: "#EF4444",
        warning: "#F59E0B",
        info: "#3B82F6",
    },
};

export const darkTheme: DefaultTheme = {
    colors: {
        background: {
            default: "#111827",
            paper: "#1F2937",
        },
        text: {
            default: "#F9FAFB",
            disabled: "#6B7280",
        },
        divider: "#374151",
        primary: "#3B82F6",
        secondary: "#9CA3AF",
        success: "#34D399",
        error: "#F87171",
        warning: "#FBBF24",
        info: "#60A5FA",
    },
};