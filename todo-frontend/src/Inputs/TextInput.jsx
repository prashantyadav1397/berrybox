import { useContext } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import '../styles.css'
import { IoMdAdd } from 'react-icons/io'
import { MdClear } from 'react-icons/md'
import ToDoListContext from '../Context/TodoListContext'

const TextInput = () => {

  const {
    todoText,
    setTodoText,
    onInputSubmit,
    inputRef,
    isEmptyInput,
    setIsEmptyInput,
  } = useContext(ToDoListContext);

  // handle input text changes
  const onInputChange = (e) => {
    e.preventDefault();
    setIsEmptyInput(false);
    setTodoText(e.target.value);
  };

  return (
    <div className="add_todo">
      <TextField
        label={"Todo Item"}
        variant="outlined"
        color='primary'
        className='add_todo_text_input'
        value={todoText}
        inputRef={inputRef}
        autoComplete={"off"}
        onChange={onInputChange}
        onKeyDown={onInputSubmit}
        error={isEmptyInput}
        helperText={isEmptyInput ? 'Value required' : null}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <span
                className='add_todo_text_input_icon'
                onClick={onInputSubmit}>
                <IoMdAdd />
              </span>
              <span
                className='add_todo_text_input_icon'
                onClick={() => {
                  setIsEmptyInput(false)
                  setTodoText('')
                }} >
                <MdClear />
              </span>
            </InputAdornment>
          ),
        }}
      />
      <br />
    </div>
  )
}

export default TextInput;
