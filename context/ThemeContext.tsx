import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

type ThemeType = 'light' | 'dark';

type ThemeContextType = {
    theme: ThemeType;
    toggleTheme: () => void;
    isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => { },
    isDark: false,
});

// @ts-ignore
const THEME_FILE = (FileSystem.documentDirectory || FileSystem.cacheDirectory || '') + 'theme_pref.json';

export function ThemeProvider({ children }: PropsWithChildren) {
    const systemScheme = useSystemColorScheme();
    const [theme, setTheme] = useState<ThemeType>(systemScheme === 'dark' ? 'dark' : 'light');

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const info = await FileSystem.getInfoAsync(THEME_FILE);
            if (info.exists) {
                const content = await FileSystem.readAsStringAsync(THEME_FILE);
                const pref = JSON.parse(content);
                if (pref === 'light' || pref === 'dark') {
                    setTheme(pref);
                }
            }
        } catch (error) {
            console.log('Error loading theme', error);
        }
    };

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        try {
            await FileSystem.writeAsStringAsync(THEME_FILE, JSON.stringify(newTheme));
        } catch (error) {
            console.log('Error saving theme', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
