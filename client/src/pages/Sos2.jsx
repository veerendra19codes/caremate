import React, { useEffect, useState } from 'react';

const SOSNotification = () => {
    const [voiceStatus, setVoiceStatus] = useState('Voice command: inactive');

    const confirmSos = () => {
        const confirmed = window.confirm("Are you sure you want to send an SOS?");
        if (confirmed) {
            sendSos();
        }
    };

    const sendSos = async () => {
        try {
            const response = await fetch('/send-sos', { method: 'POST' });
            const data = await response.json();
            if (data.success) {
                alert('SOS SMS sent successfully!');
            } else {
                alert('Failed to send SOS SMS.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending SOS SMS.');
        }
    };

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setVoiceStatus('Voice command: listening...');
            };

            recognition.onend = () => {
                setVoiceStatus('Voice command: inactive');
            };

            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                if (command === 'send sos') {
                    confirmSos();
                } else {
                    alert(Command "${command}" not recognized.Please say "Send SOS".);
                }
            };

            setVoiceStatus('Voice command: active (say "Send SOS")');
            recognition.start();
        } else {
            setVoiceStatus('Voice command not supported in this browser.');
        }
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.instructions}>
                Press the button or say "Send SOS" to notify your emergency contact.
            </div>
            <button style={styles.sosButton} onClick={confirmSos}>
                SEND SOS
            </button>
            <div style={styles.sosDescription}>
                This will notify your emergency contacts immediately.
            </div>
            <div style={styles.voiceCommand}>{voiceStatus}</div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
        padding: '20px',
        maxWidth: '400px',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
    },
    sosButton: {
        fontSize: '32px',
        padding: '20px 60px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '20px',
    },
    sosDescription: {
        fontSize: '18px',
        color: '#555',
    },
    instructions: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    voiceCommand: {
        fontSize: '18px',
        color: 'green',
        marginTop: '10px',
    },
};

export default SOSNotification;