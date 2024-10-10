import React from 'react';
import { useState, useEffect } from 'react';
import JobAdvertisementService from '../services/jobAdvertisementService';
import JobService from '../services/jobService';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddJobAdvertisement3() {
    let jobAdvertisementService = new JobAdvertisementService();

    const [jobTitles, setJobTitles] = useState([]);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        let jobService = new JobService();
        jobService.getJobs().then((result) => setJobTitles(result.data.data))
    }, [])

    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value);
    };

    const initialValues = {
        employer: { id: 3 },
        jobTitle: { id: "", jobTitle: "" }
    };
    const validationSchema = Yup.object({
        jobTitle: Yup.object().shape({
            titleId: Yup.number().required("Required Field"),
        }),
    });
    const onSubmit = async (values, { resetForm }) => {
        setMessage("");
        setSuccess(false);
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    return (
        <div>
            <Formik>
                <Form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col mb-1">
                        <label
                            className="font-poppins font-medium text-md text-gray-800"
                            htmlFor="jobTitle"
                        >
                            <span>
                                Job Title&nbsp;
                                <span className="text-red-500 select-none">*</span>
                            </span>
                        </label>

                        <select
                            name="jobTitle"
                            onChange={(event) =>
                                handleChange("jobTitle.id", event.target.value)
                            }
                            value={formik.values.jobTitle?.id || ""}
                            className="w-[432px] mt-1 rounded-md border border-gray-500 bg-transparent focus:outline-none focus:border-blue-600 focus:ring-0.5 focus:ring-blue-400 p-2 pr-3 pe-12 text-md shadow-sm"
                        >
                            <option value="">Select a job title...</option>
                            {jobTitles.map((jobTitle) => (
                                <option
                                    key={jobTitle.id}
                                    value={jobTitle.id}
                                >
                                    {jobTitle.jobTitle}
                                </option>
                            ))}
                        </select>
                    </div>
                         <br />




                    </Form>
               
            </Formik>
        </div>

    )
}