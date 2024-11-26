import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [text, setText] = useState("");
  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!text.trim()){
        alert("To do cannot be empty!");
        return;
    }
    addTodo(text.trim());
    setText("");
  };
  
  return (
    <ListItem>
      <form onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Add Todo" variant="outlined" onChange={handleChange} value={text}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="create todo" edge="end" type="submit">
                  <CheckIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}/>
      </form>
    </ListItem>
  );
}
