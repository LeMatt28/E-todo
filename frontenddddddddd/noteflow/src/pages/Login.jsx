import React, { useState } from 'react'

export default function Login({ onLogin }){
  const [form, setForm] = useState({ username:'', password:'' })

  function submit(e){
    e.preventDefault()
    if(!form.username || !form.password) return
    onLogin(form.username)
  }

  return (
    <form onSubmit={submit} className="login-form">
      <input placeholder="nom d'utilisateur" value={form.username} onChange={e=>setForm({...form, username:e.target.value})}/>
      <input type="password" placeholder="mot de passe" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
      <button type="submit">connexion</button>
    </form>
  )
}