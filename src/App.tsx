import React from "react";
import "./main.scss";
import {ErrorMessage, Field, FieldArray, Form, Formik, getIn} from "formik";
import * as Yup from "yup"
import StatePicker from "./components/StatePicker";
import DogBreedPicker from "./components/DogBreedPicker";
import FormInput from "./components/FormInput";
import {getMonthsForDropDown, getYearsForDropDown} from "./utilities/DateUtilities";
import FormRadioGroup from "./components/FormRadioGroup";
import FormCheckbox from "./components/FormCheckbox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import FormSelect from "./components/FormSelect";

function App() {
	const petObject = {
		name: "",
		breed: "",
		dobMonth: "",
		dobYear: "",
		gender: "",
		weight: "",
		isVaccinated: "",
		isSocial: "",
		testField: ""
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
				flavor: ""

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
						name: Yup.string().required("required"),
						breed: Yup.string().required("required")
					})),
				startDate: Yup.string().required("required"),
			})}
			onSubmit={(values, ...rest) => {
				console.log(values);
			}}>
			{({values, ...formik}) => <Form noValidate={true}>
				{/*todo move fieldarray to it's own component*/}
				<FieldArray name="pets">
					{({remove, push}) =>
						<>
							{
								values.pets.length > 0 && values.pets.map((pet, i, arr) =>
									<div className="mb-3" key={`pet-${i}`}>
										<FormInput name={`pets.${i}.name`}
										           label="Name"
										           type="text"/>
										<Field name={`pets.${i}.breed`}
										       label="Breed"
										       component={DogBreedPicker}/>
										<FormSelect name={`pets.${i}.gender`}
										            label="Gender"
										            selectMenuValues={["female/spayed", "male/neutered", "female", "male"]}
										/>
										<div className="row">
											<div className="mb-3 col">
												<FormSelect name={`pets.${i}.dobMonth`}
												            label="Month"
												            selectMenuValues={getMonthsForDropDown}/>
											</div>
											<div className="mb-3 col">
												<FormSelect name={`pets.${i}.dobYear`}
												            label="Year"
												            selectMenuValues={getYearsForDropDown(new Date().getFullYear())}/>
											</div>
										</div>
										<p>Is your dog friendly with dogs and people?</p>
										<Field name={`pets.${i}.isSocial`}
										       id={`pets.${i}.isSocial-1`}
										       value="yes"
										       component={FormRadioGroup}/>
										<Field name={`pets.${i}.isSocial`}
										       id={`pets.${i}.isSocial-2`}
										       value="no"
										       component={FormRadioGroup}/>
										<p>Are your dog's vaccines up-to-date?</p>
										<Field name={`pets.${i}.isVaccinated`}
										       id={`pets.${i}.isVaccinated-1`}
										       value="yes"
										       component={FormRadioGroup}/>
										<Field name={`pets.${i}.isVaccinated`}
										       id={`pets.${i}.isVaccinated-2`}
										       value="no"
										       component={FormRadioGroup}/>
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
				<FormInput name="firstName" label="First Name" type="text"/>
				<FormInput name="lastName" label="Last Name" type="text"/>
				<FormInput name="email" label="Email" type="email"/>
				<FormInput name="phone" label="Phone" type="tel"/>
				<FormInput name="address" label="Address" type="text"/>
				<FormInput name="city" label="City" type="text"/>
				<div className="row">
					<Field component={StatePicker}/>
					<FormInput name="zip" label="Zip" type="text"/>
				</div>
				<div className="mb-3">
					<fieldset className="fieldset text-center text-md-start">
						<legend className="legend">Please select a weekly schedule:</legend>
						<Field name="selectedDays" id="selectDay0" value="M" component={FormCheckbox}/>
						<Field name="selectedDays" id="selectDay1" value="Tu" component={FormCheckbox}/>
						<Field name="selectedDays" id="selectDay2" value="W" component={FormCheckbox}/>
						<Field name="selectedDays" id="selectDay3" value="Th" component={FormCheckbox}/>
						<Field name="selectedDays" id="selectDay4" value="F" component={FormCheckbox}/>
					</fieldset>
				</div>
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
