import React, { useState, useEffect } from 'react';
import Badge from '../Badge/Badge';
import List from '../List/List';
import './addListButton.scss';

import closeSvg from '../../assets/cancel.svg';
import axios from 'axios';

const AddListButton = ({ colors, onAdd }) => {

  const [visiblePopup, setVisiblePopup] = useState(false);

  const [selectColor, setSelectColor] = useState(null);

  const [inputValue, setInputValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectColor(colors[0].id);
    }

  }, [colors])

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectColor(colors[0].id);
  }

  const addList = () => {
    if (!inputValue) {
      alert('Введите значение')
      return;
    }

    setIsLoading(true);

    // onAdd({ id: Math.floor(Math.random() * 1000), name: inputValue, color: {name: onColor} });
    axios.post('http://localhost:8000/lists', {
      name: inputValue, colorId: selectColor
    }).then(({ data }) => {

      const onColor = colors.filter(c => c.id === selectColor)[0].name;
      const listObj = { ...data, color: { name: onColor, hex: onColor.hex }, tasks: [] };
      onAdd(listObj);
      onClose();
      setIsLoading(false);
    });

  }

  return (
    <div className='add-list'>
      <List items={[
        {
          className: 'list__add-button',
          icon: null,
          name: 'Добавить список',
        }
      ]} click={() => setVisiblePopup(!visiblePopup)} />
      { visiblePopup && (<div className='add-list__popup'>
        <img
          className='add-list__popup-close-btn'
          src={closeSvg} alt="close popup" onClick={onClose} />
        <input value={inputValue} onChange={e => setInputValue(e.target.value)} type="text" placeholder='Название списка' className='field' />
        <div className='add-list__popup-colors'>
          {
            colors.map(color => <Badge

              onClick={() => setSelectColor(color.id)}
              key={color.id}
              color={color.name}
              className={selectColor === color.id && 'active'} />)
          }
        </div>
        <button onClick={addList} className='button'>
        {isLoading ? 'Отправка...' : 'Добавить'}
        </button>
      </div>)}
    </div>
  )
}

export default AddListButton
