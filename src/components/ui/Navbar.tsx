import { AppBar, Card, Link, IconButton, Toolbar, Typography } from "@mui/material"
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { useContext } from "react";
import { UIContext } from "@/context/ui";
import NextLink from "next/link";

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
        <NextLink href='/' passHref>
          <Link underline='none' color='white'>
            <Typography variant="h5">OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
