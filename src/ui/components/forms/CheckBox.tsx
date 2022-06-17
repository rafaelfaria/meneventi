import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, Checkbox } from '@mui/material';

export default forwardRef(({
  name,
  label,
  rules,
  control,
  error,
  ...inputProps
}: any, ref) => {
  if (control) {
    return <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { ref, ...props }, fieldState }) => {
            let sx= {};
            if (Boolean(fieldState.invalid) || error) {
              sx = { color: 'red' }
            }

            const checkBoxInput = <Checkbox {...props } checked={props.value === true ? true : false} />

             return (
              <FormControl sx={sx}>
                {label ?
                    <FormControlLabel control={checkBoxInput} label={label}/>
                    :
                    checkBoxInput
                  }
                </FormControl>
            )
          }}
        />
  } else {
    const checkBoxInput = <Checkbox name={name} ref={ref} {...inputProps} checked={inputProps.checked ? true : false} />;
    return (
      <FormControl>
        {label ?
          <FormControlLabel control={checkBoxInput} label={label}/>
          :
          checkBoxInput
        }
      </FormControl>
    );
  }
});
