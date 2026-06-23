import Input from "./Input";
import {
  Control,
  RegisterOptions,
  FieldValues,
  Controller,
  Path,
} from "react-hook-form";

import { Text } from "react-native";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  label: string;
  placeholder: string;
  multiline?: boolean;
  numberOfLines?: number;
  value?: string;
}

const FormInput = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  placeholder,
  multiline,
  numberOfLines,
  value,
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
              placeholder={placeholder}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline={multiline}
              numberOfLines={numberOfLines}
              value={value}
            />
            {error && <Text style={{ color: "red" }}>{error.message}</Text>}
          </>
        )}
      />
    </>
  );
};

export default FormInput;
