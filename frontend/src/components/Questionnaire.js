import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';

import PropTypes from 'prop-types';

import { withRouter } from 'react-router';

import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  FormHelperText,
  FormControl,
  Typography,
  Select,
  InputLabel,
  TextField,
  Link,
} from '@material-ui/core';

import ForwardIcon from '@material-ui/icons/Forward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {
  getQuestionnaireByKey,
  postAnswer,
  postDemographic,
  postRaffle,
 } from '../services/questionnaireService.js';


const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: '100%',
    padding: 16,
  },
  container: {
    margin: '10px auto',
    minWidth: '255px',
    width: '50%',
    maxWidth: '800px',
    display: 'block',
    justifyContent: 'center',
  },
  headline: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '40px',
    maxWidth: '100%',
  },
  actionIconAfter: {
    marginRight: -5,
    marginLeft: 5,
  },
  actionIconBefore: {
    marginRight: 5,
    marginLeft: -5,
  },
  centered: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  actionButtonRight: {
    marginBottom: 50,
  },
  photoWrapper: {
    width: '220px',
    height: '275px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding:'10px',
    display: 'block',
    background: 'url(/media/University_of_Turku.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    justifyContent: 'center',
    backgroundPosition: '50% 50%',
  },
  blankWrapper: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '200px',
    height: '255px',
    backgroundSize: 'contain',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    opacity: 1,
    transition: 'opacity 0.75s ease-in',
  },
  photo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '200px',
    height: '255px',
    opacity: 1,
    transition: 'opacity 0.75s ease-in',
  },
  instructionWrapper: {
    margin: '10px',
  },
  formWrapper: {
    minWidth: '255px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px',
  },
  form:{
    padding:'10px',
    minWidth: '255px',
    width: '80%',
    display: 'block',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '120px',
  },
  formControlLabel: {
    margin: '0px',
  },
  lastFormControlLabel: {
    marginTop: '10px',
    marginLeft: '0px',
  },
  flexButtons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  button:{
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  instructionButton:{
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));


