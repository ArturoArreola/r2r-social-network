import React, { useState } from 'react';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import "./scss/index.scss"

export default function App() {

  const [user, setUser] = useState({name:"lol"});
  return <div>{user ? (
      <div>
        <WelcomePage />
      </div>
  ) : <h1>No logueado</h1>}</div>
}
