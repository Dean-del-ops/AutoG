import React from 'react';
import { Button, TextField, TextFieldProps, ButtonProps, CircularProgress } from '@mui/material';

// Default styles for Button
const defaultButtonStyles = {
  color: 'white',
  backgroundColor: '#1976d2',
  padding: '10px 20px',
  fontSize: '16px',
  textTransform: 'none',
};

// Default styles for TextField
const defaultTextFieldStyles = {
  fullWidth: true,
  margin: 'normal',
};

// HOC for Button

interface LoadingButtonProps extends ButtonProps {
    loading?: boolean; // Add custom loading prop
  }

export const withButtonStyles = (WrappedButton: React.ElementType = Button) => {
  return (props: LoadingButtonProps) => {
    const { loading, children, ...restProps } = props;

    return (
      <WrappedButton
        {...restProps}
        sx={{ ...defaultButtonStyles, ...restProps.sx }}
        disabled={loading || restProps.disabled} // Disable button when loading
      >
        {loading ? 
        <div style={{display:"flex", gap:"8px"}}>
        <CircularProgress size={24} color="inherit" /> 
        {children}
        </div>
        : children}
      </WrappedButton>
    );
  };
};


// HOC for TextField
export const withTextFieldStyles = (WrappedTextField: React.ElementType = TextField) => {
  return (props: TextFieldProps) => {
    return <WrappedTextField {...props} sx={{ ...defaultTextFieldStyles, ...props.sx }} />;
  };
};
