import React from 'react'

export default function KanbanView({ tasks, moveTask, removeTask }){
  const columns = ['todo','doing','done']
  return (
    <div style={{display:'flex', gap:'10px'}}>
      {columns.map(col=>(
        <div key={col} style={{flex:1, padding:'10px', border:'1px solid #ccc', borderRadius:'8px'}}>
          <h3>{col}</h3>
          {tasks.filter(t=>t.status===col).map(t=>(
            <div key={t.id} style={{background:t.color, margin:'4px', padding:'6px', borderRadius:'6px', fontWeight:t.bold?'bold':'normal'}}>
              {t.title}
              <div style={{marginTop:'4px'}}>
                {columns.map(c=>c!==col && <button key={c} onClick={()=>moveTask(t.id,c)} style={{marginRight:'2px'}}>{c}</button>)}
                <button onClick={()=>removeTask(t.id)}>x</button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
