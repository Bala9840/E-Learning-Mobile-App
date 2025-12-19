import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateUser } from '@/utils/AuthService';

const { width } = Dimensions.get('window');

export default function ForgotPasswordPage({ onNavigateToLogin }: { onNavigateToLogin: () => void }) {
    const [currentUsername, setCurrentUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleUpdate = async () => {
        if (!currentUsername || !currentPassword || !newUsername || !newPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const result = await updateUser(currentUsername, currentPassword, newUsername, newPassword);
        if (result.success) {
            Alert.alert('Success', 'Credentials updated successfully', [
                { text: 'Login Now', onPress: onNavigateToLogin }
            ]);
        } else {
            Alert.alert('Error', result.message || 'Update failed');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#000000', '#0a1f1c', '#1a332a']}
                style={styles.background}
            />
            {/* Ambient Background Shapes */}
            <View style={[styles.circle, { top: -50, left: 100, width: 200, height: 200, backgroundColor: 'rgba(74, 222, 128, 0.2)' }]} />
            <View style={[styles.circle, { bottom: 50, right: -50, width: 250, height: 250, backgroundColor: 'rgba(16, 185, 129, 0.2)' }]} />

            <SafeAreaView style={styles.content}>
                <BlurView intensity={40} tint="dark" style={styles.glassCard}>

                    <TouchableOpacity onPress={onNavigateToLogin} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#4ade80" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Update Credentials</Text>
                    <Text style={styles.subtitle}>Enter current details to set new ones.</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Current Credentials</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Current Username"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            value={currentUsername}
                            onChangeText={setCurrentUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Current Password"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            secureTextEntry
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />

                        <View style={styles.divider} />

                        <Text style={styles.label}>New Credentials</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="New Username"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            value={newUsername}
                            onChangeText={setNewUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                    </View>

                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                        <Text style={styles.updateButtonText}>Update & Login</Text>
                    </TouchableOpacity>

                </BlurView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    glassCard: {
        width: '100%',
        maxWidth: 400,
        padding: 30,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.2)', // Greenish border
    },
    backButton: {
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        gap: 15,
        marginBottom: 30,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4ade80', // Green accent
        marginTop: 5,
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0.3)', // Darker inputs
        borderRadius: 15,
        height: 50,
        paddingHorizontal: 20,
        borderColor: 'rgba(74, 222, 128, 0.2)',
        borderWidth: 1,
        color: '#fff',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: 10,
    },
    updateButton: {
        backgroundColor: '#4ade80', // Green Button
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4ade80',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    updateButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
