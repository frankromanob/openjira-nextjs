import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { Entry } from '../../interfaces';
import { DragEvent, useContext } from "react";
import { UIContext } from "@/context/ui";


interface Props {
    entry: Entry;
}

export const EntryCard = ({ entry }: Props) => {

    const {startDragging,stopDragging}= useContext(UIContext)

    const onDragStart= (event:DragEvent)=> {
        startDragging()
        event.dataTransfer.setData('id',entry._id)
    }

    const onDragEnd= ()=>{
        stopDragging()
    }
    const fechaCreacion=  new Date(entry.createdAt).toLocaleTimeString()
    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }} >{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant="body2">algun dia</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
