import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Container,
} from '@mui/material';
import * as Yup from 'yup';
import Link from 'next/link';

const Signin = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3}>
        <Box px={3} py={2}>
          <Typography variant="h6" align="center" margin="dense">
            SignIn
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                margin="dense"
                {...register('email')}
                error={errors.email ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="dense"
                {...register('password')}
                error={errors.password ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
            </Grid>
          </Grid>
          <Grid container my={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              fullWidth
              size='large'
              disableElevation
              sx={{ 'textTransform': 'none', 'backgroundColor': '#1877f2' }}
            >
              Sign In
            </Button>
          </Grid>
          <Grid container py={3} justifyContent='center' sx={{ 'borderTop': '1px solid #dadde1' }}>
            <Link href='/signup' passHref>
              <Button
                variant="contained"
                color="success"
                size='large'
                disableElevation
                sx={{ 'textTransform': 'none', 'width':'150px' ,'backgroundColor': '#42b72a' }}
              >
                Sign Up
              </Button>
            </Link>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signin;
