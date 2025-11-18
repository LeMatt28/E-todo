import React, { useState } from 'react'
import TableView from './components/views/TableView.jsx';
import TimelineView from './components/Views/TimelineView.jsx'
import KanbanView from './components/views/KanbanView.jsx'

export default function Views({ tasks, updateTask, removeTask, moveTask }){
  const [view, setView] = useState('table')
  return (
    <div className="views">
      <div className="viewnav">
        <button onClick={()=>setView('table')}>tableau</button>
        <button onClick={()=>setView('timeline')}>chronologie</button>
        <button onClick={()=>setView('kanban')}>kanban</button>
      </div>
      <div className="view">
        {view==='table' && <TableView tasks={tasks} updateTask={updateTask} removeTask={removeTask} moveTask={moveTask}/>}
        {view==='timeline' && <TimelineView tasks={tasks} updateTask={updateTask} removeTask={removeTask} moveTask={moveTask}/>}
        {view==='kanban' && <KanbanView tasks={tasks} updateTask={updateTask} removeTask={removeTask} moveTask={moveTask}/>}
      </div>
    </div>
  )
}
