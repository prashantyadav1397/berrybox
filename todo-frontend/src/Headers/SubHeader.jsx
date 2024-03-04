import { useContext } from 'react'
import Typography from '@mui/material/Typography'
import { FaSort } from 'react-icons/fa'
import ToDoListContext from '../Context/TodoListContext'

const SubHeader = () => {
    const { onSortTodos, todos, isDescending, setIsDescending } = useContext(ToDoListContext);

    return (
        <div className="subHeaders">
            <Typography variant='body1' color='primary'>Todo's List</Typography>
            <span>
                <span
                    className="sub_header_icon"
                    onClick={() => {
                        setIsDescending(!isDescending)
                        onSortTodos(todos)
                    }}>
                    <FaSort />
                </span>
            </span >
        </div >
    )
}

export default SubHeader;
