import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import MuiLink from '@mui/material/Link';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    function Copyright() {
        return (
            <Typography variant="caption" align="center">
                {'Copyright © '}
                {new Date().getFullYear()}{' '}
                <MuiLink color="#73b9ff" href="https://my-question-list.vercel.app/">
                    MyQuestionList
                </MuiLink>
                {'.'}
            </Typography>
        );
    }
    return (
        <Box component="footer" sx={{ marginTop: 'auto', color: '#73b9ff' }}>
            <Grid container marginY={2} direction={{xs:'column', sm:'row'}} justifyContent={{xs:'center', sm:'space-between'}}>
                <Grid item marginBottom={1}>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        component="p"
                    >
                        Developed by Prashant Kumar
                    </Typography>
                </Grid>
                <Grid container item sx={{'width':'136px'}} alignSelf="center" justifyContent="space-between" marginBottom={1}>
                    <a href="https://linkedin.com/in/prashant-kumar-jamshedpur" target='_blank' rel="noreferrer">
                        <LinkedInIcon />
                    </a>{' '}
                    <a href="https://github.com/Prashant2303" target='_blank' rel="noreferrer">
                        <GitHubIcon />
                    </a>{' '}
                    <a href="mailto: prashant1997.official@gmail.com">
                        <EmailIcon />
                    </a>
                </Grid>
                <Grid textAlign="center">
                    <Copyright />
                </Grid>
            </Grid>
        </Box>
    )
}