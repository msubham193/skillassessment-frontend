import * as Yup from "yup";





export const validationSchema = Yup.object({
    organizationName: Yup.string().required("organizationName is required"),
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Password must be at least 8 Charecter")
      .matches(
        /[@#$%^&*(),.?:{}|<>]/,
        "Password must conation at least one symbol"
      )
      .matches(/[0-9]/, "Password must conation one Number")
      .matches(/[a-z]/, "Password contain at least one lowercase letter"),

    organizationCategory: Yup.string().required(
      "organizationCategory is required"
    ),
    tpCode: Yup.string().required("tpCode is required"),
    scheme: Yup.string().required("scheme is required"),
    affiliation: Yup.string().required("affiliation is required"),
    registeredOfficeAddress: Yup.string().required(
      "registeredOfficeAddress is required"
    ),
    registeredOfficeDistrict: Yup.string().required(
      "registeredOfficeDistrict is required"
    ),
    registeredOfficeCity: Yup.string().required(
      "registeredOfficeCity is required"
    ),
    registeredOfficeState: Yup.string().required(
      "registeredOfficeState is required"
    ),
    registeredOfficePin: Yup.string().required(
      "registeredOfficePin is required"
    ),
    registeredOfficeTelephone: Yup.string()
      .matches(/^\d{10}$/, "registeredOfficeTelephone is must bq 10 digit")
      .required("registeredOfficeTelephone is required"),
    registeredOfficeMobile: Yup.string()
      .matches(/^\d{10}$/, "registeredOfficeMobile is must bq 10 digit")
      .required("registeredOfficeMobile is required"),
    registeredOfficeFax: Yup.string().required(
      "registeredOfficeFax is required"
    ),
    registeredOfficeEmail: Yup.string()
      .email("Invalid Email id")
      .required("registeredOfficeEmail is required"),
    registeredOfficeGst: Yup.string()
      // .matches(
      //   /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/,
      //   "Invalid GST Number"
      // )
      .required("registeredOfficeGst is required"),
    regionalStateOfficeAddress: Yup.string().required(
      "regionalStateOfficeAddress is required"
    ),
    regionalStateOfficeDistrict: Yup.string().required(
      "regionalStateOfficeDistrict is Required"
    ),
    regionalStateOfficeCity: Yup.string().required(
      "regionalStateOfficeCity is required"
    ),
    regionalStateOfficeState: Yup.string().required(
      "regionalStateOfficeState is required"
    ),
    regionalStateOfficePin: Yup.string().required(
      "regionalStateOfficePin is required"
    ),
    regionalStateOfficeTelephone: Yup.string()
      .matches(/^\d{10}$/, "regionalStateOfficeTelephone is must be 10 digit")
      .required("regionalStateOfficeTelephone is required"),
    regionalStateOfficeMobile: Yup.string()
      .matches(/^\d{10}$/, "regionalStateOfficeMobile must be 10 digit")
      .required("regionalStateOfficeMobile is required"),
    regionalStateOfficeFax: Yup.string().required(
      "regionalStateOfficeFax is Required"
    ),
    regionalStateOfficeEmail: Yup.string()
      .email("Invalid email id")
      .required("regionalStateOfficeEmail is required"),
    regionalStateOfficeGst: Yup.string()
      // .matches(
      //   /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/,
      //   "Invalid GST Number"
      // )
      .required("regionalStateOfficeGst is required"),
    pan: Yup.string()
      .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid Pan")
      .required("pan is required"),
    prnNo: Yup.string().required("prnNo is required"),
    headOwnerName: Yup.string().required("headOwnerName is required"),
    headOwnerCity: Yup.string().required("headOwnerCity is required"),
    headOwnerResidenceAddress: Yup.string().required(
      "headOwnerResidenceAddress is required"
    ),
    headOwnerPermanentAddress: Yup.string().required(
      "headOwnerPermanentAddress is required"
    ),
    headOwnerMobile: Yup.string()
      .matches(/^\d{10}$/, "Invalid number")
      .required("headOwnerMobile is required"),
    headOwnerEmail: Yup.string()
      .email("Invalid Email")
      .required("headOwnerEmail is Invalid"),
    headOwnerQualification: Yup.string().required(
      "headOwnerQualification is required"
    ),
    headOwnerPanNo: Yup.string()
      .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid Pan")
      .required("headOwnerPan is required"),
    headOwnerAadharNo: Yup.string()
      .matches(/^[2-9]{1}[0-9]{11}$/, "Invalid Adhar")
      .required("headOwnerAdhar is required"),
    projectContactPersonName: Yup.string().required(
      "projectContactPersonName is required"
    ),
    projectContactPersonMobile: Yup.string()
      .matches(/^\d{10}$/, "Invalid mobile Number")
      .required("projectContactPersonMobile is required"),
    projectContactPersonEmail: Yup.string()
      .email("Invalid Email")
      .required("projectContactPersonEmail is required"),
  });
