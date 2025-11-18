import React, { useState } from 'react'
import Home from './pages/Home.jsx'
import Dashboard from './Dashboard.jsx'

export default function App(){
  const [user, setUser] = useState(null)
  if(!user) return <Home onLogin={setUser} />
  return <Dashboard user={user} />
}
