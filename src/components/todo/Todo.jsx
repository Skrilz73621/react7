import React from 'react'

export default function Todo({ info, deleteTodo, updateTodo,changeTodo }) {


    return (
        <li>
            <input onChange={(event) => updateTodo(info.id, event.target.checked)} type="checkbox" />
            <span className={info.status && 'checked'}>{info.title}</span>
            <button onClick={()=> deleteTodo(info.id)}>Удалить</button>
            <button onClick={() => changeTodo(info.id)}>Изменить</button>
        </li>
    )
}
