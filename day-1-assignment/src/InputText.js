export default function InputText({placeHolder,inputChange,inputValue}){
   return <input type="text" placeholder = {placeHolder} onChange={inputChange} value={inputValue}></input> 
}