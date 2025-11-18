import React, { useState } from 'react'
import Login from './Login.jsx'
import Register from './Register.jsx'

export default function Home({ onLogin }){
  const [view, setView] = useState('login')
  return (
    <div className="home-page">
      <h1>bienvenue sur tasks</h1>
      <div className="tabs">
        <button onClick={()=>setView('login')} className={view==='login'?'active':''}>connexion</button>
        <button onClick={()=>setView('register')} className={view==='register'?'active':''}>création</button>
        <button onClick={()=>alert('aide : utilisez le site pour gérer vos tâches')}>aide</button>
      </div>
      <div className="form-container">
        {view==='login' && <Login onLogin={onLogin} />}
        {view==='register' && <Register onLogin={onLogin} />}
      </div>
    </div>
  )
}