import { Container } from "@mui/material"
import SignupForm from "../components/Signup"
import styles from '../styles/Signup.module.css'

export default function Signup() {
    return(
        <Container className={styles.signup} maxWidth="md">
            <SignupForm />
        </Container>
    )
}