import Input from './Input';
import { useState } from 'react';
import Table from './Table';
export default function Form() {
    //#region States
    const [btnName, setBtnName] = useState("Add");
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


        if (validProduct()) {
            let temp = [...productList];
            temp.push(product);

            setProductList(temp);

            setFormData({
                Id: "",
                name: "",
                price: "",
                quantity: "",
            });
        }


        if (btnName === "Save") {
            setBtnName("Add");
        }

    }



    const handleChange = (e) => {
        setFormData({
            ...product, [e.target.name]: e.target.value
        })

    }

    const handleDelete = (e) => {
        const newProdList = productList.filter((obj) => obj.Id !== e.target.id);
        setProductList(newProdList);
    }

    const handleEdit = (e) => {
        const newProd = productList.filter((obj) => obj.Id === e.target.id);
        const newProdList = productList.filter((obj) => obj.Id !== e.target.id);
        setProductList(newProdList)
        setFormData(newProd[0]);
        setBtnName("Save");

    }
    //#endregion


    function validProduct() {
        if (product.Id !== 0 &&
            product.name.length > 0 &&
            product.price > 0) {

            return true
        }
        else {
            return false;
        }
    }
    //#region JSX
    return (<div>
        <form onSubmit={handleSubmit}>
            <div >
                <label className='col-25' htmlFor="Id">Product Id: </label>
                <Input handleChange={handleChange} type="number" value={product.Id} name="Id" />
            </div>
            <div>
                <label className='col-25' htmlFor="name">Product Name: </label>
                <Input handleChange={handleChange} value={product.name} name="name" />
            </div>

            <div>
                <label className='col-25' htmlFor="quantity">Quantity: </label>
                <Input handleChange={handleChange} type="number" value={product.quantity} name="quantity" />
            </div>
            <div>
                <label className='col-25' htmlFor="price">Price: </label>
                <Input handleChange={handleChange} type="number" value={product.price} name="price" />
            </div>
            <div> <input type="submit" value={btnName}></input></div>
        </form>
        <Table productList={productList} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
        //#endregion
    );

}