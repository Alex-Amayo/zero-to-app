import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import brand from '../brand/brandConfig';
import { ThemeContext } from '../theme/theme';

type FormInputProps<T extends FieldValues> = {
  control: Control<T>; // Control object from React Hook Form to manage form state
  placeholder: string; // Placeholder text for the input field
  name: Path<T>;
  half?: boolean; // Optional prop to set the input field to half-width of its container
  secure?: boolean; // Optional prop to enable secure text entry (e.g., for passwords)
};

/**
 * FormInput component for rendering a controlled input field with validation
 * and theming support in a React Native application. Integrates with React Hook
 * Form for form state management and uses the current theme for styling.
 */

const FormInput = <T extends FieldValues>({
  placeholder,
  half,
  secure,
  control,
  name,
}: FormInputProps<T>): JSX.Element => {
  // Initialize theme
  const theme = useContext(ThemeContext);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={half ? styles.halfSizeContainer : styles.fullSizeContainer}>
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
              styles.textInput,
            ]}
          />
          {error && <Text style={styles.errorText}>{(error as FieldError).message}</Text>}
        </View>
      )}
    />
  );
};

export default FormInput;

const styles = StyleSheet.create({
  fullSizeContainer: {
    width: '100%',
  },
  halfSizeContainer: {
    width: '48%',
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: brand.borderRadius,
    fontSize: brand.fontSizes.medium,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
