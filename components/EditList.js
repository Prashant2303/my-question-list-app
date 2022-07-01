import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useHooks } from 'service/apiCalls';
import { useState } from 'react';

export default function EditList({ setShowEdit }) {
    const hooks = useHooks();
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').min(3),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (listdata) => {
        setLoading(true);
        const result = await hooks.updateList('name', listdata.name.trim());
        setLoading(false);
        if (result) setShowEdit(false);
    };

    return (
        <Grid container spacing={1} sx={{ marginTop: '10px' }} alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h6">
                    Edit List name
                </Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
                <TextField
                    id="name"
                    name="name"
                    label="New name"
                    size="small"
                    required
                    fullWidth
                    {...register('name')}
                    error={errors.name ? true : false}
                    helperText={errors.name?.message}
                />
            </Grid>
            <Grid item xs={9} sx={{ display: { sm: 'none' } }}>
            </Grid>
            <Grid item xs={3} sm={2}>
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    disableElevation
                    onClick={handleSubmit(onSubmit)}
                    fullWidth
                >
                    Update
                </LoadingButton>
            </Grid>
        </Grid>
    )
}