# PROJET E-TODO

# DESCRIPTION:

Application e-todo Full Stack permettant de créer et de gérer une liste de tâches.
Le projet fonctionne sur un frontend en HTML / CSS / JS [ou REACT que nous avons testé (mais pas mis en place)], un backend avec NODE JS EXPRESS et une base de donnée SQL. Intégration d’un Docker compose et deux dockerfile pour l’héberger afin d’accélérer l’installation et le lancement.

## _Packages_

- Express
- mysql2
- Dotenv
- Jsonwebtoken
- Bcryptjs

# INSTALLATION & LANCEMENT:

## Prérequis:

## DOCKER

- Docker pour [Windows](https://docs.docker.com/)

- Docker pour [Linux](https://docs.docker.com/engine/install/)

## ENV

Créez un fichier .env dans lequel à l'intérieur tu rajoute:

        MYSQL_HOST= [your host]
        MYSQL_PORT=[your port]
        MYSQL_DATABASE=[your name database]
        MYSQL_USER=[username phpmyadmin]
        MYSQL_PASSWORD=[password]
        MYSQL_ROOT_PASSWORD=[admin password]


        PORT=[Le port du backend]
        SECRET=[vôtre phrase secrète]

## Installation du fichier:

Git clone HTML:

    git clone https://github.com/EpitechBachelorPromo2028/B-WEB-101-MAR-1-1-etodo-3.git

Git clone SSH:

    git clone git@github.com:EpitechBachelorPromo2028/B-WEB-101-MAR-1-1-etodo-3.git

## Lancement

Docker:

    docker compose up --build

en cas de soucis:

    docker ps -a

une fois cela fait trouvez les conteneurs concerner par le projet:

     docker container prune --force --filter "until=5m"

Il permet en cas de besoin de supprimer les conteneurs créé il y a moins de 5 minutes (d'autres commandes sont disponible dans la [documentation de docker](https://docs.docker.com/) !)

# INFORMATION SUPPLEMENTAIRE

## Arbre de projet

```
.
├── README.md
├── ReadScreen
├── backend
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── src
│   ├── config
│   │   └── db.js
│   ├── index.js
│   ├── middleware
│   │   └── VerifToken.js
│   └── routes
│   ├── auth
│   │   └── auth.js
│   ├── register
│   │   └── reg.js
│   ├── todos
│   │   ├── todo.js
│   │   └── todo.query.js
│   └── user
│   ├── user.query.js
│   └── users.js
├── docker-compose.yml
├── e-todo.sql
└── frontend
 ├── Dockerfile
 ├── index.html
 ├── register.html
 ├── reset.html
 ├── script.js
 └── style.css
```

## Participant

Celia,  
Louis,  
Mathias,  
Mattéo
