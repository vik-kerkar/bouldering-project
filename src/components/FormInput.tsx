import Input from "./Input";
import {
  Control,
  RegisterOptions,
  FieldValues,
  Controller,
  Path,
} from "react-hook-form";

import { Text, GestureResponderEvent } from "react-native";
import * as Icons from "@/assets/icons";

import { typography } from "../theme";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  label?: string;
  placeholder: string;
  multiline?: boolean;
  numberOfLines?: number;
  icon?: keyof typeof Icons;
  disabled?: boolean;
  onIconPress?: (e: GestureResponderEvent) => void;
}

const FormInput = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  disabled,
  ...rest
}: Props<T>) => {
  return (
    <>
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <Input
              label={label}
              value={value}
              {...rest}
              onChangeText={onChange}
              onBlur={onBlur}
              editable={!disabled}
              hasError={!!error}
            />
            {error && (
              <Text style={{ ...typography.bodyText, color: "red" }}>
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </>
  );
};

export default FormInput;
