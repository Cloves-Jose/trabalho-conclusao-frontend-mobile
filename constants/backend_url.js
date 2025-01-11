import { Platform } from 'react-native';
import { API_LOCAL_URL_IPHONE, API_LOCAL_URL_ANDROID, API_LOCAL_HOST } from '@env'

const BACKEND_URL = Platform.OS === 'ios' ? API_LOCAL_URL_IPHONE : API_LOCAL_URL_ANDROID
const HOST_URL = API_LOCAL_HOST

export { BACKEND_URL, HOST_URL }

