import React, { useState } from 'react'

export default function Register({ onLogin }){
  const [form,setForm] = useState({ username:'', password:'', confirm:'' })

  function submit(e){
    e.preventDefault()
    if(!form.username || !form.password || form.password !== form.confirm) return
    onLogin(form.username)
  }

  return (
    <form onSubmit={submit} className="register-form">
      <input placeholder="nom d'utilisateur" value={form.username} onChange={e=>setForm({...form, username:e.target.value})}/>
      <input type="password" placeholder="mot de passe" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
      <input type="password" placeholder="confirmer mot de passe" value={form.confirm} onChange={e=>setForm({...form, confirm:e.target.value})}/>
      <button type="submit">créer compte</button>
    </form>
  )
}