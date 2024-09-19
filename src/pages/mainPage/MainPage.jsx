import React from 'react'
import { useState, useEffect } from 'react'
import Todo from '../../components/todo/Todo'


const url = 'http://localhost:8000/todos'

export default function MainPage() {

  const [inputValue, setInputValue] = useState('')
  const [info, setInfo] = useState([])


  async function getTodos() {
    const response = await fetch(url)
    const data = await response.json()

    setInfo(data)
  }


  async function createTodo() {


    const objectInfo = {
      title: inputValue,
      status: false
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(objectInfo)
    })


    if (response.status === 201) {
      getTodos()
    }
  }

  async function deleteTodo(id) {
    const response = await fetch(`${url}/${id}`, {
      method:'delete'
    })

    if (response.status === 200) {
      getTodos()
    }
  }


  async function updateTodo(id, status){
    const data = {
      status
    }

    const response = await fetch(`${url}/${id}`, {
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })
    if (response.status === 200) {
      getTodos()
    }
  }
  

  async function changeTodo(id){

    const data = {
      title : inputValue
    }
    

    if(inputValue !== ''){
      const response = await fetch(`${url}/${id}`,{
        method:'PATCH',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(data)
      })
      if (response.status === 200) {
        getTodos()
      }
    }

  }

  useEffect(() => {
    getTodos()
  }, [])


  return (
    <div>
      <h2>Todo list</h2>

      <input onInput={(event) => setInputValue(event.target.value)} type="text" placeholder='Введите задачу' />

      <button onClick={createTodo}>Создать задачу</button>

      <ul className='ulp'>
        {
          info.map((item) => <Todo key={item.id} info={item} deleteTodo={deleteTodo} updateTodo={updateTodo} changeTodo={changeTodo}/>)
        }
      </ul>
    </div>
  )
}
