import { useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { TextCaptcha } from 'react-native-captcha';

export default function App() {
  const captchaRef = useRef<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
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
      Alert.alert('Success', `CAPTCHA passed!`);
      // Token hợp lệ, bạn có thể tiếp tục xử lý đăng ký.
    } else {
      Alert.alert('Failure', 'CAPTCHA validation failed.');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>React Native CAPTCHA Example</Text>

        <Text style={styles.title}>Register</Text>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
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
