import styles from '../styles/Signup.module.css'
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
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import Link from 'next/link';
import { useHooks } from 'service/apiCalls';
import { useEffect, useState } from 'react';

export default function Signin() {

    const hooks = useHooks();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        hooks.redirectIfLoggedIn();
    })

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

    const onSubmit = async (userCreds) => {
        setLoading(true);
        await hooks.signin(userCreds);
        setLoading(false);
    };

    return (
        <Container className={styles.signup} maxWidth="xs">
            <Paper elevation={3}>
                <Box px={3} py={2}>
                    <Typography variant="h6" align="center" margin="dense">
                        Sign In
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <TextField
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
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                margin="dense"
                                {...register('password')}
                                error={errors.password ? true : false}
                                onKeyUp={(e)=>{
                                    if(e.code === 'Enter') handleSubmit(onSubmit)();
                                }}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.password?.message}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container my={3}>
                        <LoadingButton
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}
                            fullWidth
                            size="large"
                            disableElevation
                            loading={loading}
                            sx={{ 'textTransform': 'none', 'backgroundColor': '#1877f2' }}
                        >
                            Sign In
                        </LoadingButton>
                    </Grid>
                    <Grid container py={3} justifyContent='center' sx={{ 'borderTop': '1px solid #dadde1' }}>
                        <Link href='/signup' passHref>
                            <Button
                                variant="contained"
                                color="success"
                                size='large'
                                disableElevation
                                sx={{ 'textTransform': 'none', 'backgroundColor': '#42b72a' }}
                            >
                                Create New Account
                            </Button>
                        </Link>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}