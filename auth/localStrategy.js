//import necessary packages
import passport from 'passport';
import { Strategy } from 'passport-local';
import { schema, validatePass } from '../model/user.js';

//serialize user into session data
passport.serializeUser((userRecord, done) => {
    console.log(`serializing user: ${userRecord.username}`);
    const userId = userRecord.userId;
    done(null, userId); //storing userId in session (on a cookie in the client browser)
});

//deserialize user from session data
passport.deserializeUser(async (userId, done) => {
    console.log(`deseralizing user: ${userId}`);

    const found = await schema.findByPk(userId);
    if(found)
    {
        done(null, found);
    }
    else
    {
        done(new Error("user not found"), null);
    }
})

//add local strategy middleware provided by passport.js
passport.use(new Strategy(async (username, password, done) => {
    //find asssociated user
    const found = await schema.findOne({
        where: {
            username : username
        }
    });
    if(!found)
    {
        return done(new Error('invalid credentials'), null);
    }
    
    const match = await validatePass(password, found.password);
    if(!match)
    {
        return done(new Error('invalid credentials'), null);
    }

    console.log(`validated user: ${username}`);
    done(null, found);
}));
