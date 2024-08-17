import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, ScrollView, KeyboardAvoidingView, Platform, Animated, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ButtonGradient from './src/Botones/ButtonGradient'; 

export default function LoginScreen() {
  const plagaAnim = useRef(new Animated.Value(0)).current;
  const tikkiAnim = useRef(new Animated.Value(0)).current;
  const [secureText, setSecureText] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(plagaAnim, {
            toValue: 10,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(plagaAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(tikkiAnim, {
            toValue: -10,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(tikkiAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
  }, [plagaAnim, tikkiAnim]);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? -350 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.image}>
          <View style={styles.containerimagen}>
            <Image source={require('./assets/Imagen2.jpg')} style={styles.image} />
          </View>

          <View style={styles.container}>
            <Text style={styles.titulo}>Hola Cariño</Text>
            <Text style={styles.subTitle}>Bienvenida a tu Aplicación</Text>
            <TextInput 
              placeholder='tuemail@gmail.com'
              style={styles.textInput}
              maxLength={32}
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.passwordContainer}>
              <TextInput 
                placeholder='Contraseña'
                style={[styles.textInput, styles.passwordInput]}
                maxLength={15}
                secureTextEntry={secureText}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                onPress={toggleSecureText} 
                style={styles.eyeIcon}>
                <MaterialIcons
                  name={secureText ? 'visibility-off' : 'visibility'}
                  size={24}
                  color='black'
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.forgotPassword}>Te espera una Sorpresa 🎁</Text>
            <ButtonGradient email={email} password={password} /> 

            <View style={styles.containerfinal}>
              <Animated.Image
                style={[styles.plaga, { transform: [{ translateY: plagaAnim }] }]}
                source={require('./assets/plaga.png')}
              />
              <Animated.Image
                style={[styles.tikki, { transform: [{ translateY: tikkiAnim }] }]}
                source={require('./assets/Tikki.png')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerimagen: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    height: 260,
  },
  containerfinal: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  image: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 45,
    color: '#34434D',
    fontWeight: 'bold',
    marginTop: 50,
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',
  },
  forgotPassword: {
    fontSize: 14,
    color: 'gray',
    marginTop: 20,
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#f1f1f1',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    paddingEnd: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    padding: 8,
    bottom: 5,
  },
  plaga: {
    width: 80,
    height: 130,
    position: 'absolute',
    bottom: -90,
    right: 20,
  },
  tikki: {
    width: 87,
    height: 115,
    position: 'absolute',
    bottom: -90,
    left: 10, 
  }
});

