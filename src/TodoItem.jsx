import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoItem({ todo, remove, toggle }) {
  const labelId = `checkbox-list-label-${todo.id}`;
  const removeTodo = () => {
    try{
        remove(todo.id);
    } catch(error){
        console.error("Error removing todo:", error);
    }
  };

  if (!todo) return null;

  return (
    <ListItem secondaryAction={
        <IconButton edge="end" aria-label="comments" onClick={removeTodo}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox edge="start" checked={todo.completed} tabIndex={-1} disableRipple inputProps={{ "aria-labelledby": labelId }}
            onChange={() => toggle(todo.id)} />
        </ListItemIcon>
        <ListItemText id={labelId} primary={todo.text} sx={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "gray" : "inherit",
            transition: "all 0.3s ease",
          }} />
      </ListItemButton>
    </ListItem>
  );
}
