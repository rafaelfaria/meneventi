import { memo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from './TextField';

const AutoComplete =  ({
  name,
  label,
  control,
  rules,
  error,
  searchResults,
  isSearching,
  onTextChange,
  variant = 'filled',
  ...inputProps
}: any) => {
  const [ openSearch, setOpenSearch ] = useState<boolean>(false);

  return (
      <FormControl sx={{ minWidth: 120 }} fullWidth>
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value }, fieldState }) => {
               return <Autocomplete
                  {...inputProps}
                  open={openSearch}
                  onOpen={() => setOpenSearch(true)}
                  onClose={() => setOpenSearch(false)}
                  onChange={(event, item) => onChange(item)}
                  value={value}
                  options={searchResults}
                  loading={isSearching}
                  filterOptions={(x) => x}
                  renderInput={(params) => {
                    return <TextField
                      {...params}
                      label={label}
                      variant={variant}
                      debounceTime={300}
                      onChange={onTextChange}
                      error={Boolean(fieldState.invalid)}
                      helperText={fieldState.error?.message}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isSearching ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        )
                      }}
                    />

                  }}

                />
            }
          }
        />

      </FormControl>
  );
};

export default memo(AutoComplete);

