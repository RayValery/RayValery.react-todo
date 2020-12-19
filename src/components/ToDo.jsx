import React, { useState } from 'react';
import { Card, Divider, Button } from 'antd';
import { ToDoItem } from './ToDoItem';
import { ToDoForm } from './ToDoForm';

export const ToDo = () => {
  const [todos, setTodos] = useState([
    {id: 1, title: 'React', desc : 'Create React App', date: new Date().getDay() + '.' + new Date().getMonth() + '.'  + new Date().getFullYear() + ' - ' + new Date().getHours() + ':' + new Date().getMinutes(), checked: false},
    {id: 2, title: 'Angular', desc : 'Create Angular App', date: new Date().getDay() + '.' + new Date().getMonth() + '.'  + new Date().getFullYear() + ' - ' + new Date().getHours() + ':' + new Date().getMinutes(), checked: false},
    {id: 3, title: 'AntDesign', desc : 'Use antd library', date: new Date().getDay() + '.' + new Date().getMonth() + '.'  + new Date().getFullYear() + ' - ' + new Date().getHours() + ':' + new Date().getMinutes(), checked: false}
  ]);
  const [idCount, setIdCount] = useState(10);

  const renderTodoItems = (todos) => {
    return (
      <ul className="todo-list">
        { todos.map(todo => <ToDoItem 
            key={todo.id}
            item={todo}
            onRemove={onRemove} 
            onCheck={onCheck} 
          />) }
      </ul>
    )
  }

  const onRemove = (id) => {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      todos.splice(index, 1);
      setTodos([...todos]);
    }
  }

  const onCheck = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index !== -1) {
      const todo = todos[index];
    
      todo.checked = !todo.checked;
      todos.splice(index, 1, todo);
      
      setTodos([...todos]);
    }

    
  }

  const onSubmit = (title, description) => {
    if (title.length < 3 || description.length < 3)
      alert("Both title and description should be longer than 3 characters");
    else if (title[0] !== title[0].toUpperCase())
      alert("Title should start from capital letter!");
    else {
      const todo = {
        title,
        description,
        date: new Date().getDay() + '.' + new Date().getMonth() + '.'  + new Date().getFullYear() + ' - ' + new Date().getHours() + ':' + new Date().getMinutes(),
        id: idCount,
        checked: false
      };
      setTodos([...todos, todo]);
      setIdCount(idCount + 1);
    }
  }


  const removeChecked = () => { 
    
    let i = todos.length;
    while (i--) {
      if (todos[i].checked === true) {
          todos.splice(i, 1);
      }
    }
    
    setTodos([...todos]);
  }



  const numberOfUnChecked = () => { 

    let count = 0;

    let i = todos.length;
    while (i--) {
      if (todos[i].checked === false) {
          count++;
      }
    }

    return count;
  }


  return (
    <Card title={'ToDo List'} className="todo-card">
      <ToDoForm onSubmit={onSubmit} />
      <Divider />
      { renderTodoItems(todos) }
      <Divider />
      <p>Number of Unchecked cards: <p className="todo-numberUnchecked">{numberOfUnChecked()}</p></p>
      <Divider />
      <Button danger = "true" htmlType="submit" type="primary" onClick={removeChecked}>Remove checked cards</Button>
    </Card>
  );
}
