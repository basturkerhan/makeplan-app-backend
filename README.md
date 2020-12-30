# Make-Plan Backend
<br>
There are different sites and applications for the project management of the teams. I used one of these while I was in a project. Then, when I started working with MERN technologies, the idea of ​​making such an application came to my mind. I also used the Redux and Context structure Also I used the flex structure, which is one of my favorite features of CSS.

**In this repo, you see the backend of the application.**
<br>
**Demo: https://make-plan-frontend.vercel.app/**
<br>

## TECHNOLOGIES
#### -MongoDB
#### -Express
#### -React
#### -Node
#### -React Redux
<br>

## UTILITIES
##### You can create a board for your project
##### You can invite/remove team members your board
##### You can create lists on your board
##### You can create cards on your lists of board
##### You can add card images
##### You can add/remove card followers in your card
##### Drag and drop feature for cards and lists
##### You can change background of your board
##### Board menu includes change-background page, team members, remove board button and board events
##### İf you want to change board title, list title, card title or card description, just click on the text
##### Responsible design
##### Many more features...
<br>

## OPTIONS
### Go config.js

```
MONGO_URI = your MongoDB URI will come here

JWT_SECRET_KEY = Jsonwebtoken secret key
```
<br>

## ROUTERS
**routers folder includes all router files**

**Auth Router contains register/login...**
routers/auth.js

**Board Router includes all board routers and some list routers**
routers/board.js

**List Router contains list routers. The api way to this /boards/:id/lists**
routers/list.js

**User Router includes /me route to get logged in user information**
routers/user.js

**Card Router includes delete card route**
routers/card.js

**Cards Router includes all card routes except delete card route**
routers/cards.js
<br>


## IMAGES
### Home Page
![Screenshot](https://github.com/basturkerhan/makeplan-app-frontend/blob/main/app_images/1.PNG)
### Application Page
![Screenshot](https://github.com/basturkerhan/makeplan-app-frontend/blob/main/app_images/2.PNG)
### Create Board Component
![Screenshot](https://github.com/basturkerhan/makeplan-app-frontend/blob/main/app_images/3.PNG)
### Board Page
![Screenshot](https://github.com/basturkerhan/makeplan-app-frontend/blob/main/app_images/4.PNG)
### Card Info Component
![Screenshot](https://github.com/basturkerhan/makeplan-app-frontend/blob/main/app_images/5.PNG)
### Menu Component
![Screenshot](https://github.com/basturkerhan/makeplan-app-frontend/blob/main/app_images/6.PNG)
### You Can Change Your Board's Background
![Screenshot](https://github.com/basturkerhan/makeplan-app-frontend/blob/main/app_images/7.PNG)
### Mobile Application Page
![Screenshot](https://github.com/basturkerhan/makeplan-app-frontend/blob/main/app_images/8.PNG)
### Mobile Board Page
![Screenshot](https://github.com/basturkerhan/makeplan-app-frontend/blob/main/app_images/9.PNG)
### Mobile Board Menu Component
![Screenshot](https://github.com/basturkerhan/makeplan-app-frontend/blob/main/app_images/10.PNG)
### You Can Drag&Drop Event With Lists and Cards 
![Screenshot](https://github.com/basturkerhan/makeplan-app-frontend/blob/main/app_images/11.PNG)
