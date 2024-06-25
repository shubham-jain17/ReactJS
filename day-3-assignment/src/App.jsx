import logo from './logo.svg';
import './App.css';
import InputText from './Components/InputText';
import InputFile from './Components/InputFile';
import InputRadio from './Components/InputRadio';
import InputRange from './Components/InputRange';
import InputDate from './Components/InputDate';
import InputOption from './Components/InputOption';

function App() {
  return (
    <div style ={{display:"flex",flexDirection:"column", width:"30%", gap:"10px"}}>
   <InputText/>
   <InputFile/>
   <InputRadio/>
   <InputRange/>
   <InputDate/>
   <InputOption/>
   </div>
  );
}

export default App;
