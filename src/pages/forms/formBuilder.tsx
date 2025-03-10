import * as React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
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
import { appFetch } from "@/utils/fetch";
import Result from "@/pages/forms/result";

interface DynamicFormProps {
  formSchema: FormType;
}

interface DynamicFieldProps {
  field: FormFieldType;
  form: UseFormReturn;
  parentPath?: string[];
}

function DynamicForm({ formSchema }: DynamicFormProps) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({});
  const validationSchema = React.useMemo(
    () => generateYupSchema(formSchema.fields),
    [formSchema]
  );
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: Record<string, unknown>) => {
    setOpen(true);
    setValues(data);
  };

  return (
    <React.Fragment>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          {formSchema.fields.map((field) => (
            <DynamicField key={field.id} field={field} form={form} />
          ))}
          <Button className="w-full my-4" type="submit">
            {"Submit"}
          </Button>
        </form>
      </Form>
      <Result data={values} open={open} onOpenChange={setOpen} />
    </React.Fragment>
  );
}

function DynamicField({ field, form, parentPath = [] }: DynamicFieldProps) {
  //================================
  // Init
  //================================
  const oldDependOnValue = React.useRef<unknown>(null);
  const id = [...parentPath, field.id].join(".");
  const shouldDisplay = field.visibility
    ? form.watch([...parentPath, field.visibility.dependsOn].join(".")) ===
      field.visibility.value
    : true;
  const [options, setOptions] = React.useState<string[]>(() => {
    if (field.type === "select" && field.options) {
      return field.options;
    }
    return [];
  });
  const [disable, setDisable] = React.useState(false);

  React.useEffect(() => {
    if (field.type === "select" && field.dynamicOptions) {
      const { dependsOn, endpoint, method } = field.dynamicOptions;
      const dependOnValue = form.watch([...parentPath, dependsOn].join("."));

      // Only fetch if the prerequisite value has changed and is not empty
      if (dependOnValue && oldDependOnValue.current !== dependOnValue) {
        oldDependOnValue.current = dependOnValue;
        setDisable(true);
        appFetch<string[]>(`${endpoint}?${dependsOn}=${dependOnValue}`, {
          method,
        })
          .then((data) => {
            setOptions(data);
          })
          .catch(() => {
            setOptions([]);
          })
          .finally(() => {
            setDisable(false);
          });
      } else {
        // Clear options if the prerequisite value is empty
        setOptions([]);
        setDisable(true);
      }
    }
  }, [field, parentPath, form]);

  //================================
  // Render
  //================================
  if (!shouldDisplay) return null;

  switch (field.type) {
    case "text":
      return (
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
    case "select": {
      return (
        <FormField
          control={form.control}
          name={id}
          render={({ field: f }) => (
            <FormItem className="mb-4">
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Select
                  disabled={disable}
                  defaultValue={f.value}
                  onValueChange={f.onChange}
                >
                  <FormControl className="w-[240px]">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options.map((o) => (
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
    }
    case "radio":
      return (
        <FormField
          control={form.control}
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
                form={form}
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
