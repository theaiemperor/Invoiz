import React, { LegacyRef } from "react";
import { useController } from "react-hook-form";
import { TextInputProps } from "react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "../../ui/form-control";
import { Input, InputField } from "../../ui/input";

interface Props extends TextInputProps {
  name: string;
  label: string;
  reference?: LegacyRef<any>;
  next?: boolean;
  nextFocus?: React.MutableRefObject<any>;
  placeholder?: string;
  containerClassName?: string;
}
export default function ({
  name,
  label,
  next,
  reference,
  nextFocus,
  containerClassName,
  ...props
}: Props) {
  const {
    field: { onBlur, value, onChange },
    fieldState: { error },
  } = useController({ name });

  return (
    <FormControl isInvalid={error ? true : false}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input className={containerClassName}>
        <InputField
          ref={reference}
          {...props}
          {...(next && {
            returnKeyType: "next",
            onSubmitEditing: () => {
              nextFocus?.current?.focus();
            },
          })}
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
