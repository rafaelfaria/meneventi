import { Controller } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { FormControl, TextField } from '@mui/material';

const DatePickerComponent =  ({
  name,
  label,
  control,
  rules,
  error,
  size,
  ...inputProps
}: any) => {

  return (
    <FormControl sx={{ minWidth: 120 }} fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { ref, ...rest }, fieldState }) => (
              <DatePicker
              label={label}
              clearable
              renderInput={(params) => <TextField {...params} size={size} variant="filled" /> }
              error={Boolean(fieldState.invalid)}
              helperText={fieldState.error?.message}
              {...inputProps}
              {...rest}
            />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default DatePickerComponent;
