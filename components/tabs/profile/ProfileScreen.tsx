import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { getAllUsers } from '@/utils/AuthService';
import { Alert } from 'react-native';

export default function ProfileScreen() {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const router = useRouter();
    const [aboutVisible, setAboutVisible] = useState(false);

    const handleLogout = () => {
        router.replace('/');
        logout();
    };

    useEffect(() => {
        if (!user) {
            router.replace('/');
        }
    }, [user]);

    if (!user) return null;

    const themeColors = {
        text: isDark ? '#fff' : '#000',
        subText: isDark ? 'rgba(255,255,255,0.6)' : '#666',
        cardBg: isDark ? undefined : '#fff', // Undefined for blur, white for light
        borderColor: isDark ? 'rgba(74, 222, 128, 0.2)' : '#e5e5e5',
        icon: isDark ? '#4ade80' : '#4ade80', // Keep green accent
        sectionTitle: isDark ? '#fff' : '#333',
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#f5f5f5' }]}>
            {isDark && (
                <>
                    <LinearGradient
                        colors={['#000000', '#0a1f1c', '#1a332a']}
                        style={styles.background}
                    />
                    {/* Ambient Background Shapes */}
                    <View style={[styles.circle, { bottom: 100, left: -50, width: 250, height: 250, backgroundColor: 'rgba(74, 222, 128, 0.15)' }]} />
                </>
            )}

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.avatar}>
                            <Ionicons name="person" size={40} color={isDark ? "#000" : "#fff"} />
                        </View>
                        <Text style={[styles.username, { color: themeColors.text }]}>{user.username}</Text>
                        <Text style={[styles.email, { color: themeColors.subText }]}>{user.email || 'No email'}</Text>
                    </View>

                    {/* Stats */}


                    {/* Settings Items */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: themeColors.sectionTitle }]}>Settings</Text>

                        <TouchableOpacity style={[styles.row, { borderBottomColor: themeColors.borderColor }]} onPress={toggleTheme}>
                            <View style={styles.rowLeft}>
                                <Ionicons name={isDark ? "moon" : "moon-outline"} size={22} color={themeColors.icon} />
                                <Text style={[styles.rowLabel, { color: themeColors.text }]}>Dark Mode</Text>
                            </View>
                            <Switch
                                value={isDark}
                                onValueChange={toggleTheme}
                                trackColor={{ false: "#767577", true: "rgba(74, 222, 128, 0.5)" }}
                                thumbColor={isDark ? "#4ade80" : "#f4f3f4"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.row, { borderBottomColor: themeColors.borderColor }]} onPress={() => setAboutVisible(true)}>
                            <View style={styles.rowLeft}>
                                <Ionicons name="information-circle-outline" size={22} color={themeColors.icon} />
                                <Text style={[styles.rowLabel, { color: themeColors.text }]}>About</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={isDark ? "rgba(255,255,255,0.5)" : "#ccc"} />
                        </TouchableOpacity>
                    </View>

                    {/* Logout */}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.debugButton} onPress={async () => {
                        const users = await getAllUsers();
                        Alert.alert('Stored Credentials', JSON.stringify(users, null, 2));
                        console.log('CREDENTIALS:', users);
                    }}>
                        <Text style={styles.debugText}>[Debug] Show Stored Users</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* About Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={aboutVisible}
                    onRequestClose={() => setAboutVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        {isDark ? (
                            <BlurView intensity={80} tint="dark" style={styles.modalContent}>
                                <Text style={styles.modalTitle}>About App</Text>
                                <Text style={styles.modalDescription}>
                                    Welcome to the Course Learning App.
                                    {'\n\n'}
                                    Version: 1.0.0
                                    {'\n'}
                                    Special "Greeny-Black" Edition.
                                    {'\n\n'}
                                    © 2024 All rights reserved.
                                </Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setAboutVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </BlurView>
                        ) : (
                            <View style={[styles.modalContent, { backgroundColor: '#fff', borderColor: '#eee', borderWidth: 1 }]}>
                                <Text style={[styles.modalTitle, { color: '#000' }]}>About App</Text>
                                <Text style={[styles.modalDescription, { color: '#666' }]}>
                                    Welcome to the Course Learning App.
                                    {'\n\n'}
                                    Version: 1.0.0
                                    {'\n'}
                                    Course Learning App.
                                    {'\n\n'}
                                    © 2024 All rights reserved.
                                </Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setAboutVisible(false)}
                                >
                                    <Text style={[styles.closeButtonText, { color: '#000' }]}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </Modal>
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
    header: {
        alignItems: 'center',
        padding: 30,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#4ade80',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#4ade80',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    username: { fontSize: 22, fontWeight: 'bold' },
    email: { fontSize: 14, marginTop: 5 },

    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        marginBottom: 30,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.2)',
    },
    statItem: { alignItems: 'center', flex: 1 },
    statValue: { fontSize: 18, fontWeight: 'bold', color: '#4ade80' },
    statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
    statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },

    section: { paddingHorizontal: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    rowLabel: { fontSize: 16 },

    logoutButton: {
        margin: 20,
        marginTop: 40,
        backgroundColor: 'rgba(255, 68, 68, 0.1)',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 68, 68, 0.3)',
    },
    logoutText: { color: '#ff4444', fontWeight: 'bold', fontSize: 16 },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        padding: 25,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.3)',
        overflow: 'hidden',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fff',
    },
    modalDescription: {
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
        color: 'rgba(255,255,255,0.8)',
    },
    closeButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#4ade80',
        borderRadius: 25,
    },
    closeButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    debugButton: {
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    debugText: {
        color: 'gray',
        fontSize: 12
    }
});
