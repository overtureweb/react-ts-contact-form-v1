import React, {useMemo, useState} from "react";
import dogBreeds from "../data/dogBreeds.json";
import {v4 as uuidv4} from "uuid";
import {ErrorMessage, FormikValues, getIn} from "formik";
import classNames from "classnames";

const DogBreedPicker: React.FC<FormikValues> = ({form: formik, field}) => {
	const [breeds] = useState<string[]>(dogBreeds);
	const breedOptions: JSX.Element[] = useMemo(() =>
		breeds.map(breed =>
			<option key={uuidv4()}
			        value={breed}/>), [breeds]);
	return (
		<div className="mb-3">
			<label className="form-label" htmlFor={field.name}>What breed or mix is your dog?</label>
			<input list="dog-breed-list"
			       id={field.name}
			       {...formik.getFieldProps(field.name)}
			       className={classNames("form-control form-control-lg", {"is-invalid": getIn(formik.errors, field.name) && getIn(formik.touched, field.name)})}/>
			<ErrorMessage component="div" name={field.name} className="invalid-feedback"/>
			<datalist id="dog-breed-list">
				{breedOptions}
			</datalist>
		</div>
	)
}

export default DogBreedPicker;