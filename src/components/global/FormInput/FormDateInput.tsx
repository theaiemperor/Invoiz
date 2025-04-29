import { CalendarIcon } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { useController } from "react-hook-form";
import { Platform, TextInputProps } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "../../ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "../../ui/input";

interface Props extends TextInputProps {
  name: string;
  label: string;
  nextFocus?: React.MutableRefObject<any>;
  placeholder?: string;
  containerClassName?: string;
}
export default function (props: Props) {
  const { name, label, nextFocus, containerClassName } = props;
  const {
    field: { onBlur, value, onChange },
    fieldState: { error },
  } = useController({ name });
  const f = useController({ name });
  const [show, setShow] = useState(false);
  const webDateInputRef = useRef<HTMLInputElement>(null);

  function handleCancel() {
    onBlur();
    setShow(false);
  }

  function handleSelect(date: Date) {
    setShow(false);
    onChange(date);
    onBlur();
    nextFocus?.current.focus();
  }

  function handleWebPicker() {
    if (Platform.OS === "web") {
      webDateInputRef.current?.click?.();
    } else {
      setShow(true);
    }
  }

  return (
    <FormControl isInvalid={error ? true : false}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input className={containerClassName} isReadOnly>
        <InputField
          {...props}
          value={new Date(value).toDateString() || ""}
          onPress={() => {
            setShow(true);
          }}
        />
        <InputSlot className="pr-2" onPress={handleWebPicker}>
          {Platform.OS === "web" && (
            <input
              ref={webDateInputRef}
              type="date"
              value={new Date(value).toISOString().split("T")[0]}
              onChange={(e) => {
                const selected = new Date(e.target.value);
                if (!isNaN(selected.getTime())) {
                  onChange(selected);
                  nextFocus?.current?.focus?.();
                }
              }}
              onBlur={onBlur}
              className="absolute top-1 w-full h-full opacity-0 cursor-pointer z-10"
            />
          )}
          <InputIcon as={CalendarIcon} />
        </InputSlot>
      </Input>

      <FormControlError>
        <FormControlErrorText>{error?.message}</FormControlErrorText>
      </FormControlError>
      {Platform.OS !== "web" && (
        <DateTimePicker
          date={value}
          isVisible={show}
          onCancel={handleCancel}
          onConfirm={handleSelect}
          onHide={onBlur}
        />
      )}
    </FormControl>
  );
}
