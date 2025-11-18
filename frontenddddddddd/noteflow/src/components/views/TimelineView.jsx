import React from 'react'

export default function TimelineView({ tasks }){
  const sorted = [...tasks].sort((a,b)=>new Date(a.date)-new Date(b.date))
  return (
    <ul>
      {sorted.map(t=>(
        <li key={t.id} style={{background:t.color, fontWeight:t.bold?'bold':'normal', margin:'4px', padding:'6px', borderRadius:'6px'}}>
          {t.date} - {t.title} ({t.status})
        </li>
      ))}
    </ul>
  )
}
