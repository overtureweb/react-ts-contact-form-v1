import React from "react";
import "./main.scss";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as Yup from "yup"
import StatePicker from "./components/StatePicker";
import DogBreedPicker from "./components/DogBreedPicker";
import FormInput from "./components/FormInput";

function App() {
	const petObject = {name: "", breed: ""}
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
				dogBreed: "",
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
								values.pets.length > 0 && values.pets.map((pet, i) =>
									<React.Fragment key={`pet-${i}`}>
										<Field name={`pets.${i}.name`}
										       label="Name"
										       component={FormInput}/>
										<Field name={`pets.${i}.breed`}
										       label="Breed"
										       component={DogBreedPicker}/>
									</React.Fragment>)
							}
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
