import axios from 'axios';
import React, { useState } from 'react'
import addTaskSvg from '../../assets/add.svg';


function AddTasksForm({ list, onAddTask }) {

  const [visibleForm, setVisibleForm] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  }

  const addTask = () => {

    const obj = {
      "listId": list.id,
      "text": inputValue,
      "completed": false
    };
    setIsLoading(true)
    axios.post('http://localhost:8000/tasks', obj).then(({ data }) => {

    console.log(data);

      onAddTask(list.id, data)
      toggleFormVisible();
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false);
    })


  }

  return (
    <div className="tasks__form">

      {!visibleForm ? (<div className='tasks__form-new' onClick={toggleFormVisible}>
        <img src={addTaskSvg} alt="add" />
        <span>Новая задача</span>
      </div>) : (<div className="tasks__form-block">
        <input value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Текст задачи'
          className='field' />
        <button className='button' onClick={addTask}>{isLoading ? 'Добавление...' : 'Добавить'}</button>
        <button className='button button--grey' onClick={toggleFormVisible}>Отмена</button>
      </div>)}

    </div>


  )
}

export default AddTasksForm
