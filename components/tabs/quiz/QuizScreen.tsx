import React from 'react';
// @ts-ignore
const { useState, useEffect, useRef } = React;
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Modal, SafeAreaView, Alert, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useQuiz } from '@/context/QuizContext';
import { QUIZ_DOMAINS, Domain, Topic } from '@/data/quizData';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

type ViewState = 'DOMAINS' | 'TOPICS' | 'QUIZ' | 'RESULT';

export default function QuizScreen() {
    const { user } = useAuth();
    const { isDark } = useTheme();
    const { saveResult, getBestScore, results } = useQuiz();
    const router = useRouter();

    const [viewState, setViewState] = useState<ViewState>('DOMAINS');
    const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

    // Quiz State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>([]); // Selected option index per question
    const [score, setScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false); // Immediate feedback state

    // Tab State (Available vs Completed)
    const [activeTab, setActiveTab] = useState<'Available' | 'Completed'>('Available');

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!user) router.replace('/');
    }, [user]);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [viewState, activeTab]);

    if (!user) return null;

    const themeColors = {
        bg: isDark ? '#000' : '#f5f5f5',
        text: isDark ? '#fff' : '#000',
        subText: isDark ? 'rgba(255,255,255,0.7)' : '#666',
        cardBb: isDark ? undefined : '#fff',
        cardBorder: isDark ? 'rgba(74, 222, 128, 0.2)' : '#eee',
        accent: '#4ade80',
        error: '#ff4444',
    };

    // --- Actions ---

    const handleSelectDomain = (domain: Domain) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSelectedDomain(domain);
        setViewState('TOPICS');
    };

    const handleSelectTopic = (topic: Topic) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSelectedTopic(topic);
        startQuiz(topic);
    };

    const startQuiz = (topic: Topic) => {
        setAnswers(new Array(topic.questions.length).fill(null));
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsAnswered(false);
        setViewState('QUIZ');
    };

    const handleAnswer = (optionIndex: number) => {
        if (isAnswered) return; // Prevent changing answer

        setIsAnswered(true);
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = optionIndex;
        setAnswers(newAnswers);

        // Immediate validation
        if (selectedTopic) {
            const correctIndex = selectedTopic.questions[currentQuestionIndex].correctIndex;
            if (optionIndex === correctIndex) {
                setScore((prev: number) => prev + 1);
            }
        }
    };

    const handleNext = () => {
        if (selectedTopic && currentQuestionIndex < selectedTopic.questions.length - 1) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setIsAnswered(false);
            setCurrentQuestionIndex((prev: number) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (!selectedTopic || !selectedDomain) return;

        // Score is already calculated incrementally
        saveResult({
            domainId: selectedDomain.id,
            topicId: selectedTopic.id,
            score: score,
            total: selectedTopic.questions.length,
            date: new Date().toISOString()
        });

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setViewState('RESULT');
    };

    const handleRetry = () => {
        if (selectedTopic) {
            startQuiz(selectedTopic);
        }
    };

    const handleBackToDomains = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setViewState('DOMAINS');
        setSelectedDomain(null);
        setSelectedTopic(null);
    };

    // --- Renderers ---

    const renderHeader = (title: string, subtitle?: string, backAction?: () => void) => (
        <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {backAction && (
                    <TouchableOpacity onPress={backAction} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={themeColors.text} />
                    </TouchableOpacity>
                )}
                <View>
                    <Text style={[styles.headerTitle, { color: themeColors.text }]}>{title}</Text>
                    {subtitle && <Text style={{ color: themeColors.subText, fontSize: 12 }}>{subtitle}</Text>}
                </View>
            </View>
            <View style={styles.headerIconBg}>
                <Ionicons name="trophy-outline" size={20} color={themeColors.accent} />
            </View>
        </View>
    );

    const renderDomainList = () => (
        <Animated.FlatList
            style={{ opacity: fadeAnim }}
            data={QUIZ_DOMAINS}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    onPress={() => handleSelectDomain(item)}
                    style={{ width: '48%', marginBottom: 15 }}
                >
                    {isDark ? (
                        <BlurView intensity={20} tint="dark" style={styles.domainCard}>
                            <View style={[styles.iconContainer, { backgroundColor: 'rgba(74, 222, 128, 0.1)' }]}>
                                <Ionicons name={item.icon as any} size={32} color={themeColors.accent} />
                            </View>
                            <Text style={[styles.cardTitle, { color: themeColors.text }]}>{item.name}</Text>
                            <Text style={[styles.cardSub, { color: themeColors.subText }]}>{item.topics.length} Concepts</Text>
                        </BlurView>
                    ) : (
                        <View style={[styles.domainCard, { backgroundColor: '#fff', borderColor: '#eee', borderWidth: 1, elevation: 2 }]}>
                            <View style={[styles.iconContainer, { backgroundColor: '#f0fdf4' }]}>
                                <Ionicons name={item.icon as any} size={32} color={themeColors.accent} />
                            </View>
                            <Text style={[styles.cardTitle, { color: '#000' }]}>{item.name}</Text>
                            <Text style={[styles.cardSub, { color: '#666' }]}>{item.topics.length} Concepts</Text>
                        </View>
                    )}
                </TouchableOpacity>
            )}
        />
    );

    const renderTopicList = () => {
        if (!selectedDomain) return null;
        return (
            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                {renderHeader(selectedDomain.name, "Select a concept to master", handleBackToDomains)}
                <FlatList
                    data={selectedDomain.topics}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item, index }) => {
                        const bestScore = getBestScore(item.id);
                        return (
                            <TouchableOpacity onPress={() => handleSelectTopic(item)}>
                                {isDark ? (
                                    <BlurView intensity={20} tint="dark" style={styles.topicRow}>
                                        <View style={styles.topicInfo}>
                                            <View style={[styles.levelBadge, { backgroundColor: item.level === 'Basic' ? '#22c55e' : item.level === 'Intermediate' ? '#eab308' : '#ef4444' }]}>
                                                <Text style={styles.levelText}>{item.level[0]}</Text>
                                            </View>
                                            <View>
                                                <Text style={[styles.rowTitle, { color: themeColors.text }]}>{item.name}</Text>
                                                <Text style={[styles.rowSub, { color: themeColors.subText }]}>{item.questions.length} Questions</Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            {bestScore !== null ? (
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Ionicons name="checkmark-circle" size={16} color={themeColors.accent} style={{ marginRight: 4 }} />
                                                    <Text style={{ color: themeColors.accent, fontWeight: 'bold' }}>{bestScore}/{item.questions.length}</Text>
                                                </View>
                                            ) : (
                                                <Ionicons name="play-circle-outline" size={24} color={themeColors.subText} />
                                            )}
                                        </View>
                                    </BlurView>
                                ) : (
                                    <View style={[styles.topicRow, { backgroundColor: '#fff', borderBottomColor: '#eee', borderBottomWidth: 1, elevation: 1 }]}>
                                        <View style={styles.topicInfo}>
                                            <View style={[styles.levelBadge, { backgroundColor: item.level === 'Basic' ? '#22c55e' : item.level === 'Intermediate' ? '#eab308' : '#ef4444' }]}>
                                                <Text style={styles.levelText}>{item.level[0]}</Text>
                                            </View>
                                            <View>
                                                <Text style={[styles.rowTitle, { color: '#000' }]}>{item.name}</Text>
                                                <Text style={[styles.rowSub, { color: '#666' }]}>{item.questions.length} Questions</Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            {bestScore !== null ? (
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Ionicons name="checkmark-circle" size={16} color={themeColors.accent} style={{ marginRight: 4 }} />
                                                    <Text style={{ color: themeColors.accent, fontWeight: 'bold' }}>{bestScore}/{item.questions.length}</Text>
                                                </View>
                                            ) : (
                                                <Ionicons name="play-circle-outline" size={24} color={'#ccc'} />
                                            )}
                                        </View>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    }}
                />
            </Animated.View>
        );
    };

    const renderQuiz = () => {
        if (!selectedTopic) return null;
        const question = selectedTopic.questions[currentQuestionIndex];
        const isLast = currentQuestionIndex === selectedTopic.questions.length - 1;

        return (
            <View style={{ flex: 1, padding: 20 }}>
                {renderHeader(`${selectedTopic.name}`, `Question ${currentQuestionIndex + 1} of ${selectedTopic.questions.length}`, () => Alert.alert('Quit Quiz?', 'Progress will be lost.', [{ text: 'Cancel' }, { text: 'Quit', onPress: handleBackToDomains }]))}

                {/* Progress Bar */}
                <View style={{ height: 6, backgroundColor: isDark ? '#333' : '#eee', borderRadius: 3, marginVertical: 10, width: '100%' }}>
                    <Animated.View style={{
                        height: '100%',
                        width: `${((currentQuestionIndex + 1) / selectedTopic.questions.length) * 100}%`,
                        backgroundColor: themeColors.accent,
                        borderRadius: 3
                    }} />
                </View>

                {/* Question Card */}
                <View style={[styles.questionContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#fff', borderColor: isDark ? 'rgba(74, 222, 128, 0.2)' : '#ddd', borderWidth: 1 }]}>
                    <Text style={[styles.questionText, { color: themeColors.text }]}>{question.text}</Text>
                </View>

                {/* Options */}
                <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
                    {question.options.map((opt: string, idx: number) => {
                        const isSelected = answers[currentQuestionIndex] === idx;
                        const isCorrect = idx === question.correctIndex;
                        const showValid = isAnswered; // Only show validation colors after answering

                        let bg = isDark ? 'rgba(255,255,255,0.05)' : '#f8f8f8';
                        let border = 'transparent';
                        let textColor = themeColors.text;

                        if (showValid) {
                            if (isCorrect) {
                                bg = 'rgba(74, 222, 128, 0.2)'; // Green tint
                                border = themeColors.accent;
                                textColor = themeColors.accent;
                            } else if (isSelected) {
                                bg = 'rgba(255, 68, 68, 0.2)'; // Red tint
                                border = themeColors.error;
                                textColor = themeColors.error;
                            }
                        } else if (isSelected) {
                            // Shouldn't happen if validation is immediate, but fallback
                            bg = themeColors.accent;
                            textColor = '#000';
                        }

                        return (
                            <TouchableOpacity
                                key={idx}
                                disabled={isAnswered}
                                style={[
                                    styles.optionBtn,
                                    {
                                        backgroundColor: bg,
                                        borderColor: border,
                                    }
                                ]}
                                onPress={() => handleAnswer(idx)}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={[styles.optionText, { color: textColor }]}>{opt}</Text>
                                    {showValid && isCorrect && <Ionicons name="checkmark-circle" size={24} color={themeColors.accent} />}
                                    {showValid && isSelected && !isCorrect && <Ionicons name="close-circle" size={24} color={themeColors.error} />}
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>

                {/* Footer Nav - Next Button appears immediately after answer */}
                <View style={styles.footerNav}>
                    {isAnswered && (
                        <TouchableOpacity
                            onPress={handleNext}
                            style={[styles.primaryBtn, { backgroundColor: themeColors.accent, width: '100%' }]}
                        >
                            <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 18, textAlign: 'center' }}>
                                {isLast ? 'Finish Quiz' : 'Next Question'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    const renderResult = () => {
        if (!selectedTopic) return null;
        const percentage = (score / selectedTopic.questions.length) * 100;
        const passed = percentage >= 60;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                {isDark ? (
                    <BlurView intensity={40} tint="dark" style={styles.resultCard}>
                        <View style={{ marginBottom: 20 }}>
                            <Ionicons name={passed ? "trophy" : "ribbon"} size={80} color={passed ? "#ffd700" : "#a1a1aa"} />
                        </View>
                        <Text style={[styles.resultTitle, { color: themeColors.text }]}>{passed ? 'Expert!' : 'Good Effort'}</Text>
                        <Text style={[styles.resultSubtitle, { color: themeColors.subText }]}>You scored</Text>
                        <Text style={[styles.resultScore, { color: themeColors.accent }]}>{score} / {selectedTopic.questions.length}</Text>

                        <View style={{ width: '100%', marginTop: 30 }}>
                            <TouchableOpacity style={[styles.resultBtn, { backgroundColor: themeColors.accent }]} onPress={handleRetry}>
                                <Text style={{ fontWeight: 'bold', color: '#000' }}>Retry Quiz</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.textBtn]} onPress={handleBackToDomains}>
                                <Text style={{ color: themeColors.text }}>Back to Domains</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                ) : (
                    <View style={[styles.resultCard, { backgroundColor: '#fff', elevation: 10 }]}>
                        <View style={{ marginBottom: 20 }}>
                            <Ionicons name={passed ? "trophy" : "ribbon"} size={80} color={passed ? "#ffd700" : "#a1a1aa"} />
                        </View>
                        <Text style={[styles.resultTitle, { color: '#000' }]}>{passed ? 'Expert!' : 'Good Effort'}</Text>
                        <Text style={[styles.resultSubtitle, { color: '#666' }]}>You scored</Text>
                        <Text style={[styles.resultScore, { color: themeColors.accent }]}>{score} / {selectedTopic.questions.length}</Text>

                        <View style={{ width: '100%', marginTop: 30 }}>
                            <TouchableOpacity style={[styles.resultBtn, { backgroundColor: themeColors.accent }]} onPress={handleRetry}>
                                <Text style={{ fontWeight: 'bold', color: '#000' }}>Retry Quiz</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.textBtn]} onPress={handleBackToDomains}>
                                <Text style={{ color: '#000' }}>Back to Domains</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        );
    }

    const renderCompletedList = () => {
        const completedItems = results.slice().reverse();

        if (completedItems.length === 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="clipboard-outline" size={64} color={themeColors.subText} style={{ opacity: 0.5 }} />
                    <Text style={{ color: themeColors.subText, marginTop: 10 }}>No quizzes completed yet.</Text>
                </View>
            )
        }

        return (
            <FlatList
                data={completedItems}
                keyExtractor={(item, idx) => idx.toString()}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => {
                    const domain = QUIZ_DOMAINS.find(d => d.id === item.domainId);
                    const topic = domain?.topics.find(t => t.id === item.topicId);

                    if (!domain || !topic) return null;

                    return (
                        <View style={[styles.historyRow, isDark ? { backgroundColor: 'rgba(255,255,255,0.05)' } : { backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' }]}>
                            <View style={styles.historyIcon}>
                                <Ionicons name={domain.icon as any} size={20} color={themeColors.text} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Text style={[styles.rowTitle, { color: themeColors.text }]}>{topic.name}</Text>
                                <Text style={[styles.rowSub, { color: themeColors.subText }]}>{domain.name} • {new Date(item.date).toLocaleDateString()}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: item.score >= item.total * 0.6 ? '#4ade80' : '#ff4444' }}>
                                    {Math.round((item.score / item.total) * 100)}%
                                </Text>
                                <TouchableOpacity onPress={() => {
                                    setSelectedDomain(domain);
                                    setSelectedTopic(topic);
                                    startQuiz(topic);
                                }}>
                                    <Text style={{ color: themeColors.accent, fontSize: 12, marginTop: 5 }}>Retry</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: themeColors.bg }}>
            {isDark && (
                <LinearGradient
                    colors={['#000000', '#0a1f1c', '#1a332a']}
                    style={StyleSheet.absoluteFill}
                />
            )}

            <SafeAreaView style={{ flex: 1 }}>
                {viewState === 'QUIZ' || viewState === 'RESULT' ? (
                    // Full screen modes
                    viewState === 'QUIZ' ? renderQuiz() : renderResult()
                ) : (
                    // Tabbed Interface
                    <>
                        {/* Header for Tech Domains */}
                        <View style={{ padding: 20, paddingTop: 10 }}>
                            <Text style={{ color: themeColors.subText, fontSize: 14, fontStyle: 'italic', marginBottom: 5 }}></Text>
                            <Text style={{ color: themeColors.text, fontSize: 28, fontWeight: 'bold' }}>Tech Mastery</Text>
                        </View>

                        <View style={styles.tabContainer}>
                            <TouchableOpacity onPress={() => setActiveTab('Available')} style={[styles.tab, activeTab === 'Available' && { borderBottomColor: themeColors.accent }]}>
                                <Text style={[styles.tabText, { color: activeTab === 'Available' ? themeColors.text : themeColors.subText }]}>Modules</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setActiveTab('Completed')} style={[styles.tab, activeTab === 'Completed' && { borderBottomColor: themeColors.accent }]}>
                                <Text style={[styles.tabText, { color: activeTab === 'Completed' ? themeColors.text : themeColors.subText }]}>History</Text>
                            </TouchableOpacity>
                        </View>

                        {activeTab === 'Available' ? (
                            viewState === 'DOMAINS' ? renderDomainList() : renderTopicList()
                        ) : (
                            renderCompletedList()
                        )}
                    </>
                )}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    backButton: { marginRight: 15 },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },
    headerIconBg: { padding: 8, borderRadius: 12, backgroundColor: 'rgba(74, 222, 128, 0.1)' },

    listContent: { padding: 20, paddingBottom: 100 },
    domainCard: {
        borderRadius: 24,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 160,
    },
    iconContainer: {
        width: 60, height: 60, borderRadius: 30,
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 15
    },
    cardTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
    cardSub: { fontSize: 12, marginTop: 4 },

    topicRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        alignItems: 'center',
    },
    topicInfo: { flexDirection: 'row', alignItems: 'center' },
    levelBadge: {
        width: 32, height: 32, borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
        marginRight: 15
    },
    levelText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    rowTitle: { fontSize: 16, fontWeight: 'bold' },
    rowSub: { fontSize: 12, marginTop: 2 },

    historyRow: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 12
    },
    historyIcon: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center', alignItems: 'center'
    },

    questionContainer: {
        padding: 24,
        borderRadius: 20,
        marginBottom: 20,
        minHeight: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: { fontSize: 20, fontWeight: '600', textAlign: 'center', lineHeight: 30 },

    optionBtn: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 2,
    },
    optionText: { fontSize: 16, fontWeight: '500' },

    footerNav: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    primaryBtn: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 4
    },

    resultCard: {
        width: '100%',
        padding: 40,
        borderRadius: 32,
        alignItems: 'center',
        overflow: 'hidden',
    },
    resultTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
    resultSubtitle: { fontSize: 16 },
    resultScore: { fontSize: 48, fontWeight: 'bold' },
    resultBtn: {
        width: '100%',
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 15,
    },
    textBtn: { padding: 10, alignItems: 'center' },

    tabContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10 },
    tab: { marginRight: 30, paddingBottom: 8, borderBottomWidth: 3, borderBottomColor: 'transparent' },
    tabText: { fontSize: 18, fontWeight: '600' },
});
