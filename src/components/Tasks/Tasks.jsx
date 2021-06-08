import React from 'react'
import axios from 'axios';



import './tasks.scss';
import penSvg from '../../assets/pen.svg';

import AddTasksForm from './AddTasksForm';
import Task from './Task';


const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleted }) => {

  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);

    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch('http://localhost:8000/lists/' + list.id, {
          name: newTitle
        }).catch(() => alert('Неудалось обновить'))
    }
  }

  return (
    <div className="tasks">
      <h2 style={{ color: list.color.hex }} className='tasks__title'>{list.name}
        <img onClick={editTitle} src={penSvg} alt="Edit" />
      </h2>
      <div className="tasks__items">
        {
          !withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутсвуют...</h2>
        }
        { list.tasks &&
          list.tasks.map((task) => (
            <Task key={task.id} list={list}  {...task} onRemove={onRemoveTask} onEdit={onEditTask} onCompleted={onCompleted} />
          ))
        }
        <div className="tasks__form">
          <AddTasksForm key={list.id} list={list} onAddTask={onAddTask} />
        </div>
      </div>
    </div>

  )
}

export default Tasks
