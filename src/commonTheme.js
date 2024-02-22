import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        secondary: '#242424',
        primary: '#0096FD',
        light: '#343434',
        secondaryPrimary: '#0086e6', // Assuming "secondryPrimary" was intended to be "secondaryPrimary"
        white: '#ffffff',
    },
    components: {
        Input: {
            variants: {
                filled: {
                    field: {
                        _focus: { backgroundColor: 'light' },
                        _hover: { backgroundColor: 'light' },
                        backgroundColor: 'secondary',
                        borderColor: 'primary',
                        borderWidth: '2px',
                    },
                },
            },
        },
        Drawer: {
            baseStyle: {
                dialog: {
                    bg: 'secondary',
                },
            },
        },
        Menu: {
            baseStyle: {
                list: {
                    bg: 'secondary',
                    borderColor: 'light',
                },
                item: {
                    bg: 'secondary',
                    _hover: {
                        bg: 'light',
                    },
                    _focus: {
                        bg: 'light',
                        boxShadow: 'outline',
                    },
                    _active: {
                        bg: 'secondaryPrimary',
                    },
                },
            },
        },
    },
    Spinner: {
        baseStyle: {
            color: "primary"
        }
    },
    Alert: {
        baseStyle: {
            title: {
                fontWeight: "bold",
                color: "#000"
            },
            description: {
                color: "#000"
            }
        },
    }
});

export default theme;
