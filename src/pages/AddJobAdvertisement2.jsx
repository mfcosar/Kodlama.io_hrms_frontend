import React from 'react';
import { useState, useEffect } from 'react';
import JobAdvertisementService from '../services/jobAdvertisementService';
import JobService from '../services/jobService';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddJobAdvertisement(){
    let jobAdvertisementService = new JobAdvertisementService();
    let jobService = new JobService();

    const [jobTitles, setJobTitles] = useState([]);

    
    useEffect(() => {
        jobService.getJobs().then((result) => setJobTitles(result.data.data))
    }, []) 

    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value);
        alert("field : " + fieldName + " value: "+ value );
    };
    const initialValues = {
        employer: { id: 3 },
        jobTitle: { jobTitleId: "", jobTitleStr: "" }
    };
    const validationSchema = Yup.object({
        jobTitle: Yup.object().shape({
            jobTitleId: Yup.number().required("Required Field"),
        }),
    });
    const onSubmit = async (values, { setSubmitting }) => {
        alert(" values.jobTitle.jobTitleId : " + values.jobTitle.jobTitleId );
        jobService.addJobAdvertisement(values).then(
                (response) => {
                    setTimeout(() => {
                        //resetForm();
                        formik.setFieldValue("jobTitle", "");
                        formik.setFieldValue("city", "");
                        formik.setFieldValue("workingType", "");
                    }, 1000);
                },
            );
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    return (
        <div>
            <Formik >
                {({ isSubmitting }) => (
                    <Form>
                        <label htmlFor="jobTitle">Is Pozisyonu</label>
                        <Field as="select" type="number" id="jobTitle" name="jobTitle" placeholder="Ýs Pozisyonu"
                            onChange={(event) =>
                                handleChange("jobTitle.jobTitleId", event.target.value)
                            } value={formik.values.jobTitle?.jobTitleId}>
                            <option>Pozisyon seciniz</option>
                            {
                                jobTitles.map(j => (
                                    <option value={j.id} key={j.id}>
                                        {j.jobTitle}
                                    </option>
                                ))
                            }
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Ekle
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}