import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useHooks } from 'service/apiCalls';

export default function NavBar() {
    const hooks = useHooks();
    const user = hooks.user;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ borderRadius: '5px' }}>
                <Toolbar>
                    <Link href="/" passHref>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ display: { sm: 'block' }, cursor: 'pointer' }}
                        >
                            MQL
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <MenuItem>
                        <Link href="/public-lists" passHref>
                            <Typography textAlign="center">Public Lists</Typography>
                        </Link>
                    </MenuItem>
                    {
                        user ?
                            <>
                                <MenuItem>
                                    <Link href="/profile" passHref>
                                        <Typography textAlign="center">Profile</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={hooks.logout}>
                                    <Typography textAlign="center">Log out</Typography>
                                </MenuItem>
                            </> :
                            <>
                                <MenuItem>
                                    <Link href="/signin" passHref>
                                        <Typography textAlign="center">Login</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link href="/signup" passHref>
                                        <Typography textAlign="center">Signup</Typography>
                                    </Link>
                                </MenuItem>
                            </>
                    }
                    <MenuItem>
                        <Link href="/about" passHref>
                            <Typography textAlign="center">About</Typography>
                        </Link>
                    </MenuItem>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
