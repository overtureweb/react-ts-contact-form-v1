import React from "react";
import {FormikValues} from "formik";

const FormCheckbox: React.FC<FormikValues> = ({form: formik, field, value, id}) =>
<div className="form-check form-check-inline">
	<input {...formik.getFieldProps(field.name)} className="form-check-input" type="checkbox" value={value} id={id} />
	<label className="form-check-label" htmlFor={id}>
		{value}
	</label>
</div>

export default FormCheckbox;
