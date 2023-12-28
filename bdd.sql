CREATE DATABASE pharmacie;

USE pharmacie;

CREATE TABLE ordonnance (
    ordo_id int AUTO_INCREMENT not null,
    ordo_medId int not null,
    ordo_cliId int not null,
    ordo_pathId int not null,
    ordo_date date not null,
    primary key (Ordo_id)
);

CREATE TABLE client (
    cli_id int auto_increment not null,
    cli_nom varchar(20) not null,
    cli_prenom varchar(20) not null,
    cli_dateNaiss date not null,
    cli_numSecu varchar(30) not null,
    cli_mutId int not null,
    primary key (cli_id)
);

CREATE TABLE mutuelle (
    mutu_id int auto_increment not null,
    mutu_nom varchar(60) not null,
    mutu_tel varchar(30) not null,
    mutu_mail varchar(30) not null,
    primary key (mutu_id)
);

CREATE TABLE pathologie (
    path_id int auto_increment not null,
    path_nom varchar(50) not null,
    primary key (path_id)
);

CREATE TABLE medecin (
    med_id int auto_increment not null,
    med_nom varchar(20) not null,
    med_prenom varchar(20) not null,
    med_permis blob,
    primary key (med_id)
);

CREATE TABLE medicament (
    medi_id int auto_increment not null,
    medi_nom varchar(20) not null,
    medi_stock int not null,
    medi_type varchar(20) not null,
    primary key (medi_id)
);

CREATE TABLE traitement (
    trait_id int auto_increment not null,
    trait_ordoId int not null,
    trait_qteMedi int not null,
    trait_duree int not null,
    trait_mediId int not null,
    primary key (trait_id)
);

CREATE TABLE pharmacien (
    pharm_id int auto_increment not null,
    pharm_nom varchar(20) not null,
    pharm_prenom varchar(20) not null,
    pharm_identifiant varchar(20) not null,
    pharm_mdp varchar(100) not null,
    primary key (pharm_id)
);

Alter TABLE ordonnance 
Add constraint FK_ordoClient foreign key (ordo_cliId) references client(cli_id),
add constraint FK_ordoMedecin foreign key (ordo_medId) references medecin(med_id),
add constraint FK_ordoPathologie foreign key (ordo_pathId) references pathologie(path_id);

Alter TABLE client 
add constraint FK_cliMutuelle foreign key (cli_mutId) references mutuelle(mutu_id);

Alter TABLE traitement
add constraint FK_traitMedicament foreign key (trait_mediId) references medicament(medi_id),
add constraint FK_traitOrdonnance foreign key (trait_ordoId) references ordonnance(ordo_id);