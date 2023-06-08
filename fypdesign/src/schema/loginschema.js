import * as yup from "yup";

const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/])(?!.*\s).{8,}$/

const errorMessage = "Invalid password pattern";

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('email is required'),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, { message: errorMessage })
    .required(),
});

export default loginSchema;