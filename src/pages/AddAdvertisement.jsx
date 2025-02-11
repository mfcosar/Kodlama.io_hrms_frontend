import React from 'react';
import { useState, useEffect, } from 'react';
import { useParams, useHistory } from 'react-router';
import JobAdvertisementService from '../services/jobAdvertisementService';
import JobService from '../services/jobService';
import CityService from '../services/cityService';
import WorkingTimeService from '../services/workingTimeService';
import WorkingTypeService from '../services/workingTypeService';
import { Formik, Form, Field, useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/authService';



export default function AddAdvertisement() {

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const currentUser = AuthService.getCurrentUser();
    let { employerId } = useParams();

    let jobAdvertisementService = new JobAdvertisementService();
    let jobService = new JobService();
    let cityService = new CityService();
    let workingTimeService = new WorkingTimeService();
    let workingTypeService = new WorkingTypeService();

    const [jobs, setJobs] = useState([]);
    const [cities, setCities] = useState([]);
    const [workingTimes, setWorkingTimes] = useState([]);
    const [workingTypes, setWorkingTypes] = useState([]);

    const history = useHistory();
    const today = new Date();


    useEffect(() => {
        if (!currentUser ||
            (!currentUser.roles.includes("ROLE_EMPLOYER") && !currentUser.roles.includes("ROLE_ADMIN"))) {

            history.push("/unauthorized");
        } else {
            jobService.getJobs().then((result) => setJobs(result.data.data));
            cityService.getCities().then((result) => setCities(result.data.data));
            workingTimeService.getWorkingTimes().then((result) => setWorkingTimes(result.data.data));
            workingTypeService.getWorkingTypes().then((result) => setWorkingTypes(result.data.data));
        }
    }, [currentUser.id]);


    const initialValues = {  //initial value tanýmlarken , object yapýsýný Swagger'dan ALL!
        employer: { id: employerId }, //employerId
        job: { jobId: "" }, //burada jobId yerine id yazdýðým için 3 gündür hata alýyorum!-9.10.2024
        city: { id: "" },
        workingTime: { id: "" },
        workingType: { id: "" },
        description: "",
        minSalary: "",
        maxSalary: "",
        openPositionAmount: "",
        lastApplicationDate: "",
        publicationDate: today,
        active: "true",
        confirmed: "false",
    };
    const validationSchema = Yup.object({
        job: Yup.object().shape({
            jobId: Yup.number().required("Required Field"),
        }),
        city: Yup.object().shape({
            id: Yup.number().required("Required Field"),
        }),
        workingTime: Yup.object().shape({
            id: Yup.number().required("Required Field"),
        }),
        workingType: Yup.object().shape({
            id: Yup.number().required("Required Field"),
        }),
        description: Yup.string().max(1000, "Over 1000 Characters").required("Required Field"),
        minSalary: Yup.number().min(1, "Less than 1").positive().integer(),
        maxSalary: Yup.number().min(1, "Less than 1").positive().integer(),
        openPositionAmount: Yup.number().min(1, "Less than 1").required("Required Field").positive().integer(),

        lastApplicationDate: Yup.date().min(today, "Min application time must be 1 day").required("Required Field"),
    });

    const onSubmit = async (values, { setSubmitting }) => {

        alert(JSON.stringify(values, null, 2));

        jobAdvertisementService.addJobAdvertisement(values).
            then((response) => {
                setMessage(response.data.message);
                setSuccess(true);
                setSubmitting(false);

                /*setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);*/
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

    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value);
        //alert("field : " + fieldName + " value: " + value);
    };

    return (

<div><h3>New Job Advertisement Form</h3><hr />
    <Formik >
    {({ isSubmitting}) => (
        <Form onSubmit={formik.handleSubmit} class="ui form">
            <div className="ui divided two column grid">
                <div className="row">
                    <div className="column required field"><label htmlFor="job">Job Position</label>
                                    
                            <Field as="select" type="number" id="job" name="job"
                                placeholder="Job Position" value={formik.values.job.id}
                                onChange={(event) => handleChange("job.jobId", event.target.value)} >

                                <option>Select position</option>
                                {
                                    jobs.map(j => (
                                        <option value={j.jobId} key={j.jobId} >
                                            {j.jobTitle}
                                        </option>
                                    ))}
                            </Field>
                            {(formik.touched.job?.jobId || "") && (formik.errors.job?.jobId || "") && (
                                <div className="error">{formik.errors.job?.jobId || ""}</div>)}
                                    
                    </div>
                    <div className="column required field">
                        <label htmlFor="job">City</label>
                        <Field as="select" type="number" id="city" name="city"
                            placeholder="City" value={formik.values.city.id}
                            onChange={(event) => handleChange("city.id", event.target.value)} >

                            <option>Select city</option>
                            {
                                cities.map(c => (
                                    <option value={c.id} key={c.id} >
                                        {c.cityName}
                                    </option>
                                ))}
                        </Field>
                        {(formik.touched.city?.id || "") && (formik.errors.city?.id || "") && (
                            <div className="error">{formik.errors.city?.id || ""}</div>)}
                    </div>

                </div>
                <div className="row">
                    <div className="column required field">
                        <label htmlFor="job">Working Time</label>
                        <Field as="select" type="number" id="workingTime" name="workingTime"
                            placeholder="Working Time" value={formik.values.workingTime.id}
                            onChange={(event) => handleChange("workingTime.id", event.target.value)} >

                            <option>Select working time</option>
                            {
                                workingTimes.map(wt => (
                                    <option value={wt.id} key={wt.id} >
                                        {wt.workingTimeName}
                                    </option>
                                ))}
                        </Field>
                        {(formik.touched.workingTime?.id || "") && (formik.errors.workingTime?.id || "") && (
                            <div className="error">{formik.errors.workingTime?.id || ""}</div>)}
                    </div>
                    <div className="column required field">
                        <label htmlFor="job">Working Type</label>
                        <Field as="select" type="number" id="workingType" name="workingType"
                            placeholder="Working Type" value={formik.values.workingType.id}
                            onChange={(event) => handleChange("workingType.id", event.target.value)} >

                            <option>Select working type</option>
                            {
                                workingTypes.map(wtypes => (
                                    <option value={wtypes.id} key={wtypes.id} >
                                        {wtypes.workingTypeName}
                                    </option>
                                ))}
                        </Field>
                        {(formik.touched.workingType?.id || "") && (formik.errors.workingType?.id || "") && (
                            <div className="error">{formik.errors.workingType?.id || ""}</div>)}
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                        <label htmlFor="minSalary">Salary min</label>
                        <Field type="text" name="minSalary" value={formik.values.minSalary}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {(formik.touched.minSalary || "") && (formik.errors.minSalary || "") && (
                            <div className="error">{formik.errors.minSalary || ""}</div>)}
                    </div>
                    <div className="column">
                        <label htmlFor="maxSalary">Salary max</label>
                        <Field type="text" name="maxSalary" value={formik.values.maxSalary}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {(formik.touched.maxSalary || "") && (formik.errors.maxSalary || "") && (
                            <div className="error">{formik.errors.maxSalary || ""}</div>)}
                    </div>
                </div>
                <div className="row">
                    <div className="column required field">
                        <label htmlFor="openPositionAmount">Open position amount</label>
                        <Field type="text" name="openPositionAmount" value={formik.values.openPositionAmount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {(formik.touched.openPositionAmount || "") && (formik.errors.openPositionAmount || "") && (
                            <div className="error">{formik.errors.openPositionAmount || ""}</div>)}
                    </div>
                    <div className="column required field">
                        <label htmlFor="lastApplicationDate">Last Application Date</label>
                        <Field type="date" name="lastApplicationDate" value={formik.values.lastApplicationDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {(formik.touched.lastApplicationDate || "") && (formik.errors.lastApplicationDate || "") && (
                            <div className="error">{formik.errors.lastApplicationDate || ""}</div>)}
                    </div>
                </div>
            </div>
            <div className="ui divided one column grid">
                <div className="row">
                    <div className="column required field" fluid>
                        <label htmlFor="description">Job Description</label>
                        <Field as="textarea" rows="3" cols="40" name="description" value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {(formik.touched.description || "") && (formik.errors.description || "") && (
                            <div className="error">{formik.errors.description || ""}</div>)}
                    </div>
                </div>
                <div className="row">
                    <div className="column"><button class="ui button primary fluid" type="submit" disabled={ isSubmitting }>Add Job Advertisement</button></div>
                </div>
                {message && (
                    <div className="form-group">
                        <div className={success ? "alert alert-success" : "alert alert-danger"}
                            role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </div><br />
        </Form>
        )}
    </Formik>
           
</div>
    );

}