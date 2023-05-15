import { Layout } from '@/components/layouts'
import {  Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, Snackbar, TextField, capitalize } from '@mui/material'
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import React, { ChangeEvent, useContext, useMemo } from 'react'
import { Entry, EntryStatus } from '@/interfaces';
import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import mongoose from 'mongoose';
import { dbEntries } from '@/database';
import { EntriesContext } from "@/context/entries";
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { getFormatToNow } from '@/utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entryToEdit: Entry
}



export const EntryPage: NextPage<Props> = ({ entryToEdit }) => {


    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { deleteEntry, updateEntry } = useContext(EntriesContext)
    const [inputValue, setInputValue] = useState(entryToEdit.description);
    const [status, setStatus] = useState<EntryStatus>(entryToEdit.status);
    const [touched, setTouched] = useState(false)

    const notValidForm = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
        // console.log(event.target.value)
    }

    const onSaveClicked = () => {
        if (inputValue.length === 0) {
            setTouched(true)
            return;
        }
        //console.log('Save clicked!')
        const updatedEntry: Entry = {
            ...entryToEdit,
            status,
            description: inputValue
        }

        updateEntry(updatedEntry)
        router.push(`/`)
        enqueueSnackbar('Entrada actualizada!',{
            variant:'success',
            autoHideDuration:1500,
            anchorOrigin:{
                vertical:'top',
                horizontal:'right'
            }
        })


    }

    const onDeleteClicked = () => {
        //console.log('Delete clicked!')
        deleteEntry(entryToEdit)
        router.push(`/`)
        enqueueSnackbar('Entrada eliminada!',{
            variant:'error',
            autoHideDuration:1500,
            anchorOrigin:{
                vertical:'top',
                horizontal:'right'
            }
        })
    }
    return (
        <Layout title={inputValue.substring(0, 15) + '...'}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada: `}
                            subheader={`Creada hace ${getFormatToNow(entryToEdit.createdAt)}`}
                        />
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Edite la entrada'
                                autoFocus
                                multiline
                                label="Descripción"
                                value={inputValue}
                                onChange={onTextFieldChanged}
                                error={notValidForm}
                                onBlur={() => setTouched(true)}
                                helperText={notValidForm && "Ingrese la descripción de la tarea"}
                            />
                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChanged}
                                >
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={option == "in-progress" ? "In progress" : capitalize(option)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveTwoToneIcon />}
                                variant='contained'
                                fullWidth
                                onClick={onSaveClicked}
                                disabled={inputValue.length <= 0}
                            >
                                Guardar
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark'
                }}
                onClick={onDeleteClicked}
            >
                <DeleteForeverTwoToneIcon />
            </IconButton>
        </Layout>
    )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { id } = ctx.params as { id: string }


    if (!mongoose.isValidObjectId(id)) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const entryToEdit = await dbEntries.getEntryById(id)
    //console.log(entryToEdit)

    // const { entries, updateEntry } = useContext(EntriesContext)
    // const entryToEdit = entries.find(e => e._id === id)!;
    return {
        props: {
            entryToEdit
            // id,
            // description: entryToEdit?.description,
            // status: entryToEdit?.status
        }
    }
}

export default EntryPage