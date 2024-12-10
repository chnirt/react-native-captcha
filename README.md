# react-native-captcha

A lightweight React Native library that provides an easy-to-use text-based CAPTCHA component for user verification. This library includes basic functionality for validating user input through a mathematical CAPTCHA, and supports customizable placeholder text, verification buttons, and automatic CAPTCHA reset after a timeout.

## Demo

### **Text-based CAPTCHA**

![TextCaptcha Demo](./assets/text-captcha-demo.gif)


## Installation

To install the library, run:

```sh
npm install @chnirt/react-native-captcha
```

## Usage

Here’s an example of how to use the <code>TextCaptcha</code> component in your React Native app:

```js
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {TextCaptcha} from '@chnirt/react-native-captcha';

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
        'Password must be at least 6 characters.',
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
```

## Features

- **Text-based CAPTCHA**: A simple text-based CAPTCHA for user verification.
- **Verification State**: Automatically disables the input field after successful CAPTCHA verification.
- **Timeout Handling**: Resets the CAPTCHA after a predefined timeout duration.
- **Retry Logic**: Allows users to reload the CAPTCHA if they fail to verify.
- **Customizable Placeholder and Button Text**: Easily customize the placeholder for the input field and button text for verification.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
