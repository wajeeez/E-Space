import * as yup from "yup";
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/])(?!.*\s).{8,}$/

const erroMessage = "use lowercase, uppercase and digits";

const regSchema = yup.object().shape({
  tname: yup.string().max(30).required("name is required"),
  institute: yup.string(),
  phone: yup.number(),
  email: yup
    .string()
    .email("enter a valid email")
    .required("email is required"),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, { message: erroMessage })
    .required("password is required"),
 
});

export default regSchema;
