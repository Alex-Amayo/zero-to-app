import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

type FormErrorsProps = {
  error: string | null;
  clearError?: () => void;
};

function FormErrors({ error, clearError }: FormErrorsProps) {
  const [visible, setVisible] = useState(!!error);

  useEffect(() => {
    if (error) {
      setVisible(true);
      if (clearError) {
        const timer = setTimeout(() => {
          clearError();
          setVisible(false);
        }, 5000);
        return () => clearTimeout(timer);
      }
    } else {
      setVisible(false);
    }
  }, [error, clearError]);

  if (!visible || !error) {
    return null;
  }

  return <Text style={styles.errorText}>{error}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
  },
});

export { FormErrors };
