import fetcher from "./fetcher"
import { Alert } from "react-native";

export interface IFetcherHandler {
    url: string,
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    data?: any,
    alertOptions?: IAlertOptions
}

export interface IAlertOptions {
    show?: boolean,
    title?: string,
    message?: string,
    showServerMessage?: boolean
}

interface IFetcherHandlerResult {
    data: any,
    message: string
}

const fetcherHandler = async ({url, method, data}: IFetcherHandler, {show = true, title = 'Something went wtrong', message = 'Please try again', showServerMessage = true}: IAlertOptions) => {
    const result = await fetcher({url, method, data});

    if (!result && show) {
        
        Alert.alert(title, message);
        return false
    };

    const resultStatusSuccess = result.status <= 200 && !(result.status > 299);
    
    const resultJson = await result.json();

    if (!resultStatusSuccess) {
        if (show) {
            Alert.alert('Something went wrong', showServerMessage ? resultJson.message : message);
        }
        return false
    }

    // console.log("resultJson: ", resultJson);

    return resultJson;
}

export default fetcherHandler