import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CourseCard from '@/components/ui/CourseCard';
import YouTubePlayerModal from '@/components/ui/YouTubePlayerModal';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/context/FavoritesContext';
import { ALL_COURSES, CATEGORIES } from '@/constants/courses';

import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/context/ThemeContext';

export default function HomeScreen() {
    const { user } = useAuth();
    const { isDark } = useTheme();
    const { isFavorite, toggleFavorite } = useFavorites();
    const [modalVisible, setModalVisible] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleOpenCourse = (videoId: string) => {
        setCurrentVideoId(videoId);
        setModalVisible(true);
    };

    const filteredCourses = ALL_COURSES.filter(course => {
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.offeredBy.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (!user) {
        console.log('HomeScreen: No user, returning null');
        return null;
    }

    const themeColors = {
        bg: isDark ? '#000' : '#f5f5f5',
        text: isDark ? '#fff' : '#000',
        subText: isDark ? 'rgba(255,255,255,0.7)' : '#666',
        icon: isDark ? '#4ade80' : '#000',
        searchBg: isDark ? 'rgba(255,255,255,0.1)' : '#fff',
        searchBorder: isDark ? 'rgba(74, 222, 128, 0.2)' : '#ddd',
        pillBg: isDark ? 'rgba(255,255,255,0.1)' : '#fff',
        pillBorder: isDark ? 'rgba(255,255,255,0.2)' : '#ddd',
        pillText: isDark ? 'rgba(255,255,255,0.7)' : '#666',
        pillActiveBg: isDark ? '#4ade80' : '#000',
        pillActiveText: isDark ? '#000' : '#fff',
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
            {isDark && (
                <>
                    <LinearGradient
                        colors={['#000000', '#0a1f1c', '#1a332a']}
                        style={styles.background}
                    />
                    <View style={[styles.circle, { top: -50, right: -50, width: 200, height: 200, backgroundColor: 'rgba(74, 222, 128, 0.2)' }]} />
                    <View style={[styles.circle, { bottom: 100, left: -50, width: 250, height: 250, backgroundColor: 'rgba(16, 185, 129, 0.2)' }]} />
                </>
            )}

            <SafeAreaView style={{ flex: 1 }}>
                <YouTubePlayerModal
                    visible={modalVisible}
                    videoId={currentVideoId}
                    onClose={() => setModalVisible(false)}
                />

                <View style={styles.header}>
                    <View>
                        <Text style={[styles.greeting, { color: themeColors.text }]}>Hi, {user.username}</Text>
                        <Text style={[styles.subGreeting, { color: themeColors.subText }]}>Find your favorite course</Text>
                    </View>
                    <TouchableOpacity style={[styles.profileBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#fff', borderColor: themeColors.searchBorder }]}>
                        <Ionicons name="notifications-outline" size={24} color={isDark ? "#4ade80" : "#000"} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                {isDark ? (
                    <BlurView intensity={20} tint="dark" style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#4ade80" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search courses..."
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </BlurView>
                ) : (
                    <View style={[styles.searchContainer, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd' }]}>
                        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                        <TextInput
                            style={[styles.searchInput, { color: '#000' }]}
                            placeholder="Search courses..."
                            placeholderTextColor="#888"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                )}

                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                        {CATEGORIES.map(cat => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryPill,
                                    {
                                        backgroundColor: selectedCategory === cat ? themeColors.pillActiveBg : themeColors.pillBg,
                                        borderColor: selectedCategory === cat ? themeColors.pillActiveBg : themeColors.pillBorder
                                    }
                                ]}
                                onPress={() => setSelectedCategory(cat)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    { color: selectedCategory === cat ? themeColors.pillActiveText : themeColors.pillText }
                                ]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <FlatList
                    data={filteredCourses}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <CourseCard
                            title={item.title}
                            offeredBy={item.offeredBy}
                            tags={item.tags}
                            image={item.image}
                            onPress={() => handleOpenCourse(item.videoId)}
                            isFavorite={isFavorite(item.id)}
                            onToggleFavorite={() => toggleFavorite(item.id)}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subGreeting: {
        fontSize: 14,
        marginTop: 5,
    },
    profileBtn: {
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 20,
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.2)',
    },
    searchIcon: { marginRight: 10 },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    categoryScroll: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    categoryPill: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
    },
    categoryText: {
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
});
