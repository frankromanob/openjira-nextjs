import { Box, Drawer, List, ListItem, Typography, IconButton, ListItemIcon, ListItemText, Divider } from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import MailOutlineTwoToneIcon from '@mui/icons-material/MailOutlineTwoTone';
import { useContext } from 'react';
import { UIContext } from '@/context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Sent', 'Draft'];

export const Sidebar = () => {

    const { sideBarOpen, closeSideMenu } = useContext(UIContext);

    return (
        <Drawer
            anchor="left"
            open={sideBarOpen}
            onClose={closeSideMenu}
        >
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant="h4">
                        Menu
                    </Typography>
                </Box>
                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 ? <InboxTwoToneIcon /> : <MailOutlineTwoToneIcon />}
                                </ListItemIcon>
                                <ListItemText>
                                    {text}
                                </ListItemText>

                            </ListItem>
                        ))
                    }
                </List>
                <Divider />

            </Box>
        </Drawer>
    )
}
