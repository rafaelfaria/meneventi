import { Popover } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import useColorMode from '../../hooks/useColorMode';

type Props = {
  sx: any
  open: boolean
  onClose: any;
  anchorEl: any
  children: React.ReactNode
}

const MenuPopover: React.FC<Props> = ({ children, sx, ...other }) => {
  const { isDark } = useColorMode();
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          overflow: 'inherit',
          boxShadow: isDark ? 'rgb(0 0 0) 0px 0px 2px 0px, rgb(0 0 0 / 16%) 1px 13px 7px -4px' : 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 20px 40px -4px',
          border: '1px solid rgba(145, 158, 171, 0.08)',
          width: 200,
          ...sx
        }
      }}
      {...other}
    >
      <ArrowStyle className="arrow" />

      {children}
    </Popover>
  );
}

export default MenuPopover;


// ----------------------------------------------------------------------

const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: (theme.palette.mode === 'dark' ? '#17181f' : '#FFFFFF'),
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`
  }
}));

// ----------------------------------------------------------------------