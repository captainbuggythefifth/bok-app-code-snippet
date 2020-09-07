import fetcherHandler, { IFetcherHandler, IAlertOptions } from "./fetcher-handler";
import { PROVIDER_JOB_ACCEPT_URL, MENDER_JOB_ACCEPT_URL } from "./urls";

const options: IAlertOptions = {
    show: true
}

export interface IHttpJobAccept {
    mender_id: string
}


const httpJobAccept = async (jobId: string, data: IHttpJobAccept) => {
    const request: IFetcherHandler = {
        url: `${MENDER_JOB_ACCEPT_URL}/${jobId}`,
        method: "PATCH",
        data,
    }

    return await fetcherHandler(request, options);
};

export {
    httpJobAccept
}
