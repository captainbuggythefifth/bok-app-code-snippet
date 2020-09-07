import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from './Input';
import { format, isDate, subYears } from 'date-fns'

interface IInputDate {
    value?: string,
    defaultValue?: string,
    handleTextChange?: Function,
    placeHolder?: string
}

const InputDate = ({ defaultValue, handleTextChange = () => { }, placeHolder = '' }: IInputDate) => {
    const maximumDate = subYears(new Date(), 18);
    const [value, setValue] = useState<string>(defaultValue ? defaultValue : format(maximumDate, 'MM/dd/yyyy'));
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        setValue(format(maximumDate, 'MM/dd/yyyy'));
        handleTextChange(format(maximumDate, 'MM/dd/yyyy'));
    }, []);

    return (
        <>
            <Input
                value={value}
                onFocus={() => setShow(true)}
                onBlur={() => setShow(false)}
                placeHolder={placeHolder ? placeHolder : format(maximumDate, 'MM/dd/yyyy')}
                handleTextChange={(text: string) => {
                    setValue(text);
                    handleTextChange(text);
                }} />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={isDate(value) ? new Date(value) : maximumDate}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    maximumDate={maximumDate}
                    onChange={(e: any) => {
                        // const d = format(date.nativeEvent.timestamp, 'MM/DD/YYYY')
                        if (e.type === "set") {
                            const d = format(e.nativeEvent.timestamp, 'MM/dd/yyyy');
                            setValue(d);
                            handleTextChange(d);
                            setShow(false);
                        }
                    }}

                />
            )}

        </>
    )
};

export default InputDate