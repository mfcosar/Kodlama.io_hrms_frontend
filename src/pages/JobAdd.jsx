import React from 'react';
import { Formik, Form, useFormik, Field, ErrorMessage } from 'formik';
import JobService from '../services/jobService';
import * as Yup from 'yup';
import { FormField, Button, Label } from 'semantic-ui-react'
import KodlamaIoTextInput from '../utilities/customFormControls/KodlamaIoTextInput';
export default function JobAdd() {

    let jobService = new JobService();

    const initialValues = { 
        newJob: ''
    }

    const validationSchema = Yup.object().shape({
        newJob: Yup.string().required("Pozisyon adini giriniz"),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        
        let newJobTitle = { jobId:'' , jobTitle: values.newJob }

        jobService.addJob(newJobTitle).then(
            (response) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            },
        );
        alert("Yeni is id " + newJobTitle.jobId + " , name: " + newJobTitle.jobTitle + " eklendi"); //.jobTitle
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    const handleChange = (fieldName, value) => {

        formik.setFieldValue(fieldName, value);
       // alert("field : " + fieldName + " value: " + value);
    };
    const addJob = (fieldName, value) => {
        formik.setFieldValue(fieldName, value);
        //alert("field : " + fieldName + " value: " + value);
    };

    return (
        <div>
            <Formik >
                {
                    ({ isSubmitting }) => (
                        <Form className="ui form" onSubmit={formik.handleSubmit}>
                            {/*<KodlamaIoTextInput name="newJob" placeholder="Pozisyon Adi" //value={formik.values.newJob} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                               />*/}
                        <FormField>
                            <label htmlFor="newJob">Pozisyon Adi </label>
                                <Field name="newJob" placeholder="Pozisyon Adi" value={formik.values.newJob} onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                            />
                       {(formik.touched.newJob || "") && (formik.errors.newJob || "") && (
                            <div className="error">{formik.errors.newJob || ""}</div>)}
                            </FormField>
                        
                            <Button color="green" type="submit" onClick={(event) => addJob("newJob", formik.values.newJob)}
                                disabled={isSubmitting}>Ekle</Button>


                        </Form>
                    )}
            </Formik>

        </div>)

}