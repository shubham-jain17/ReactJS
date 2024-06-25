export default function InputFile(props) {
    return (<>
        <input type="file" value={props.Value} name={props.name}></input>
    </>);
}