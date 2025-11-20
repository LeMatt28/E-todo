import React, { useState } from 'react'

export default function Header({ theme, setTheme, addTask }){
  const [title, setTitle] = useState('')
  function submit(e){
    e.preventDefault()
    if(!title) return
    addTask({ title })
    setTitle('')
  }
  return (
    <div className="header">
      <form onSubmit={submit}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="nouvelle tâche..." />
        <button type="submit">ajouter</button>
      </form>
      <button onClick={()=>setTheme(theme==='dark'?'light':'dark')}>
        {theme==='dark'?'clair':'sombre'}
      </button>
    </div>
  )
}
