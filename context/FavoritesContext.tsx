import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import * as FileSystem from 'expo-file-system/legacy';
import { useAuth } from './AuthContext';

type FavoritesContextType = {
    favorites: string[];
    toggleFavorite: (courseId: string) => Promise<void>;
    isFavorite: (courseId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    toggleFavorite: async () => { },
    isFavorite: () => false,
});

// @ts-ignore
const FAV_DIR = (FileSystem.documentDirectory || FileSystem.cacheDirectory || '') + 'favorites';

export function FavoritesProvider({ children }: PropsWithChildren) {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        if (user) {
            loadFavorites(user.username);
        } else {
            setFavorites([]);
        }
    }, [user]);

    const getFilePath = (username: string) => `${FAV_DIR}/${username}_favs.json`;

    const loadFavorites = async (username: string) => {
        try {
            const dirInfo = await FileSystem.getInfoAsync(FAV_DIR);
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(FAV_DIR, { intermediates: true });
            }

            const file = getFilePath(username);
            const fileInfo = await FileSystem.getInfoAsync(file);

            if (fileInfo.exists) {
                const content = await FileSystem.readAsStringAsync(file);
                setFavorites(JSON.parse(content));
            } else {
                setFavorites([]);
            }
        } catch (error) {
            console.error('Failed to load favorites', error);
        }
    };

    const saveFavorites = async (username: string, newFavs: string[]) => {
        try {
            const file = getFilePath(username);
            await FileSystem.writeAsStringAsync(file, JSON.stringify(newFavs));
        } catch (error) {
            console.error('Failed to save favorites', error);
        }
    };

    const toggleFavorite = async (courseId: string) => {
        if (!user) return;

        let newFavs;
        if (favorites.includes(courseId)) {
            newFavs = favorites.filter(id => id !== courseId);
        } else {
            newFavs = [...favorites, courseId];
        }

        setFavorites(newFavs);
        await saveFavorites(user.username, newFavs);
    };

    const isFavorite = (courseId: string) => favorites.includes(courseId);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}
