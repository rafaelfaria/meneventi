import Box from '@mui/material/Box';

export default function Decoration() {
   return (
    <Box
        sx={[{
          position: "absolute",
          zIndex: "-1",
          top: 0,
          left: 0,
          width: "100%",
          height: "170px",
          overflow: "hidden"
        },
        (theme) => ({
          'background': theme.palette.gradient[theme.palette.mode],
        })
        ]}
      / >
  );
}