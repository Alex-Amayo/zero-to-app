import React, { useContext } from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { Controller, Control, FieldError, Path, FieldValues } from 'react-hook-form';
import brand from '../brand/brandConfig';
import { ThemeContext } from '../theme/theme';

type FormInputProps<T extends FieldValues> = {
  half?: boolean;
  secure?: boolean;
  placeholder: string;
  rules: object;
  control: Control<T>;
  name: Path<T>;
};

/**
 * FormInput component for rendering a controlled input field with validation
 * and theming support in a React Native application. Integrates with React Hook
 * Form for form state management and uses the current theme for styling.
 *
 * @param {FormInputProps<T>} props - Props for configuring the FormInput component
 * @returns {JSX.Element} The rendered FormInput component
 */

const FormInput = <T extends FieldValues>({
  placeholder,
  half,
  secure,
  rules,
  control,
  name,
}: FormInputProps<T>) => {
  // Initialize theme
  const theme = useContext(ThemeContext);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <>
          <TextInput
            placeholder={placeholder}
            secureTextEntry={secure}
            placeholderTextColor={theme.values.color}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={[
              {
                color: theme.values.color,
                borderColor: error ? 'red' : theme.values.dividerColor,
              },
              half ? styles.halfSizeTextInput : styles.textInput,
            ]}
          />
          {error && <Text style={styles.errorText}>{(error as FieldError).message}</Text>}
        </>
      )}
    />
  );
};

export default FormInput;

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: brand.borderRadius,
  },
  halfSizeTextInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: brand.borderRadius,
    width: '48%',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
