<table>
    <td><img src="https://github.com/brazucas/ragemp/raw/master/demo/demo2.jpeg" width="300px"/></td>
    <td><img src="https://github.com/brazucas/ragemp/raw/master/demo/demo3.png" width="300px"/></td>
    <td><img src="https://github.com/brazucas/ragemp/raw/master/demo/demo4.png" width="300px"/></td>
</table>

# Historical

##### About Brazuca's

Brazuca's is a game server from a Grand Theft Auto: San Andreas game modification called SA-MP (San Andreas Multiplayer), which allows anyone to create their own game server and others to play on it using a provided API by the developers of mod. More information at http://sa-mp.com. Brazuca's started in 2006 and went through ups and downs, until mid-2014 it was almost without players.

RageMP (GTA: V Game Modification, which basically follows the same idea as SA-MP) is Brazuca's bet to remain a popular GTA server, our goal is to provide the best possible gaming experience for both casual players. as hardcore.

##### Why not GTA Network?
We started a project there, but after a few months there was an announcement basically saying that GTA Network would be integrated with RageMP.

##### Expectations

We will not give tips, announcements or release date until the server is fully playable. All server development relationships will only be available in this GitHUB repository, feel free to fork or "watch" the project..

##### Open Code?

We will keep the open source until the official server opening announcement, or even after that.

##### Objetivo inicial

The first version of the server will include RPG and Minigames, our idea, unlike SA-MP, is to keep the server online 24/7 in the same game mode.. 

##### Can I join the testing team?
Currently our testing team is full.

##### Can I join the development team?

Of course! the project is open source and anyone can contribute, just fork and pull requests.

# Opening the local server

1. Clone the project.
2. Make a copy of the `` `conf.json.dist``` file to` `` conf.json```.
3. Open ports 22005 / udp and 22006 on your firewall..
4. Download and install Docker: https://docs.docker.com/install/
5. Create a file called ragemp.yml with the following content:
    ```
    version: "3.2"
       
       services:
         server:
           image: brzserver/ragemp
           depends_on:
             - mysql
           ports:
             - target: 22005
               published: 22005
               protocol: udp
               mode: host
             - 22006:22006
           volumes:
             - /caminho/para/projeto/ragemp:/ragemp
           deploy:
             mode: replicated
             replicas: 1
             restart_policy:
               condition: on-failure
           networks:
             - ragemp
       
         mysql:
           image: mysql:5.6
           volumes:
               - /data/ragempdb:/var/lib/mysql
           ports:
             - 33010:3306
           environment:
             MYSQL_ROOT_PASSWORD: abcd1234
             MYSQL_DATABASE: BRAZUCAS
           deploy:
             mode: replicated
             replicas: 1
             restart_policy:
               condition: on-failure
           networks:
             - ragemp
       
       networks:
         ragemp:
    ```

6. Run the file using the following command::
    > docker stack deploy -c /caminho/para/ragemp.yml ragemp
    
     Wait a few minutes for Docker to download images and upload containers.
    
7. Useful commands
    - Start server: ```docker start ragemp_server```.
    - Stop server: ```docker stop ragemp_server```.
    - Reiniciar servidor: ```docker restart ragemp_server```.
    - Restart server: ```docker service logs ragemp_server -f```.
    - Destroy the stack: ```docker stack rm ragemp```.

8. Access the server through RageMP using the "Direct Connect" option with your computer's IP.

# Contributing

1. Siga os passos para abrir o servidor local.
2. Instale o NodeJS, NPM, Typescript e o Angular CLI.
     
     - NodeJS: https://nodejs.org/en/download/
     - NPM: https://docs.npmjs.com/cli/install
     - Typescript: Basta executar o comando ```npm i typescript -g```.
     - Angular CLI: Basta executar o comando ```npm i @angular/cli -g```.
3. Install package:
    > npm install
    
4. For the following steps, assume you are in the project folder, and pay attention to the "Keep a terminal session open" statement.
5. Keep a terminal session open with the following command by running:
    > tsc -w
    
   This command will compile the `` `.ts``` files to` `` .js``` as they change.
6. For any changes to the folder ```browser```:
    - Browse to folder ```browser```:
        > cd browser
    - Compile index.ts: (ignore any errors displayed)
        > tsc index.ts
    - Build the project:
        > ng build --output-path=../client_packages/browser/ --prod

7. To develop browser screens, navigate to the `` `browser``` folder and run the following command:
    > ng serve
    
    Visit the link: http: // localhost: 4200 / to access the project. The login page, for example, can be viewed at: http: // localhost: 4200 / # / login. 
