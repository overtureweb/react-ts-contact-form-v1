import React from "react";
import FormInput from "./FormInput";
import FormDatalist from "./FormDatalist";
import dogBreeds from "../data/dogBreeds";
import FormSelect from "./FormSelect";
import {getMonthsForDropDown, getYearsForDropDown} from "../utilities/DateUtilities";
import FormCheckbox from "./FormCheckbox";
import {FieldArray, FormikValues, useFormikContext} from "formik";

const FormFieldArray = () => {
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
	const {values: {pets}} = useFormikContext<FormikValues>();
	return (
		<FieldArray name="pets">
			{({remove, push}) =>
				<>
					{
						pets.length > 0 && (pets as object[]).map((pet, i, arr) =>
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
		</FieldArray>)
}

export default FormFieldArray;