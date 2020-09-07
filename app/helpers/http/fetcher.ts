export interface IFetcher {
    url: string,
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    data?: any,

}

const fetcher = async ({ url, method = "GET", data = null }: IFetcher) => {

    
    const response = await fetch(url, {
        method,
        headers: {
            "x-api-key": "GvgGoKvEYQ3iloCIHhpYu3pa0H38Nmvc7TcrEU5A",
            "Content-Type": "application/json"
        },
        body: data ? JSON.stringify(data) : null
    });

    return response

};

export default fetcher