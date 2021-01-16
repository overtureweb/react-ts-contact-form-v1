import React, {useMemo, useState} from "react";
import dogBreeds from "../data/dogBreeds.json";
import {v4 as uuidv4} from "uuid";
import {FormikValues} from "formik";
import classNames from "classnames";

const DogBreedPicker: React.FC<FormikValues> = ({form: formik}) => {
	const [breeds] = useState<string[]>(dogBreeds)
	const breedOptions: JSX.Element[] = useMemo(() =>
		breeds.map(breed =>
			<option key={uuidv4()}
			        value={breed}/>), [breeds]);

	return (
		<div className="mb-3">
			<label className="form-label" htmlFor="dogBreed">What breed or mix is your dog?</label>
			<input list="dog-breed-list"
			       id="dogBreed"
			       {...formik.getFieldProps("dogBreed")}
			       className={classNames("form-control form-control-lg", {"is-invalid": formik.errors.dogBreed && formik.touched.dogBreed})}/>
			{/*this field is not currently required so no error will show*/}
			<div className="invalid-feedback">{formik.errors.dogBreed}</div>
			<datalist id="dog-breed-list">
				{breedOptions}
			</datalist>
		</div>
	)
}

export default DogBreedPicker;