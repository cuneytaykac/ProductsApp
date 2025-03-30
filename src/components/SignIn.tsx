import {
    Alert,
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash, FaLock as LockIcon, FaUserAlt as PersonIcon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSchema } from "../schemas/schema.ts";
import { useFetchSignInMutation } from "../store/apis/signInApi";
import { AuthState, togglePasswordVisibility } from "../store/slices/authSlice/AuthSlice";


const SignIn = () => {
  const [fetchSignIn, { isLoading, error }] = useFetchSignInMutation();
  const dispatch = useDispatch();
  const showPassword = useSelector((state: { auth: AuthState }) => state.auth.showPassword);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      try {
        const result = await fetchSignIn(values).unwrap();
        console.log("Giriş başarılı:", result);
       navigate('/home');
      } catch (err) {
        console.error("Giriş başarısız:", err);
      }
    },
  });

  const handleClickShowPassword = () => {
    dispatch(togglePasswordVisibility());
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(https://source.unsplash.com/random/1600x900/?login,background)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <LockIcon color="#1976d2" size={60} />
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Giriş Yap
            </Typography>
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="username"
                label="Kullanıcı Adı"
                variant="outlined"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                InputProps={{
                  startAdornment: (
                    <PersonIcon color="#757575" style={{ marginRight: "8px" }} />
                  ),
                }}
              />

              <TextField
                fullWidth
                name="password"
                label="Şifre"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  startAdornment: (
                    <LockIcon color="#757575" style={{ marginRight: "8px" }} />
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Kullanıcı adı veya şifre hatalı!
                </Alert>
              )}

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                  }
                }}
              >
                {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignIn;