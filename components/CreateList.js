import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, TextField, MenuItem, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useHooks } from 'service/apiCalls';
import { useState } from 'react';

export default function CreateList({ setShowCreate }) {
    const hooks = useHooks();
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').min(3),
        status: Yup.mixed().oneOf(['Private', 'Public'])
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
        const result = await hooks.createList(listdata);
        if (result) setShowCreate(false);
        setLoading(false);
    };

    return (
        <Grid container spacing={1} sx={{ marginTop: '10px' }} alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h6">
                    Create new List
                </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
                <TextField
                    id="name"
                    name="name"
                    label="List name"
                    size="small"
                    required
                    fullWidth
                    {...register('name')}
                    error={errors.name ? true : false}
                    helperText={errors.name?.message}
                />
            </Grid>
            <Grid item xs={6} sm={2}>
                <TextField
                    select
                    id="access"
                    name="access"
                    label="Access"
                    size="small"
                    defaultValue="Private"
                    required
                    fullWidth
                    {...register('access')}
                    error={errors.access ? true : false}
                >
                    <MenuItem id="Private" value="Private">Private</MenuItem>
                    <MenuItem id="Public" value="Public">Public</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={6} sm={2}>
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    disableElevation
                    onClick={handleSubmit(onSubmit)}
                    fullWidth
                >
                    Create
                </LoadingButton>
            </Grid>
        </Grid>
    )
}