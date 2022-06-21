import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import TestAuth from "./pages/TestAuth";
import './app.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />

          {/* Auth  */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Test Pages  */}
          <Route path='/testAuth' element={<TestAuth />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
