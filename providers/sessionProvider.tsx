import { PropsWithChildren, useEffect, useState } from "react";
import { useStorageState } from "../hooks/useStorageState";
import AuthContext from "../context/authContext";
import Api from "../services/api";

export function SessionProvider({ children }: PropsWithChildren) {

    const [[isLoading, session], setSession] = useStorageState('session');

    const login = async (body: { email: string, password: string }) => {
        const headers = {
            "Content-Type": "application/json; charset=utf-8"
        }

        await Api.post('/auth/login/app', {
            email: body.email,
            password: body.password
        }, { headers }).then((response) => {
            if (response.status == 200) {
                setSession(response.data)
            }
        }).catch((e) => {
            console.error(e)
        })
    }

    return (
        <AuthContext.Provider
            value={{
                signIn: async (body: { email: string, password: string }) => {
                    await login(body)
                },
                signOut() {
                    
                },
                session,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}