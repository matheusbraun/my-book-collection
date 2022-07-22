import {
  FormControl,
  FormLabel,
  forwardRef,
  Input as ChakraInput,
  Text,
} from '@chakra-ui/react';
import type { InputProps as ChakraInputProps } from '@chakra-ui/react';

type InputProps = {
  name: string;
  label?: string;
  errorMessage?: string | null;
} & ChakraInputProps;

export const Input = forwardRef(
  ({ name, label, errorMessage, ...rest }: InputProps, ref) => (
    <>
      <FormControl>
        {Boolean(label) && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <ChakraInput
          name={name}
          id={name}
          focusBorderColor={Boolean(errorMessage) ? 'red.500' : 'pink.500'}
          bgColor="gray.900"
          variant="filled"
          _hover={{
            bgColor: 'gray.900',
          }}
          size="lg"
          ref={ref}
          {...rest}
        />
        {Boolean(errorMessage) && (
          <Text fontSize="sm" mt="1.5" color="red.500">
            {errorMessage}
          </Text>
        )}
      </FormControl>
    </>
  )
);
