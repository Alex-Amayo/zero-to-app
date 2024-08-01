import React, { useContext } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import brand from '../brand/brandConfig';
import { ThemeContext } from '../theme/theme';
import { TextInputChangeEventData } from 'react-native';

type FormInputProps = {
  placeholder: string;
  //Half prop added to conditionally set width
  half?: boolean;
  //Secure prop added to conditionally set secureTextEntry
  secure?: boolean;
  onChange: (event: { nativeEvent: TextInputChangeEventData }) => void;
};

const FormInput = ({ placeholder, half, secure, onChange }: FormInputProps) => {
  const theme = useContext(ThemeContext);
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secure}
      placeholderTextColor={theme.values.color}
      onChange={onChange}
      style={{
        //Inline styles used for theme access in state
        color: theme.values.color,
        //Border color is overridden with theme text color
        borderColor: theme.values.dividerColor,
        //Conditionally applying styles based on half prop
        ...(half ? styles.halfSizeTextInput : styles.textInput),
      }}
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
});
