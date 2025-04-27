import React from "react";
import { useController } from "react-hook-form";
import { TextInputProps } from "react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "../ui/form-control";
import { Input, InputField } from "../ui/input";

interface Props extends TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  containerClassName?: string;
}
export default function ({ name, label, containerClassName, ...props }: Props) {
  const {
    field: { onBlur, value, onChange },
    fieldState: { error },
  } = useController({ name });

  return (
    <FormControl isInvalid={error ? true : false}>
      <Input className={containerClassName}>
        <InputField
          {...props}
          placeholder={props.placeholder || label}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value || ""}
        />
      </Input>

      <FormControlError>
        <FormControlErrorText>{error?.message}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
