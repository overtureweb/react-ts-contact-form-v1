import React from "react";
import "./main.scss";
import {Field, FieldArray, Form, Formik} from "formik";
import * as Yup from "yup"
import StatePicker from "./components/StatePicker";
import DogBreedPicker from "./components/DogBreedPicker";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import {getMonthsForDropDown, getYearsForDropDown} from "./utilities/DateUtilities";

function App() {
	const petObject = {name: "", breed: "", dobMonth: "", dobYear: "", gender: "", weight: "", microchipped: ""};
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
				startDate: "",
				pets: [petObject]
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
					}))
			})}
			onSubmit={values => console.log(values)}>
			{({values}) => <Form noValidate={true}>
				<FieldArray name="pets">
					{({insert, remove, push}) =>
						<>
							{
								values.pets.length > 0 && values.pets.map((pet, i, arr) =>
									<div className="mb-3" key={`pet-${i}`}>
										<Field name={`pets.${i}.name`}
										       label="Name"
										       component={FormInput}/>
										<Field name={`pets.${i}.breed`}
										       label="Breed"
										       component={DogBreedPicker}/>
										<Field name={`pets.${i}.gender`}
										       label="Gender"
										       component={FormSelect}
										       selectMenuValues={["female/spayed", "male/neutered", "female", "male"]}
										/>
										<div className="row">
											<Field component={FormSelect}
											       name={`pets.${i}.dobMonth`}
											       label="Month"
											       selectMenuValues={getMonthsForDropDown}/>
											<Field component={FormSelect}
											       name={`pets.${i}.dobYear`}
											       label="Year"
											       selectMenuValues={getYearsForDropDown(new Date().getFullYear())}
											/>
										</div>
										{i > 0 && <button className="btn btn-danger"
										                  type="button"
										                  onClick={() => remove(i)}>remove</button>}
										{arr.length > 1 && <hr/>}
									</div>)
							}
							<button className="d-block mb-3 btn btn-lg btn-primary"
							        type="button"
							        onClick={() => push(petObject)}>add
							</button>
						</>
					}
				</FieldArray>
				<Field name="firstName" label="First Name" component={FormInput}/>
				<Field name="lastName" label="Last Name" component={FormInput}/>
				<Field name="email" label="Email" type="email" component={FormInput}/>
				<Field name="phone" label="Phone" type="tel" component={FormInput}/>
				<Field name="address" label="Address" component={FormInput}/>
				<Field name="city" label="City" component={FormInput}/>
				<div className="row">
					<Field component={StatePicker}/>
					<Field name="zip" label="Zip" component={FormInput}/>
				</div>

				<button className="btn btn-lg btn-outline-primary" type="submit">Submit</button>
				<button className="btn btn-lg btn-outline-primary" type="reset">Clear</button>
			</Form>}
		</Formik>
	)
}

export default App;
