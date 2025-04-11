import React from "react";
import { useState, useEffect } from "react";
import { useParams, } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/authService';
import EmployerService from '../services/employerService';

export default function EmployerProfile() {

    const currentUser = AuthService.getCurrentUser();
    const employerService = new EmployerService();

    let { employerId } = useParams();
    const [employer, setEmployer] = useState({});
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (
            !currentUser ||
            (!currentUser.roles.includes("ROLE_EMPLOYER") &&
                !currentUser.roles.includes("ROLE_ADMIN"))
        ) {
            history("/unauthorized");
        } else {
            loadEmployer();
        }
    }, [currentUser.id]);

    const initialValues = {
        "id": currentUser.id,
        "companyName": "",
        "webAddress": "https://www.",
        "phoneNumber": "",
        "email": "",
        "username": "",
        //"password": "",
        //"passwordConfirm": "",
    }
    const extractDomainFromWebAddress = (urlStr) => {
        const webDomain = urlStr.replace(/https?:\/\//, '').replace('www.', '').split('/')[0];
        return webDomain.split('@').pop();
    };
    const extractDomainFromEmail = (emailStr) => {
        const emailDomain = emailStr.replace(/https?:\/\//, '').split('/')[0];
        return emailDomain.split('@').pop();
    };

    const validationSchema = Yup.object({
        "companyName": Yup.string().max(255, "Over 255 Characters").required("Required Field"),
        "phoneNumber": Yup.string().max(11, "Over 17 Characters").required("Required Field"),
        "email": Yup.string().email("Not a Valid Email").max(50, "Over 50 Characters").required("Required Field"),
        "webAddress": Yup.string().max(50, "Over 50 Characters").required("Required Field")
            .test('domains-match', 'Email and web address domains must match', function (value) {
                const { email } = this.parent;
                if (!email || !value)
                    return true; // Skip if either field is not present 
                const emailDomain = extractDomainFromEmail(email);
                const webDomain = extractDomainFromWebAddress(value);
                return emailDomain === webDomain;
            }),
        //"password": Yup.string().max(25, "Over 25 Characters").required("Required Field"),
        //"passwordConfirm": Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),

    });



    const loadEmployer = async () => {
        alert("loading employer");
        try {
            const result = await employerService.getEmployerById(currentUser.id);
            const empData = result.data.data;

           alert("empData retrieved: " + empData.username);

            if ( employerId === currentUser.id.toString() ||     ///toString() e gerek var mý
                currentUser.roles.includes("ROLE_ADMIN") 
            ) {
                formik.setFieldValue("username", empData.username || "");
                formik.setFieldValue("email", empData.email || "");
                formik.setFieldValue("companyName", empData.companyName || "");
                formik.setFieldValue("webAddress", empData.webAddress || "");
                formik.setFieldValue("phoneNumber", empData.phoneNumber || "");

                setEmployer(empData);
            } else {
                history("/unauthorized");
            }
        } catch (error) {
            console.error("An error occurred while loading employer data:", error);
        }
    };

    const onSubmit = async (values, { setSubmitting }) => {
        setMessage("");
        setSuccess(false);
        setSubmitting(true);
        //values.username = values.email; //username email olarak gönderilecek

        //const { employerId, username, email, companyName, webAddress, phoneNumber, } = values;

        alert(JSON.stringify(values, null, 2));

        employerService.updateEmployer(values)
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
                    <strong>{currentUser.username}</strong> Employer Profile
                </h3>
            </header>
            <p>
                <strong>Id:</strong> {employerId}<br />
                <strong>Id:</strong> {currentUser.id}<br />
            </p>
            <Formik >
                {({ isSubmitting }) => (
                    <Form onSubmit={formik.handleSubmit} class="ui form">
                        <div className="ui divided two column grid">

                            <div className="row">
                                <div className="column required field">
                                    <label htmlFor="companyName">Company Name </label>
                                    <Field type="text" name="companyName" value={formik.values.companyName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {(formik.touched.companyName || "") && (formik.errors.companyName || "") && (
                                        <div className="error">{formik.errors.companyName || ""}</div>)}
                                </div>

                                <div className="column required field">
                                    <label htmlFor="webAddress">Web Address</label>
                                    <Field type="text" name="webAddress" value={formik.values.webAddress}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {(formik.touched.webAddress || "") && (formik.errors.webAddress || "") && (
                                        <div className="error">{formik.errors.webAddress || ""}</div>)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="column required field">
                                    <label htmlFor="phoneNumber">Phone Number </label>
                                    <Field type="text" name="phoneNumber" value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {(formik.touched.phoneNumber || "") && (formik.errors.phoneNumber || "") && (
                                        <div className="error">{formik.errors.phoneNumber || ""}</div>)}
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

