export default function Table(props) {

    const rows = props.productList.map((p, i) => {
        return (<tr key={i}>
            <td>{p.Id}</td>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.quantity}</td>
        </tr>);
    })


    return (
        <table className="form-style">
            <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
            <tbody>{rows}</tbody>
        </table>
    );
}