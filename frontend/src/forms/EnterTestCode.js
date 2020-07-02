import React from 'react';
import PropTypes from 'prop-types';

import { Form, Field } from 'react-final-form';

import { TextField } from 'final-form-material-ui';
import { makeStyles } from '@material-ui/styles';

import {
  Typography,
  Button,
  FormGroup,
  Box,
} from '@material-ui/core';

import { withRouter } from 'react-router';

import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  textField: {
    marginBottom: 36,
    minWidth: '48%',
  },
  headline: {
    color: theme.palette.primary.main,
  },
  button: {
    marginRight: 10,
  },
}));

// const InputLabelProps = { shrink: true };

// MAIN COMPONENT
const EnterTestCode = ({ history }) => {
  const classes = useStyles();
  const InputLabelProps = { shrink: true };

  const onSubmit = (values) => {
    history.push(`/${values.key}`);
  };

  return (
    <Box p={6}>
      <Box pb={4}>
        <Typography variant="h3" color="primary">
          Syötä postissa saamasi koodi
        </Typography>
      </Box>

      <Box>
        <Form
          onSubmit={onSubmit}
          render={({
            handleSubmit,
            pristine,
            submitting,
          }) => (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(event);
              }}
            >
              <FormGroup>
                {/* name */}
                <Field
                  name="key"
                  component={TextField}
                  label="koodi*"
                  className={classes.textField}
                  InputLabelProps={InputLabelProps}
                  variant="outlined"
                  margin="dense"
                  id="key"
                  key="key"
                  fullWidth={false}
                />
              </FormGroup>
              <Box className={classes.buttonBox}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={pristine || submitting}
                  className={classes.button}
                >
                  <SendIcon />
                  Kyselyyn
                </Button>
              </Box>
            </form>
          )}
        />
      </Box>
    </Box>
  );
};

EnterTestCode.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(EnterTestCode);