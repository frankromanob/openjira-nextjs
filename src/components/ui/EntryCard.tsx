import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { Entry } from '../../interfaces';
import { DragEvent, useContext } from "react";
import { UIContext } from "@/context/ui";
import { useRouter } from 'next/router';
import { getFormatToNow } from "@/utils";


interface Props {
    entry: Entry;
}

export const EntryCard = ({ entry }: Props) => {

    const { startDragging, stopDragging } = useContext(UIContext)

    const onDragStart = (event: DragEvent) => {
        startDragging()
        event.dataTransfer.setData('id', entry._id)
    }

    const onDragEnd = () => {
        stopDragging()
    }
    const router = useRouter();

    const onCardClicked = () => {
        router.push(`/entries/${entry._id}`)
    }

    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={onCardClicked}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }} >{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant="body2">Creada hace {getFormatToNow(entry.createdAt)}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
