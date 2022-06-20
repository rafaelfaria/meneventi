import { useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { getErrorMessage } from "../../../lib/helpers";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import DataTable from "./DataTable";
import ItemIcon from '@mui/icons-material/Description';
import useToastNotification from "../../../hooks/useToastNotification";
import useConfirm from '../../../hooks/useConfirm';
import useColorMode from '../../../hooks/useColorMode';

export interface HeadCell {
  id: string,
  label: string,
  disablePadding?: boolean;
  width?: number;
  align?: any; //'inherit' | 'left' | 'center' | 'right' | 'justify';
  onlyAdmin?: boolean;
}

export type TableColProps = {
  header: HeadCell,
  render: (data: any) => any
}

export interface ColumnParams {
  navigate: NavigateFunction;
  isItemDeleting: (id: string) => boolean;
  handleDeleteItems: (ids: string[]) => void;
  isDeleting: string[];
  onEditItem: (item: any) => any
  isDark: boolean
}

type DataListProps = {
  tableId?: string;
  title: string;
  items: any;
  columnData: (props: ColumnParams) => TableColProps[];
  columnDataParams?: any,
  onDelete?: (id: string) => any;
  onDeleteBulk?: (ids: string[]) => any;
  isLoading?: boolean;
  deleteItemKey?: string;
  hideCheckbox?: boolean;
  hideToolbar?: boolean;
  hideHeading?: boolean;
  sorting?: boolean;
  idProp?: string;
  rowsPerPage?: number;
}

const DataList = (props: DataListProps) => {
  const { tableId, title, columnData, items, isLoading, onDelete, onDeleteBulk, deleteItemKey = 'title', hideCheckbox = false, hideToolbar = false, columnDataParams = {}, sorting, hideHeading, idProp = 'id', rowsPerPage = 25 } = props;

  const navigate = useNavigate();
  const { confirm } = useConfirm();
  const { showSuccessNotification, showErrorNotification } = useToastNotification();
  const [ isDeleting, setIsDeleting ] = useState<string[]>([])
  const { isDark } = useColorMode();

  // Check if a specific item is being deleted
  const isItemDeleting = (id: string) => isDeleting && isDeleting?.indexOf(id) !== -1;

  /**
   * Create a default function to handle deleted items
   */
  const handleDeleteItems = async (ids: string[]) => {
    try {
      const itemsToDelete = items.filter((item: any) => ids.indexOf(item[idProp]) > -1);
      const maxItemsToShow = 5;

      await confirm({
        title: `Você tem certeza que deseja apagar ${itemsToDelete.length > 1 ? 'os items' : 'o item'} abaixo?`,
        description: <Box>
          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {itemsToDelete.slice(0, maxItemsToShow).map((item: any) => {
              return (
                <ListItem key={item.id} component="li">
                  <ItemIcon sx={{ mr: 1 }} />
                  <ListItemText>{item[deleteItemKey]}</ListItemText>
                </ListItem>
              );
            })}
          </List>
          {itemsToDelete.length > maxItemsToShow && <Typography>e outros <strong>{itemsToDelete.length-maxItemsToShow} items...</strong></Typography>}
        </Box>
      });

      setIsDeleting(ids);

      try {
        let deletedIds = [];
        if (onDeleteBulk) {
          deletedIds = await onDeleteBulk(ids as string[]);
        } else if (onDelete) {
          for (let id of ids) {
            const resp = await onDelete(id);
            deletedIds.push(resp);
          }
        }

        showSuccessNotification('Items apagados com sucesso!')
        setIsDeleting([]);
        return deletedIds.map((item: any) => item[idProp]);
      } catch(err: any) {
        setIsDeleting([]);
        console.log(err);
        showErrorNotification(getErrorMessage(err));
        return false;
      }

    } catch(err) {
      throw undefined;
    }
  }

  return (
    <DataTable
      tableId={tableId}
      sorting={sorting}
      hideToolbar={hideToolbar}
      hideCheckbox={hideCheckbox}
      hideHeading={hideHeading}
      title={title}
      items={items}
      isLoading={isLoading as boolean}
      onDelete={handleDeleteItems}
      columnData={columnData({ navigate, isDark, isItemDeleting, handleDeleteItems, isDeleting, ...columnDataParams })}
      idProp={idProp}
      rowsPerPage={rowsPerPage}
    />
  );
}

export default DataList;