import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import type { FieldProps } from '@/components/Field';

const InputField = ({ config, register, errors }: FieldProps) => {
  return (
    <FormControl isInvalid={!!errors?.[config.name]}>
      <FormLabel htmlFor={config.name}>{config.label}</FormLabel>
      <Input
        {...register(config.name, {
          required: config.required && `${config.label}為必填欄位`,
        })}
        id={config.name}
        type={config.type}
        placeholder={`請輸入${config.label}`}
        defaultValue={config.defaultValue}
      />
      {errors[config.name] && (
        <FormErrorMessage>
          {errors[config.name]?.message as string}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputField;
