import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { useContext } from "react";
import { UIContext } from "@/context/ui";

export const Navbar = () => {

  const { openSideMenu } = useContext(UIContext)

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          onClick={openSideMenu}
        >
          <MenuTwoToneIcon />
        </IconButton>
        <Typography variant="h5">OpenJira</Typography>
      </Toolbar>
    </AppBar>
  )
}
