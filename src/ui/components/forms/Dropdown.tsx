import { memo } from 'react';
import { Controller } from 'react-hook-form';
import { MenuItem, Checkbox, FormControl, InputLabel, Select } from '@mui/material';

const Dropdown =  ({
  name,
  label,
  control,
  rules,
  error,
  options,
  checkbox,
  variant,
  FormControlsx,
  size,
  ...inputProps
}: any) => {

  return (
      <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { ref, ...rest }, fieldState }) => {
            return (
              <FormControl fullWidth={inputProps.fullWidth} variant={variant || 'outlined'} sx={FormControlsx} size={size || 'medium'}>
                <InputLabel id={`label-${name}`}>{label}</InputLabel>
                  <Select
                  labelId={`label-${name}`}
                  label={label}
                  inputRef={ref}
                  error={Boolean(fieldState.invalid)}
                  {...inputProps}
                  {...rest}
                  value={rest.value || (inputProps.multiple ? [] : '')}
                >
                  {options?.map((option: any, index: any) => {
                      return (
                        <MenuItem key={option.value} value={option.value}>
                          {checkbox && <Checkbox checked={(rest.value || []).indexOf(option.value) > -1} />}
                          {option.label}
                        </MenuItem>
                      )
                    }
                  )}
                </Select>
              </FormControl>
            );
          }
        }
      />
  );
};

export default memo(Dropdown);

