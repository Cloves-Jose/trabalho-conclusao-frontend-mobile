import { Platform } from "react-native";

// Local
const BACKEND_URL = Platform.OS === 'ios' ? process.env.EXPO_PUBLIC_API_LOCAL_URL_IPHONE : process.env.EXPO_PUBLIC_API_LOCAL_URL_ANDROID;

export { BACKEND_URL }