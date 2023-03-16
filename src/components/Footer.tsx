import React from 'react';
import { Box, Typography } from '@mui/material';
import {styled} from '@mui/material/styles';
import CopyrightIcon from "@mui/icons-material/Copyright";

const FooterBox = styled(Box)(() => ({
    padding:"10px 0",
    width: "100%",
    marginTop:"30px", 
    backgroundColor:"rgb(51,51,51)", color:"white"
  }));

export const Footer = () => {
  return (
    <FooterBox>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
        <CopyrightIcon
          sx={{
            marginTop: "3px",
            fontSize: 14,
          }}
        />
        <Typography
          sx={{
            marginLeft: "2px",
            fontSize: 14,
          }}
        >
          2023 Ihor Pohaidak
        </Typography>
      </Box>
    </FooterBox>
  )
}
