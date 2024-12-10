import {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const generateCaptcha = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array(6)
    .fill('')
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join('');
};

interface TextCaptchaProps {
  placeholder?: string;
  verifyText?: string;
  showVerifyButton?: boolean;
  captchaTimeoutDuration?: number;
  reloadIcon?: React.ReactNode;
}

export interface TextCaptchaRef {
  verifyCaptcha: () => boolean;
  resetCaptcha: () => void;
}

const TextCaptcha = forwardRef<TextCaptchaRef, TextCaptchaProps>(
  (
    {
      placeholder = 'Enter CAPTCHA',
      verifyText = 'VERIFY',
      showVerifyButton = true,
      captchaTimeoutDuration = 120000,
      reloadIcon = null,
    },
    ref
  ) => {
    const [captcha, setCaptcha] = useState<string>(generateCaptcha());
    const [userInput, setUserInput] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isVerified, setIsVerified] = useState<boolean>(false);

    const disabled = useMemo(
      () => userInput.length === 0 || isVerified,
      [userInput, isVerified]
    );

    const resetCaptcha = () => {
      setCaptcha(generateCaptcha());
      setUserInput('');
      setErrorMessage('');
      setIsVerified(false);
    };

    const verifyCaptcha = (): boolean => {
      if (userInput === captcha) {
        setErrorMessage('');
        setIsVerified(true);
        return true;
      } else {
        setErrorMessage('Incorrect CAPTCHA. Please try again.');
        setIsVerified(false);
        return false;
      }
    };

    useImperativeHandle(ref, () => ({
      verifyCaptcha,
      resetCaptcha,
    }));

    useEffect(() => {
      const timeout = setTimeout(() => {
        resetCaptcha();
      }, captchaTimeoutDuration);

      return () => clearTimeout(timeout);
    }, [captcha, captchaTimeoutDuration]);

    return (
      <View style={styles.container}>
        <View style={styles.captchaContainer}>
          <View style={styles.captchaTextContainer}>
            <Text style={styles.captchaText}>{captcha}</Text>
          </View>
          <TouchableOpacity style={styles.reloadButton} onPress={resetCaptcha}>
            {reloadIcon ? (
              <View style={styles.reloadIconContainer}>{reloadIcon}</View> // Render component tùy chỉnh
            ) : (
              <Image
                style={styles.reloadImage}
                source={require('./assets/iconmonstr-reload-lined-240.png')}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              errorMessage && styles.inputError,
              isVerified && styles.inputDisabled,
            ]}
            placeholder={placeholder}
            value={userInput}
            onChangeText={setUserInput}
            editable={!isVerified} // Disable input khi đã xác thực
          />
          {showVerifyButton && (
            <TouchableOpacity
              style={[
                styles.verifyButton,
                disabled
                  ? styles.verifyButtonDisabled
                  : styles.verifyButtonActive,
              ]}
              onPress={verifyCaptcha}
              disabled={disabled}
            >
              <Text style={styles.verifyText}>{verifyText}</Text>
            </TouchableOpacity>
          )}
        </View>

        {isVerified && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>
              CAPTCHA verified successfully!
            </Text>
          </View>
        )}

        {errorMessage && !isVerified ? (
          <View style={styles.errorMessage}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 4,
    gap: 8,
    padding: 8,
    minWidth: 260,
  },
  captchaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  captchaTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    flex: 1,
    padding: 8,
  },
  captchaText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    color: '#333',
  },
  reloadButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  reloadIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  reloadImage: {
    width: 16,
    height: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 4,
    flex: 1,
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  inputDisabled: {
    backgroundColor: '#E0E0E0',
  },
  verifyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  verifyButtonActive: {
    backgroundColor: '#539AE6',
  },
  verifyButtonDisabled: {
    backgroundColor: '#D3D3D3',
  },
  verifyText: {
    color: '#ffffff',
  },
  successMessage: {
    marginTop: 4,
  },
  successText: {
    color: 'green',
    fontSize: 14,
  },
  errorMessage: {
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});

export default TextCaptcha;
