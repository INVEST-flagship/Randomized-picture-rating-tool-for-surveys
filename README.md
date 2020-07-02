# Randomized picture rating tool for surveys
An online tool for research participants to evaluate images in categories defined by researchers.

## About SOMA research project:

SOMA (The social mechanisms behind the economic consequences of physical appearance) is a research project funded by the Academy of Finland (2019–2023). The project examines the social mechanisms behind the economic consequences of physical appearance. While former research has mainly highlighted the benefits of beauty, recent evidence suggests there are more complex social mechanisms behind the economic outcomes of physical appearance.

SOMA project aims at giving a more nuanced explanation of the relation of physical appearance and its economic outcomes. Physical appearance is not only accounted for as attractiveness but also in relation to occupation-specific norms, which we refer to as field-congruent appearance. The outcomes of physical appearance are examined separately for men and women and by taking the gender segregation of occupational fields into account.

The project aims at exploring a new social mechanism that could explain the economic perks and penalties of physical appearance better than previous theories. For more information: https://soma.utu.fi/en/about-soma/.

## About authors

The principal investigator of the research project is Outi Sarpila from the Department of Social Sciences of the University of Turku as part of the INVEST research flagship. The project involves senior researcher Erica Åberg, doctoral student Iida Kukkonen, university teacher Aki Koivula, senior researcher Tero Pajunen and research assistant Anna Grahn.

More information in Finnish: https://soma.utu.fi/tutkijat/

## About the tool
### Summary
- Tool is meant for rating pictures randomly pulled from the picture pool.
- It consists roughly on 4 parts: landing page, background information questions, actual rating and feedback/raffle
- Texts and scales related to rating can be changed by editing the database.
- the actual ratings and background information of the respondents are saved in one database while the information regarding raffle (which obviously includes contact information) is stored in separate database.

## Installing development environment
### Requirements:
 - python 3.6+
 - Node & npm
 - postgresql dev
### Installing

```
pip -r requirements.txt
```
 
```
npm install
```
 
### Create database
 - somabase and rafflebase, check/edit settings.py for details
### Add resources for the tool
 - createsuperuser
 - add Attribures-object(s)
   - an example of attribute.likert-fields acceptable value:
 ```
 [
  {"label":"5 Erittäin maskuliininen","value":5},
  {"label":"4","value":4},
  {"label":"3","value":3},
  {"label":"2","value":2},
  {"label":"1 Ei lainkaan maskuliininen","value":1},
  {"label":"Tunnistan kuvassa esiintyvän henkilön","value":0}
 ]
```
 - add Questionneer-object for each respondent
 - add pictures in backend/media/picture/
   - the tool only links .jpg files
   - add Picture-object for each picture in /picture
   
### Running
 
```
./manage.py runserver
```
 
```
npm start
```

## Contributors and how to cite

Sarpila, O., Grahn, A., Koivula, A., Stürmer, E & Tuovinen, E. (2020). Randomized picture rating tool for surveys: v1.0 (Version v1.0). Zenodo.

## Licence information

GNU Genral Public License Version 3

## Contact information

Eero Stürmer (firstname.lastname@utu.fi)
