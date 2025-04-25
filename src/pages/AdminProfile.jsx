import React from "react";
import { useState, useEffect } from "react";
import { useParams, } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/authService';
import EmployeeService from '../services/employeeService';

export default function AdminProfile() {

    const currentUser = AuthService.getCurrentUser();
    const employeeService = new EmployeeService();

    let { employeeId } = useParams();
    const [employee, setEmployee] = useState({});
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (!currentUser || (!currentUser.roles.includes("ROLE_ADMIN"))) {
            history("/unauthorized");
        } else {
            loadEmployee();
        }
    }, [currentUser.id]);

    const initialValues = {
        "id": currentUser.id,
        "username": "",
        "email": "",
        "firstName": "",
        "lastName": "",
        "verified": "",
        //"password": "",
        //"passwordConfirm": "",
    }


    const validationSchema = Yup.object({
        "firstName": Yup.string().max(50, "Over 50 Characters").required("Required Field"),
        "lastName": Yup.string().max(50, "Over 50 Characters").required("Required Field"),
        "email": Yup.string().email("Not a Valid Email").max(50, "Over 50 Characters").required("Required Field"),
        "verified": Yup.boolean().required("This field is required"),
        //"password": Yup.string().max(25, "Over 25 Characters").required("Required Field"),
        //"passwordConfirm": Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),

    });



    const loadEmployee = async () => {
        alert("loading employee/admin : " + employeeId);
        try {
            const result = await employeeService.getEmployeeById(currentUser.id);
            const empData = result.data.data;

            alert("empData retrieved: " + JSON.stringify(empData));

            if ( employeeId === currentUser.id.toString() ||     ///toString() e gerek var mý
                currentUser.roles.includes("ROLE_ADMIN") 
            ) {
                alert("empData retrieved: " + empData.username);
                formik.setFieldValue("username", empData.username || "");
                formik.setFieldValue("email", empData.email || "");
                formik.setFieldValue("firstName", empData.firstName || "");
                formik.setFieldValue("lastName", empData.lastName || "");
                formik.setFieldValue("verified", empData.verified || "");

                setEmployee(empData);
            } else {
                history("/unauthorized");
            }
        } catch (error) {
            console.error("An error occurred while loading employee data:", error);
        }
    };

    const onSubmit = async (values, { setSubmitting }) => {
        setMessage("");
        setSuccess(false);
        setSubmitting(true);
        //values.username = values.email; //username email olarak gönderilecek

        //const { employerId, username, email, companyName, webAddress, phoneNumber, } = values;

        alert(JSON.stringify(values, null, 2));

        employeeService.updateEmployee(values)
            .then((response) => {
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
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Admin Profile
                </h3>
            </header>
            <p>
                <strong>Id:</strong> {employeeId}<br />
                <strong>Id:</strong> {currentUser.id}<br />
            </p>
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
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} disabled="true"/>
                                    {(formik.touched.email || "") && (formik.errors.email || "") && (
                                        <div className="error">{formik.errors.email || ""}</div>)}
                                </div>
                                <div className="column required field">
                                    <label htmlFor="username">User Name</label>
                                    <Field type="text" name="username" value={formik.values.email}
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} disabled="true" />
                                    {(formik.touched.email || "") && (formik.errors.email || "") && (
                                        <div className="error">{formik.errors.email || ""}</div>)}
                                </div>
                            </div>
                            {/*<div className="row">
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
                            */}

                            <div className="row">
                                <div className="column">
                                    <button class="ui button primary fluid" type="submit" disabled={isSubmitting}>Update</button>
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
    );
};

