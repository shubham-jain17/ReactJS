export default function InputOptions(props){
    return(
    <>  
    <select name="cars" id="cars">
        <option value={props.value1}>{props.option1}</option>
        <option value={props.value2}>{props.option1}</option>
        <option value={props.value3}>{props.option1}</option>
        <option value={props.value4}>{props.option1}</option>
    </select>
    </>  
    );
 
}