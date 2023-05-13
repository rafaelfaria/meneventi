import { styled } from '@mui/material/styles';
import MuiDialog from '@mui/material/Dialog';
import MuiDialogActions, { DialogActionsProps as MuiDialogActionsProps } from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';


/*********************************************************************************
 * Dialog Styles
 ********************************************************************************/
export const Dialog = styled(MuiDialog)(({ theme }) => ({
  '.MuiDialog-paperFullWidth': {
    position: 'relative',
    border: '2px solid #191e2d',
    borderRadius: '20px',
    [theme.breakpoints.down('md')]: {
      margin: 2,
      width: '100% !important',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    }
  }
}));

export const DialogTitle = styled(MuiDialogTitle)(() => ({
  position: 'relative',
  background: '#11121a',
  color: '#FFF',
  fontSize: 16,
}));

export const DialogContent = styled(MuiDialogContent)(() => ({
  padding: '24px !important',
  background: '#17181f',
  color: '#94a3b8',
}));

type DialogActionsProps = MuiDialogActionsProps & {
  fullWidth?: boolean;
}

export const DialogActions = styled(MuiDialogActions)<DialogActionsProps>(({ theme, fullWidth }) => ({
  marginTop: 30,
 ...(fullWidth ? {
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    columnGap: 8,
    rowGap: 8,
    '> *': {
      flexBasis: '100%'
    }
    } : {
      padding: '24px !important'
    })
}));


