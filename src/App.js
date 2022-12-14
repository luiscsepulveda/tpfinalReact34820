
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Navbar from './components/Navbar/Navbar'


function App() {
  return (
    <div className="App">
  
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<ItemListContainer />}/>
          <Route path='/category/:categoryId'element={<ItemListContainer />}/>
          <Route path='/detail/:productId' element={<ItemDetailContainer />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
