export { useFormField } from './Form';
import {
  Form as FormPrimitive,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
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
