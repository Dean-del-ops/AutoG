import { withButtonStyles, withTextFieldStyles } from './withStyles';
import { Button, TextField } from '@mui/material';

// Create reusable components
export const CustomButton = withButtonStyles(Button);
export const CustomTextField = withTextFieldStyles(TextField);
