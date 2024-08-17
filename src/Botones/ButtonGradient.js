import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const handleLogin = async (email, password, navigation) => {
    try {
        const response = await axios.post('http://192.168.1.100:3308/login', {
            email,
            password
        });
        console.log('Respuesta del servidor:', response.data);
        if (response.status === 200) {
            navigation.navigate('Menu'); // Redirige al menú si el inicio de sesión es exitoso
        } else {
            Alert.alert('Error', response.data.error || 'Error desconocido');
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            Alert.alert('Error', error.response.data.error);
        } else {
            Alert.alert('Error', 'Hubo un problema con el servidor');
        }
        console.error('Error al enviar la solicitud:', error.message);
    }
};

export default function ButtonGradient({ email, password }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => handleLogin(email, password, navigation)}
        >
            <LinearGradient
                colors={['#ff0000', '#e60000']} 
                start={{x: 0, y:0}}
                end={{x: 1, y:1}}
                style={styles.button}>
                <Text style={styles.text}> Entrar </Text>
            </LinearGradient> 
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: 200,
        marginTop: 50,
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
