import React, { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Views from './components/Views.jsx'

const sample = [
  { id:1, title:'préparer présentation', notes:'slides + demo', status:'todo', date:'2025-11-20', color:'#b892ff', bold:false },
  { id:2, title:'réviser code', notes:'', status:'doing', date:'2025-11-22', color:'#ffd1ff', bold:true },
  { id:3, title:'envoyer rapport', notes:'', status:'done', date:'2025-11-18', color:'#d0e7ff', bold:false }
]

export default function Dashboard({ user }){
  const [tasks,setTasks] = useState(()=>{
    try{const s=localStorage.getItem('tasks_vite'); return s?JSON.parse(s):sample}catch(e){return sample}
  })
  const [theme,setTheme] = useState(()=>{ return localStorage.getItem('theme')==='dark'?'dark':'light' })

  useEffect(()=>{ localStorage.setItem('tasks_vite', JSON.stringify(tasks)) }, [tasks])
  useEffect(()=>{ localStorage.setItem('theme', theme) }, [theme])

  function addTask(t){ setTasks(prev=>[{ id:Date.now(), status:t.status||'todo', title:t.title||'', notes:t.notes||'', date:t.date||'', color:t.color||'#b892ff', bold:!!t.bold }, ...prev]) }
  function updateTask(id,patch){ setTasks(prev=>prev.map(item=>item.id===id?{...item,...patch}:item)) }
  function removeTask(id){ setTasks(prev=>prev.filter(item=>item.id!==id)) }
  function moveTask(id,toStatus){ if(!['todo','doing','done'].includes(toStatus)) return; updateTask(id,{status:toStatus}) }

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <Header theme={theme} setTheme={setTheme} addTask={addTask} />
        <Views tasks={tasks} updateTask={updateTask} removeTask={removeTask} moveTask={moveTask} />
      </div>
    </div>
  )
}