import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useRouter } from 'expo-router';
import { ALL_COURSES } from '@/constants/courses';
import CourseCard from '@/components/ui/CourseCard';
import YouTubePlayerModal from '@/components/ui/YouTubePlayerModal';

import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';

export default function FavScreen() {
    const { user } = useAuth();
    const router = useRouter();
    const { isDark } = useTheme();
    const { favorites, isFavorite, toggleFavorite } = useFavorites();
    const [modalVisible, setModalVisible] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState('');

    const favCourses = ALL_COURSES.filter(course => favorites.includes(course.id));

    const handleOpenCourse = (videoId: string) => {
        setCurrentVideoId(videoId);
        setModalVisible(true);
    };

    useEffect(() => {
        if (!user) {
            router.replace('/');
        }
    }, [user]);

    if (!user) return null;

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#f5f5f5' }]}>
            {isDark && (
                <>
                    <LinearGradient
                        colors={['#000000', '#0a1f1c', '#1a332a']}
                        style={styles.background}
                    />
                    {/* Ambient Background Shapes */}
                    <View style={[styles.circle, { top: -50, right: 100, width: 200, height: 200, backgroundColor: 'rgba(74, 222, 128, 0.2)' }]} />
                </>
            )}

            <SafeAreaView style={{ flex: 1 }}>
                <YouTubePlayerModal
                    visible={modalVisible}
                    videoId={currentVideoId}
                    onClose={() => setModalVisible(false)}
                />

                <Text style={[styles.header, { color: isDark ? '#fff' : '#000' }]}>Favorites</Text>

                {favCourses.length === 0 ? (
                    <View style={styles.center}>
                        <Text style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#888', fontSize: 16 }}>No favorites yet. Go add some!</Text>
                    </View>
                ) : (
                    <FlatList
                        data={favCourses}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <CourseCard
                                title={item.title}
                                offeredBy={item.offeredBy}
                                tags={item.tags}
                                image={item.image}
                                onPress={() => handleOpenCourse(item.videoId)}
                                isFavorite={true}
                                onToggleFavorite={() => toggleFavorite(item.id)}
                            />
                        )}
                        contentContainerStyle={{ padding: 20 }}
                    />
                )}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000,
    },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 24, fontWeight: 'bold', margin: 20 },
    // Removed old card styles as CourseCard is used now
});
