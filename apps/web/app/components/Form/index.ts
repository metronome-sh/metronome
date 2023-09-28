export { useFormField } from './Form';
import {
  Form as FormPrimitive,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './Form';

const subcomponents = {
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
  Field: FormField,
} as const;

export const Form: typeof FormPrimitive & typeof subcomponents = Object.assign(
  FormPrimitive,
  {
    Item: FormItem,
    Label: FormLabel,
    Control: FormControl,
    Description: FormDescription,
    Message: FormMessage,
    Field: FormField,
  },
);
