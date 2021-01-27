import React from "react";
import "./main.scss";
import {ErrorMessage, Form, Formik} from "formik";
import * as Yup from "yup"
import FormInput from "./components/FormInput";
import DatePicker from "react-datepicker";
import classNames from "classnames";
import FormCheckboxGroup from "./components/FormCheckboxGroup";
import {ReactComponent as Calendar} from "bootstrap-icons/icons/calendar3.svg";
import "react-datepicker/dist/react-datepicker.css";
import FormFieldArray from "./components/FormFieldArray";
import {petObject} from "./data/petObject";
import {isWeekday} from "./utilities/DateUtilities"
import FormStatePicker from "./components/FormStatePicker";

const App = () =>
	<Formik
		initialValues={{
			firstName: "",
			lastName: "",
			phone: "",
			email: "",
			address: "",
			city: "",
			state: "",
			zip: "",
			startDate: undefined,
			selectedDays: [],
			pets: [petObject],
		}}
		validationSchema={Yup.object({
			firstName: Yup.string()
				.required("required"),
			lastName: Yup.string()
				.required("required"),
			email: Yup.string().email("invalid email address").required("required"),
			phone: Yup.string().matches(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/, "invalid phone number").required("required"),
			address: Yup.string().required("required"),
			city: Yup.string().required("required"),
			state: Yup.string().required("required"),
			zip: Yup.string().matches(/\d{5}/, "invalid zip code").required("required"),
			pets: Yup.array()
				.of(Yup.object().shape({
					dogname: Yup.string().required("required"),
					breed: Yup.string().required("required")
				})),
			startDate: Yup.string().required("required"),
		})}
		onSubmit={(values, ...rest) => {
			const [helpers] = rest;
			console.log(values, helpers);
			// the selectedDays field might not get touched by the user so have to validate after form submit when formik marks all fields as touched
			if (!values.selectedDays.length) {
				return helpers.setFieldError("selectedDays", "please select at least one day")
			}
		}}>
		{({values, ...formik}) =>
			<Form noValidate={true}>
				<FormFieldArray/>
				<div className="mb-3"><FormInput name="firstName" label="First Name" type="text"/></div>
				<div className="mb-3"><FormInput name="lastName" label="Last Name" type="text"/></div>
				<div className="mb-3"><FormInput name="email" label="Email" type="email"/></div>
				<div className="mb-3"><FormInput name="phone" label="Phone" type="tel"/></div>
				<div className="mb-3"><FormInput name="address" label="Address" type="text"/></div>
				<div className="mb-3"><FormInput name="city" label="City" type="text"/></div>
				<div className="row mb-3">
					{/*todo add the option elements here and spread as child props in the component*/}
					<div className="col">
						{/*<FormSelect label="State" name="state">*/}
						{/*	<option/>*/}
						{/*	{(us_states).map((value, i) => <option key={`${value}-${i}`}>{value}</option>)}*/}
						{/*</FormSelect>*/}
						<FormStatePicker name="state"/>
					</div>
					<div className="col"><FormInput name="zip" label="Zip" type="text"/></div>
				</div>

				<fieldset className="fieldset text-center text-md-start mb-3">
					<legend className="legend">Please select a weekly schedule</legend>
					<div className="form-check-group__container mb-3">
						<div className="form-check-group__item">
							<FormCheckboxGroup name="selectedDays" label="M" type="checkbox"/>
						</div>
						<div className="form-check-group__item">
							<FormCheckboxGroup name="selectedDays" label="Tu" type="checkbox"/>
						</div>
						<div className="form-check-group__item">
							<FormCheckboxGroup name="selectedDays" label="W" type="checkbox"/>
						</div>
						<div className="form-check-group__item">
							<FormCheckboxGroup name="selectedDays" label="Th" type="checkbox"/>
						</div>
						<div className="form-check-group__item">
							<FormCheckboxGroup name="selectedDays" label="F" type="checkbox"/>
						</div>
					</div>
					<input type="hidden"
					       className={classNames({"is-invalid": formik.errors.selectedDays && formik.touched.selectedDays})}/>
					<ErrorMessage component="div" name="selectedDays" className="invalid-feedback"/>
				</fieldset>
				<div className="mb-3">
					<label className="form-label d-block" htmlFor="startDate">Start Date <Calendar/></label>
					<DatePicker id="startDate"
					            autoComplete="stop"
					            minDate={new Date()}
					            selected={values.startDate}
					            onChange={date => {
						            formik.setFieldTouched("startDate", true);
						            formik.setFieldValue("startDate", date);
					            }}
					            filterDate={isWeekday}
					            onClickOutside={() => formik.setFieldTouched("startDate", true)}
					            className={classNames("form-control form-control-lg", {"is-invalid": formik.errors.startDate && formik.touched.startDate})}
					/>
					<input type="hidden"
					       className={classNames({"is-invalid": formik.errors.startDate && formik.touched.startDate})}/>
					<ErrorMessage component="div" name="startDate" className="invalid-feedback"/>
				</div>
				<button className="btn btn-lg btn-outline-primary" type="submit">Submit</button>
				<button className="btn btn-lg btn-outline-primary" type="reset">Clear</button>
			</Form>}
	</Formik>

export default App;
