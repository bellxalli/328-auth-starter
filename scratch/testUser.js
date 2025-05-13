import {schema, createUser, hashPass, validatePass} from "../model/user.js";

//create user
const user = await createUser('bob', 'Super-Password-123?!')
console.log(user);

const valid = await validatePass("Super-Password-123?!", user.password);
if(valid)
{
    console.log('valid password matched');
}
else
{
    console.log('rejected valid password');
}

const inValid = await validatePass("Something-ELse-abc?!", user.password);
if(inValid)
{
    console.log('invalid password matched');
}
else
{
    console.log('rejected invalid password');
}