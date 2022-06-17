import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Material
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';

// icons
import NestedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MoreHoriz from '@mui/icons-material/MoreHoriz';

// Config
import AppConfig, { menuItems } from '../../../config';

// components
import LogoSmall from '../../../assets/logo-chip.png'

type Props = {
  isDrawerOpen: boolean;
  handleOnCloseDrawer: () => void;
  matchUpMd: boolean;
}

type OpenedStateType = {
  [key: string]: string;
}

type MenuClickType = {
  id: string;
  isNested: boolean;
}

export default function Sidebar({ isDrawerOpen, handleOnCloseDrawer, matchUpMd }: Props) {

  const [ openedState, setOpenItem ] = useState<OpenedStateType>({});
  const navigate = useNavigate();

  const handleMenuItemClick = ({ id, isNested }: MenuClickType) => {
    if (isNested) {
      setOpenItem((prevState:any) => ({...prevState, [id]: !prevState[id]}));
    } else {
      (!matchUpMd && handleOnCloseDrawer) && handleOnCloseDrawer();
    }
  }

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={handleOnCloseDrawer}
      variant={matchUpMd ? 'permanent' : 'temporary'}
      anchor="left"
      ModalProps={{ keepMounted: true }}
    >
      <Branding onClick={() => navigate('/')}>
        <img src={LogoSmall} width={40} alt="Meneventi" />
        <SiteName isDrawerOpen={isDrawerOpen} className="branding-name">Meneventi</SiteName>
      </Branding>
      <MenuList>
        <List>
          {menuItems.map((item: any) => <RenderMenuItem key={`${item.type}-${item.label}-${item.link}`} item={item} handleMenuItemClick={handleMenuItemClick} openedState={openedState} isDrawerOpen={isDrawerOpen} />)}
        </List>
      </MenuList>
    </Drawer>
  );
}

/*********************************************************************************
 * Use the logic to make a decision which type of menu will be rendering, either the title or the link
 * but also, check if there is any nested menu to be rendered as well
 ********************************************************************************/
type RenderMenuItemProps = {
  item: any;
  handleMenuItemClick: (props: MenuClickType) => void;
  isDrawerOpen: boolean;
  openedState: OpenedStateType;
}

const RenderMenuItem = ({ item, handleMenuItemClick, openedState, isDrawerOpen }: RenderMenuItemProps) => {
  const itemId = `${item.type}-${item.label}-${item.link}`;
  const location = useLocation();
  const isSelected = location.pathname === item.link;

  switch(item.type) {
    case 'menuTitle':
      return (
        <>
          <Typography variant="menuTitle" className="item-title">{item.label}</Typography>
          <ListItem className="item-title-less"><ListItemIcon><MoreHoriz /></ListItemIcon></ListItem>
        </>
      );

    case 'menu':
      let isNestedOpen = Boolean(openedState[itemId]);
      if (item.children) {
        const selectedChild = item.children.find((childrenItem:any) => location.pathname === childrenItem.link );
        if (selectedChild) {
          isNestedOpen = true;
        }
      }

      return (
        <>
          <MenuItem
            id={itemId}
            item={item}
            isSelected={isSelected}
            handleMenuItemClick={handleMenuItemClick}
            isNested={item.children}
            isNestedOpen={isNestedOpen}
            sx={{
              ...(isNestedOpen && {
                background: 'rgba(0,0,0,.035)'
              })
            }}
            />

          {item.children &&
            <Collapse in={isDrawerOpen && isNestedOpen}
            sx={{ background: 'rgba(0,0,0,.035)'}}>
              <List>
                {item.children.map((item: any) => <RenderMenuItem key={`${item.type}-${item.label}-${item.link}`} item={item} handleMenuItemClick={handleMenuItemClick} openedState={openedState} isDrawerOpen={isDrawerOpen} />)}
              </List>
            </Collapse>
          }
        </>
      );
  }

  return null;
}

/*********************************************************************************
 * Render a single menu item
 ********************************************************************************/
type MenuItemProps = {
  id: string;
  item: any;
  handleMenuItemClick: (props: MenuClickType) => void;
  isNested: boolean;
  isNestedOpen: boolean;
  isSelected: boolean;
  sx: any
}

