import React from "react";
import "./main.scss";
import {ErrorMessage, FieldArray, Form, Formik, getIn} from "formik";
import * as Yup from "yup"
import {getMonthsForDropDown, getYearsForDropDown} from "./utilities/DateUtilities";
import FormInput from "./components/FormInput";
import FormCheckbox from "./components/FormCheckbox";
import FormSelect from "./components/FormSelect";
import FormDatalist from "./components/FormDatalist";
import DatePicker from "react-datepicker";
import classNames from "classnames";
import dogBreeds from "./data/dogBreeds";
import us_states from "./data/us_states";
import getDay from "date-fns/getDay";

import "react-datepicker/dist/react-datepicker.css";

function App() {
	const petObject = {
		dogname: "",
		breed: "",
		dobMonth: "",
		dobYear: "",
		gender: "",
		weight: "",
		isVaccinated: "",
		isSocial: "",
	};
	const isWeekday = (date: number | Date): boolean => {
		const day = getDay(date);
		return day !== 0 && day !== 6;
	};

	return (
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
				// console.log(values);
				const [helpers] = rest;
				// the selectedDays field might not get touched by the user so have to validate after form submit when formik marks all fields as touched
				if (!values.selectedDays.length) {
					return helpers.setFieldError("selectedDays", "please select at least one day")
				}
			}}>
			{({values, ...formik}) =>
				<Form noValidate={true}>
					{/*todo move fieldarray to it's own component*/}
					<FieldArray name="pets">
						{({remove, push}) =>
							<>
								{
									values.pets.length > 0 && values.pets.map((pet, i, arr) =>
										<div className="mb-3" key={`pet-${i}`}>
											<div className="mb-3">
												<FormInput name={`pets.${i}.dogname`}
												           label="Dog's Name"
												           type="text"/>
											</div>
											<div className="mb-3">
												<FormDatalist type="text"
												              listData={dogBreeds}
												              label="Breed"
												              name={`pets.${i}.breed`}/>
											</div>
											<div className="mb-3">
												<FormSelect name={`pets.${i}.gender`}
												            label="Gender"
												            selectMenuValues={["female/spayed", "male/neutered", "female", "male"]}/>
											</div>
											<div className="row mb-3">
												<div className="col">
													<FormSelect name={`pets.${i}.dobMonth`}
													            label="Month"
													            selectMenuValues={getMonthsForDropDown}/>
												</div>
												<div className="col">
													<FormSelect name={`pets.${i}.dobYear`}
													            label="Year"
													            selectMenuValues={getYearsForDropDown(new Date().getFullYear())}/>
												</div>
											</div>

											<p>Is your dog friendly with dogs and people?</p>

											<div className="form-check form-check-inline mb-3">
												<FormCheckbox name={`pets.${i}.isSocial`}
												                type="radio"
												                label="yes"/>
											</div>
											<div className="form-check form-check-inline mb-3">
												<FormCheckbox name={`pets.${i}.isSocial`}
												                type="radio"
												                label="no"/>
											</div>
											<p>Are your dog's vaccines up-to-date?</p>
											<div className="form-check form-check-inline mb-3">
												<FormCheckbox name={`pets.${i}.isVaccinated`}
												                type="radio"
												                label="yes"/></div>
											<div className="form-check form-check-inline mb-3">
												<FormCheckbox name={`pets.${i}.isVaccinated`}
												                type="radio"
												                label="no"/>
											</div>
											{arr.length > 1 && <>
												<button className="d-block btn btn-danger"
												        type="button"
												        onClick={() => remove(i)}>remove
												</button>
												<hr/>
											</>}
										</div>)
								}
								<button className="d-block mb-3 btn btn-lg btn-primary"
								        type="button"
								        onClick={() => push(petObject)}>add a pet
								</button>
							</>
						}
					</FieldArray>
					<div className="mb-3"><FormInput name="firstName" label="First Name" type="text"/></div>
					<div className="mb-3"><FormInput name="lastName" label="Last Name" type="text"/></div>
					<div className="mb-3"><FormInput name="email" label="Email" type="email"/></div>
					<div className="mb-3"><FormInput name="phone" label="Phone" type="tel"/></div>
					<div className="mb-3"><FormInput name="address" label="Address" type="text"/></div>
					<div className="mb-3"><FormInput name="city" label="City" type="text"/></div>

					<div className="row mb-3">
						<div className="col"><FormSelect selectMenuValues={us_states} label="State" name="state"/></div>
						<div className="col"><FormInput name="zip" label="Zip" type="text"/></div>
					</div>

					<fieldset className="fieldset text-center text-md-start mb-3">
						<legend className="legend">Please select a weekly schedule:</legend>
						<div className="form-check form-check-inline">
							<FormCheckbox name="selectedDays" label="M" type="checkbox"/>
						</div>
						<div className="form-check form-check-inline">
							<FormCheckbox name="selectedDays" label="Tu" type="checkbox"/>
						</div>
						<div className="form-check form-check-inline">
							<FormCheckbox name="selectedDays" label="W" type="checkbox"/>
						</div>
						<div className="form-check form-check-inline">
							<FormCheckbox name="selectedDays" label="Th" type="checkbox"/>
						</div>
						<div className="form-check form-check-inline">
							<FormCheckbox name="selectedDays" label="F" type="checkbox"/>
						</div>
						<input type="hidden"
						       className={classNames({"is-invalid": getIn(formik.errors, "selectedDays") && getIn(formik.touched, "selectedDays")})}/>
						<ErrorMessage component="div" name="selectedDays" className="invalid-feedback"/>
					</fieldset>
					<div className="mb-3">
						<label className="form-label d-block" htmlFor="startDate">Start Date</label>
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
						            className={classNames("form-control form-control-lg hello", {"is-invalid": getIn(formik.errors, "startDate") && getIn(formik.touched, "startDate")})}
						/>
						<input type="hidden"
						       className={classNames({"is-invalid": getIn(formik.errors, "startDate") && getIn(formik.touched, "startDate")})}/>
						<ErrorMessage component="div" name="startDate" className="invalid-feedback"/>
					</div>
					<button className="btn btn-lg btn-outline-primary" type="submit">Submit</button>
					<button className="btn btn-lg btn-outline-primary" type="reset">Clear</button>
				</Form>}
		</Formik>
	)
}

export default App;
