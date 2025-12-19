import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { registerForPushNotificationsAsync, scheduleNotification } from '@/utils/NotificationService';

const INITIAL_TASKS = [
    { id: '1', title: 'Complete HTML Module 1', type: 'Daily Learning', completed: false },
    { id: '2', title: 'Practice CSS Flexbox', type: 'Practice', completed: false },
    { id: '3', title: 'JavaScript Quiz 1', type: 'Quiz', completed: true },
    { id: '4', title: 'Watch React Hooks Video', type: 'Daily Learning', completed: false },
];

import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/context/ThemeContext';

export default function NotesScreen() {
    const { user } = useAuth();
    const router = useRouter();
    const { isDark } = useTheme();
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    const [filter, setFilter] = useState<'Pending' | 'Completed'>('Pending');
    const [modalVisible, setModalVisible] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [reminderDate, setReminderDate] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const handleAddTask = () => {
        if (newTaskTitle.trim() === '') return;

        if (reminderDate) {
            scheduleNotification("Reminder", newTaskTitle, reminderDate);
        }

        const newTask = {
            id: Date.now().toString(),
            title: newTaskTitle,
            type: reminderDate ? `Reminder: ${reminderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Personal Goal',
            completed: false
        };

        setTasks([newTask, ...tasks]);
        setNewTaskTitle('');
        setReminderDate(null);
        setModalVisible(false);
        Keyboard.dismiss();
    };

    const filteredTasks = tasks.filter(t => filter === 'Completed' ? t.completed : !t.completed);

    useEffect(() => {
        if (!user) {
            router.replace('/');
        }
    }, [user]);

    if (!user) return null;

    const themeColors = {
        bg: isDark ? '#000' : '#f5f5f5',
        text: isDark ? '#fff' : '#000',
        tabText: isDark ? 'rgba(255,255,255,0.5)' : '#888',
        tabActive: isDark ? '#4ade80' : '#2196F3',
        cardBg: isDark ? undefined : '#fff',
        cardBorder: isDark ? 'rgba(74, 222, 128, 0.2)' : '#eee',
        iconOn: isDark ? '#4ade80' : '#4CAF50',
        iconOff: isDark ? 'rgba(255,255,255,0.5)' : '#888',
        fab: isDark ? '#4ade80' : '#2196F3',
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
            {isDark && (
                <>
                    <LinearGradient
                        colors={['#000000', '#0a1f1c', '#1a332a']}
                        style={styles.background}
                    />
                    <View style={[styles.circle, { top: -50, left: 100, width: 200, height: 200, backgroundColor: 'rgba(74, 222, 128, 0.2)' }]} />
                </>
            )}

            <SafeAreaView style={{ flex: 1 }}>
                <Text style={[styles.header, { color: themeColors.text }]}>My Notes</Text>

                {/* Filter Tabs */}
                <View style={styles.tabs}>
                    <TouchableOpacity
                        style={[styles.tab, filter === 'Pending' && { borderBottomColor: themeColors.tabActive, borderBottomWidth: filter === 'Pending' ? 2 : 0 }]}
                        onPress={() => setFilter('Pending')}
                    >
                        <Text style={[styles.tabText, { color: filter === 'Pending' ? themeColors.tabActive : themeColors.tabText, fontWeight: filter === 'Pending' ? 'bold' : 'normal' }]}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, filter === 'Completed' && { borderBottomColor: themeColors.tabActive, borderBottomWidth: filter === 'Completed' ? 2 : 0 }]}
                        onPress={() => setFilter('Completed')}
                    >
                        <Text style={[styles.tabText, { color: filter === 'Completed' ? themeColors.tabActive : themeColors.tabText, fontWeight: filter === 'Completed' ? 'bold' : 'normal' }]}>Completed</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={filteredTasks}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        isDark ? (
                            <BlurView intensity={20} tint="dark" style={styles.taskCard}>
                                <TouchableOpacity
                                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                                    onPress={() => toggleTask(item.id)}
                                >
                                    <View style={styles.taskIcon}>
                                        <Ionicons
                                            name={item.completed ? "checkbox" : "square-outline"}
                                            size={24}
                                            color={item.completed ? themeColors.iconOn : themeColors.iconOff}
                                        />
                                    </View>
                                    <View style={styles.taskContent}>
                                        <Text style={[styles.taskTitle, { color: themeColors.text }, item.completed && styles.completedText]}>{item.title}</Text>
                                        <Text style={styles.taskType}>{item.type}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteTask(item.id)} style={{ padding: 10 }}>
                                    <Ionicons name="trash-outline" size={22} color="#FF5252" />
                                </TouchableOpacity>
                            </BlurView>
                        ) : (
                            <View style={[styles.taskCard, { backgroundColor: '#fff', elevation: 2 }]}>
                                <TouchableOpacity
                                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                                    onPress={() => toggleTask(item.id)}
                                >
                                    <View style={styles.taskIcon}>
                                        <Ionicons
                                            name={item.completed ? "checkbox" : "square-outline"}
                                            size={24}
                                            color={item.completed ? themeColors.iconOn : themeColors.iconOff}
                                        />
                                    </View>
                                    <View style={styles.taskContent}>
                                        <Text style={[styles.taskTitle, { color: '#333' }, item.completed && { textDecorationLine: 'line-through', color: '#aaa' }]}>{item.title}</Text>
                                        <Text style={[styles.taskType, { color: '#666' }]}>{item.type}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteTask(item.id)} style={{ padding: 10 }}>
                                    <Ionicons name="trash-outline" size={22} color="#FF5252" />
                                </TouchableOpacity>
                            </View>
                        )
                    )}
                    contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                />

                {/* Floating Action Button */}
                <TouchableOpacity
                    style={[styles.fab, { backgroundColor: themeColors.fab, shadowColor: themeColors.fab }]}
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons name="add" size={30} color={isDark ? "#000" : "#fff"} />
                </TouchableOpacity>

                {/* Add Task Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.modalCenteredView}
                    >
                        {isDark ? (
                            <BlurView intensity={80} tint="dark" style={styles.modalView}>
                                <Text style={styles.modalTitle}>New Task</Text>

                                <TextInput
                                    style={styles.input}
                                    placeholder="What do you need to do?"
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                    value={newTaskTitle}
                                    onChangeText={setNewTaskTitle}
                                    autoFocus={true}
                                />

                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10 }}
                                    onPress={() => {
                                        if (Platform.OS === 'android') {
                                            DateTimePickerAndroid.open({
                                                value: reminderDate || new Date(),
                                                onChange: (event, selectedDate) => {
                                                    if (event.type === 'set' && selectedDate) {
                                                        // Once date is picked, show time picker
                                                        DateTimePickerAndroid.open({
                                                            value: selectedDate,
                                                            onChange: (event2, selectedTime) => {
                                                                if (event2.type === 'set' && selectedTime) {
                                                                    // Combine date from selectedDate and time from selectedTime
                                                                    const combined = new Date(selectedDate);
                                                                    combined.setHours(selectedTime.getHours());
                                                                    combined.setMinutes(selectedTime.getMinutes());
                                                                    setReminderDate(combined);
                                                                }
                                                            },
                                                            mode: 'time',
                                                        });
                                                    }
                                                },
                                                mode: 'date',
                                            });
                                        } else {
                                            setShowPicker(true);
                                        }
                                    }}
                                >
                                    <Ionicons name="alarm-outline" size={24} color={isDark ? "#fff" : "#000"} style={{ marginRight: 10 }} />
                                    <Text style={{ color: isDark ? "#fff" : "#000" }}>
                                        {reminderDate ? `Reminder: ${reminderDate.toLocaleString()}` : "Set Reminder"}
                                    </Text>
                                </TouchableOpacity>

                                {showPicker && Platform.OS === 'ios' && (
                                    <DateTimePicker
                                        value={reminderDate || new Date()}
                                        mode="datetime"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            setShowPicker(false);
                                            if (selectedDate) setReminderDate(selectedDate);
                                        }}
                                    />
                                )}

                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonCancel]}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonAdd]}
                                        onPress={handleAddTask}
                                    >
                                        <Text style={[styles.textStyle, { color: '#000' }]}>Add Task</Text>
                                    </TouchableOpacity>
                                </View>
                            </BlurView>
                        ) : (
                            <View style={[styles.modalView, { backgroundColor: '#fff' }]}>
                                <Text style={[styles.modalTitle, { color: '#000' }]}>New Task</Text>

                                <TextInput
                                    style={[styles.input, { backgroundColor: '#f9f9f9', color: '#000', borderColor: '#ddd' }]}
                                    placeholder="What do you need to do?"
                                    placeholderTextColor="#888"
                                    value={newTaskTitle}
                                    onChangeText={setNewTaskTitle}
                                    autoFocus={true}
                                />

                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}
                                    onPress={() => setShowPicker(true)}
                                >
                                    <Ionicons name="alarm-outline" size={24} color="#000" style={{ marginRight: 10 }} />
                                    <Text style={{ color: "#000" }}>
                                        {reminderDate ? `Reminder: ${reminderDate.toLocaleString()}` : "Set Reminder"}
                                    </Text>
                                </TouchableOpacity>

                                {showPicker && (
                                    <DateTimePicker
                                        value={reminderDate || new Date()}
                                        mode="datetime"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            setShowPicker(false);
                                            if (selectedDate) setReminderDate(selectedDate);
                                        }}
                                    />
                                )}

                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonCancel]}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, { backgroundColor: '#2196F3' }]}
                                        onPress={handleAddTask}
                                    >
                                        <Text style={styles.textStyle}>Add Task</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </KeyboardAvoidingView>
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
    header: { fontSize: 24, fontWeight: 'bold', margin: 20 },
    tabs: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10 },
    tab: { marginRight: 15, paddingBottom: 5 },
    tabText: { fontSize: 16 },
    taskCard: {
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.2)', // Overridden for light mode via inline styles
    },
    taskIcon: { marginRight: 15 },
    taskContent: { flex: 1 },
    taskTitle: { fontSize: 16, fontWeight: '500' },
    taskType: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
    completedText: { textDecorationLine: 'line-through', color: 'rgba(255,255,255,0.3)' },

    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        borderRadius: 30,
        elevation: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
    },

    modalCenteredView: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.2)', // Overridden for light
    },
    modalTitle: { marginBottom: 15, textAlign: "center", fontSize: 18, fontWeight: 'bold' },
    input: {
        height: 50,
        borderColor: 'rgba(74, 222, 128, 0.3)',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
    button: { borderRadius: 20, padding: 10, elevation: 2, width: '45%' },
    buttonCancel: { backgroundColor: "#FF5252" },
    buttonAdd: { backgroundColor: "#4ade80" },
    textStyle: { color: "white", fontWeight: "bold", textAlign: "center" }
});
