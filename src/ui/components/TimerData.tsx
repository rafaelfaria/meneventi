const columnData = () => {
  return [
    {
      header: {
        id: 'round',
        label: 'Round',
        disablePadding: false,
        width: 20
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
        return rowData.duration;
      },
    }
  ]
};

export default columnData;