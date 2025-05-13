import sequelize from './../db/db.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export const schema = sequelize.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
    }
})

export async function createUser(username, password) {
    const user = {username, password}; //obj shorthand
    await hashPass(user);
    await schema.create(user);
    return user;
}

export async function hashPass(user) {
    const salt = await bcrypt.genSalt(10);
    console.log(`generated salt: ${salt}`);

    user.password = await bcrypt.hash(user.password, salt);
    console.log(`bcrypt results: ${user.password}`);
}

export async function validatePass(plainPass, storePass) {
    //storePass is the bcrypt field in the DB
    return await bcrypt.compare(plainPass, storePass);
}

//make sure table is created
await schema.sync({ force: true });