import React from 'react';
import InputButton from './InputButton';
import { QUERIES_JOB_MUTATION } from './../../helpers/apollo-client/queries/jobs';
import { useMutation } from 'react-apollo';
import { IRootReducerInterface } from './../../redux/reducers/root';
import { useSelector } from 'react-redux';

const InputButtonJob = () => {
    const auth = useSelector((state: IRootReducerInterface) => state.auth);
    const [insert_jobs] = useMutation(QUERIES_JOB_MUTATION);
    return (
        <InputButton title={'YEAH!!!'} onPress={() => {
            const localBook = { "clientId": auth.id, "isRequesting": false, "location": { "latitude": 10.379004, "longitude": 123.9841567, "name": "My Location", "placeId": "" }, "product": { "fee": 50, "id": "1", "name": "Panasonic Battery", "price": 699 }, "quantity": 1, "status": "ongoing", "total": 749 }
            insert_jobs({
                variables: {
                    book: JSON.stringify(localBook),
                    client_id: auth.id,
                    transaction_id: "transaction_id"
                }
            })
        }} />
    )
}

export default InputButtonJob