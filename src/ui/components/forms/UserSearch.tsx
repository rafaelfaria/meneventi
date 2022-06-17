import { memo, useState } from 'react';
import { Avatar, FormControl, ListItemText, Stack, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from './TextField';
import { User } from '../../../lib/amplify/API';

const UserSearch =  ({
  label,
  placeholder,
  options,
  variant = 'filled',
  onChange,
  selectedItems,
  ...inputProps
}: any) => {

  const [ value, setValue ] = useState<string | null>(null);


  return (
    <FormControl sx={{ minWidth: 120 }} fullWidth>
      <Autocomplete
          {...inputProps}
          options={options}
          onChange={(_, item) => { onChange(item); }}
          onClose={() =>  setValue(null)}
          getOptionLabel={(option:User) => `${option.name} (${option.email})`}
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
          noOptionsText="Nenhum resultado encontrado"
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              variant={variant}
            />
          )}
        />
    </FormControl>
  );
};

export default memo(UserSearch);

