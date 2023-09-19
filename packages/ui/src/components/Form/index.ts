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

export const Form = Object.assign(FormPrimitive, {
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
  Field: FormField,
});
