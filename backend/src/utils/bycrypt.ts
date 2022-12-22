import *  as bcrypt from "bcrypt";


export function encodePassword(rawPassword: string) {
    console.log("-----------------log rawPassword", { rawPassword })
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, SALT);
}


export function comparePasswords(rawPassword: string, hash: string) {

    console.log("---------------log compare password", bcrypt.compareSync(rawPassword, hash))
    return bcrypt.compareSync(rawPassword, hash);
}