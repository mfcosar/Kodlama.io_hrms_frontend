import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, useFormik } from 'formik';
import { GridRow, GridColumn, Grid } from 'semantic-ui-react';
import * as Yup from 'yup';
import AuthService from '../services/authService';

export default function Login() {

    const history = useHistory();
    const [loading, setLoading] = useState(false); //login bilgisini back-end'e gönderirken true, response gelince false
    const [message, setMessage] = useState("") // response'dan gelen message gösterilir
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        let timer;
        if (message) {
            // Set a timer to clear the message 30 secs
            timer = setTimeout(() => {
                setMessage("");
            }, 30000);
        }
        return () => {
            // Clean up the timer
            clearTimeout(timer);
        };
    }, [message]);//

    const initialValues = {  //initial value tanýmlarken , object yapýsýný Swagger'dan ALL!
        username: "",
        password: "",
    }
    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string().max(40, "Password must not exceed 40 characters").required("Password is required"),
    });

    const onSubmit = async(values,{ setSubmitting }) => { 

        setMessage("");
        setLoading(true);
        //alert("submitted");
        AuthService.login(values.username, values.password).then(
            () => {
                history.push("/")
                window.location.reload();
                //alert("submitted2");
            },
            error => {
                const responseMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setMessage(responseMessage);
                setSuccess(false);
                //alert("error : " + responseMessage);
            }
        );
        setSubmitting(false);
        //alert("Login yapildi: " + values.username);
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });


    return (

            <Formik >
                {({ isSubmitting }) => ( 
                    <Form onSubmit={formik.handleSubmit} class="ui form">
                    <Grid>
                        <GridRow><GridColumn width={8}>
                            <div><h3>Login</h3><hr /></div>
                        </GridColumn>
                        </GridRow>
                        <GridRow><GridColumn width={8}>
                            <div className="field">
                            <label htmlFor="username">Username</label>
                            <Field type="text" name="username" value={formik.values.username} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                {(formik.touched.username || "") && (formik.errors.username || "") && (
                                <div className="error">{formik.errors.username || ""}</div>)}
                                </div>
                            </GridColumn>
                            </GridRow>
                            <GridRow><GridColumn width={8}>
                            <div className="field">
                                <label htmlFor="password">Password</label>
                                <Field type="text" name="password" value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                {(formik.touched.password || "") && (formik.errors.password || "") && (
                                    <div className="error">{formik.errors.password || ""}</div>)}
                                </div>
                            </GridColumn>
                            </GridRow>
                            <GridRow><GridColumn width={8}>
                            <div className="field">
                            <div className="column"><button class="ui button primary" type="submit" disabled={loading} >Login </button></div>
                            </div>

                            {message && (
                                <div className="form-group">
                                    <div className={success ? "alert alert-success" : "alert alert-danger"} role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}    
                            </GridColumn>
                            </GridRow>
                        </Grid>
                    </Form>
                )}
            </Formik>
    );
}