import React from 'react';
import { useState, useEffect } from 'react';
import CityService from '../services/cityService';
import { Formik, Form, Field, useFormik,  } from 'formik';
import * as Yup from 'yup';
import '../App.css'
export default function CityAdd() {

    const [cities, setCities] = useState([]);
    
    let cityService = new CityService();

    useEffect(() => {
        cityService.getCities().then((result) => setCities(result.data.data))
    }, [cities])

    const initialValues = {
        
        city: { id: "1", cityName: "Istanbul" },
        newCity: ''
    };

    const validationSchema = Yup.object({
        city: Yup.object().shape({
            id: Yup.number().required("Required Field"),
        }),
        newCity: Yup.string().min(3, "Enter a city name longer than 2 chars").required("Sehir ismi giriniz"),
        
    });
    const onSubmit = async (values, { setSubmitting }) => {
        let newCityAddition = { id: '', cityName: values.newCity }

        cityService.addCity(newCityAddition).then(
                (response) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                },
            );
            alert("Yeni sehir : " + values.newCity + " eklendi");
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

    const addCity = (fieldName, value) => {
        formik.setFieldValue(fieldName, value);
        //alert("field : " + fieldName + " value: " + value);
    };

    return (
        <div>
            <Formik>
                {
                    ({ isSubmitting}) => (
                <Form onSubmit={formik.handleSubmit}>
                    <div>
                    <label htmlFor="city">Sehir </label>
                    <Field as="select" type="number" id="city" name="city" placeholder="Sehir" value={formik.values.city.id}
                        onChange={(event) => handleChange("city.id", event.target.value)} >
                        <option>Sehir seciniz</option>
                        {
                            cities.map(c => (
                                <option value={c.id} key={c.id}>
                                    {c.cityName}
                                </option>
                            ))
                        }
                    </Field>
                    {(formik.touched.city?.id || "") && (formik.errors.city?.id || "") && (
                        <div className="error">{formik.errors.city?.id || ""}</div>)}
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="newCity">Yeni Sehir Girin </label>
                        <Field type="text" name="newCity" value={formik.values.newCity}
                        onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                            {(formik.touched.newCity || "") && (formik.errors.newCity || "") && (
                            <div className="error">{formik.errors.newCity || ""}</div>)}
                    </div>

                        <button type="submit" onClick={(event) => addCity("newCity", formik.values.newCity)}
                           disabled={isSubmitting}
                    >Add City</button>
                    </Form>
                )
            }
            </Formik>
        </div>
    );
}