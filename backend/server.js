//imports
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
const PORT = process.env.PORT || 5000;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./passportConfig");
require("dotenv").config();

//middleware
app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());



//routes

//register a user
app.post("/register", async (req, res) => {
  let { username, email, password, password2 } = req.body;

  let errors = [];

  if (!username || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.send(errors);
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
    // Validation passed
    pool.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        

        if (results.rows.length > 0) {
          return res.send([
            {
              message: "Email already registered",
            },
          ]);
        } else {
          pool.query(
            `INSERT INTO users (username, email, password)
                VALUES ($1, $2, $3)
                RETURNING user_id, password`,
            [username, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              res.send({
                message: "success",
              });
            }
          );
        }
      }
    );
  }
});

//local login
app.post("/login/:loginType", (req, res, next) => {
  const {loginType} = req.params;
  if(loginType==="local")
  {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send(info);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(req.user);
      });
    }
  })(req, res, next);
}
});

//social login(google)
app.get('/login/:loginType', passport.authenticate('google', { scope: ['profile', 'email'] }));

// callback for google login
app.get("/google/callback", passport.authenticate('google'),
(req, res) => {
  res.redirect('http://localhost:3000/login');
});


//logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.send({ message: "You have logged out successfully" });
});

//to get current logged in user
app.get("/user", (req, res) => {
  res.send(req.user);
});


//to list all the products in the store
app.get("/products", async (req, res) => {
  try {
    const allProducts = await pool.query("SELECT * FROM product");
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//to list cart of a user given his user_id
app.get("/cartItems/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const cartItems = await pool.query(
      "SELECT cart_id,product_id,name,price,quantity,colour,size FROM cart LEFT JOIN product ON cart.product_id = product.id where user_id=$1;",
      [user_id]
    );

    res.json(cartItems.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//to update cart of a user given his user_id
app.post("/cartItems/:user_id", (req, res) => {
  try {
    cartItems = req.body;
    const { user_id } = req.params;
    cartItems.map(async (cartItem) => {
        if(cartItem.cart_id!==undefined && cartItem.cart_id!==null)
        {
        if (cartItem.quantity > 0) {
            const  updatedItem = await pool.query(
            "UPDATE cart SET quantity = $1 WHERE cart_id = $2 ;",
            [cartItem.quantity, cartItem.cart_id]
          );
        } else {
          const updatedItem = await pool.query(
            "DELETE FROM cart WHERE cart_id = $1",
            [cartItem.cart_id]
          );
        }
      }
      else
      {
        if (cartItem.quantity > 0) {
        const updatedItem = await pool.query(
          "INSERT INTO cart (product_id,user_id,quantity,colour,size) VALUES ($1,$2,$3,$4,$5);",
          [cartItem.product_id, user_id, cartItem.quantity, cartItem.colour, cartItem.size]
        );
        }
      }
    });
    res.json({"message":"Successfully Updated ! ","Status":"Submitted"});
  } catch (err) {
    console.error(err.message);
  }
});


//initializing app
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
