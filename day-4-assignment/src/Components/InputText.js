export default function InputText(props) {

    return (<>
        <input type="text" value={props.value} onChange={props.handleChange} name={props.name} ></input>
    </>);
}