import { Container } from "@mui/material"
import SigninForm from "../components/Signin"
import styles from '../styles/Signup.module.css'

export default function Signin() {
    return(
        <Container className={styles.signup} maxWidth="md">
            <SigninForm />
        </Container>
    )
}