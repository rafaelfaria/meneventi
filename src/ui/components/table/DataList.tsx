import React, { useState } from 'react';
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
  label: string | React.ReactNode,
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
  columnData: (props: ColumnParams & any) => TableColProps[];
  columnDataParams?: any,
  onDelete?: (id: string, obj?: any) => any;
  onDeleteBulk?: (ids: string[], obj?: any) => any;
  isLoading?: boolean;
  deleteLabelKey?: string | string[];
  deleteTitle?: string;
  hideDeleteSuccessMessage?: boolean;
  hideCheckbox?: boolean;
  hideToolbar?: boolean;
  hideHeading?: boolean;
  sorting?: boolean;
  idProp?: string;
  rowsPerPage?: number;
  highlightItem?: any;
  onRowClick?: (data: any) => void
}

const DataList = (props: DataListProps) => {
  const { tableId, title, columnData, items, isLoading, onDelete, onDeleteBulk, deleteLabelKey = 'title', hideDeleteSuccessMessage, deleteTitle, hideCheckbox = false, hideToolbar = false, columnDataParams = {}, sorting, hideHeading, idProp = 'id', rowsPerPage = 25, highlightItem, onRowClick } = props;

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
      const title = deleteTitle || `Are you sure you want to delete the below ${itemsToDelete.length > 1 ? 'items' : 'item'}?`

      await confirm({
        title,
        description: <Box>
          <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {itemsToDelete.slice(0, maxItemsToShow).map((item: any) => {
              return (
                <ListItem key={item.id} component="li">
                  <ItemIcon sx={{ mr: 1 }} />
                  <ListItemText>{deleteLabelKey instanceof Array ? deleteLabelKey.map((key) => item[key]).join(' - ') : item[deleteLabelKey]}</ListItemText>
                </ListItem>
              );
            })}
          </List>
          {itemsToDelete.length > maxItemsToShow && <Typography>and others <strong>{itemsToDelete.length-maxItemsToShow} items...</strong></Typography>}
        </Box>
      });

      setIsDeleting(ids);

      try {
        if (onDeleteBulk) {
          await onDeleteBulk(ids as string[], itemsToDelete);
        } else if (onDelete) {
          for (let id of ids) {
            await onDelete(id, itemsToDelete.find((item: any) => item[idProp] === id));
          }
        }

        if (!hideDeleteSuccessMessage) {
          showSuccessNotification('Items successfully deleted!')
        }

        setIsDeleting([]);
      } catch(err: any) {
        console.error('DataList: handleDeleteItems', err);
        setIsDeleting([]);
        showErrorNotification(getErrorMessage(err));
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
      highlightItem={highlightItem}
      onRowClick={onRowClick}
    />
  );
}

export default DataList;