const MenuItem = ({ id, item, isSelected, handleMenuItemClick, isNested, isNestedOpen, ...props }: MenuItemProps) => {
  const navigate = useNavigate();

  const handleOnClickItem = () => {
    handleMenuItemClick({ id, isNested });

    if (item.link) {
      navigate(item.link);
    }
  }

  const rotateExpand = isNestedOpen ? "rotate(0)" : "rotate(-90deg)";

  return (
    <ListItemButtonWrapper
        key={id}
        selected={isSelected}
        onClick={handleOnClickItem}
        {...props}
        sx={{ color: 'inherit' }}
      >
      <ListItemIcon sx={{ minWidth: 45, color: 'inherit' }}>
        {item.icon || <NestedIcon style={{ fontSize: 10, marginLeft: 4 }} />}
      </ListItemIcon>
      <ListItemText>
        <Typography variant="menu" display="block" sx={{
          ...(isSelected && {
            color: 'inherit',
            fontWeight: 800
          }),
          ...(!isSelected && {
            color: 'inherit'
          })
        }}
        >
          {item.label}
        </Typography>
      </ListItemText>
      {isNested && <ExpandMore style={{ transform: rotateExpand, transition: "all 0.2s linear", color: "#afafaf" }} />}
    </ListItemButtonWrapper>
  );
}

/*********************************************************************************
 * Branding
 ********************************************************************************/
const Branding = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  width: 'inherit',
  height: AppConfig.menu.drawerWidthSmall,
  boxShadow: `0 1px 2px ${theme.palette.mode === 'dark' ? '-1px' : '1px'} rgb(209 206 206 / 20%)`,
  padding: '22px 12px 22px 10px',
  overflow: 'hidden',
  cursor: 'pointer'
}));

type SiteNameProps = {
  isDrawerOpen: boolean;
};

const SiteName = styled(Typography, { shouldForwardProp: prop => prop !== 'isDrawerOpen'})<SiteNameProps>(({ theme, isDrawerOpen }) => ({
  fontSize: 24,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 10,
  opacity: 1,
  ...(!isDrawerOpen && {
    opacity: 0,
  }),
  color: 'inherit',
  cursor: 'pointer'
}));

/*********************************************************************************
 * Drawer
 ********************************************************************************/
const openedMixin = (theme: Theme): CSSObject => ({
  width: AppConfig.menu.drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  background: theme.palette.mode === 'dark' ? '#1a1c27' : '#FFFFFF',
  border: 'none'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: 'hidden',
  width: `${AppConfig.menu.drawerWidthSmall}px`,
  background: theme.palette.mode === 'dark' ? '#1a1c27' : '#FFFFFF',
  [theme.breakpoints.down('md')]: {
    left: -1,
    width: 0
  },
  border: 'none'
});

const MenuList = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '64px',
  height: '100%',
  width: 'inherit',
  overflowX: 'auto',
  paddingBottom: '65px',
  [theme.breakpoints.down('md')]: {
    padding: 0,
  },
}));

const Drawer = styled(MuiDrawer)(
  ({ theme, open }) => ({
    position: 'fixed',
    left: 0,
    zIndex: 1300,
    width: AppConfig.menu.drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    background: '#FFFFFF',
    height: "100%",
    boxShadow: '0 4px 7px 0 rgb(0 0 0 / 20%)',
    '& .item-title': {
      display: 'none'
    },
    '& .item-title-less': {
      display: 'none'
    },
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
      '& .item-title': {
        display: 'block'
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
      '& .item-title-less': {
        display: 'block'
      },
    }),
    "&:hover": {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
      '& .branding-name': {
        opacity: 1
      },
      '& .item-title': {
        display: 'block'
      },
      '& .item-title-less': {
        display: 'none'
      }
    },
  }),
);

/*********************************************************************************
 * Wrapping the ListItemButton is necessary for us to be able to style the selected
 * state of the button when its selected
 ********************************************************************************/
const ListItemButtonWrapper = styled(ListItemButton)(({ theme }) => ({
  color: 'rgba(0,0,0,.54)',
  background: 'transparent',
  '&.Mui-selected': {
    transition: theme.transitions.create('background', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
    background: theme.palette.mainMenuGradient[theme.palette.mode],
    boxShadow: theme.palette.mode === 'dark' ? '1px 2px 20px 0 rgb(26 32 37 / 50%)' : '0 6px 20px 0 rgba(25,118,210,.5)',
    paddingRight: '0 0 0 21px',
    color: '#FFFFFF',
    marginRight: '10px',
    userSelect: 'none',
    borderRadius: '0 5px 5px 0'

  }
}));

