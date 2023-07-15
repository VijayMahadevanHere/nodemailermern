import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Header from './componets/header'
import {ToastContainer} from 'react-toastify'
function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Header/>
      <Routes>
        <Route path='/' element={<Register/>} /> 
        <Route path='/login' element={<Login/>} /> 
        <Route path='/dashboard' element={<Dashboard/>} /> 
      </Routes>
      <ToastContainer/>
      </div>
      
    </Router>
     
    </>
  );
}

export default App;
