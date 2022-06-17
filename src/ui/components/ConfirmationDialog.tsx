import { Button, Dialog, DialogTitle, DialogActions,  DialogContent, DialogContentText } from '@mui/material';
import { ConfirmOptions } from '../../context/ConfirmProvider';

type Props = {
  open: boolean,
  options: ConfirmOptions,
  onCancel: VoidFunction,
  onConfirm: VoidFunction,
  onClose: VoidFunction
}


const ConfirmationDialog = ({ open, options, onCancel, onConfirm, onClose }: Props) => {
  const {
    title,
    description,
    content,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
    titleProps,
    contentProps,
    allowClose,
  } = options;

  return (
    <Dialog fullWidth {...dialogProps} open={open} onClose={allowClose ? onClose : undefined}>
      {title && (
        <DialogTitle {...titleProps}>{title}</DialogTitle>
      )}
      {content ? (
        <DialogContent {...contentProps}>
          {content}
        </DialogContent>
      ) : (
        description && (
          <DialogContent {...contentProps}>
            <DialogContentText component="div">{description}</DialogContentText>
          </DialogContent>
        )
      )}
      <DialogActions>
        <Button {...cancellationButtonProps} onClick={onCancel}>
          {cancellationText}
        </Button>
        <Button color="primary" {...confirmationButtonProps} onClick={onConfirm}>
          {confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;