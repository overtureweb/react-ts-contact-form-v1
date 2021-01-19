import React from "react";
import dogBreeds from "../data/dogBreeds.json";
import {ErrorMessage, FormikValues, getIn} from "formik";
import classNames from "classnames";

const breedOptions: JSX.Element[] | any = dogBreeds.map((breed,i) => <option key={`dogbreed-${i}`} value={breed}/>);

const DogBreedPicker: React.FC<FormikValues> = ({form: formik, field}) => (
	<div className="mb-3">
		<label className="form-label" htmlFor={field.name}>What breed or mix is your dog?</label>
		<input list={`${field.name}-list`}
		       id={field.name}
		       {...formik.getFieldProps(field.name)}
		       className={classNames("form-control form-control-lg", {"is-invalid": getIn(formik.errors, field.name) && getIn(formik.touched, field.name)})}/>
		<ErrorMessage component="div" name={field.name} className="invalid-feedback"/>
		<datalist id={`${field.name}-list`}>
			{breedOptions}
		</datalist>
	</div>
)

export default DogBreedPicker;