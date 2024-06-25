
export default function Error(props) {

    if (props.errorlist.length > 0) {

        const listItems = props.errorlist.map((person, i) =>
            <li key={i} className="errror">{person}</li>
        );
        return (
            <>
                <p className="errror">Errors</p>
                <ul className="errror">{listItems}</ul>
            </>
        );

    }
}