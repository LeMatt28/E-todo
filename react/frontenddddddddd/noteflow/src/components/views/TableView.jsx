import React from 'react'

export default function TableView({ tasks, updateTask, removeTask, moveTask }){
  return (
    <table>
      <thead>
        <tr><th>titre</th><th>notes</th><th>status</th><th>date</th><th>actions</th></tr>
      </thead>
      <tbody>
        {tasks.map(t=>(
          <tr key={t.id} style={{background:t.color, fontWeight:t.bold?'bold':'normal'}}>
            <td>{t.title}</td>
            <td>{t.notes}</td>
            <td>{t.status}</td>
            <td>{t.date}</td>
            <td>
              <button onClick={()=>moveTask(t.id,'todo')}>todo</button>
              <button onClick={()=>moveTask(t.id,'doing')}>doing</button>
              <button onClick={()=>moveTask(t.id,'done')}>done</button>
              <button onClick={()=>removeTask(t.id)}>supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
