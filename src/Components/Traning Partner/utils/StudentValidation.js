import * as Yup from "yup";

export const StudentvalidationSchema = Yup.object({
     // add student 
  name: Yup.string().required('Name is required'),
  fathername: Yup.string().required('Father’s name is required'),
  mothername: Yup.string().required('Mother’s name is required'),
  dob: Yup.date().required('Date of birth is required'),
  religion: Yup.string().required('Religion is required'),
  category: Yup.string().required('Category is required'),
  nationality: Yup.string().required('Nationality is required'),
  generalqualification: Yup.string().required('Qualification is required'),
  address: Yup.string().required('Address is required'),
  state: Yup.string().required('State is required'),
  district: Yup.string().required('District is required'),
  city: Yup.string().required('City is required'),
  pincode: Yup.string().matches(/^[1-9][0-9]{5}$/, 'Pincode must be a valid Indian postal code').required('Pincode is required'),
  mobile: Yup.string().matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  sector_name: Yup.string().required('Sector name is required'),
  course: Yup.string().required('Course is required'),
  module: Yup.string().required('Module is required'),
  uid: Yup.string().required('UID is required'),
  traininstartdate: Yup.date().required('Training start date is required'),
  trainingenddate: Yup.date().required('Training end date is required'),
  trainingHours: Yup.number().required('Training hours are required').typeError('Training hours must be a number'),
  totalhours: Yup.number().required('Total hours are required').typeError('Total hours must be a number'),
  totaldays: Yup.number().required('Total days are required').typeError('Total days must be a number'),
  cenid: Yup.string().required('Center ID is required'),
  redg_No: Yup.string().required('Registration number is required'),
  MPR_Id: Yup.string().required('MPR ID is required'),
  SNA_Id: Yup.string().required('SNA ID is required'),
})