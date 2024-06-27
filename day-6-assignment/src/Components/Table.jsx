export default function Table(props) {

    const rows = props.productList.map((p, i) => {
        return (<tr key={i}>
            <td>{p.Id}</td>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.quantity}</td>
            <td>
                <button onClick={props.handleEdit} id={p.Id}>Edit</button>
            </td>
            <td>
                <button onClick={props.handleDelete} id={p.Id}>Delete</button>
            </td>
        </tr>);
    })


    return (
        <table>
            <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            <tbody>{rows}</tbody>
        </table>
    );
}