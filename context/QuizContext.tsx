import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface QuizResult {
    topicId: string;
    domainId: string;
    score: number;
    total: number;
    date: string;
}

interface QuizContextType {
    results: QuizResult[];
    saveResult: (result: QuizResult) => void;
    getBestScore: (topicId: string) => number | null;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [results, setResults] = useState<QuizResult[]>([]);

    // Mock persistence: In real app, load from AsyncStorage or API
    useEffect(() => {
        // Load results...
    }, []);

    const saveResult = (newResult: QuizResult) => {
        setResults(prev => [...prev, newResult]);
    };

    const getBestScore = (topicId: string) => {
        const topicResults = results.filter(r => r.topicId === topicId);
        if (topicResults.length === 0) return null;
        return Math.max(...topicResults.map(r => r.score));
    };

    return (
        <QuizContext.Provider value={{ results, saveResult, getBestScore }}>
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz() {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
}
