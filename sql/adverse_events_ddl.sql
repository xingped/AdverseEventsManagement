DROP TABLE PATIENT_REACTIONS;
DROP TABLE PATIENT_DRUGS;
DROP TABLE ADVERSE_EVENTS;
DROP TABLE DRUGS;
DROP TABLE PATIENTS;
DROP TABLE REACTIONS;

CREATE TABLE ADVERSE_EVENTS
(
  ID INTEGER PRIMARY KEY,
  safety_report_id character varying(15) NOT NULL,
  receive_date date NOT NULL,
  receipt_date date NOT NULL,
  company_numb character varying(100)

);


CREATE TABLE DRUGS
(
  id integer primary key,
  medicinal_product character varying(250) unique NOT NULL,
  drug_indication character varying(250) NOT NULL,
  drug_dosage_text character varying(250),
  drug_authorization_numb character varying(100)
);

CREATE TABLE PATIENTS
(
  id integer primary key,
  patient_age character varying(20) not null,
  patient_sex character not null
);

create table REACTIONS (
  ID INTEGER PRIMARY KEY,
  MEDDRA_PRIMARY_TERM CHARACTER VARYING(300) UNIQUE NOT NULL
);

CREATE TABLE PATIENT_REACTIONS (
   PATIENT_ID INTEGER REFERENCES PATIENTS(ID),
   REACTION_ID INTEGER REFERENCES REACTIONS(ID)
);


CREATE TABLE PATIENT_DRUGS (
   PATIENT_ID INTEGER REFERENCES PATIENTS(ID),
   DRUG_ID INTEGER REFERENCES DRUGS(ID)
);