import { IconButton } from "@mui/material";
import { ColumnParams } from "../table/DataList";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';


const columnData = (params: ColumnParams & {
  moveToRound: (round: number, autoStart?: boolean) => void;
}) => {
  const { moveToRound } = params || {};

  return [
    {
      header: {
        id: 'round',
        label: 'Round',
        disablePadding: false,
        width: 20,
      },
      render: (rowData:any) => {
        return rowData.round;
      },
    },
    {
      header: {
        id: 'small',
        label: 'Small Blind',
      },
      render: (rowData:any) => {
        return rowData.break ? 'BREAK' : rowData.small;
      },
    },
    {
      header: {
        id: 'big',
        label: 'Big Blind',
      },
      render: (rowData:any) => {
        return rowData.break ? 'BREAK' : rowData.big;
      },
    },
    {
      header: {
        id: 'duration',
        label: 'Duration',
      },
      render: (rowData:any) => {
        return `${rowData.duration} min`;
      },
    },
    {
      header: {
        id: 'actions',
        label: 'Actions',
        width: 40
      },
      render: (rowData:any) => {
        return <IconButton onClick={() => moveToRound(rowData.round - 1, false)}><PlayCircleFilledWhiteIcon /></IconButton>;
      },
    }
  ]
};

export default columnData;