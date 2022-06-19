import { memo, useEffect, useState } from 'react';
import { Avatar, Box, CircularProgress, FormControl, ListItemText, Stack, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from './TextField';
import { User } from '../../../lib/amplify/API';

const UserSearch =  ({
  label,
  placeholder,
  options,
  variant = 'filled',
  onChange,
  selectedValue,
  selectedItems,
  isLoading,
  InputProps,
  ...inputProps
}: any) => {

  const [ value, setValue ] = useState<string | null | undefined>(null);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue])

  return (
    <FormControl sx={{ minWidth: 120, flexGrow: 1 }}>
      <Autocomplete
          {...inputProps}
          options={options}
          onChange={(_, item) => { onChange(item); }}
          onClose={() =>  setValue(null)}
          getOptionLabel={(option:User) => `${option.name || ''}`}
          isOptionEqualToValue={(option: User, value: User) => {
            return (option.username === value.username)
          }}
          renderOption={(props: any, option: User) => {
            return (
              <ListItemText
                {...props}
                key={option.username}
                // secondary={option.address}
                // secondaryTypographyProps={ { textAlign: "left", fontSize: 10 } }
                sx={{ flexDirection: "column", alignItems: "normal !important" }}
              >
                <Stack flexDirection="row" columnGap={1}>
                  <Avatar src={option.photo as string} alt={option.name} sx={{ width: 24, height: 24, fontSize: 12 }}>{option.initials}</Avatar>
                  <Typography>{option.name} ({option.email})</Typography>
                </Stack>
              </ListItemText>
            );
          }}
          autoHighlight
          blurOnSelect
          popupIcon={null}
          value={value}
          filterOptions={(options: User[]) => (options || []).filter((option: User) => !(selectedItems || []).map((item: Partial<User>) => item.username).includes(option.username))}
          noOptionsText="No match"
          renderInput={(params) => (
            <Box position="relative">
              {isLoading ?  <CircularProgress sx={{ position: 'absolute', zIndex: 1, top: 15, right: 10 }} size={20} /> : null }
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                variant={variant}
                disabled={isLoading}
                {...InputProps}
              />
            </Box>
          )}
        />
    </FormControl>
  );
};

export default memo(UserSearch);

