import { createContext } from "react";

const AuthContext = createContext<{
    signIn: (body: { email: string, password: string }) => void;
    signOut: () => void;
    session?: {
        access_token: string | null,
        municipality_id: string | null,
        user_id: string | null
    } | null;
    isLoading: boolean
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
})

export default AuthContext