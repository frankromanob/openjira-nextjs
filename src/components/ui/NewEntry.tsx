import { Box, Button, TextField } from "@mui/material"
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import { ChangeEvent, useContext, useState } from "react";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";


export const NewEntry = () => {
   // const [showAddForm, setShowAddForm] = useState(false);

    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState(false)

    const { addNewEntry } = useContext(EntriesContext)
    const {isAdding,setIsAddingEntry}= useContext(UIContext)

    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleClick = () => {
        setIsAddingEntry(true);
        setTouched(false)
    }

    const handleShowInput = () => {
        setIsAddingEntry(false)
        setInputValue('')
    }

    const onSave = ()=>{
        if (inputValue.length===0) return;
        addNewEntry(inputValue)
        setInputValue('')
        setTouched(false)
        setIsAddingEntry(false)
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>
            {!isAdding && <Button
                startIcon={<PostAddTwoToneIcon />}
                fullWidth
                variant="outlined"
                onClick={handleClick}
            >
                Agregar Tarea
            </Button>}
            {isAdding && <>
                <TextField
                    sx={{ marginTop: 2, marginBottom: 1 }}
                    fullWidth
                    autoFocus
                    multiline
                    placeholder="To do"
                    label="Nueva tarea"
                    helperText={inputValue.length <= 0 && touched && "Ingrese la nueva tarea"}
                    error={inputValue.length <= 0 && touched}
                    value={inputValue}
                    onChange={onTextFieldChanged}
                    onBlur={ ()=> setTouched(true)}
                />
                <Box display="flex" justifyContent='space-between'>
                    <Button
                        variant="outlined"
                        endIcon={<CancelTwoToneIcon />}
                        onClick={handleShowInput}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        endIcon={<SaveTwoToneIcon />}
                        onClick={onSave}
                    >
                        Guardar
                    </Button>
                </Box>
            </>}
        </Box>
    )
}
