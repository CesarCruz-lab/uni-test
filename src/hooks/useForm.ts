import { useCallback, useRef, useState } from 'react';
import { getUniqueItemArray } from 'utils/arrayHandler';

export type Nullable<T> = T | null | undefined;

export type Partial<T> = {
  [P in keyof T]?: Nullable<T[P]>;
};

export type PerKey<T> = keyof T;

export type TUN<T> = Nullable<Partial<T>> | undefined | null;

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export type FormSettings<T> = {
  defaultValues?: TUN<T>;
};

export type Data<T> = {
  data: TUN<T>;
  render: PerKey<T>[];
};

export type SubmitHandler<T = any> = (data: T) => void;

export type OnSubmit = (ev: any) => void;

export type HandleSubmit<T> = (onSubmit: SubmitHandler<T>) => OnSubmit;

export default function CreateForm<FormValues = any, CustomInput = any>(formSettings?: FormSettings<FormValues>) {
  const [forceRenderBySlugs, setForceRenderBySlugs] = useState<(string | number | symbol)[]>([]);

  const formValues = useRef<Data<FormValues>>({
    data: formSettings?.defaultValues,
    render: [],
  });

  const render = useCallback(
    (slugs: (string | number | symbol)[]) => {
      setForceRenderBySlugs((state) => {
        const newState = state.concat(slugs);
        const uniqueItemArray = getUniqueItemArray(newState);

        return uniqueItemArray;
      });
    },
    [setForceRenderBySlugs]
  );

  const watch = useCallback(
    (names: (keyof FormValues)[]) => {
      const newNamesRef = formValues.current.render.concat(names);
      const uniqueItemArray = getUniqueItemArray(newNamesRef);

      formValues.current.render = uniqueItemArray;

      const form = formValues.current.data;
      const dataAsArray = names.map((name) => (form ? form[name] : null));

      return dataAsArray;
    },
    [forceRenderBySlugs, formValues] // eslint-disable-line
  );

  const update = useCallback(
    (data: Partial<FormValues>) => {
      const custom = formValues.current.data || {};

      formValues.current.data = {
        ...custom,
        ...data,
      };
    },
    [formValues]
  );

  const reset = useCallback(
    (values: Partial<FormValues>) => {
      const names = Object.keys(values);
      const newData = {};

      if (!values) {
        formValues.current.data = null;
        render(names);
        return;
      }

      names.forEach((name) => {
        const element = document.querySelector(`input[name=${name}]`) as HTMLInputElement;

        if (!element) return;

        element.value = values[name];
        element.defaultValue = values[name];

        newData[name] = values[name];
      });

      formValues.current.data = { ...formValues.current.data, ...newData };
    },
    [formValues] // eslint-disable-line
  );

  const field = useCallback(
    function <T = any>(name: PerKey<FormValues>, inputProps?: InputProps & (T | CustomInput)) {
      const { defaultValues } = formSettings || {};
      const defaultValue: any = defaultValues ? defaultValues[name] : null;
      const inputDefaultValue = inputProps?.defaultValue ? inputProps.defaultValue : defaultValue;

      const attributes: InputProps = {
        ...inputProps,
        name: name as string,
        defaultValue: inputDefaultValue,

        onChange: (ev) => {
          const { value } = ev.target;
          update({ [name]: value } as any);

          if (formValues.current.render.includes(name)) {
            render([name]);
          }
        },
      };

      return attributes;
    },
    [update, formSettings, formValues] // eslint-disable-line
  );

  const handleSubmit: HandleSubmit<FormValues> = useCallback(
    (onSubmit) => {
      return (ev) => {
        ev.preventDefault();
        onSubmit(formValues.current.data as any);
      };
    },
    [formValues.current] // eslint-disable-line
  );

  return { field, reset, watch, handleSubmit };
}

export function useForm<Values = any, CustomInput = any>(formSettings?: FormSettings<Values>) {
  const form = CreateForm<Values, CustomInput>(formSettings);
  return form;
}
