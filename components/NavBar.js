import { AppBar, Box, Toolbar, Typography, MenuItem, IconButton, Menu } from '@mui/material';
import Link from 'next/link';
import { useHooks } from 'service/apiCalls';
import { useRecoilValue } from 'recoil';
import { stateUser } from 'store/atoms';
import { useState } from 'react';
import { MoreVert } from '@mui/icons-material';

export default function NavBar() {
    const hooks = useHooks();
    const user = useRecoilValue(stateUser);

    const [mobileAnchor, setMobileAnchor] = useState(null);
    const handleMobileMenuClick = (event) => {
        if (mobileAnchor) {
            setMobileAnchor(null);
        } else {
            setMobileAnchor(event.currentTarget);
        }
    }

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileAnchor}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            keepMounted
            open={!!mobileAnchor}
            onClose={handleMobileMenuClick}
        >
            {user ?
                <div>
                    <MenuItem onClick={handleMobileMenuClick}>
                        <Link href="/profile" passHref>
                            <Typography textAlign="center">Profile</Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={() => { hooks.logout(); handleMobileMenuClick() }}>
                        <Typography textAlign="center">Log out</Typography>
                    </MenuItem>
                </div> :
                <div>
                    <MenuItem onClick={handleMobileMenuClick}>
                        <Link href="/signin" passHref>
                            <Typography textAlign="center">Login</Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleMobileMenuClick}>
                        <Link href="/signup" passHref>
                            <Typography textAlign="center">Signup</Typography>
                        </Link>
                    </MenuItem>
                </div>}
            <MenuItem onClick={handleMobileMenuClick}>
                <Link href="/about" passHref>
                    <Typography textAlign="center">About</Typography>
                </Link>
            </MenuItem>
        </Menu>
    )

    return (
        <Box>
            <AppBar position="static" sx={{ borderRadius: '5px', marginTop: '10px' }}>
                <Toolbar>
                    <Link href="/" passHref>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                        >
                            MyQuestionList
                        </Typography>
                    </Link>
                    <Link href="/" passHref>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ display: { xs: 'block', sm: 'none' }, cursor: 'pointer' }}
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
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        {user ?
                            <div style={{ display: 'flex' }}>
                                <MenuItem>
                                    <Link href="/profile" passHref>
                                        <Typography textAlign="center">Profile</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={hooks.logout}>
                                    <Typography textAlign="center">Log out</Typography>
                                </MenuItem>
                            </div> :
                            <div style={{ display: 'flex' }}>
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
                            </div>}
                        <MenuItem>
                            <Link href="/about" passHref>
                                <Typography textAlign="center">About</Typography>
                            </Link>
                        </MenuItem>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                        <IconButton onClick={handleMobileMenuClick} color="inherit">
                            <MoreVert />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}
