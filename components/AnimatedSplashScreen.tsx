import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

interface AnimatedSplashScreenProps {
    children: React.ReactNode;
}

export function AnimatedSplashScreen({ children }: AnimatedSplashScreenProps) {
    const [isAppReady, setAppReady] = useState(false);
    const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
    const fadeAnim = useState(new Animated.Value(1))[0];
    const scaleAnim = useState(new Animated.Value(1))[0];

    useEffect(() => {
        async function prepare() {
            try {
                // Artificially delay for 2 seconds to show off the splash (or load custom fonts/assets here)
                // In a real app, you might load fonts or auth state here
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppReady(true);
            }
        }

        prepare();
    }, []);

    useEffect(() => {
        if (isAppReady) {
            const hideSplash = async () => {
                try {
                    await SplashScreen.hideAsync();
                    // Start a smooth fade out and scale up animation
                    Animated.parallel([
                        Animated.timing(fadeAnim, {
                            toValue: 0,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                        Animated.timing(scaleAnim, {
                            toValue: 1.5, // Slight zoom effect
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                    ]).start(() => setAnimationComplete(true));
                } catch (e) {
                    console.warn(e);
                }
            };
            hideSplash();
        }
    }, [isAppReady, fadeAnim, scaleAnim]);

    if (!isAppReady) {
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            {isAppReady && children}
            {!isSplashAnimationComplete && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: '#ffffff', // Match app.json splash backgroundColor
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: fadeAnim,
                            zIndex: 99999, // Ensure it's on top
                        },
                    ]}
                >
                    <Animated.Image
                        source={require('@/assets/images/splash-icon.png')}
                        style={{
                            width: 200, // Match app.json splash imageWidth
                            height: 200,
                            resizeMode: 'contain',
                            transform: [{ scale: scaleAnim }],
                        }}
                        fadeDuration={0}
                    />
                </Animated.View>
            )}
        </View>
    );
}
