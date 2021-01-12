import React from "react";
import "./main.scss";
import {FormikValues, useFormik} from "formik";
import * as Yup from "yup"
import classNames from "classnames";
import StatePicker from "./components/StatePicker";

function App() {
	const formik = useFormik<FormikValues>({
		initialValues: {
			firstName: "",
			lastName: "",
			phone: "",
			email: "",
			address: "",
			city: "",
			state: "",
			zip: "",
			startDate: ""
		},
		validationSchema: Yup.object({
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
		}),
		onSubmit: values => console.log(values)
	});

	return (
		<form onSubmit={formik.handleSubmit} noValidate={true}>
			<div className="mb-3">
				<label htmlFor="firstName" className="form-label">First Name</label>
				<input id="firstName"
				       {...formik.getFieldProps("firstName")}
				       className={classNames("form-control form-control-lg", {"is-invalid": formik.errors.firstName && formik.touched.firstName})}/>
				<div className="invalid-feedback">{formik.errors.firstName}</div>
			</div>
			<div className="mb-3">
				<label htmlFor="lastName" className="form-label">Last Name</label>
				<input id="lastName"
				       {...formik.getFieldProps("lastName")}
				       className={classNames("form-control form-control-lg", {"is-invalid": formik.errors.lastName && formik.touched.lastName})}/>
				<div className="invalid-feedback">{formik.errors.lastName}</div>
			</div>
			<div className="mb-3">
				<label htmlFor="email" className="form-label">Email</label>
				<input id="email"
				       type="email"
				       {...formik.getFieldProps("email")}
				       className={classNames("form-control form-control-lg", {"is-invalid": formik.errors.email && formik.touched.email})}/>
				<div className="invalid-feedback">{formik.errors.email}</div>
			</div>
			<div className="mb-3">
				<label htmlFor="phone" className="form-label">Phone</label>
				<input id="phone"
				       type="tel"
				       {...formik.getFieldProps("phone")}
				       className={classNames("form-control form-control-lg", {"is-invalid": formik.errors.phone && formik.touched.phone})}/>
				<div className="invalid-feedback">{formik.errors.phone}</div>
			</div>
			<div className="mb-3">
				<label htmlFor="address" className="form-label">Address</label>
				<input id="address"
				       {...formik.getFieldProps("address")}
				       className={classNames("form-control form-control-lg", {"is-invalid": formik.errors.address && formik.touched.address})}/>
				<div className="invalid-feedback">{formik.errors.address}</div>
			</div>
			<div className="mb-3">
				<label htmlFor="city" className="form-label">City</label>
				<input id="city"
				       {...formik.getFieldProps("city")}
				       className={classNames("form-control form-control-lg", {"is-invalid": formik.errors.city && formik.touched.city})}/>
				<div className="invalid-feedback">{formik.errors.city}</div>
			</div>
			<div className="row">
				<StatePicker formik={formik}/>
				<div className="mb-3 col">
					<label htmlFor="zip" className="form-label">Zip</label>
					<input id="zip"
					       {...formik.getFieldProps("zip")}
					       className={classNames("form-control form-control-lg", {"is-invalid": formik.errors.zip && formik.touched.zip})}/>
					<div className="invalid-feedback">{formik.errors.zip}</div>
				</div>
			</div>
			<button className="btn btn-lg btn-outline-primary" type="submit">Submit</button>
		</form>
	)
}

export default App;
