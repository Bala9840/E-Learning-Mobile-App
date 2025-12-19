import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { sendMessageToGemini } from '@/utils/GeminiService';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: number;
}

export default function ChatScreen() {
    const { isDark } = useTheme();

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hello! I am your AI Assistant. How can I help you learn today?', sender: 'ai', timestamp: Date.now() }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const flatListRef = useRef<FlatList>(null);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), text: inputText, sender: 'user', timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);

        // Scroll to bottom
        setTimeout(() => flatListRef.current?.scrollToEnd(), 100);

        try {
            // Pass empty string as key to use the hardcoded default in Service
            const replyText = await sendMessageToGemini(userMsg.text, '');
            const aiMsg: Message = { id: (Date.now() + 1).toString(), text: replyText, sender: 'ai', timestamp: Date.now() };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error: any) {
            const errMsg = error.message || 'Failed to get response';
            Alert.alert('AI Error', errMsg);
            const errorMsg: Message = { id: (Date.now() + 1).toString(), text: `Error: ${errMsg}.`, sender: 'ai', timestamp: Date.now() };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
            setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
        }
    };

    const themeColors = {
        bg: isDark ? '#000' : '#f5f5f5',
        text: isDark ? '#fff' : '#000',
        inputBg: isDark ? 'rgba(255,255,255,0.1)' : '#fff',
        userBubble: '#4ade80',
        userText: '#000',
        aiBubble: isDark ? 'rgba(255,255,255,0.1)' : '#fff',
        aiText: isDark ? '#fff' : '#000',
        border: isDark ? 'rgba(74, 222, 128, 0.2)' : '#ddd',
    };

    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[styles.msgContainer, isUser ? styles.msgRight : styles.msgLeft]}>
                {!isUser && <View style={styles.botIcon}><Ionicons name="sparkles" size={16} color="#4ade80" /></View>}
                <View style={[
                    styles.bubble,
                    isUser ? { backgroundColor: themeColors.userBubble } : { backgroundColor: themeColors.aiBubble, borderWidth: isDark ? 0 : 1, borderColor: '#eee' }
                ]}>
                    <Text style={{ color: isUser ? themeColors.userText : themeColors.aiText, fontSize: 16, lineHeight: 22 }}>
                        {item.text}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }} edges={['top']}>
            {isDark && (
                <LinearGradient
                    colors={['#000000', '#0a1f1c', '#000000']}
                    style={StyleSheet.absoluteFill}
                />
            )}

            {/* Header */}
            <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
                <Text style={[styles.headerTitle, { color: themeColors.text }]}>Ask AI</Text>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                {/* Chat List */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.listContent}
                />

                {/* Input Area */}
                <View style={[styles.inputContainer, { borderTopColor: themeColors.border, backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : '#f9f9f9' }]}>
                    <TextInput
                        style={[styles.input, { backgroundColor: themeColors.inputBg, color: themeColors.text }]}
                        placeholder="Ask something..."
                        placeholderTextColor={isDark ? '#888' : '#999'}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendBtn, { backgroundColor: isLoading || !inputText.trim() ? '#555' : '#4ade80' }]}
                        onPress={handleSend}
                        disabled={isLoading || !inputText.trim()}
                    >
                        {isLoading ? <ActivityIndicator color="#000" /> : <Ionicons name="send" size={20} color="#000" />}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
    },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },
    listContent: { padding: 20, paddingBottom: 20 },
    msgContainer: { flexDirection: 'row', marginBottom: 15, width: '100%' },
    msgLeft: { justifyContent: 'flex-start', alignItems: 'flex-end' },
    msgRight: { justifyContent: 'flex-end' },
    bubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 15,
        borderTopLeftRadius: 15,
    },
    botIcon: { marginRight: 10, marginBottom: 5 },

    inputContainer: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        maxHeight: 100,
        marginRight: 10,
    },
    sendBtn: {
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
