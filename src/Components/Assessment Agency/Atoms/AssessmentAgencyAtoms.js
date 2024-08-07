import { atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(savedValue);
    }

    onSet((newValue) => {
      if (newValue) {
        localStorage.setItem(key, newValue);
      } else {
        localStorage.removeItem(key);
      }
    });
  };

export const authTokenState = atom({
  key: "authTokenState",
  default: {
    isAuthenticated: localStorage.getItem("aaAuthToken") ? true : false,
    token: localStorage.getItem("aaAuthToken")
      ? localStorage.getItem("aaAuthToken")
      : null,
    applicationStatus: localStorage.getItem("applicationStatus")
      ? localStorage.getItem("applicationStatus")
      : null,
  },
});

export const assessmentAgencyIdState = atom({
  key: "assessmentAgencyIdState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("assessmentAgencyId")],
});

export const assessmentAgencyNameState = atom({
  key: "assessmentAgencyNameState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("assessmentAgencyName")],
});

export const batchIdState = atom({
  key: "batchIdState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("batchId")],
});

export const examIdState = atom({
  key: "examIdState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("examId")],
});

export const courseNameState = atom({
  key: "courseNameState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("courseName")],
});

export const tpNameState = atom({
  key: "tpNameState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("tpName")],
});

export const batchAbnState = atom({
  key: "batchAbnState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("batchAbnState")],
});

export const examDateState = atom({
  key: "examDateState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("examDate")],
});

export const sectorState = atom({
  key: "sectorState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("sectorState")],
});

export const setStudentIdState = atom({
  key: "setStudentIdState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("studentId")],
});

export const setStudentRegdState = atom({
  key: "setStudentRegdState",
  default: "220720100204",
  effects_UNSTABLE: [localStorageEffect("studentRegd")],
});

export const setStudentNameState = atom({
  key: "setStudentNameState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("studentName")],
});

export const setCenterIdState = atom({
  key: "setCenterIdState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("centerID")],
});

export const setStudentDobState = atom({
  key: "setStudentDobState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("studentDob")],
});

export const setStudentProfilePictureState = atom({
  key: "setStudentProfilePictureState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("studentProfilePicture")],
});

export const setExamIdState = atom({
  key: "setExamIdState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("examID")],
});

export const setAbsentCountState = atom({
  key: "setAbsentCountState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("absentCount")],
});
