export default function InputRadio(props) {
    return (<>
        <input type="radio" value={props.value} onChange={props.handleChange} name={props.name}></input>
    </>);
}