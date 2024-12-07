import logo from './logo.svg';
import './App.css';
import{BrowserRouter , Router,Route, Routes} from "react-router-dom"
import Join from "../src/Components/Join/Join"
import socketIO from "socket.io-client"
import Chat from './Components/Chat/Chat';
// const ENDPOINT ="http://localhost:4500/";
// const socket=socketIO(ENDPOINT,{transports:['websocket']})

function App() {

 
  return (
   <BrowserRouter>
   <Routes>
    <Route exact path='/' element={<Join/>}></Route>
    <Route path='/chat' element={<Chat/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
