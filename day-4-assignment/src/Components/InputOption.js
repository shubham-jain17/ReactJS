export default function InputOptions(props) {
    return (
        <>
            <select name={props.name} onChange={props.handleChange} >
                <option value={props.option1}>{props.option1}</option>
                <option value={props.option2}>{props.option2}</option>
                <option value={props.option3}>{props.option3}</option>
                <option value={props.option4}>{props.option4}</option>
            </select>
        </>
    );

}