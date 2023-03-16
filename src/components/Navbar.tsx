import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Box, Button } from "@mui/material";
import { Toolbar, Typography } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BoxContainer = styled(Box)(() => ({
  backgroundColor: "rgb(51,51,51)",
  color: "white",
  borderBottom: "1px solid white",
  display: "flex",
  justifyContent: "space-between",
  height: "100px",
}));

const MyMenuItem = styled(MenuItem)(() => ({
  color: "white",
  "&:hover": {
    color: "rgb(0,255,240)",
  },
  fontSize:"0.8rem",
}));

const NavButton = styled(Button)(() => ({
  margin: "0 30px",
  color: "white",
  "&:hover": {
    color: "rgb(0,255,240)",
    cursor: "pointer",
  },
}));


const BasicMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "white", paddingTop:"0" }}
      >
        <MenuIcon
          sx={{
            marginLeft:"10px", 
            fontSize:"35px",
            "&:hover": {
              color: "rgb(0,255,240)",
            },
          }}
        />
      </Button>
      <Menu
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "black",
          },
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MyMenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("/");
          }}
        >
          HOME
        </MyMenuItem>
        <MyMenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("/create");
          }}
        >
          CREATE POST
        </MyMenuItem>
        <MyMenuItem
          onClick={() => {
            setAnchorEl(null);
            signUserOut();
            navigate("/login");
          }}
        >
          LOGOUT
        </MyMenuItem>
      </Menu>
    </div>
  );
};


export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:800px)');

  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <BoxContainer>
      <Toolbar>
        <Box sx={{ marginRight: "30px", padding: "0" }}>
          <img src={require("../assets/logo.png")} alt="" />
        </Box>
        {matches ?<NavButton onClick={() => navigate("/")}>home</NavButton>:null}

        {user&&matches ? (
          <NavButton onClick={() => navigate("/create")}>create post</NavButton>
        ) : null}
      </Toolbar>
      {!user ? (
        <Toolbar>
          <NavButton onClick={() => navigate("/login")}>login</NavButton>
        </Toolbar>
      ) : (
        <Toolbar>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ paddingTop: "7px", marginRight: "10px" }}>
              <img
                src={user?.photoURL || ""}
                alt="logo"
                width="22px"
                height="22px"
              />
            </Box>
            <Box sx={{ paddingTop: "7px" }}>
              <Typography variant="subtitle2" sx={{color: "rgb(0,255,240)"}}>{user?.displayName} </Typography>
            </Box>
            {matches?<NavButton onClick={()=>{
                signUserOut();
                navigate("/login")
                }}>logout</NavButton>:<BasicMenu  />}
          </Box>
        </Toolbar>
      )}
    </BoxContainer>
  );
};
