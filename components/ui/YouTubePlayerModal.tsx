import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface YouTubePlayerModalProps {
    visible: boolean;
    videoId: string;
    onClose: () => void;
}

export default function YouTubePlayerModal({ visible, videoId, onClose }: YouTubePlayerModalProps) {
    const [playing, setPlaying] = useState(true);

    const onStateChange = useCallback((state: string) => {
        if (state === 'ended') {
            setPlaying(false);
            // Optional: Auto close on end?
            // onClose(); 
        }
    }, []);

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>

                    <View style={styles.header}>
                        <Text style={styles.headerText}>Now Playing</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close-circle" size={32} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.playerWrapper}>
                        <YoutubePlayer
                            height={220}
                            play={playing}
                            videoId={videoId}
                            onChangeState={onStateChange}
                        />
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    playerWrapper: {
        width: '100%',
        backgroundColor: '#000',
        borderRadius: 10,
        overflow: 'hidden',
    }
});
