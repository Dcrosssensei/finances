// CustomInput.tsx

import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Controller, Control, FieldError } from 'react-hook-form';
import { ColorsApp } from '@/app/constants';
// import { ProductTypes } from '@/app/models';

interface CustomInputProps extends TextInputProps {
  control: Control<any>;
  name: string;
  label: string;
  errors: FieldError | undefined;
}

const CustomInput: React.FC<CustomInputProps> = ({
  control,
  name,
  label,
  errors,
  ...inputProps
}) => {
  try {
    

  return (
    <View style={style.inputContainer}>
      <Text style={style.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[style.textInput, errors ? { borderColor: ColorsApp.red } : null]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...inputProps}
          />
        )}
      />
      {errors && <Text style={style.error}>{errors.message}</Text>}
    </View>
  );
} catch (error) {
    console.log('error', error)
}
};

const style = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: ColorsApp.lightgray,
    borderRadius: 3,
    padding: 10,
    height: 40,
  },
  error: {
    fontWeight: '500',
    color: ColorsApp.red,
    fontSize: 12,
  },
});

export default CustomInput;
