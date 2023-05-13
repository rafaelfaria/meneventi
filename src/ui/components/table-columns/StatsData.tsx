import { Avatar, Box, Stack, Typography } from '@mui/material';
import { StatsProps } from '../../../hooks/useStats';
import { ColumnParams } from '../table/DataList';
import { ProfileProviderInterface } from '../../../context/ProfileProvider';
import { styled } from '@mui/material/styles';

const columnData = (params: ColumnParams & ProfileProviderInterface) => {

  const { openProfile } = params || {};

  return [
    {
      header: {
        id: 'name',
        label: 'Player'
      },
      render: (rowData:StatsProps) => {
        return (
          <ProfileWrapper onClick={() => openProfile(rowData.name, rowData.username)}>
            <Stack flexDirection="row">
                {rowData.hasOwnProperty('photo') ?
                  (<Avatar src={rowData.photo as string} alt={rowData.name} sx={{ width: 25, height: 25, fontSize: 14, mr: 1 }}>{rowData.initials}</Avatar>)
                : null }
                <Typography>{rowData.name}</Typography>
            </Stack>
          </ProfileWrapper>
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

const ProfileWrapper = styled(Box)(() => ({
  cursor: 'pointer'
}));
