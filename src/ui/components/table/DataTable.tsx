import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import useLocalStorage from '../../../hooks/useLocalStorage';
import ReactLoading from 'react-loading';

import { TableColProps } from './DataList';
import { styled } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

type DataTableProps = {
  tableId?: string;
  columnData: TableColProps[];
  hideToolbar?: boolean;
  hideCheckbox?: boolean;
  hideHeading?: boolean;
  title: string;
  items?: any;
  highlightItem?: any;
  onDelete: (ids: string[]) => void;
  isLoading: boolean;
  sorting?: boolean;
  idProp?: string;
  rowsPerPage?: number;
}

type Order = 'asc' | 'desc';

export default function DataTable(props: DataTableProps) {
  const { tableId, title, items, columnData, isLoading, onDelete, highlightItem, hideCheckbox, hideToolbar, sorting, hideHeading, idProp = 'id', rowsPerPage: defaultRowsPerPage = 25} = props;

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('');

  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useLocalStorage(`${tableId || 'global'}.rowsPerPage`, defaultRowsPerPage);

  const { authUser } = useAuth();

  /**
   * Handle the select all checkbox
   */
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = items?.map((n: any) => n[idProp]) || [];
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  /**
   * Handle selection of the invidual checkboxes
   */
  const handleCheckboxClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  /**
   * Handle the request to sort a particular property
   */
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  /**
   * Handle the pagination
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Handle the selection of a different number of rows per page
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numRows = parseInt(event.target.value, 10);
    setRowsPerPage(numRows);
    setPage(0);
  };

  /**
   * Handles when delete in bulk
   */
  const handleBulkDelete = async (ids: string[]) => {
    try {
      await onDelete(ids);
      setSelected([]);
    } catch(err) {}
  }

  /**
   * Check if the item is selected
   */
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  /**
   * Avoid a layout jump when reaching the last page with empty rows.
   */
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (items?.length || 0)) : 0;

  /**
   * Map the headings of the cells
   */
  const headCellsHeading = columnData.map((column) => column.header);



  return (
    <Box sx={{ width: '100%' }} component={Paper}>
      {!hideToolbar && <EnhancedTableToolbar title={title} selected={selected} onDelete={handleBulkDelete} />}
      <TableContainer>
        <Table sx={{ minWidth: 600 }} size="medium">
          {!hideHeading && (
            <EnhancedTableHead
              sorting={sorting}
              order={order}
              orderBy={orderBy}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={items?.length || 0}
              headCells={headCellsHeading.filter((heading) => !heading.onlyAdmin || (heading.onlyAdmin && authUser?.isAdmin))}
              hideCheckbox={hideCheckbox}
            />
          )}
          <TableBody>
            {!items?.length && isLoading &&
              <TableRow><TableCell colSpan={headCellsHeading.length + 1}><Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><ReactLoading type="spin" color="#d7e0e8" width={100} height={100}  /></Box></TableCell></TableRow>
            }
            {stableSort<any>(items || [], getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row[idProp]);
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row[idProp]}
                    selected={isItemSelected || row[idProp] === highlightItem?.[idProp]}
                    sx={{ background: (index % 2) ? "#F4F5F9" : "transparent" }}
                  >
                    {!hideCheckbox &&
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={isItemSelected} onClick={(event) => handleCheckboxClick(event, row[idProp])} />
                      </TableCell>
                    }
                    {columnData.filter((column) => !column.header.onlyAdmin || (column.header.onlyAdmin && authUser?.isAdmin)).map(column => {
                      return <TableCell key={column.header.id}>{column.render(row)}</TableCell>
                    })}
                  </StyledTableRow>
                );
              })}

            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {(items?.length > defaultRowsPerPage) &&
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={items?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Mostrar por página"
        />
      }
    </Box>
  );
}

/**
 * Sorting methods
 */
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: any },
  b: { [key in Key]: any },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.mode === 'dark' ? "#1f2028" : "#F4F5F9",
  },
}));