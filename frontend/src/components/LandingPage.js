import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import PropTypes from 'prop-types';

import {
    Button,
    Box,
    Paper,
    Link,
    Typography,
    Dialog,
} from '@material-ui/core';

// import AssignmentIcon from '@material-ui/icons/Assignment';
import ForwardIcon from '@material-ui/icons/Forward';

import EnterTestCode from '../forms/EnterTestCode';

const useStyles = makeStyles((theme) => ({
  ideaTitle: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  noValue: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap',
  },
  actionButton: {
    marginRight: 10,
    marginBottom: 10,
  },
  actionIcon: {
    marginRight: -5,
    marginLeft: 5,
  },
  wrapper: {
    width: '100%',
    padding: 16,
  },
  container: {
    margin: '100px auto',
    width: 800,
    maxWidth: '100%',
  },
  infoBoxHeadline: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    maxWidth: '100%',
    maxHeigth: 150,
  },
  flexItem: {
    marginBottom: 16,
    minWidth: '48%',
  },
  flexButtons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  actionButtonRight: {
    marginBottom: 50,
  },
  mainTools: {
    marginTop: 6,
    display: 'flex',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  headline: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '20px',
    maxWidth: '100%',
  },
  bottomLogo: {
    margin: 'auto',
    maxWidth: '150px',
  },
  dbLogo: {
    margin: 'auto',
    height: 400,
  },
}));

const LandingPage = ({history}) => {
  const classes = useStyles();

  const [isTakeTestOpen, setIsTakeTestOpen] = useState(
    false,
  );

  const style = {
    // backgroundImage: 'url(/media/starfish.jpeg)',
    // backgroundPosition: 'center',
    backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    backgroundColor: '#a0b8bf',
  };

  return (
      <div style={style}>
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <Paper>
              <Box p={4} className={classes.centered}>
                <div className={classes.headline}>
                  <Typography variant="h1">
                    Turun yliopiston henkilökuvatutkimus 2020
                  </Typography>
                  {/* <Typography variant="h5" align="center">
                  The social mechanisms behind the economic consequences of physical appearance
                  </Typography> */}
                </div>
              </Box>
              <div className={classes.flexButtons}>
                <Button
                  aria-label="test"
                  className={classes.actionButtonRight}
                  variant="contained"
                  color="secondary"
                  onClick={() => setIsTakeTestOpen(true)}
                >
                  Kyselyyn 
                  <ForwardIcon
                    className={classes.actionIcon}
                  />
                </Button>
              </div>
              <div className={classes.flexBox}>
                <img
                  src="/media/AKA_LA01_vaaka__FI_B3___RGB.png"
                  alt="Suomen Akatemia"
                  className={classes.bottomLogo}
                />
                  <img
                  src="/media/Invest_logo.jpg"
                  alt="Invest"
                  className={classes.bottomLogo}
                />
                <img
                  src="/media/University_of_Turku.png"
                  alt="University of Turku"
                  className={classes.bottomLogo}
                />
              </div>
              <Box p={4} className={classes.centered}>
                <Typography variant="subtitle2">
                The social mechanisms behind the economic consequences of physical appearance.&nbsp;
                </Typography>
                <Typography variant="subtitle2">
                  <Link href="https://soma.utu.fi/">
                    https://soma.utu.fi/
                  </Link>
                </Typography>
              </Box>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={isTakeTestOpen}
                onClose={() => setIsTakeTestOpen(false)}
              >
                {isTakeTestOpen && (
                  <EnterTestCode history={history} />
                )}
              </Dialog>
            </Paper>
          </div>
        </div>
      </div>
  );
};

LandingPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default LandingPage;