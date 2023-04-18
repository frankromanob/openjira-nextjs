import { Box, Typography } from "@mui/material"
import Head from "next/head"
import { PropsWithChildren, ReactNode } from "react";
import { Navbar, Sidebar } from "../ui";


interface Props {
    title?: string;
}

export const Layout = ({ title = 'OpenJira - RomApps', children }: PropsWithChildren<Props>) => {
    return (
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar />
            <Sidebar />

            <Box sx={{ padding: '10px 20px' }}>
                {children}
            </Box>
        </Box>
    )
}
