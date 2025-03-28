// src/components/SignIn.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from '../services/authApi';

// Yup validasyon şeması
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Geçersiz email formatı')
    .required('Email zorunludur'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .required('Şifre zorunludur'),
});

const SignIn = () => {
  const [login, { isLoading, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values).unwrap();
        console.log('Giriş başarılı!', response);
      } catch (err) {
        console.error('Giriş başarısız:', err);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        ) : null}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
      </button>

      {error && <div style={{ color: 'red' }}>Hatalı giriş!</div>}
    </form>
  );
};

export default SignIn;