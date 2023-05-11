import { Avatar, Stack, Typography } from '@mui/material';
import { StatsProps } from '../../hooks/useStats';

const columnData = () => {
  return [
    {
      header: {
        id: 'name',
        label: 'Player'
      },
      render: (rowData:StatsProps) => {
        return (
          <Stack flexDirection="row">
            <Avatar src={rowData.photo as string} alt={rowData.name} sx={{ width: 25, height: 25, fontSize: 14, mr: 1 }}>{rowData.initials}</Avatar>
            <Typography>{rowData.name}</Typography>
          </Stack>
        )
      },
    },
    {
      header: {
        id: 'value',
        label: 'Value'

      },
      render: (rowData:StatsProps) => {
        return rowData.value;
      },
    }
  ]
};

export default columnData;