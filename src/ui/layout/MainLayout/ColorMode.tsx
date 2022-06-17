import IconButton from '@mui/material/IconButton';
import useColorMode from "../../../hooks/useColorMode";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorMode = () => {

  const { toggleColorMode, mode } = useColorMode();

  return (
    <>
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </>
  );
};
export default ColorMode;