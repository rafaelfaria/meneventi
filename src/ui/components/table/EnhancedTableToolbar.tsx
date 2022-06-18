import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

interface EnhancedTableToolbarProps {
  title: string;
  onDelete: (ids: string[]) => void;
  selected: string[]
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  let { title, selected, onDelete } = props;
  const numSelected = selected.length;


  /**
   * Flow the ids to delete up to the parent
   */
  const handleDeleteAll = async () => {
    await onDelete(selected);
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Apagar todos selecionados">
          <IconButton onClick={handleDeleteAll}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null
      }
    </Toolbar>
  );
};

export default EnhancedTableToolbar;