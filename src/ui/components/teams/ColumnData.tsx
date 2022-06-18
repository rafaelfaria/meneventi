import { Fragment } from 'react';
import { Button, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ColumnParams } from '../table/DataList';
import { Team } from '../../../lib/amplify/API';

const columnData = (params: ColumnParams) => {

  const { navigate, isItemDeleting, handleDeleteItems, isDeleting } = params || {};

  return [
    {
      header: {
        id: 'name',
        label: 'Nome',
      },
      render: (rowData: Team) => {
        return rowData.name;
      },
    },

    {
      header: {
        id: 'actions',
        width: 150,
        label: 'Ações',
      },
      render: (rowData:Team) => {
        return <Fragment>
            <Button onClick={() => navigate(`/teams/${rowData.id}`)} disabled={isDeleting?.length > 0}>Editar</Button>
            {isItemDeleting(rowData.id)
              ? <CircularProgress color="inherit" size={20} />
              : <IconButton onClick={() => handleDeleteItems([rowData.id])} disabled={isDeleting?.length > 0}>
                  <DeleteIcon sx={{color: (theme) => isDeleting?.length > 0 ? '#939aa2' : theme.palette.mode === 'dark' ? '#5d60cc' : '#1976d2'}} fontSize="small"/>
                </IconButton>
            }
        </Fragment>
      },
    },

  ]
};

export default columnData;