import {
  Control,
  Controller,
  ErrorOption,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { TextInputProps } from "react-native";
import { Box } from "../ui/box";
import { Input, InputField } from "../ui/input";
import { Text } from "../ui/text";

interface Props<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  title?: boolean | string;
  errors?: ErrorOption;
  isNumber?: boolean;
  isEmail?: boolean;
  hidePlaceHolder?: boolean;
  validation?:
    | Omit<
        RegisterOptions<T, Path<T>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
}

export default function FormInput<T extends FieldValues>(props: Props<T>) {
  const {
    control,
    name,
    title,
    errors,
    hidePlaceHolder,
    validation,
    isEmail,
    isNumber,
    ...rest
  } = props;
  return (
    <Box>
      {title && (
        <Text className="text-pretty text-sm pl-0.5">
          {typeof title === "string" ? title : name}
        </Text>
      )}
      <Controller
        control={control}
        name={name}
        rules={{
          ...validation,
          ...(isNumber && {
            pattern: {
              value: /^[0-9]+$/,
              message: "Only numeric values are allowed",
            },
          }),
          ...(isEmail && {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          }),
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Box>
            <Input>
              <InputField
                {...{
                  ...rest,
                  placeholder: hidePlaceHolder
                    ? undefined
                    : rest.placeholder || name,
                }}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            </Input>
          </Box>
        )}
      />
      {errors && (
        <Box>
          <Text className="text-error-700 text-xs mt-0.5">
            {errors.type === "required" && `${name} is required`}
            {errors.type === "maxLength" && `${name} must be shorter`}
            {errors.type === "minLength" && `${name} must be longer`}
            {errors.type === "max" && "Enter some small value"}
            {errors.type === "min" && "Enter some big value"}
            {errors.message}
          </Text>
        </Box>
      )}
    </Box>
  );
}
