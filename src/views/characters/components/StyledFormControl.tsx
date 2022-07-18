import { FormControl, styled } from '@mui/material';

const StyledFormControl = styled(FormControl)({
    '& .MuiOutlinedInput-input': {
        color: '#b3e028',
    },
    '& .MuiInputLabel-root': {
        color: '#b3e028',
    },
    '& MuiSelect-select': {
        borderColor: '#b3e028',
    },
    '&:hover .MuiOutlinedInput-input': {
        color: '#12b0c9',
    },
    '&:hover .MuiInputLabel-root': {
        color: '#12b0c9',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#12b0c9',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
        color: '#b3e028',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#b3e028',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#b3e028',
    },
    '& .MuiSvgIcon-root': {
        fill: '#b3e028',
    },
});
export default StyledFormControl;
