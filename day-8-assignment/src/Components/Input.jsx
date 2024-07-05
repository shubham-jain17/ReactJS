export default function Input(props) {

    return (<>
        <input type={props.type} value={props.value} onChange={props.handleChange} name={props.name} className='col-75' ></input>
    </>);
}