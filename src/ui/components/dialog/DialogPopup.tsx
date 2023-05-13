import React, { memo, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from './DialogComponents';
import { DialogProps  } from '@mui/material/Dialog';
import { DialogTitleProps } from '@mui/material/DialogTitle';
import { DialogContentProps } from '@mui/material/DialogContent';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = DialogProps & {
  title?: string,
  titleProps?: DialogTitleProps
  contentProps?: DialogContentProps;
  hideClose?: boolean,
  children: React.ReactNode,
  allowClose?: boolean,
  onOpen?: () => void,
  toggle: () => void,
};

const DialogPopup =  (props: Props) => {
  const {
    title,
    open,
    onOpen,
    allowClose = true,
    toggle,
    hideClose,
    children,
    scroll = 'paper',
    contentProps = {},
    titleProps,
    ...moreProps
  } = props;

  useEffect(() => {
    (async () => {
      onOpen && await onOpen();
    })();
  }, []);

  return (
    <Dialog
      fullWidth
      open={open}
      scroll={scroll}
      transitionDuration={400}
      onClose={allowClose ? toggle : undefined}
      {...moreProps}
    >
      {title && (
        <DialogTitle {...titleProps}>
          {title}

          {!hideClose && (
            <IconButton onClick={toggle} sx={{ position: 'absolute', right: 20, top: 12 }}>
              <CloseIcon sx={{ color: '#FFF' }} />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent {...contentProps}>
        {children}
      </DialogContent>

    </Dialog>
  );
};

export default memo(DialogPopup);