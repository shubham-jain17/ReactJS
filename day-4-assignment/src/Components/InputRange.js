export default function InputRange(props) {
    return (<>
        <input type="range" value={props.Value} onChange={handleChange} name={props.name}></input>
    </>);
}