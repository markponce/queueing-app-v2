import React, {useState, useEffect} from 'react'


function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  

  useEffect(() => {
    console.log(email)
  }, [email])

  useEffect(() => {
    console.log(password)
  }, [password])


  const handleChange = (e) => {
    switch(e.target.id) {
      case 'email':
        setEmail(e.target.value)
        break;
      case 'password':
        setPassword(e.target.value)
        break;
      default:
    }
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then((res) => res.json)
    .then((data) => console.log(data))
    .catch(err => console.log(err));
  }

  const getSession = () => {
    fetch('/userSession').then((res) => res.json)
    .then((data) => console.log(data))
    .catch(err => console.log(err));
  }

  const logOut = () => {
    fetch('/users/logout').then((res) => res.json)
    .then((data) => console.log(data))
    .catch(err => console.log(err));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="email" id="email" onChange={handleChange} value={email} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" onChange={handleChange} value={password} />
        </div>
        <button>Login</button>
      </form>
      <button onClick={getSession}>Get Session</button>
      <button onClick={logOut}>Logout</button>
    </div>
  )
}

export default Login
