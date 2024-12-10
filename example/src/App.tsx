import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { TextCaptcha } from '@chnirt/react-native-captcha';

export default function App() {
  const captchaRef = useRef<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (inputEmail: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const validatePassword = (inputPassword: string): boolean => {
    return inputPassword.length >= 6;
  };

  const handleRegister = () => {
    // Validate email and password
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 6 characters.'
      );
      return;
    }

    const success = captchaRef.current.verifyCaptcha();
    if (success) {
      Alert.alert('Success', 'CAPTCHA passed!');
      // Token is valid, you can continue with registration.
    } else {
      Alert.alert('Failure', 'CAPTCHA validation failed.');
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextCaptcha
        placeholder="Please enter the CAPTCHA"
        verifyText="Check CAPTCHA"
        showVerifyButton={true}
        ref={captchaRef}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#539AE6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
