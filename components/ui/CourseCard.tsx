import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';

import { Ionicons } from '@expo/vector-icons';

interface CourseCardProps {
    title: string;
    offeredBy: string;
    tags: string[];
    image: string | ImageSourcePropType;
    onPress: () => void;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
}

import { BlurView } from 'expo-blur';
import { useTheme } from '@/context/ThemeContext';

export default function CourseCard({ title, offeredBy, tags, image, onPress, isFavorite = false, onToggleFavorite }: CourseCardProps) {
    const { isDark } = useTheme();

    if (isDark) {
        return (
            <TouchableOpacity onPress={onPress} style={{ marginBottom: 20 }}>
                <BlurView intensity={20} tint="dark" style={darkStyles.card}>
                    <View style={darkStyles.content}>
                        <View style={darkStyles.titleRow}>
                            <Text style={darkStyles.title} numberOfLines={2}>{title}</Text>
                            {onToggleFavorite && (
                                <TouchableOpacity onPress={onToggleFavorite} style={darkStyles.favIcon}>
                                    <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? '#ff4444' : '#4ade80'} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <Text style={darkStyles.offeredBy}>Offered by: <Text style={darkStyles.provider}>{offeredBy}</Text></Text>

                        <View style={darkStyles.tagsRow}>
                            {tags.map((tag, index) => (
                                <View key={index} style={[darkStyles.tag, { backgroundColor: 'rgba(74, 222, 128, 0.15)', borderColor: 'rgba(74, 222, 128, 0.3)', borderWidth: 1 }]}>
                                    <Text style={[darkStyles.tagText, { color: '#4ade80' }]}>{tag}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={darkStyles.button}>
                            <Text style={darkStyles.buttonText}>View Details</Text>
                        </View>
                    </View>

                    <View style={darkStyles.imageContainer}>
                        <Image source={image} style={darkStyles.image} contentFit="cover" />
                    </View>
                </BlurView>
            </TouchableOpacity>
        );
    }

    // Light Theme
    return (
        <TouchableOpacity style={lightStyles.card} onPress={onPress}>
            <View style={lightStyles.content}>
                <View style={lightStyles.titleRow}>
                    <Text style={lightStyles.title} numberOfLines={2}>{title}</Text>
                    {onToggleFavorite && (
                        <TouchableOpacity onPress={onToggleFavorite} style={lightStyles.favIcon}>
                            <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? 'red' : '#333'} />
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={lightStyles.offeredBy}>Offered by: <Text style={lightStyles.provider}>{offeredBy}</Text></Text>

                <View style={lightStyles.tagsRow}>
                    {tags.map((tag, index) => (
                        <View key={index} style={[lightStyles.tag, { backgroundColor: index % 2 === 0 ? '#E8F5E9' : '#EDE7F6' }]}>
                            <Text style={[lightStyles.tagText, { color: index % 2 === 0 ? '#2E7D32' : '#673AB7' }]}>{tag}</Text>
                        </View>
                    ))}
                </View>

                <View style={lightStyles.button}>
                    <Text style={lightStyles.buttonText}>View Details</Text>
                </View>
            </View>

            <View style={lightStyles.imageContainer}>
                <Image source={image} style={lightStyles.image} contentFit="cover" />
            </View>
        </TouchableOpacity>
    );
}

const darkStyles = StyleSheet.create({
    card: {
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.2)',
    },
    content: {
        flex: 1,
        marginRight: 10,
        justifyContent: 'space-between',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
    },
    favIcon: {
        paddingLeft: 5,
    },
    offeredBy: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
    },
    provider: {
        fontWeight: '600',
        color: '#fff',
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        marginBottom: 15,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#4ade80',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    image: {
        width: '100%',
        height: '100%',
    }
});

const lightStyles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        marginBottom: 20,
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    content: {
        flex: 1,
        marginRight: 10,
        justifyContent: 'space-between',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
    },
    favIcon: {
        paddingLeft: 5,
    },
    offeredBy: {
        fontSize: 12,
        color: '#888',
        marginBottom: 10,
    },
    provider: {
        fontWeight: '600',
        color: '#000',
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        marginBottom: 15,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#DFFE51', // Lime/Yellow from image
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
    }
});
