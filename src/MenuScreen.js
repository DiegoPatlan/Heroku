import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MenuScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menú</Text>
            {/* Agrega aquí el contenido de tu menú */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});

