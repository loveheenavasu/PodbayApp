"use client"
import Data from '../login.json';

export default function login(email: string, password: string ) {
    const {user, token} = Data;
    if(user.email === email && user.password === password) {
        return {
            success: true,
            data: {
                user: {
                    email: user.email,
                    username: user.username
                },
                token: token
            }
        }
    }
    return {
        success: false,
        error: {
            message: 'Please enter correct email and password'
        }
    }
}