import * as React from "react";
import {
  Control,
  FieldValues,
  useForm,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormFieldType, FormType } from "@/services/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateYupSchema } from "@/validation";

interface DynamicFormProps {
  formSchema: FormType;
}

interface DynamicFieldProps {
  field: FormFieldType;
  control: Control;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  parentPath: string[];
}

function DynamicForm({ formSchema }: DynamicFormProps) {
  const validationSchema = React.useMemo(
    () => generateYupSchema(formSchema.fields),
    [formSchema]
  );
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: unknown) => {
    console.log("Form submitted with: ", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        {formSchema.fields.map((field) => (
          <DynamicField
            key={field.id}
            field={field}
            control={form.control}
            watch={form.watch}
            setValue={form.setValue}
            parentPath={[]}
          />
        ))}
        <Button className="w-full my-4" type="submit">
          {"Submit"}
        </Button>
      </form>
    </Form>
  );
}

function DynamicField({
  field,
  control,
  watch,
  setValue,
  parentPath,
}: DynamicFieldProps) {
  const id = [...parentPath, field.id].join(".");
  const shouldDisplay = field.visibility
    ? watch([...parentPath, field.visibility.dependsOn].join(".")) ===
      field.visibility.value
    : true;

  if (!shouldDisplay) return null;

  switch (field.type) {
    case "text":
      return (
        <FormField
          control={control}
          name={id}
          render={({ field: f }) => (
            <FormItem className="mb-4">
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input
                  {...f}
                  type={"text"}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  required={field.required}
                  pattern={field.validation?.pattern}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "number":
      return (
        <FormField
          control={control}
          name={id}
          render={({ field: f }) => (
            <FormItem className="mb-4">
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input
                  {...f}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  type={"number"}
                  required={field.required}
                  min={field.validation?.min}
                  max={field.validation?.min}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "date":
      return (
        <FormField
          control={control}
          name={id}
          render={({ field: f }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{field.label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !f.value && "text-muted-foreground"
                      )}
                    >
                      {f.value ? (
                        format(f.value, "PPP")
                      ) : (
                        <span>{"Pick a date"}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    captionLayout="dropdown"
                    mode="single"
                    selected={f.value}
                    onSelect={f.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    // TODO dynamic
    case "select":
      return (
        <FormField
          control={control}
          name={id}
          render={({ field: f }) => (
            <FormItem className="mb-4">
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Select defaultValue={f.value} onValueChange={f.onChange}>
                  <FormControl className="w-[240px]">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "radio":
      return (
        <FormField
          control={control}
          name={id}
          render={({ field: f }) => (
            <FormItem className="mb-4">
              <FormLabel>{field.label}</FormLabel>
              <FormMessage />
              <RadioGroup onValueChange={f.onChange} defaultValue={f.value}>
                {field.options?.map((opt) => (
                  <FormItem
                    className="flex items-center space-x-1 space-y-0"
                    key={opt}
                  >
                    <FormControl>
                      <RadioGroupItem value={opt} />
                    </FormControl>
                    <FormLabel className="font-normal">{opt}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />
      );
    case "group":
      return (
        <Card>
          <CardHeader>
            <CardTitle>{field.label}</CardTitle>
          </CardHeader>
          <CardContent>
            {field.fields?.map((subField) => (
              <DynamicField
                parentPath={[...parentPath, id]}
                key={subField.id}
                field={subField}
                control={control}
                watch={watch}
                setValue={setValue}
              />
            ))}
          </CardContent>
        </Card>
      );
    default:
      return null;
  }
}

export default DynamicForm;
