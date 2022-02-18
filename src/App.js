import './App.css';
import Index from './product-card';
import Login from './login-form/Login';
import {BrowserRouter,Link,Routes,Route} from 'react-router-dom'
import SignUp from './signup/signup';
import Invalid from './invalid/invalid'
function App() {
  
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Index/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="*" element={<Invalid/>}/>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
