import * as yup from "yup";

export const signInSchema = yup.object().shape({
  username: yup
    .string()
    .required("Kullanıcı adı zorunludur")
,
  password: yup
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre zorunludur"),
});
