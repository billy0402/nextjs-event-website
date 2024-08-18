import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';

import type { FieldProps } from '@/components/Field';

const TextareaField = ({ config, register, errors }: FieldProps) => {
  return (
    <FormControl isInvalid={!!errors?.[config.name]}>
      <FormLabel htmlFor={config.name}>{config.label}</FormLabel>
      <Textarea
        {...register(config.name, {
          required: config.required && `${config.label}為必填欄位`,
        })}
        id={config.name}
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

export default TextareaField;
