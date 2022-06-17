import { forwardRef, memo, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import debounce from 'lodash.debounce';
import TextField from '@mui/material/TextField';

const DebouncedTextField =  forwardRef(({
  name,
  label,
  onChange,
  debounceTime = 0,
  error,
  rules,
  control,
  ...inputProps
}: any, ref) => {

  const debouncedOnChange = useMemo(() => {

    if (!onChange) return;
    return debounce(
          (e: React.ChangeEvent<HTMLInputElement>) => onChange(e),
          debounceTime
        )
  }, [debounceTime, onChange]);

  if (control) {
    return <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => {
            return <TextField
                      label={label}
                      error={Boolean(fieldState.invalid)}
                      helperText={fieldState.error?.message}
                      {...inputProps}
                      {...field}
                    />
          }}
        />
  } else {
    return (
        <TextField
          label={label}
          name={name}
          id={name}
          ref={ref}
          rules={rules}
          onChange={debouncedOnChange}
          {...inputProps}
          />
    );
  }
});

export default memo(DebouncedTextField);
