import React from "react";
import { useState, useEffect } from "react";
import { useParams, } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/authService';
import CandidateService from '../services/candidateService';

export default function CandidateProfile() {

    const currentUser = AuthService.getCurrentUser();
    const candidateService = new CandidateService();

    let { candidateId } = useParams();
    const [candidate, setCandidate] = useState({});
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (
            !currentUser ||
            (!currentUser.roles.includes("ROLE_CANDIDATE") &&
                !currentUser.roles.includes("ROLE_ADMIN"))
        ) {
            history("/unauthorized");
        } else {
            loadCandidate();
        }
    }, [currentUser.id]);

    const initialValues = {
        "id": currentUser.id,
        "firstName": "",
        "lastName": "",
        "tcIdentityNumber": "",
        "birthYear": "",
        "email": "",
        "username": "",
        //"password": "",
        //"passwordConfirm": "",
    }

    const validationSchema = Yup.object({
        "firstName": Yup.string().max(50, "Over 50 Characters").required("Required Field"),
        "lastName": Yup.string().max(50, "Over 50 Characters").required("Required Field"),
        "tcIdentityNumber": Yup.string().max(11, "Over 11 Characters").min(11, "Less than 11 Characters").required("Required Field"),
        "birthYear": Yup.number().min(1, "Less than 1").positive().integer(),
        "email": Yup.string().email("Not a Valid Email").max(50, "Over 50 Characters").required("Required Field"),
        //"password": Yup.string().max(25, "Over 25 Characters").required("Required Field"),
        //"passwordConfirm": Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    });



    const loadCandidate = async () => {
        alert("loading candidate");
        try {
            const result = await candidateService.getCandidateById(currentUser.id);
            const candidateData = result.data.data;

            alert("candidateData retrieved: " + candidateData.username);

            if ( candidateId === currentUser.id.toString() ||
                currentUser.roles.includes("ROLE_ADMIN") 
            ) {
                formik.setFieldValue("username", candidateData.username || "");
                formik.setFieldValue("email", candidateData.email || "");
                formik.setFieldValue("firstName", candidateData.firstName || "");
                formik.setFieldValue("lastName", candidateData.lastName || "");
                formik.setFieldValue("tcIdentityNumber", candidateData.tcIdentityNumber || "");
                formik.setFieldValue("birthYear", candidateData.birthYear || "");

                setCandidate(candidateData);
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
        values.username = values.email;

        alert(JSON.stringify(values, null, 2));

        candidateService.updateCandidate(values)
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
                    <strong>{currentUser.username}</strong> Candidate Profile
                </h3>
            </header>
            <p>
                <strong>Id:</strong> {candidateId}<br />
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
                                    <label htmlFor="tcIdentityNumber">TC Identity Number </label>
                                    <Field type="text" name="tcIdentityNumber" value={formik.values.tcIdentityNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {(formik.touched.tcIdentityNumber || "") && (formik.errors.tcIdentityNumber || "") && (
                                        <div className="error">{formik.errors.tcIdentityNumber || ""}</div>)}
                                </div>

                                <div className="column required field">
                                    <label htmlFor="birthYear">Birth Year </label>
                                    <Field type="text" name="birthYear" value={formik.values.birthYear}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {(formik.touched.birthYear || "") && (formik.errors.birthYear || "") && (
                                        <div className="error">{formik.errors.birthYear || ""}</div>)}
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

