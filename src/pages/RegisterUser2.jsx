import { useHistory } from 'react-router';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/authService';
import React, { useState, useEffect } from "react";

export default function RegisterUser2() {

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const initialValues = {
        "userName": "",
        "email": "",
        "password": "",
        "passwordConfirm": "",
    };
    const validationSchema = Yup.object({
        "userName": Yup.string().max(50, "Over 50 Characters").required("Required Field"),
        "email": Yup.string().email("Not a Valid Email").max(50, "Over 50 Characters").required("Required Field"),
        "password": Yup.string().max(25, "Over 25 Characters").required("Required Field"),
        "passwordConfirm": Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),

    });
    const onSubmit = async (values, { setSubmitting }) => {//
        alert("ekleme");
        const { userName, email, password, } = values;

       AuthService.registerUser(userName, email, password).then(
            (response) => {
                setMessage(response.data.message);
                setSuccess(true);
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
               
            }
        );
        
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Formik >
                    {({ isSubmitting }) => (
                        <Form onSubmit={formik.handleSubmit} class="ui form">

                            <div>
                                <div className="form-group">
                                    <label htmlFor="userName">Username</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        name="userName"
                                        value={formik.values.userName} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    />
                                    {(formik.touched.userName || "") && (formik.errors.userName || "") && (
                                        <div className="error">{formik.errors.userName || ""}</div>)}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    /> {(formik.touched.email || "") && (formik.errors.email || "") && (
                                        <div className="error">{formik.errors.email || ""}</div>)}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    />
                                    {(formik.touched.password || "") && (formik.errors.password || "") && (
                                        <div className="error">{formik.errors.password || ""}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordConfirm">Confirm Password</label>
                                    <Field
                                        type="password"
                                        className="form-control"
                                        name="passwordConfirm"
                                        value={formik.values.passwordConfirm} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    />
                                    {(formik.touched.passwordConfirm || "") && (formik.errors.passwordConfirm || "") && (
                                        <div className="error">{formik.errors.passwordConfirm || ""}</div>)}
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting}>Sign Up</button>
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

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

//export default RegisterUser2;