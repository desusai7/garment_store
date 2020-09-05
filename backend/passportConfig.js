const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("./db");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const authenticateUser = (email, password, done) => {
  pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
    (err, results) => {
      if (err) {
        throw err;
      }
      if (results.rows.length > 0) {
        const user = results.rows[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.log(err);
          }
          if (isMatch) {
            return done(null, user);
          } else {
            //password is incorrect
            return done(null, false, { message: "Password is incorrect" });
          }
        });
      } else {
        // No user
        return done(null, false, {
          message: "No user with that email address",
        });
      }
    }
  );
};

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    authenticateUser
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.GOOGLE_CLIENTID,
      clientSecret:process.env.GOOGLE_CLIENTSECRET,
      callbackURL:process.env.GOOGLE_CALLBACK,
    },
    (accessToken, refreshToken, profile, done) => {

      const { _json } = profile;
      const { sub, name, email } = _json;
      pool.query(`SELECT * FROM users WHERE email = $1`,[email],async(err, results) => {
          if (err) {
            throw err;
          }
          if (results.rows.length > 0) {
            done(null,results.rows[0]);
          }
          else
          {
            const hashedPassword = await bcrypt.hash(process.env.GOOGLE_PASSWORD, 10);
            pool.query(`INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`,[name, email, hashedPassword], 
            (err, results) => {
                if (err) {
                  throw err;
                }
                if (results.rows.length > 0) {
                  done(null,results.rows[0]);
                }
              }
            );
          }
        });
      }
));

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((id, done) => {
  pool.query(`SELECT * FROM users WHERE user_id = $1`, [id], (err, results) => {
      const userInformation = {
          user_id: results.rows[0].user_id,
          username : results.rows[0].username,
        };
        done(err, userInformation);
  });
});
