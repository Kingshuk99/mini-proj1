import React from "react";
import { Formik , Form , Field , ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const AddItem = ({item, addItem}) => {
    const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <Formik
        initialValues={{
            name: "",
            desc: "",
            image: "",
            price: ""
        }}
        validationSchema={
            Yup.object({
                name: Yup.string().required('Provide name of item')
                .min(1, 'Name should be more than 1 character')
                .max(50, 'Name should not be more than 50 characters'),

                desc: Yup.string().required('Provide description of the item')
                .min(1, 'Description should be more than 1 character')
                .max(500, 'Description should be less than 100 characters'),

                image: Yup.string().required('Image URL is required'),

                price: Yup.number().required('Price should not be blank')
            })
        }

        onSubmit={(data, {resetForm}) => {
            addItem(data);
            resetForm();
            navigate(`/menu/${item}`)
        }}
        >
            <Form>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <Field type="text" name="name" className="form-control" id="exampleInputName1" aria-describedby="nameHelp"/>
                <ErrorMessage name = "name" component="div"/>
            </div>
            <div className="mb-3">
                <label htmlFor="desc" className="form-label">
                    Description
                </label>
                <Field type="text" name="desc" className="form-control" id="exampleInputDesc1" aria-describedby="descHelp"/>
                <ErrorMessage name = "desc" component="div"/>
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    Image URL
                </label>
                <Field type="url" name="image" className="form-control" id="exampleInputUrl1" aria-describedby="urlHelp"/>
                <ErrorMessage name = "image" component="div"/>
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">
                    Price
                </label>
                <Field type="number" name="price" className="form-control" id="exampleInputPrice1" aria-describedby="priceHelp"/>
                <ErrorMessage name = "price" component="div"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </Form>
        </Formik>
      </div>
    </>
  )
};

export default AddItem;
