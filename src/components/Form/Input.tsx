import {
  FormControl,
  FormLabel,
  forwardRef,
  Input as ChakraInput,
} from '@chakra-ui/react';
import type { InputProps as ChakraInputProps } from '@chakra-ui/react';

type InputProps = {
  name: string;
  label?: string;
} & ChakraInputProps;

export const Input = forwardRef(({ name, label, ...rest }: InputProps, ref) => (
  <FormControl>
    {Boolean(label) && <FormLabel htmlFor={name}>{label}</FormLabel>}
    <ChakraInput
      name={name}
      id={name}
      focusBorderColor="pink.500"
      bgColor="gray.900"
      variant="filled"
      _hover={{
        bgColor: 'gray.900',
      }}
      size="lg"
      ref={ref}
      {...rest}
    />
  </FormControl>
));
