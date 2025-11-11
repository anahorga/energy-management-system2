# Energy Management System (EMS)

Acest proiect este un sistem de management al energiei (EMS) construit pe o arhitectură de microservicii. Include un frontend de React și servicii de backend separate pentru autentificare, gestionarea utilizatorilor și gestionarea dispozitivelor, toate containerizate folosind Docker și orchestrate printr-un gateway Traefik.

Features

Autentificare bazată pe roluri: Sistemul suportă rolurile ADMIN și USER, cu rute protejate în funcție de rol.

Gateway API cu Traefik: Un singur punct de intrare (http://localhost:81) care direcționează cererile către serviciul corespunzător.

Forward Authentication: Rutele de backend sunt securizate folosind ForwardAuth prin AuthenticationService.

Panou de Administrare (ADMIN):

Gestionare Utilizatori: CRUD complet pentru utilizatori. Datele sunt combinate din AuthenticationService (username, rol) și UserService (profil: nume, email, adresă).

Gestionare Dispozitive: CRUD complet pentru dispozitive. Administratorii pot vizualiza toate dispozitivele și le pot asocia utilizatorilor existenți după ID.

Panou Client (USER):

Vizualizarea propriilor dispozitive alocate.

Arhitectură și Tehnologii

Proiectul este împărțit în servicii distincte, fiecare rulând în propriul container Docker.

Serviciu: frontend, Tehnologie: React, TypeScript, Vite, Port Intern: 80 (Nginx), Scop: Interfața cu utilizatorul (UI) Serviciu: traefik, Tehnologie: Traefik v3, Port Intern: 80, Scop: API Gateway și Reverse Proxy. Expus pe portul 81. Serviciu: authenticationservice, Tehnologie: Spring Boot, Java 21, Port Intern: 8083, Scop: Gestionare login, register, JWT și politici de acces. Serviciu: userservice, Tehnologie: Spring Boot, Java 21, Port Intern: 8081, Scop: Stocarea datelor de profil ale utilizatorilor (nume, adresă, email). Serviciu: deviceservice, Tehnologie: Spring Boot, Java 21, Port Intern: 8082, Scop: Stocarea dispozitivelor și maparea acestora către ID-urile utilizatorilor. Serviciu: db_authentication, Tehnologie: PostgreSQL, Port Intern: 5432, Scop: Baza de date pentru AuthenticationService. Serviciu: db_user, Tehnologie: PostgreSQL, Port Intern: 5432, Scop: Baza de date pentru UserService. Serviciu: db_device, Tehnologie: PostgreSQL, Port Intern: 5432, Scop: Baza de date pentru DeviceService.

Rularea Proiectului

Cerințe preliminare

Docker Desktop (sau Docker Engine)

Docker Compose

Clonarea Repozitoriului

git clone <URL-ul-repozitoriului-tau> cd energy-management-system/energy-management-system-development

Crearea Rețelei Docker

Serviciile comunică printr-o rețea Docker externă. Trebuie să o creați manual înainte de a porni.

docker network create tema1_net (Acest nume este specificat în docker-compose.yml ca external: true)

Pornirea Sistemului

Folosiți Docker Compose pentru a construi imaginile și a porni toate containerele.

docker-compose up --build

Accesarea Aplicației

După ce toate serviciile au pornit, aplicația este gata de utilizare:

Aplicația Frontend:

Accesați: http://localhost:81

(Frontend-ul React va fi servit de Traefik, iar acesta va face apeluri API tot către http://localhost:81/api/...)

Autentificare:

Sistemul pornește cu un utilizator admin implicit.

Username: admin

Password: admin

(Aceste date sunt inițializate în AuthenticationService/src/main/java/com/example/authenticationservice/entity/DataInit.java)

Dashboard Traefik (Opțional):

Pentru a monitoriza rutele și serviciile, accesați dashboard-ul Traefik:

http://localhost:8081

Oprirea Sistemului

Pentru a opri toate containerele, rulați:

docker-compose down

Structura Proiectului

. ├── AuthenticationService/ # Serviciu Spring Boot (JWT, Login, User Auth) ├── DeviceService/ # Serviciu Spring Boot (CRUD Dispozitive) ├── UserService/ # Serviciu Spring Boot (CRUD Profiluri User) ├── ems-frontend/ # Aplicația React (UI) │ ├── Dockerfile # Dockerfile pentru Nginx + React build │ └── nginx.conf # Configurație Nginx pentru React Router ├── dynamic/ │ └── path.yml # Configurația dinamică Traefik (Rutele API) ├── logs/ │ └── access.log # Log-urile de acces Traefik ├── docker-compose.yml # Fișierul principal de orchestrare └── traefik.yml # Configurația statică Traefik

Rutare API (Traefik)

Toate cererile sunt gestionate de Traefik pe http://localhost:81.

http://localhost:81/api/auth/** → authenticationservice:8083

http://localhost:81/api/users/** → userservice:8081

http://localhost:81/api/devices/** → deviceservice:8082

http://localhost:81/ (orice altă cale) → frontend:80 (Aplicația React)