import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginUser } from '@/utils/AuthService';

const { width, height } = Dimensions.get('window');

export default function LoginPage({
    onNavigateToRegister,
    onLoginSuccess,
    onNavigateToForgotPassword
}: {
    onNavigateToRegister?: () => void;
    onLoginSuccess?: (user: any) => void;
    onNavigateToForgotPassword?: () => void;
}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter username and password');
            return;
        }

        const result = await loginUser(username, password);
        if (result.success) {
            onLoginSuccess?.(result.user);
        } else {
            Alert.alert('Error', result.message || 'Login failed');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#000000', '#0a1f1c', '#1a332a']}
                style={styles.background}
            />

            {/* Ambient Background Shapes for Depth */}
            <View style={[styles.circle, { top: -50, right: -50, width: 200, height: 200, backgroundColor: 'rgba(74, 222, 128, 0.3)' }]} />
            <View style={[styles.circle, { bottom: 50, left: -50, width: 250, height: 250, backgroundColor: 'rgba(16, 185, 129, 0.3)' }]} />

            <SafeAreaView style={styles.content}>
                <BlurView intensity={40} tint="dark" style={styles.glassCard}>

                    <View style={styles.iconContainer}>
                        <Ionicons name="code-slash" size={50} color="#4ade80" />
                    </View>

                    <Text style={styles.title}>Welcome Back!</Text>
                    <Text style={styles.subtitle}>Login to continue your journey</Text>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="person-outline" size={20} color="#4ade80" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Ionicons name="lock-closed-outline" size={20} color="#4ade80" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <TouchableOpacity onPress={onNavigateToForgotPassword} style={styles.forgotPasswordContainer}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={onNavigateToRegister}>
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

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
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.2)', // Greenish border
    },
    iconContainer: {
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 15,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.3)',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
        gap: 20,
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 15,
        height: 55,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.2)',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginTop: -5,
    },
    forgotPasswordText: {
        color: '#4ade80',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    loginButton: {
        width: '100%',
        height: 55,
        backgroundColor: '#4ade80', // Green Button
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#4ade80',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    loginButtonText: {
        color: '#000', // Black text on Green button
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        gap: 5,
    },
    footerText: {
        color: 'rgba(255,255,255,0.7)',
    },
    signUpText: {
        color: '#4ade80',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
