"use client"

import { Box, Container, Grid, IconButton, List, TextField, Tooltip, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Item } from "@/components/Item";

export default function Home() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  // Fetches items stored in local storage
  useEffect(() => {
    setItems(JSON.parse(window.localStorage.getItem("items")) || []);
  }, []);

  // Updates local storage everytime items useState is changed
  useEffect(() => {
    window.localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // Add item to items useState
  // Generates an id by getting the id of the last item in the array and adding one to it
  // Sets id to 1 if their is no items in array
  function addItem() {
    if (newItem !== "") {
      setItems((prevItems) => [...prevItems, { id: prevItems[prevItems.length - 1]?.id + 1 || 1, text: newItem} ]);
      setNewItem("");
    }
  }

  // Edits item in items array at the with specified id
  function editItem(id, text) {
    setItems((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === id);
      prevItems[index] = { id, text };
      return [...prevItems];
    });
  }

  // Deletes item from items array by filtering out the item with specified id
  function deleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }
  
  return (
    <Container sx={{ pt: 5 }}>
      <Box sx={{ maxWidth: 600, mx: "auto", p: 3, borderRadius: 2, bgcolor: "#DDF18E" }}>
        <Grid container spacing={2} flexDirection="column">
          {/* Heading */}
          <Grid textAlign="center">
            <Typography variant="h4" className="noto-sans">
              Todo List
            </Typography>
          </Grid>

          {/* Add Item */}
          <Grid container alignItems="end">
            {/* Input */}
            <Grid flexGrow={1}>
              <TextField 
                type="text"
                variant="standard"
                label="Add Item"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                required
                fullWidth
              />
            </Grid>

            {/* Add Button */}
            <Grid>
              <Tooltip title="Add Item" placement="top" arrow>
                <IconButton onClick={addItem} aria-label="Add Item" color="success">
                  <Add />
                </IconButton>
              </Tooltip>
            </Grid>

            {/* Delete Button */}
            <Grid>
              <Tooltip title="Clear Input" placement="top" arrow>
                <IconButton onClick={() => setNewItem("")} aria-label="Clear Input" color="error">
                  <Delete />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

          {/* Item List */}
          <Grid>
            <List>
              {items.map((item) => <Item key={`item-${item.id}`} {...item} editItem={editItem} deleteItem={deleteItem} />)}
            </List>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
