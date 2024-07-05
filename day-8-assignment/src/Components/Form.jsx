import Input from './Input';
import { useState } from 'react';
import Table from './Table';
import { useSelector, useDispatch } from 'react-redux'
import { formActions } from '../Redux/formSlice'


export default function Form() {
    const initialFormState = {
        Id: "",
        name: "",
        price: "",
        quantity: "",
    }
    const dispatch = useDispatch();
    //#region States
    const btnName = useSelector((state) => state.form.btnName)
    const productList = useSelector((state) => state.form.formItems);
    const [product, setFormData] = useState(initialFormState)


    //#endregion
    //action




    //#region Form Events
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validProduct()) {
            dispatch(formActions.add(product))
            setFormData(initialFormState);
        }

        if (btnName === "Save") {
            dispatch(formActions.chgBtnName("Add"));
        }


    }

    const handleChange = (e) => {
        setFormData({
            ...product, [e.target.name]: e.target.value
        })

    }

    const handleDelete = (e) => {
        dispatch(formActions.delete(e.target.id))
    }

    const handleEdit = (e) => {
        const product = productList.filter(item => item.Id === e.target.id)
        setFormData(product[0]);
        dispatch(formActions.edit(e.target.id));
        dispatch(formActions.chgBtnName("Save"));

    }

    //#endregion


    function validProduct() {
        if (product.Id !== 0 && product.Id !== null &&
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
        <Table handleDelete={handleDelete} handleEdit={handleEdit}></Table>

    </div>
        //#endregion
    );

}