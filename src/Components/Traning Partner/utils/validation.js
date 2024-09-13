import * as Yup from "yup";

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const panRegExp = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export const validationSchema = Yup.object({
  organizationName: Yup.string().trim().required("Organization Name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[@#$%^&*(),.?:{}|<>]/, "Password must contain at least one symbol")
    .matches(/\d/, "Password must contain one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
  organizationCategory: Yup.string().required("Organization Category is required"),
  centerId: Yup.string().required("Center ID is required"),
  tpCode: Yup.string().required("TP Code is required"),
  scheme: Yup.string().required("Scheme is required"),
  affiliation: Yup.string().required("Affiliation is required"),
  dateOfIncorporation: Yup.date().max(new Date(), "Date cannot be in the future").required("Date of Incorporation is required"),
  registeredOfficeAddress: Yup.string().required("Registered Office Address is required"),
  registeredOfficeDistrict: Yup.string().required("Registered Office District is required"),
  registeredOfficeCity: Yup.string().required("Registered Office City is required"),
  registeredOfficeState: Yup.string().required("Registered Office State is required"),
  registeredOfficePin: Yup.string()
    .matches(/^\d{6}$/, "PIN must be exactly 6 digits")
    .required("Registered Office PIN is required"),
  registeredOfficeTelephone: Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Registered Office Telephone is required"),
  registeredOfficeMobile: Yup.string()
    .matches(phoneRegExp, "Invalid mobile number")
    .required("Registered Office Mobile is required"),
  registeredOfficeFax: Yup.string()
    .matches(/^\d+$/, "Must be only digits")
    .required("Registered Office Fax is required"),
  registeredOfficeEmail: Yup.string()
    .email("Invalid email")
    .required("Registered Office Email is required"),
  registeredOfficeGst: Yup.string()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST number")
    .required("Registered Office GST is required"),
  regionalStateOfficeAddress: Yup.string()
    .required("Regional State Office Address is required"),
  regionalStateOfficeDistrict: Yup.string()
    .required("Regional State Office District is required"),
  regionalStateOfficeCity: Yup.string()
    .required("Regional State Office City is required"),
  regionalStateOfficeState: Yup.string()
    .required("Regional State Office State is required"),
  regionalStateOfficePin: Yup.string()
    .matches(/^\d{6}$/, "PIN must be exactly 6 digits")
    .required("Regional State Office PIN is required"),
  regionalStateOfficeTelephone: Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Regional State Office Telephone is required"),
  regionalStateOfficeMobile: Yup.string()
    .matches(phoneRegExp, "Invalid mobile number")
    .required("Regional State Office Mobile is required"),
  regionalStateOfficeFax: Yup.string()
    .matches(/^\d+$/, "Must be only digits")
    .required("Regional State Office Fax is required"),
  regionalStateOfficeEmail: Yup.string()
    .email("Invalid email")
    .required("Regional State Office Email is required"),
  regionalStateOfficeGst: Yup.string()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST number")
    .required("Regional State Office GST is required"),
  website: Yup.string()
    .url("Invalid URL format")
    .required("Website is required"),
  pan: Yup.string()
    .matches(panRegExp, "Invalid PAN")
    .required("PAN is required"),
  prnNo: Yup.string().required("PRN No is required"),
  headOwnerName: Yup.string().required("Head Owner Name is required"),
  headOwnerDob: Yup.date()
    .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), "Must be at least 18 years old")
    .required("Head Owner DOB is required"),
  headOwnerCity: Yup.string().required("Head Owner City is required"),
  headOwnerResidenceAddress: Yup.string()
    .required("Head Owner Residence Address is required"),
  headOwnerPermanentAddress: Yup.string()
    .required("Head Owner Permanent Address is required"),
  headOwnerMobile: Yup.string()
    .matches(phoneRegExp, "Invalid mobile number")
    .required("Head Owner Mobile is required"),
  headOwnerAlternateMobile: Yup.string()
    .matches(phoneRegExp, "Invalid mobile number")
    .nullable(),
  headOwnerEmail: Yup.string()
    .email("Invalid email")
    .required("Head Owner Email is required"),
  headOwnerQualification: Yup.string()
    .required("Head Owner Qualification is required"),
  headOwnerWorkExperience: Yup.number()
    .positive("Must be a positive number")
    .required("Work experience is required"),
  headOwnerPanNo: Yup.string()
    .matches(panRegExp, "Invalid PAN")
    .required("Head Owner PAN is required"),
  headOwnerAadharNo: Yup.string()
    .matches(/^\d{12}$/, "Invalid Aadhaar")
    .required("Head Owner Aadhaar is required"),
  headOwnerPromoter1: Yup.string(),
  headOwnerPromoter2: Yup.string(),
  headOwnerPromoter3: Yup.string(),
  projectContactPersonName: Yup.string()
    .required("Project Contact Person Name is required"),
  projectContactPersonDesignation: Yup.string()
    .required("Project Contact Person Designation is required"),
  projectContactPersonCity: Yup.string()
    .required("Project Contact Person City is required"),
  projectContactPersonMobile: Yup.string()
    .matches(phoneRegExp, "Invalid mobile number")
    .required("Project Contact Person Mobile is required"),
  projectContactPersonAlternateMobile: Yup.string()
    .matches(phoneRegExp, "Invalid mobile number")
    .nullable(),
  projectContactPersonResidenceAddress: Yup.string()
    .required("Project Contact Person Residence Address is required"),
  projectContactPersonPermanentAddress: Yup.string()
    .required("Project Contact Person Permanent Address is required"),
  projectContactPersonEmail: Yup.string()
    .email("Invalid email")
    .required("Project Contact Person Email is required"),
  projectContactPersonAlternateEmail: Yup.string()
    .email("Invalid email")
    .nullable(),
  sector: Yup.string().required("Sector is required"),
});
