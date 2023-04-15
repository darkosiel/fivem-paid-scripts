import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
    colorScheme: 'dark',
    fontFamily: 'Poppins',
    shadows: { sm: '1px 1px 3px rgba(0, 0, 0, 0.5)' },
    components: {
        Button: {
            styles: {
                root: {
                    border: 'none',
                },
                button: {
                    backgroundColor: 'var(--alt-opacity-color)',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'var(--alt-color)',
                    }
                },
            },
        },
        Modal: {
            styles: {
                root: {
                    backgroundColor: 'transparent',
                },
                modal: {
                    backgroundColor: 'var(--primary-color)',
                },
            },
        },
        Select: {
            styles: {
                input: {
                    backgroundColor: 'var(--alt-opacity-color)',
                    border: 'none',
                    '&:focus': {
                        border: '1.5px solid var(--alt-color)',
                    }
                },
                dropdown: {
                    backgroundColor: 'var(--primary-color)',
                },
                item: {
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'var(--alt-color)',
                    },
                    '&[data-selected]': {
                        backgroundColor: 'var(--alt-highlight-color)',
                    },
                },
            },
        },
        NumberInput: {
            styles: {
                input: {
                    backgroundColor: 'var(--alt-opacity-color)',
                    border: 'none',
                    '&:focus': {
                        border: '1.5px solid var(--alt-color)',
                    }
                },
                dropdown: {
                    backgroundColor: 'var(--primary-color)',
                },
                item: {
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'var(--alt-color)',
                    },
                    '&[data-selected]': {
                        backgroundColor: 'var(--alt-highlight-color)',
                    },
                },
            },
        },
        Input: {
            styles: {
                root: {
                    border: '1.5px solid transparent',
                    '&:focus': {
                        border: '1.5px solid var(--alt-color)',
                    }
                },
                input: {
                    backgroundColor: 'var(--alt-opacity-color)',
                    border: '1.5px solid transparent',
                    '&:focus': {
                        border: '1.5px solid var(--alt-color)',
                    }
                },
            },
        },
        PasswordInput: {
            styles: {
                root: {
                    border: '1.5px solid transparent',
                    '&:focus': {
                        border: '1.5px solid var(--alt-color)',
                    }
                },
                input: {
                    backgroundColor: 'var(--alt-opacity-color)',
                    border: '1.5px solid transparent',
                    '&:focus': {
                        border: '1.5px solid var(--alt-color)',
                    }
                },
            },
        },
        Badge: {
            styles: {
                root: {
                    backgroundColor: 'var(--alt-color)',
                    color: 'white',
                },
            },
        },
    },
};