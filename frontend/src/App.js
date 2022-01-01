import React,{useState} from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

import RestaurantsList from './components/restaurants-list';
import Restaurant from './components/restaurants';
import AddReview from './components/add-review';
import Login from './components/login';

function App() {

  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user)
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" >Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav">
              <Link to="/restaurants" className='nav-link'>Restaurants</Link>
              {user
                ? <a href="/" onClick={logout} className="nav-link" style={{ cursor: 'pointer' }}>Logout</a>
                : <Link to="/login" onClick={login} className="nav-link">Login</Link>
              }
            </div>
          </div>
              
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          {/* <Route exact path={"/"} element={<RestaurantsList/>} /> */}
          <Route exact path="/restaurants" element={<RestaurantsList user={user }/>} />
          <Route path="/restaurants/:id/review" element={<AddReview />} />
          <Route path="/restaurants/:id" element={<Restaurant user={user}/>} />
          <Route path="/login" element={<Login user={user} login={login} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
