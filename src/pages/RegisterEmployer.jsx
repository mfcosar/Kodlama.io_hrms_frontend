import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Formik, Form, Field, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import AuthService  from '../services/authService';
export default function RegisterEmployer() {

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const initialValues = {
        "companyName": "",
        "webAddress": "https://www.",
        "phoneNumber": "",
        "email": "",
        "username": "",
        "password": "",
        "passwordConfirm":"",
    }
    const extractDomainFromWebAddress = (urlStr) =>
    {
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
        "password": Yup.string().max(25, "Over 25 Characters").required("Required Field"),
        "passwordConfirm": Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),

    });

    const onSubmit = async (values, { setSubmitting }) => {
   
        values.username = values.email; //username email olarak gönderilecek

        const { username, email, password, companyName, webAddress, phoneNumber, } = values;
      
        alert(JSON.stringify(values, null, 2));

        AuthService.registerEmployer(username, email, password, companyName, webAddress, phoneNumber)
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
        <div><h3>Register Employer</h3><hr />
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