import { createTheme, Theme } from '@mui/material/styles';

// define constomize scheme

const Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2E6EDF',
        },
        secondary: {
            main: '#9070af',
        },
        error: {
            main: '#f50057',
        },
        success: {
            main: '#4caf50',
        },
        info: {
            main: '#9cc8ed',
        },
        warning: {
            main: '#ff9800',
        },
        appb: {
            main: '#2f2f2f',
        },
        white: {
            main: '#AEBDD8',
        },
        // black: {
        //     main: '#1A1C25',
        //     light: '#212121',
        // },
        bt: {
            main: '#AEBDD8',
            dark: '#697283',
            cont: '#c189d9',
        }
    },
    typography: {
        // define default fonts.
        fontFamily: "-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif"

    },
    '& .MuiPopover-root': {
        background: '#fff'
    }
} as any);

export default Theme