import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Formik, Form, Field, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import AuthService  from '../services/authService';
export default function RegisterEmployee() {

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const initialValues = {
        "firstName": "",
        "lastName": "",
        "email": "",
        "username": "",
        "password": "",
        "passwordConfirm":"",
    }

    const validationSchema = Yup.object({
        "firstName": Yup.string().max(50, "Over 50 Characters").required("Required Field"),
        "lastName": Yup.string().max(50, "Over 50 Characters").required("Required Field"),
        "email": Yup.string().email("Not a Valid Email").max(50, "Over 50 Characters").required("Required Field"),
        "password": Yup.string().max(25, "Over 25 Characters").required("Required Field"),
        "passwordConfirm": Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    });

    const onSubmit = async (values, { setSubmitting }) => {
   
        values.username = values.email; //username email olarak gönderilecek

        const { username, email, password, firstName, lastName, } = values;
      
        alert(JSON.stringify(values, null, 2));

        AuthService.registerEmployee(username, email, password, firstName, lastName,)
            .then( (response) => {
                setMessage(response.data.message);
                setSuccess(true);
                setSubmitting(false);
            },
            (error) => { //backend'den gelen hatayi goster
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                    setMessage(resMessage);
                setSuccess(false);
                setSubmitting(false);
                }
            );
     };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
        });

    return (
        <div><h3>Register Admin</h3><hr />
            <Formik >
                {({ isSubmitting }) => (
                    <Form onSubmit={formik.handleSubmit} class="ui form">
                        <div className="ui divided two column grid">
                        
                        <div className="row">
                                <div className="column required field">
                                    <label htmlFor="firstName">First Name </label>
                                    <Field type="text" name="firstName" value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {(formik.touched.firstName || "") && (formik.errors.firstName || "") && (
                                        <div className="error">{formik.errors.firstName || ""}</div>)}
                                </div>

                                <div className="column required field">
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field type="text" name="lastName" value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {(formik.touched.lastName || "") && (formik.errors.lastName || "") && (
                                        <div className="error">{formik.errors.lastName || ""}</div>)}
                                </div>
                        </div>
                        <div className="row">
                                <div className="column required field">
                                    <label htmlFor="verified">Verified &nbsp;&nbsp;
                                        <input type="checkbox" name="verified" checked={formik.values.verified} disabled value={formik.values.verified}
                                            onChange={formik.handleChange} onBlur={formik.handleBlur} /></label>
                                    {(formik.touched.verified || "") && (formik.errors.verified || "") && (
                                        <div className="error">{formik.errors.verified || ""}</div>)}
                                </div>

                        </div>
                        <div className="row">
                            <div className="column required field">
                                <label htmlFor="email">E-mail </label>
                                <Field type="text" name="email" value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                {(formik.touched.email || "") && (formik.errors.email || "") && (
                                    <div className="error">{formik.errors.email || ""}</div>)}
                            </div>
                            <div className="column required field">
                                <label htmlFor="username">User Name</label>
                                    <Field type="text" name="username" value={formik.values.email}
                                         onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        disabled="true" />
                                    {(formik.errors.email || "") && (
                                        <div className="error">{formik.errors.email || ""}</div>)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="column required field">
                                <label htmlFor="password">Password </label>
                                <Field type="text" name="password" value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                                {(formik.touched.password || "") && (formik.errors.password || "") && (
                                    <div className="error">{formik.errors.password || ""}</div>)}
                            </div>
                            <div className="column required field">
                            <label htmlFor="passwordConfirm">Password Confirm</label>
                            <Field type="text" name="passwordConfirm" value={formik.values.passwordConfirm}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                                {(formik.touched.passwordConfirm || "") && (formik.errors.passwordConfirm || "") && (
                                    <div className="error">{formik.errors.passwordConfirm || ""}</div>)}
                            </div>
                        </div>

                            <div className="row">
                                <div className="column">
                                    <button class="ui button primary fluid" type="submit" disabled={success || isSubmitting }>Submit</button>
                                </div>

                        </div>
                        {message && (
                            <div className="form-group">
                                <div className={success ? "alert alert-success" : "alert alert-danger"}
                                    role="alert">
                                    {message}
                                </div>
                            </div>
                        )}    
                    </div>    
                    </Form>
                )}
            </Formik>

        </div>
    )
}