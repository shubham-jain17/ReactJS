export default function InputDate(props) {
    return (<>
        <input type="date" value={props.value} onChange={props.handleChange} name={props.name}></input>
    </>);
}