export { useFormField } from './Form';
import {
  Form as FormProvider,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSection,
} from './Form';

export const Form: {
  Provider: typeof FormProvider;
  Item: typeof FormItem;
  Label: typeof FormLabel;
  Control: typeof FormControl;
  Description: typeof FormDescription;
  Message: typeof FormMessage;
  Field: typeof FormField;
  Section: typeof FormSection;
} = {
  Provider: FormProvider,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
  Field: FormField,
  Section: FormSection,
};
