<p>
  <img src="https://img.shields.io/badge/Nodejs-10.16.+-green.svg">
  <img src="https://img.shields.io/badge/Ex<press-4.17.+-purple.svg">
</p>
<img src="public/img/logo.png" />

# Office-Cafeteria-App

Cafeteriaa is a full-stack, food and drink ordering system. The app is split into two front ends: one for the customer to order their drink(s) and/or food (Cafeteria Customer, or Cafeteria-C ), and one for the Cafeteria shop to receive and manage orders as they come in (Cafeteria Admin, or Cafeteria-A).<br />

To see Cafeteriaa live in action, open a browser tab for <a href="http://Cafeteriaa.herokuapp.com/">Cafeteriaa customer</a> and a tab for <a href="https://Cafeteriaa.herokuapp.com/login">Cafeteriaa-Admin</a>. All you have to do is place an order on Cafeteriaa app, and then watch Cafeteriaa Admin receive the order.
<br />
<br /><br />
Cafeteriaa Employee
<br /><br />
![Orderspagelightmode](https://user-images.githubusercontent.com/65676476/105623890-53ff6b80-5e43-11eb-9785-0c5f53d148ea.png)
<br /><br />
Cafeteriaa Admin
<br /><br />
![adminorderslightmode](https://user-images.githubusercontent.com/65676476/105623832-ebb08a00-5e42-11eb-8130-18295865d748.png)

## Features

User:

1. Server-side rendering
2. Login & register
3. Responsive design
4. Add to cart
5. filter items using search
6. Delete from cart
7. Checkout
8. Session based on localStorage and tokens
9. Get a list of orders.
10. Fetch a specific order.
11. Real-time order status using socket.io
12. Contact page

Admin:

1. Login
2. Responsive design
3. Orders lists based on status
4. Change order status
5. View order
6. Products list
7. View product

- Authentication system guarding the app core.
- Customers can browse the menu, Add/remove items to cart, track the order and can make payment online.
- admin can control orders and can change the order status.
- Data stored in a MongoDB database
- Friendly user interface with ejs

## Technical

• The front end of the app is built using SASS, tailwind CSS as a CSS extension language, and webpack as a module bundler.<br />
• The back end is built in Node.js with Express, and uses MongoDB with Mongoose as a database.<br />
• The app uses passport.js for authenticate the user.<br />

1.  Once the user opens the app, see loader and redirect to the home page.<br />
2.  As soon as a user click on their menu, and add items to cart.<br />
3.  As soon as a user clicks on cart, user can placed order with COD & Payment with card. After successful order placed then redirest to order status.<br />
4.  As finally, Cafeteria get realtime order update from admins, who can control order status using Socket.io.

• Submitted orders are sent to the database along with the user's username, to allow the display of previous and favorited orders and for Cafeteriaa-Admin to fetch the orders.<br />
• Cafeteriaa-Admin uses Ajax to fetch orders from the database every second & using socket.io to get real-time order updates. <br />
<br /><br />

## Snapshots

![homelightmode1](https://user-images.githubusercontent.com/65676476/105623717-cb340000-5e41-11eb-87a0-877734ee79b5.png)
![homedarkmode1](https://user-images.githubusercontent.com/65676476/105623707-bfe0d480-5e41-11eb-93a9-8a8b1e8c854d.png)
![menudarkmode1](https://user-images.githubusercontent.com/65676476/105623713-c4a58880-5e41-11eb-8f65-3271a652cb97.png)
![OrderSummarypage](https://user-images.githubusercontent.com/65676476/105623938-c1ab9780-5e43-11eb-8ed8-1ea30f56ac6b.png)
![image](https://user-images.githubusercontent.com/65676476/105624001-34b50e00-5e44-11eb-94d0-70dc0848906e.png)
![image](https://user-images.githubusercontent.com/65676476/105624019-51514600-5e44-11eb-804b-920c13c387bd.png)

<br /><br />

## Setup

### Prerequisites

- Install Node.js >= 10
- Install MongoDB
- Install npm/yarn

### Run Locally on Your Machine

You need Node, NPM and MongoDB properly installed.

Setup the environment variables replacing <MONGODB-PORT> with your mongodb port, usually is 27017.

```shell
    export MONGO_CONNECTION_URL=mongodb://localhost:<MONGODB-PORT>/food
    Add menus collection manually and import menu.json file.
```

Install dependencies

```shell
    npm install
```

Seed the Database (for the very first run only)

```shell
    node server.js
```

Run the Server

```shell
    npm start
```

### Technologies

###### Back-end

NodeJS, Express, MongoDB, Mongoose.

###### Fron-end

ejs, Taileindcss, scss.
