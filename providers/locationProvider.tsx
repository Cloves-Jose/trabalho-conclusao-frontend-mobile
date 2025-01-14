import { PropsWithChildren, useEffect, useState } from "react";
import LocationContext from "../context/locationContext";
import * as Location from 'expo-location';

export function LocationProvider({ children }: PropsWithChildren) {

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permissão de localização negada');
                return;
            }

            let location = await Location.getCurrentPositionAsync({})
            setLocation(location)
        }

        getCurrentLocation()
    }, [])

    return (
        <LocationContext.Provider
            value={{
                location
            }}
        >
            {children}
        </LocationContext.Provider>
    )
}