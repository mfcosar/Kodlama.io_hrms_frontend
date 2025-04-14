import React from 'react';
import { useState, useEffect, } from 'react';
import { useParams, useHistory } from 'react-router';
import JobAdvertisementService from '../services/jobAdvertisementService';
import JobService from '../services/jobService';
import CityService from '../services/cityService';
import WorkingTimeService from '../services/workingTimeService';
import WorkingTypeService from '../services/workingTypeService';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/authService';



export default function UpdateAdvertisement() {

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [jobAdvertisement, setJobAdvertisement] = useState({});

    const currentUser = AuthService.getCurrentUser();
    let { id } = useParams(); //this id is jobAdvertisementId

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
            loadAdvertisement(id);
        }
    }, [currentUser.id]);


    const initialValues = {  //initial value tanýmlarken , object yapýsýný Swagger'dan ALL!
        id: id,
        employer: { id: "" },
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
        //// 3 gündür neden button submit yapmýyor ? hatasýnýn sebebi: validation'da jobTitle: satýrýný devreye aldýðým içinmiþ.
        //// Yoksa apayný kod AddAdvertisement sayfasýnda çalýþýyor.

        job: Yup.object().shape({
            jobId: Yup.number().min(1, "Please select a job title").positive().integer(),
            //jobTitle: Yup.string().required("Required Field"),
        }),
        city: Yup.object().shape({
            id: Yup.number().min(1, "Please select a city").positive().integer(),
        }),
        workingTime: Yup.object().shape({
            id: Yup.number().min(1, "Please select a working time option").positive().integer(),
        }),
        workingType: Yup.object().shape({
            id: Yup.number().min(1, "Please select a working type option").positive().integer(),
        }), 
        description: Yup.string().max(1000, "Over 1000 Characters").required("Required Field"),
        minSalary: Yup.number().min(1, "Less than 1").positive().integer(),
        maxSalary: Yup.number().min(1, "Less than 1").positive().integer(),
        openPositionAmount: Yup.number().min(1, "Less than 1").required("Required Field").positive().integer(),
        //publicationDate: Yup.date().min(today, "Min application time must be 1 day").required("Required Field"),
        //lastApplicationDate: Yup.date().min(today, "Min application time must be 1 day").required("Required Field"),
    });

    // Utility function to format JavaScript Date to "yyyy-MM-dd"
    const formatDate = (fdate) => {

        const x1 = new Date(fdate);
        const fyear = x1.getFullYear();

        const fmonth = String(x1.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const fday = String(x1.getDate()).padStart(2, '0');
        let formattedDate = `${fyear}-${fmonth}-${fday}`;
        return formattedDate;
    };

    const loadAdvertisement = async (id) => {
        alert("loading advertisement");
        try {
            const result = await jobAdvertisementService.getJobAdvertisementById(id);
            const advData = result.data.data;
            let formatted_lastApplicationDate = formatDate(advData.lastApplicationDate);
            let formatted_publicationDate = formatDate(advData.publicationDate);

            alert("advData retrieved: " + JSON.stringify(advData) + "\n current user id: " + currentUser.id + "\n advData.employer.id:" + advData.employer.id + "\n formatted_lastApplicationDate:" + formatted_lastApplicationDate); //advData.job.jobTitle

            if (advData.employer.id === currentUser.id ||
                currentUser.roles.includes("ROLE_ADMIN")
            ) {
                alert("minSalary : " + advData.minSalary);
                formik.setFieldValue("job.jobId", advData.job.jobId || "");
                formik.setFieldValue("city.id", advData.city.id || "");
                formik.setFieldValue("workingType.id", advData.workingType.id || "");
                formik.setFieldValue("workingTime.id", advData.workingTime.id || "");
                formik.setFieldValue("minSalary", advData.minSalary || "");
                formik.setFieldValue("maxSalary", advData.maxSalary || "");
                formik.setFieldValue("openPositionAmount", advData.openPositionAmount || "");
                formik.setFieldValue("publicationDate", formatted_publicationDate || "");
                formik.setFieldValue("lastApplicationDate", formatted_lastApplicationDate || ""); //advData.lastApplicationDate
                formik.setFieldValue("description", advData.description || "");
                formik.setFieldValue("active", advData.active || ""); //hata vermedi
                formik.setFieldValue("confirmed", advData.confirmed || "");

                setJobAdvertisement(advData); //burasý tmm

            } else {
                history("/unauthorized");
            }
        } catch (error) {
            console.error("An error occurred while loading advertisement data:", error);
        }
    };

    const onSubmit = async (values, { setSubmitting, resetForm }) => {//values, event, { setSubmitting, resetForm }

        setMessage("");
        setSuccess(false);
        setSubmitting(true); //at form submission this is called automatic

        values.id = id;
        //values.job.jobId = formik.values.job.id; //backend'e gönderirken id'yi jobId olarak görmüyor. Tekrar tanýtmak gerekiyor.

        alert(JSON.stringify(values)); //, null, 2
        //alert("currentUser.id : " + currentUser.id.toString() + " jobAdvertisement.employer.id : " + jobAdvertisement.employer.id );
        if (currentUser.id === jobAdvertisement.employer.id) { //employerId
            jobAdvertisementService.updateJobAdvertisement(values).
                then((response) => {
                    setMessage(response.data.message);
                    setSuccess(true);
                    setSubmitting(false);

                    /*setTimeout(() => {
                        resetForm();
                        formik.setFieldValue("job.id", ""); 
                        formik.setFieldValue("city.id", "");
                        formik.setFieldValue("workingType.id", "");
                        formik.setFieldValue("workingTime.id", "");
                    }, 1000);*/
                },
                    (error) => { //backend'den gelen hatayi goster
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        setTimeout(() => {
                            setMessage(resMessage);
                            setSuccess(false);
                            setSubmitting(false);
                        }, 300);
                    }
                );
        } else 
            history.push("/unauthorized");
          
    };

    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value);
    };
    

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });



    return (

<div><h3>Update Job Advertisement Form</h3><hr />
    <Formik >
    {({ isSubmitting}) => (
       <Form onSubmit={formik.handleSubmit} class="ui form">
            <div className="ui divided two column grid">
                <div className="row">
                    <div className="column required field"><label htmlFor="job">Job Position</label>
                                    
                            <Field as="select" type="number" id="job" name="job"
                                placeholder="Job Position" value={formik.values.job.jobId}
                                onChange={(event) => handleChange("job.jobId", event.target.value)}  >

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
                        <label htmlFor="city">City</label>
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
                        <label htmlFor="workingTime">Working Time</label>
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
                        <label htmlFor="workingType">Working Type</label>
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
                    <div></div>
                </div>

                <div className="row">
                    <div className="column required field">
                        <label htmlFor="publicationDate">Publication Date</label>
                        <Field type="date" name="publicationDate" value={formik.values.publicationDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {(formik.touched.publicationDate || "") && (formik.errors.publicationDate || "") && (
                            <div className="error">{formik.errors.publicationDate || ""}</div>)}
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
                <div className="row">
                    <div className="column required field">
                        <label htmlFor="active">Active &nbsp;&nbsp;
                        <input type="checkbox" name="active" checked={formik.values.active} value={formik.values.active}
                        onChange={formik.handleChange} onBlur={formik.handleBlur} /></label>
                        {(formik.touched.active || "") && (formik.errors.active || "") && (
                        <div className="error">{formik.errors.active || ""}</div>)}
                    </div>
                    <div className="column required field">
                        <label htmlFor="confirmed">Confirmed &nbsp;&nbsp;
                        <input type="checkbox" name="confirmed" checked={formik.values.confirmed} disabled  value={formik.values.confirmed}
                         onChange={formik.handleChange} onBlur={formik.handleBlur} /></label>
                        {(formik.touched.confirmed || "") && (formik.errors.confirmed || "") && (
                        <div className="error">{formik.errors.confirmed || ""}</div>)}
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
                    <div className="column">
                    <button class="ui button primary fluid" type="submit" disabled={isSubmitting}>Update
                    </button></div>
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