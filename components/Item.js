import { ButtonGroup, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Tooltip } from "@mui/material";
import { Add, ChevronRight, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";

export function Item({ id, text, editItem, deleteItem }) {
    const [itemEdit, setItemEdit] = useState(text);
    const [isEditting, setIsEditting] = useState(false);

    useEffect(() => {
        setItemEdit(text);
    }, [text, isEditting]);

    function addEdit() {
        if (itemEdit !== "") {
            editItem(id, itemEdit);
            setIsEditting(false);
        }
    }
    
    return (
        <ListItem secondaryAction={!isEditting && (
            // Edit Button
            <Tooltip title="Edit Item" placement="top" arrow>
                <IconButton onClick={() => setIsEditting(true)} edge="end" aria-label="Edit Item" color="primary">
                    <Edit />
                </IconButton>
            </Tooltip>
        )}>
            {/* List Icon */}
            <ListItemIcon>
                <ChevronRight />
            </ListItemIcon>

            {isEditting ? (
                <Grid container spacing={2} flexGrow={1}>
                    {/* Edit Item Input */}
                    <Grid flexGrow={1}>
                        <TextField 
                            type="text" 
                            variant="standard" 
                            value={itemEdit} 
                            onChange={(e) => setItemEdit(e.target.value)}
                            fullWidth 
                        />
                    </Grid>

                    {/* Edit Buttons */}
                    <Grid>
                        <ButtonGroup>
                            {/* Submit Edit Button */}
                            <Tooltip title="Add Edit" placement="top" arrow>
                                <IconButton onClick={addEdit} aria-label="Add Edit" color="success">
                                    <Add />
                                </IconButton>
                            </Tooltip>

                            {/* Cancel Edit Button */}
                            <Tooltip title="Cancel Edit" placement="top" arrow>
                                <IconButton onClick={() => setIsEditting(false)} aria-label="Cancel Edit" color="error">
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </ButtonGroup>
                    </Grid>
                </Grid>   
            ) : (
                // Item Text
                <Tooltip title="Click when completed task." placement="top" arrow>
                    <ListItemButton onClick={() => deleteItem(id)}>
                        <ListItemText>
                            {text}
                        </ListItemText>
                    </ListItemButton>
                </Tooltip>
            )}
        </ListItem>
    );
}