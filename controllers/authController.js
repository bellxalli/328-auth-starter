import { createUser } from "../model/user.js";
import passport from "passport";

//register
const registerPage = (req, res) => res.status(200).render("register.pug", {
    error: req.query.error
});

const register = async (req, res) => {
    const {username, password, confirm} = req.body;
    if(password === confirm)
    {
        const uder = await createUser(username, password) ;
        console.log(`created a new user: ${username}`);

        res.redirect("/login");
    }
    else
    {
        res.redirect("/register?erorr=Password and confirm don't match!");
    }
}

//login
const loginPage = (req, res) => res.status(200).render("login.pug", {
    error: req.query.error
});

const login = passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/login?error=Invalid credentials"
})

//logout
const logout = (req, res) => {
    
}

//middleware to protect routes
const isLoggedIn = (req, res, next) => {

}

const hasRole = (req, res, next) => {

}

export default { registerPage, register, loginPage, login, logout, isLoggedIn, hasRole }