import TableSortLabel from '@mui/material/TableSortLabel';
import { Box, Checkbox, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { HeadCell } from './DataList';

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  headCells: HeadCell[]
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: any;
  hideCheckbox?: boolean;
  sorting?: boolean;
}

type Order = 'asc' | 'desc';


function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells = [], hideCheckbox, sorting } = props;

  /**
   * Create the call back for the click event in the icon next to the label
   */
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {onSelectAllClick && !hideCheckbox &&
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        }
        {headCells.map((headCell) => (
          <TableCell
            component="th"
            key={`${headCell.id}-header`}
            align={headCell.align || 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            width={headCell.width ? headCell.width : 'auto'}
            sx={{ width: headCell.width ? headCell.width : 'auto'}}
          >
          {sorting ?
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography sx={{ fontWeight: 600 }} variant="body2">{headCell.label}</Typography>
              {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
            </TableSortLabel>
            : <Typography sx={{ fontWeight: 600, fontSize: 16 }} variant="body2">{headCell.label}</Typography>
          }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;