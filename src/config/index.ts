export { default as menuItems } from './menuItems';
export { default as menuItemsAdmin } from './menuItemsAdmin';

const AppConfig:any = {
  theme: {
    header: {
      background: 'linear-gradient(45deg, #303f9f, #7b1fa2)',
    },
    menu: {
      selected: {
        background: 'linear-gradient(45deg,#303f9f,#7b1fa2)',
        boxShadow: '3px 3px 20px 0 rgb(123 31 162 / 50%)'
      }
    }
  },
  menu: {
    drawerWidth:270,
    drawerWidthSmall: 60
  }
};

export default AppConfig;