import { Fragment } from 'react';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { User } from '../../../../lib/amplify/API';
import { ColumnParams } from '../../table/DataList';

const columnData = (params: ColumnParams) => {

  const { navigate } = params || {};

  return [
    {
      header: {
        id: 'name',
        label: 'Nome',
        disablePadding: false
      },
      render: (rowData:User) => {
        return (
          <Stack direction="row" alignItems="center">
            <Avatar src={rowData.photo as string} alt={rowData.name} sx={{ mr: 1, width: 30, height: 30, fontSize: 12 }}>{rowData.initials}</Avatar>
            <Typography>{rowData.name}</Typography>
          </Stack>
        );
      },
    },
    {
      header: {
        id: 'email',
        label: 'Email',
      },
      render: (rowData:User) => {
        return rowData.email;
      },
    },
    {
      header: {
        id: 'actions',
        width: 150,
        align: 'center',
        label: 'Ações',
      },
      render: (rowData:User) => {
        return <Fragment>
            <Button onClick={() => navigate(`/admin/users/${rowData.username}`)} color="primary">Edit</Button>
        </Fragment>
      },
    },

  ]
};

export default columnData;