const Questionnaire = ({testkey, history}) => {

  const classes = useStyles();

  const [view, setView] = useState('picture')
  const [photoIsChanging, setPhotoIsChanging] = useState(false);

  const [picture, setPicture] = useState('original state')
  // const [title, setTitle] = useState('')
  const [subheading, setSubheading] = useState('')
  const [likert, setLikert] = useState([])
  const [reviews, setReviews] = useState(0)
  // eslint-disable-next-line
  const [profession, setProfession] = useState('')
  const [instructions, setInstructions] = useState('')
  

  const [value, setValue] = useState('8')

  // demographics
  const [gender, setGender] = useState()
  const [genderChoices, setGenderChoices] = useState([])
  const [age, setAge] = useState()
  const [ageChoices, setAgeChoices] = useState([])
  const [education, setEducation] = useState()
  const [educationExtra, setEducationExtra] = useState('')
  const [educationChoices, setEducationChoices] = useState([])
  const [occupation, setOccupation] = useState()
  const [province, setProvince] = useState()
  const [provinceChoices, setProvinceChoices] = useState([])
  const [demographicHelperText, setDemographicHelperText] = useState('');

  // raffle
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [raffleHelperText, setRaffleHelperText] = useState('');

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const focusOnSubmit = useRef(null);
  async function fetchNewPicture() {
    const response = await getQuestionnaireByKey(testkey);;
    if (response.status===200) {
      setView("picture")
      setPicture(response.data.picture);
      // setTitle(response.data.title)
      setSubheading(response.data.subheading.replace("{occupation}", response.data.occupation))
      setLikert(response.data.likert)
      setReviews(response.data.reviews)
      setProfession(response.data.occupation)
    } else if (response.status===202) {
      setView("instruction")
      setGenderChoices(response.data.gender)
      setAgeChoices(response.data.age)
      setEducationChoices(response.data.education)
      setProvinceChoices(response.data.provinces)
    } else if (response.status===204) {
      setView("raffle")
    } else if (response.status===403) {
      setView("no content")
    } else {
      setView("404")
    }
  };

  useEffect(() => {
    async function fetchPicture() {
      const response = await getQuestionnaireByKey(testkey);
      if (response.status===200) {
        setView("picture")
        setPicture(response.data.picture);
        // setTitle(response.data.title)
        setSubheading(response.data.subheading.replace("{occupation}", response.data.occupation))
        setLikert(response.data.likert)
        setReviews(response.data.reviews)
      } else if (response.status===202) {
        setView("description")
        console.log(response.data.instructions)
        setInstructions(response.data.instructions)
      } else if (response.status===204) {
        setView("raffle")
      } else if (response.status===403) {
        setView("no content")
      } else {
        setView("404")
      }
    }
    fetchPicture();
  // eslint-disable-next-line
  }, []);

  const showNewImage = newIndex => {
    /* täällä vasta vaihdetaan näkyvä kuva */
    setPicture(newIndex);
    setTimeout(() => {
      setPhotoIsChanging(false);
    }, 500);
    
  };

  const nextImage = () => {
    if (!photoIsChanging) {
      /* täällä ensin jotain kuvanlataustaikoja */
      setPhotoIsChanging(true);
      setTimeout(() => {
        fetchNewPicture();
        showNewImage(`${picture}`);
      }, 1500);
    }
  };

  async function createAnswer() {
    const response = await postAnswer(testkey, picture, value) ;
    if (response.status===201) {
      setHelperText(' ');
      setError(false);
      setValue('8');
      nextImage();
    } else {
      setHelperText('Virhe arvioinnin lähetyksessä, yritä uudelleen, tai lataa sivu uudelleen (F5)');
      setError(true);   
    }
    focusOnSubmit.current.focus();
  };

  async function sendDemographic() {
    const response = await postDemographic(testkey, gender, age, education, educationExtra, occupation, province) ;
    if (response.status===200) {
      setHelperText(' ');
      setError(false);
      nextImage();
    } else {
      setHelperText('Virhe esitietojen lähetyksessä, yritä uudelleen, tai lataa sivu uudelleen (F5)');
      setError(true);
    }
  };

  async function sendRaffle() {
    const response = await postRaffle(testkey, name, email, phone) ;
    if (response.status===201) {
      setRaffleHelperText(' ');
      setError(false);
      fetchNewPicture()
    } else {
      setHelperText('Virhe esitietojen lähetyksessä, yritä uudelleen, tai lataa sivu uudelleen (F5)');
      setError(true);
    }
  };

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createAnswer();
  };

  const handleDemographicSubmit = (event) => {
    event.preventDefault();
    if (province === '') {
      setHelperText('valitse yksi vaihtoehdoista.');
      setError(true);
    } else {
      sendDemographic();
    }
  };

  const handleRaffleSubmit = (event) => {
    event.preventDefault();
    if (name && (email || phone )) {
      sendRaffle();
    } else {
      setRaffleHelperText('täytä vähintään nimi ja joko sähköposti tai puhelinnumero.');
      setError(true);
    }
  };

  const handleAgeSelectChange = (event) => {
    setAge(event.target.value);
  };

  const handleEducationSelectChange = (event) => {
    if (event.target.value!==15){
      setEducationExtra('');
    }
    setEducation(event.target.value);
  };

  const handleEducationTextChange = (event) => {
    setEducationExtra(event.target.value);
  };

  const handleProvinceSelectChange = (event) => {
    event.target.setCustomValidity("");
    setProvince(event.target.value);
    setDemographicHelperText(' ');
    setError(false);
  };

  const handleGenderSelectChange = (event) => {
    setGender(event.target.value);
  };

  const handleOccupationSelectChange = (event) => {
    setOccupation(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const returnToLanding = () => {
    history.push(`/`);
  };

  const setErrorMessage = (event) => {
    event.target.setCustomValidity("tämä kysymys on pakollinen");
  }

  return (
       <div className={classes.wrapper} name='wrapper'>
          <div className={classes.container} name='container'>
             <Paper>
              {view === 'picture' && (
                <div className={classes.centered}>
                  <div className={classes.photoWrapper}>
                    <div
                      className={classes.blankWrapper}
                      style={photoIsChanging ? { opacity: 0 } : {}}
                      >
                      <img
                        className={classes.photo}
                        src={`/media/pictures/${picture}.jpg`}
                        alt="Missing"
                      />
                    </div>
                  </div>
                  <div className={classes.centered}>
                    <div className={classes.formWrapper}>
                      <form onSubmit={handleSubmit} className={classes.form} >
                        <FormControl component="fieldset" error={error} className={classes.formControl}>
                          {/* <Typography variant="subtitle1">{title} </Typography> */}
                          <div dangerouslySetInnerHTML={{__html: subheading}}/>
                          {/* <Typography variant="subtitle2">{subheading}</Typography> */}
                          <RadioGroup
                            aria-label="Vaihtoehdot"
                            name="kysely"
                            value={value}
                            onChange={handleRadioChange}
                          >
                            {likert.map((item, i, array) => (
                              (array.length - 1 === i)
                                ? <FormControlLabel
                                    className={classes.lastFormControlLabel}
                                    value={item.value.toString()}
                                    control={<Radio color="primary" />}
                                    label= {item.label}
                                    key={item.value} 
                                      
                                  /> 
                                : (i === 0)
                                  ? <FormControlLabel
                                      className={classes.formControlLabel}
                                      value={item.value.toString()}
                                      control={<Radio color="primary" />}
                                      label={item.label}
                                      key={item.value}
                                      ref={focusOnSubmit}
                                    />
                                  : <FormControlLabel
                                      className={classes.lastFormControlLabel}
                                      value={item.value.toString()}
                                      control={<Radio color="primary" />}
                                      label= {item.label}
                                      key={item.value}  
                                    /> 
                            ))}
                          </RadioGroup>
                          <FormHelperText>{helperText}</FormHelperText>
                          <Button aria-label="vastaa" type="submit" variant="contained" color="secondary" className={classes.button}>
                            Seuraava ({reviews}/50)<ForwardIcon className={classes.actionIconAfter}/>
                          </Button>
                        </FormControl>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              {view === 'description' && (
                <div className={classes.centered}>
                  <div className={classes.instructionWrapper}>
                    <Typography variant="h1" align="center">
                      Turun yliopiston Henkilökuvatutkimus 2020
                    </Typography>
                    <Typography variant="body1" className={classes.button}>
                      Tervetuloa vastaamaan Turun yliopiston Henkilökuvatutkimukseen 2020.
                      Tämä kysely on suunnattu 18–64-vuotiaille suomalaisille ja toteutetaan syksyn 2020 aikana.
                      Olet tullut valituksi mukaan tilastollisin perustein.
                    </Typography>
                    <Typography variant="body1" className={classes.button}>
                      Kyselyllä, johon sinut on valittu mukaan, keräämme tietoa suomalaisten näkemyksistä koskien toisten ihmisten henkilökuvia.
                      Tämä kysely on osa laajempaa tutkimushanketta, jossa selvitetään ulkonäön taloudellisia seurauksia Suomessa.
                      Tutkimushanke on käynnissä vuosina 2019–2023 ja sitä rahoittaa Suomen Akatemia.
                    </Typography>
                    <Typography variant="body1" className={classes.button}>
                      Kyselyyn vastaaminen kestää noin 10–15 minuuttia. Vastaaminen on vapaaehtoista.
                      Voit halutessasi keskeyttää kyselyyn vastaamisen missä vaiheessa tahansa ilman erillisiä perusteluja.
                      Jokainen vastaus on tutkimuksen luotettavuuden kannalta kuitenkin tärkeä.
                    </Typography>
                    <Typography variant="body1" className={classes.button}>
                      Tutkimus toteutetaan nimettömänä kyselynä.
                      Yksittäistä vastaajaa ei voi tunnistaa tutkimusaineistosta.
                      Tutkimushankkeemme päätyttyä aineisto arkistoidaan Tietoarkistoon myöhempää tutkimuskäyttöä varten.
                      Tutustu kyselen tietosuojaan tarkemmin täällä (
                        <Link href="https://soma.utu.fi/tietosuoja" target="_blank" rel="noopener">
                          soma.utu.fi/tietosuoja
                        </Link>
                        ).
                        Tarvittaessa voit olla yhteydessä meihin lisätietojen saamiseksi:
                        somakysely@utu.fi/+358 50 570 8230 (arkisin klo 12–14);
                        hankkeen vastuullinen johtaja: outi.sarpila@utu.fi
                    </Typography>
                    <Typography variant="h5" align="center" className={classes.button}>
                      Olen ymmärtänyt saamani tiedot ja haluan osallistua tutkimukseen.
                    </Typography>
                  </div>
                  <div className={classes.flexButtons}>
                    <Button
                      aria-label="En halua osallistua"
                      className={classes.instructionButton}
                      variant="contained"
                      color="primary"
                      onClick={() => returnToLanding()}
                    >
                      <ArrowBackIcon
                        className={classes.actionIconBefore}
                      />
                      Ei 
                    </Button>
                    <Button
                      aria-label="Jatka kyselyyn"
                      className={classes.instructionButton}
                      variant="contained"
                      color="secondary"
                      onClick={() => fetchNewPicture()}
                    >
                      Kyllä 
                      <ArrowForwardIcon
                        className={classes.actionIconAfter}
                      />
                    </Button>
                  </div>
                </div>
              )}
              {view === 'demographics' && (
                <div className={classes.centered}>
                  <div className={classes.formWrapper}>
                    <form aria-label="Esitietolomake" onSubmit={handleDemographicSubmit} className={classes.form}>
                      <Typography variant="h1">Esitiedot</Typography>
                      <FormControl component="fieldset" error={error} className={classes.formControl}>
                        <Typography variant="body1">Mikä on sukupuolesi?</Typography>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel htmlFor="outlined-gender-native-simple">sukupuoli</InputLabel>
                          <Select
                            native
                            value={gender}
                            onChange={handleGenderSelectChange}
                            label="sukupuoli"
                            inputProps={{
                              name: 'gender',
                              id: 'outlined-gender-native-simple',
                            }}
                          >
                            <option aria-label="None" value="" />
                            {genderChoices.map((item) => (
                              <option value={item[0]}>{item[1]}</option>
                            ))}
                          </Select>
                        </FormControl>
                        <Typography variant="body1">Minä vuonna olet syntynyt?</Typography>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel htmlFor="outlined-age-native-simple">syntymävuosi</InputLabel>
                          <Select
                            native
                            value={age}
                            onChange={handleAgeSelectChange}
                            label="syntymävuosi"
                            inputProps={{
                              name: 'age',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            <option aria-label="None" value="" />
                            {ageChoices.map((ages) => (
                              <option value={ages[0]}>{ages[1]}</option>
                            ))}
                          </Select>
                        </FormControl>
                        <Typography variant="body1">Mikä seuraavista vaihtoehdoista on korkein koulutusaste, jonka olet suorittanut?</Typography>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel htmlFor="outlined-education-native-simple">koulutus</InputLabel>
                          <Select
                            native
                            value={education}
                            onChange={handleEducationSelectChange}
                            label="koulutus"
                            inputProps={{
                              name: 'education',
                              id: 'outlined-education-native-simple',
                            }}
                          >
                            <option aria-label="None" value="" />
                            {educationChoices.map((edu) => (
                              <option value={edu[0]}>{edu[1]}</option>
                            ))}
                          </Select>
                        </FormControl>
                        {education === "15" && (
                          <FormControl variant="outlined" className={classes.formControl}>
                            <TextField id="outlined-basic" label="Koulutuksen tarkennus" variant="outlined" onChange={handleEducationTextChange} />
                          </FormControl>
                        )}
                        <Typography variant="body1">Mikä on ammattisi? Mikäli et ole tällä hetkellä töissä, vastaa viimeisimmän ammattisi perusteella. Mikäli et ole koskaan ollut työelämässä, jätä kenttä tyhjäksi.</Typography>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <TextField id="outlined-basic" label="ammatti" variant="outlined" onChange={handleOccupationSelectChange} />
                        </FormControl>
                        <Typography variant="body1">Minkä maakunnan alueella asut vakituisesti?*</Typography>
                        <FormControl required variant="outlined" className={classes.formControl} >
                          <InputLabel htmlFor="outlined-province-native-simple">asuinpaikka</InputLabel>
                          <Select
                            native
                            value={province}
                            onChange={handleProvinceSelectChange}
                            onInvalid={setErrorMessage}
                            label="asuinpaikka"
                            inputProps={{
                              error: false,
                              name: 'province',
                              id: 'outlined-province-native-simple',
                            }}
                          >
                            <option aria-label="None" value="" />
                            {provinceChoices.map((item) => (
                              <option value={item[0]}>{item[1]}</option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormHelperText>{demographicHelperText}</FormHelperText>
                        <Button aria-label="lähetä" type="submit" variant="contained" color="secondary" className={classes.button}>
                          Aloita <ArrowForwardIcon className={classes.actionIconAfter}/>
                        </Button>
                      </FormControl>
                    </form>
                  </div>
                </div>
              )}
              {view === 'instruction' && (
                <div className={classes.centered}>
                  <div className={classes.instructionWrapper}>
                    <div dangerouslySetInnerHTML={{__html: instructions}}/>
                  </div>
                  <div className={classes.flexButtons}>
                    <Button
                      aria-label="Jatka kyselyyn"
                      className={classes.instructionButton}
                      variant="contained"
                      color="secondary"
                      onClick={() => setView("demographics")}
                    >
                      Aloita vastaaminen
                      <ArrowForwardIcon
                        className={classes.actionIconAfter}
                      />
                    </Button>
                  </div>
                </div>
              )}
              {view === 'raffle' && (
                <div className={classes.centered}>
                  <div className={classes.formWrapper}>
                    <form aria-label="Esitietolomake" onSubmit={handleRaffleSubmit} className={classes.form}>
                      <Typography variant="h1">Osallistu arvontaan</Typography>
                      <Typography variant="subtitle2">
                        Olet nyt vastannut kyselyyn ja vastauksesi ovat tallentuneet.
                        Arvomme vastaajien kesken 10 kappaletta 200 euron lahjakortteja S-ryhmän ja K-kaupan liikkeisiin sekä 30 kirjapalkintoa.
                        Ilmoitamme voittajille henkilökohtaisesti.
                        Mikäli haluat osallistua arvontaan, täytä yhteistietosi alle.
                        Yhteistiedot kerätään täysin erillään muista vastauksistasi eikä vastauksiasi ja yhteystietojasi yhdistetä toisiinsa.
                        Säilytämme tietoja ainoastaan tämän kyselytutkimuksen tiedonkeruun ajan ja tiedot hävitetään välittömästi, kun arvonta on suoritettu.
                      </Typography>
                      <Typography variant="subtitle2">
                        Tarkempia tietoja kyselyn tietosuojasta:
                      </Typography>
                      <Link href="https://soma.utu.fi/tietosuoja" target="_blank" rel="noopener">
                          soma.utu.fi/tietosuoja
                      </Link>
                      <FormControl component="fieldset" error={error} className={classes.formControl}>
                      <FormControl required variant="outlined" className={classes.formControl}>
                          <TextField id="outlined-name" label="nimi" variant="outlined" onChange={handleNameChange} />
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <TextField id="outlined-email" label="sähköposti" variant="outlined" onChange={handleEmailChange} />
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <TextField id="outlined-phone" label="puhelinnumero" variant="outlined" onChange={handlePhoneChange} />
                        </FormControl>
                        <FormHelperText>{raffleHelperText}</FormHelperText>
                        <Button aria-label="Osallistu arvontaan" type="submit" variant="contained" color="secondary" className={classes.button}>
                          Osallistu <ArrowForwardIcon className={classes.actionIconAfter}/>
                        </Button>
                        <Button aria-label="En osallistu arvontaan" type="" variant="contained" color="primary" className={classes.button} onClick={() => setView("no content")}>
                          En halua osallistua <ArrowForwardIcon className={classes.actionIconAfter}/>
                        </Button>
                      </FormControl>
                    </form>
                  </div>
                </div>
              )}
              {view === 'no content' && (
                <div className={classes.headline}>
                  <Typography variant="h1" align="center">
                    Lämmin kiitos osallistumisestasi!
                  </Typography>
                  <Typography variant="body2" align="center">
                    Tutkimushankkeen etenemistä voit seurata osoitteessa:
                    soma.utu.fi
                  </Typography>
                </div>
              )}
              {view === '404' && (
                <div className={classes.centered}>
                  <div className={classes.headline}>
                    <Typography variant="h1">
                      Koodilla {testkey} ei löytynyt kyselyä.
                    </Typography>
                  </div>
                  <div className={classes.flexButtons}>
                    <Button
                      aria-label="test"
                      className={classes.actionButtonRight}
                      variant="contained"
                      color="secondary"
                      onClick={returnToLanding}
                    >
                      <ArrowBackIcon
                        className={classes.actionIconBefore}
                      />
                      Takaisin 
                    </Button>
                  </div>
                </div>
              )}
              </Paper>
           </div>
         </div>
  );


};


Questionnaire.propTypes = {
    testkey: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
};

// export default Questionnaire;
export default withRouter(Questionnaire);
