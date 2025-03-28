import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFetchSignInMutation } from '../store/apis/signInApi';

const validationSchema = Yup.object({
  username: Yup.string().required('Kullanıcı adı zorunludur'),
  password: Yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre zorunludur'),
});

const SignIn = () => {
  const [fetchSignIn, { data, isLoading, error }] = useFetchSignInMutation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await fetchSignIn(values).unwrap();
        console.log('Giriş başarılı:', result);
        // Yönlendirme veya state güncelleme yapabilirsiniz
      } catch (err) {
        console.error('Giriş başarısız:', err);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Kullanıcı Adı"
        />
        {formik.touched.username && formik.errors.username && (
          <div style={{ color: 'red' }}>{formik.errors.username}</div>
        )}
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Şifre"
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        )}
      </div>

      {error && <div style={{ color: 'red' }}>Giriş başarısız!</div>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
      </button>
    </form>
  );
};

export default SignIn;