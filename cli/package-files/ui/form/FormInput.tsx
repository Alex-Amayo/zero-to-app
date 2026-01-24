import React, { useContext, useMemo } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import { useBrand } from '../../brand';
import { ThemeContext } from '../../theme';

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  placeholder: string;
  name: Path<T>;
  error?: FieldError;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
};

function FormInput<T extends FieldValues>({
  control,
  placeholder,
  name,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
}: FormInputProps<T>) {
  const theme = useContext(ThemeContext);
  const brand = useBrand();
  
  const styles = useMemo(() => StyleSheet.create({
    container: {
      marginBottom: brand.spacing.md + 3,
    },
    input: {
      borderWidth: 1,
      borderRadius: brand.borderRadius,
      padding: brand.spacing.md + 3,
      fontSize: 16,
    },
    errorText: {
      fontSize: 12,
      marginTop: 5, // Keep 5 for error text spacing
    },
  }), [brand]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              {
                borderColor: error ? '#ff4444' : theme.values.borderColor,
                backgroundColor: theme.values.inputBackgroundColor,
                color: theme.values.color,
              },
            ]}
            placeholder={placeholder}
            placeholderTextColor={theme.values.inactiveIconColor}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
          />
        )}
      />
      {error && (
        <Text style={[styles.errorText, { color: '#ff4444' }]}>{error.message}</Text>
      )}
    </View>
  );
}

export { FormInput };
