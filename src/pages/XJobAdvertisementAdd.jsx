import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import JobAdvertisementService from '../services/jobAdvertisementService';
import JobService from '../services/jobService';
import CityService from '../services/cityService';
import WorkingTimeService from '../services/workingTimeService';
import WorkingTypeService from '../services/workingTypeService';
import { Formik, Form, Field, useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';



export default function JobAdvertisementAdd() {
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


    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        if (currentUser) {
            const hasEmployerRole = currentUser.roles.includes("ROLE_EMPLOYER");
            const hasAdminRole = currentUser.roles.includes("ROLE_ADMIN");
            if (hasEmployerRole || hasAdminRole) {
                jobService.getJobs().then((result) => setJobs(result.data.data));
                cityService.getCities().then((result) => setCities(result.data.data));
                workingTimeService.getWorkingTimes().then((result) => setWorkingTimes(result.data.data));
                workingTypeService.getWorkingTypes().then((result) => setWorkingTypes(result.data.data));
            } else {
                history.push("/unauthorized");
            }
        } else {
            history.push("/unauthorized");
        }
    }, [currentUser, history, jobs, cities, workingTimes, workingTypes]);

   /* useEffect(() => {
        //if (employerId > 0) {
            jobService.getJobs().then((result) => setJobs(result.data.data));
            cityService.getCities().then((result) => setCities(result.data.data));
            workingTimeService.getWorkingTimes().then((result) => setWorkingTimes(result.data.data));
            workingTypeService.getWorkingTypes().then((result) => setWorkingTypes(result.data.data));
        //} else 
            //history.push("/unauthorized");

    }, [jobs, cities, workingTimes, workingTypes])
    */

    const initialValues = {  //initial value tanýmlarken , object yapýsýný Swagger'dan ALL!
        employer: { id: 3 }, //employerId
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

        jobAdvertisementService.addJobAdvertisement(values).then(
            (response) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            },
        );
        alert("Is ilani sisteme eklendi.");
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value);
        alert("field : " + fieldName + " value: " + value);
    };

    return (

        <div><h3>Is Ilani Formu</h3><hr />
            <Formik >
            {({ isSubmitting}) => (
                    <Form onSubmit={formik.handleSubmit} class="ui form">
                        <div className="ui divided two column grid">
                            <div className="row">
                                <div className="column required field"><label htmlFor="job">Is Pozisyonu </label>
                                    
                                        <Field as="select" type="number" id="job" name="job"
                                            placeholder="Is Pozisyonu" value={formik.values.job.id}
                                            onChange={(event) => handleChange("job.jobId", event.target.value)} >

                                            <option>Pozisyon seciniz</option>
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
                                    <label htmlFor="job">Sehir  </label>
                                    <Field as="select" type="number" id="city" name="city"
                                        placeholder="Sehir" value={formik.values.city.id}
                                        onChange={(event) => handleChange("city.id", event.target.value)} >

                                        <option>Sehir seciniz</option>
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
                                    <label htmlFor="job">Calisma Zamani  </label>
                                    <Field as="select" type="number" id="workingTime" name="workingTime"
                                        placeholder="Sehir" value={formik.values.workingTime.id}
                                        onChange={(event) => handleChange("workingTime.id", event.target.value)} >

                                        <option>Calisma zamani seciniz</option>
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
                                    <label htmlFor="job">Calisma Tipi  </label>
                                    <Field as="select" type="number" id="workingType" name="workingType"
                                        placeholder="Sehir" value={formik.values.workingType.id}
                                        onChange={(event) => handleChange("workingType.id", event.target.value)} >

                                        <option>Calisma tipini seciniz</option>
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
                                    <label htmlFor="minSalary">Maas alt limit </label>
                                    <Field type="text" name="minSalary" value={formik.values.minSalary}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {(formik.touched.minSalary || "") && (formik.errors.minSalary || "") && (
                                        <div className="error">{formik.errors.minSalary || ""}</div>)}
                                </div>
                                <div className="column">
                                    <label htmlFor="maxSalary">Maas ust limit </label>
                                    <Field type="text" name="maxSalary" value={formik.values.maxSalary}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {(formik.touched.maxSalary || "") && (formik.errors.maxSalary || "") && (
                                        <div className="error">{formik.errors.maxSalary || ""}</div>)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="column required field">
                                    <label htmlFor="openPositionAmount">Acik pozisyon adedi </label>
                                    <Field type="text" name="openPositionAmount" value={formik.values.openPositionAmount}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {(formik.touched.openPositionAmount || "") && (formik.errors.openPositionAmount || "") && (
                                        <div className="error">{formik.errors.openPositionAmount || ""}</div>)}
                                </div>
                                <div className="column required field">
                                    <label htmlFor="lastApplicationDate">Son basvuru tarihi </label>
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
                                    <label htmlFor="description">Is tanimi </label>
                                    <Field as="textarea" rows="3" cols="40" name="description" value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {(formik.touched.description || "") && (formik.errors.description || "") && (
                                        <div className="error">{formik.errors.description || ""}</div>)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="column"><button class="ui button primary fluid" type="submit" >Is Ilani Ekle </button></div>
                            </div>
                        </div><br />
                    </Form>
                )}
            </Formik>
           
        </div>
    );

}