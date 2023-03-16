import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/")
  };

  return (
    <Box sx={{minWidth:"100vw", display:"flex", justifyContent:"center", minHeight: "calc(100vh - 192px)"}}>
        <Box sx={{marginTop:"100px"}}>
      <Typography sx={{marginBottom:"20px", fontWeight:"bold", textDecorationLine:"underline"}} variant="h5">Sign In with GOOGLE</Typography>
      <Button variant="contained" color="success" sx={{minWidth:"100%"}} onClick={signInWithGoogle}>sign in</Button>
      </Box>
    </Box>
  );
};
