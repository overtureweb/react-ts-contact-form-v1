import React from "react";
import {FormikValues} from "formik";

const FormRadioGroup: React.FC<FormikValues> = ({form: formik, field, value, id}) => (
		<div className="form-check form-check-inline mb-3">
			<input className="form-check-input"
			       type="radio"
			       id={id}
			       {...formik.getFieldProps(field.name)}
			       value={value}
			/>
			<label className="form-check-label" htmlFor={id}>
				{value}
			</label>
		</div>
)

export default FormRadioGroup;