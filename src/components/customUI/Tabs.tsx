import { useCallback, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { HStack } from "../ui/hstack";

interface Props {
  options: { [key: string]: () => void };
  initialValue?: string;
}

export default function ({ options = {}, initialValue }: Props) {
  const [selected, setSelected] = useState(initialValue);

  const handlePress = useCallback(
    (key: string) => {
      setSelected(key);
      options[key]?.();
    },
    [options]
  );

  const optionsArray = Object.keys(options);

  if (optionsArray.length < 2) {
    return;
  }

  return (
    <HStack className="justify-evenly rounded-full border overflow-hidden border-background-800">
      {optionsArray.map((option, index) => {
        const isSelected = option === selected;
        const isLast = index === +optionsArray.length - 1;

        return (
          <TouchableOpacity
            key={option}
            accessibilityRole="button"
            onPress={() => {
              handlePress(option);
            }}
            className={
              `flex-1 p-2 text-center font-bold ` +
              `${isSelected ? "bg-background-800 text-background-50" : ""} ` +
              `${!isLast ? "border-r border-background-900 " : ""}`
            }
          >
            <Text
              className={`text-center font-bold ${isSelected ? "text-background-100 " : "dark:text-background-800"}`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
}
