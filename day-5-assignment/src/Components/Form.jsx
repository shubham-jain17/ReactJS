import Input from './Input';
import { useState } from 'react';
import Table from './Table';
export default function Form() {
    //#region States
    const [productList, setProductList] = useState([]);
    const [product, setFormData] = useState({
        Id: "",
        name: "",
        price: "",
        quantity: "",
    })


    //#endregion

    //#region Form Events
    const handleSubmit = (e) => {
        e.preventDefault();

        let temp = [...productList];
        temp.push(product);

        setProductList(temp);

        setFormData({
            Id: "",
            name: "",
            price: "",
            quantity: "",
        });
        console.log(productList);

    }

    const handleChange = (e) => {
        setFormData({
            ...product, [e.target.name]: e.target.value
        })

    }
    //#endregion

    //#region JSX
    return (<div className='container'>
        <form className='form-style' onSubmit={handleSubmit}>
            <div className='field' >
                <label htmlFor="Id">Product Id: </label>
                <Input handleChange={handleChange} type="number" value={product.Id} name="Id" />
            </div>
            <div className='field'>
                <label htmlFor="name">Product Name: </label>
                <Input handleChange={handleChange} value={product.name} name="name" />
            </div>

            <div className='field'>
                <label htmlFor="quantity">Quantity: </label>
                <Input handleChange={handleChange} type="number" value={product.quantity} name="quantity" />
            </div>
            <div className='field'>
                <label htmlFor="price">Price: </label>
                <Input handleChange={handleChange} type="number" value={product.price} name="price" />
            </div>
            <div className='field'> <input type="submit" value="Add"></input></div>
        </form>
        <Table productList={productList} />
    </div>
        //#endregion
    );
}