import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_ACCESS_TOKEN = 'STORAGE_ACCESS_TOKEN';
const STORAGE_REFRESH_TOKEN = 'STORAGE_REFRESH_TOKEN';

const storageSaveData = async (key = 'defaultKey', value = 'defaultValue') => {
    try {
        await AsyncStorage.setItem(`@${key}`, value)
    } catch (e) {
        // saving error
        return false
    }
}


const storageGetData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(`@${key}`)
        if (value !== null) {
            // value previously stored
            return value
        }
        return false
    } catch (e) {
        // error reading value
    }
}

const storageRemoveData = async (key: string) => {
    try {
        const value = await AsyncStorage.removeItem(`@${key}`)
        if (value !== null) {
            // value previously stored
        }
    } catch (e) {
        // error reading value
    }
}

export {
    STORAGE_ACCESS_TOKEN,
    STORAGE_REFRESH_TOKEN,
    storageSaveData,
    storageGetData,
    storageRemoveData
}