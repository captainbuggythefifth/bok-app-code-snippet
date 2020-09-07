import React from 'react';
import { View, Button, Text } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { IRootReducerInterface } from './../redux/reducers/root';
import { counterActionIncrement, counterActionDecrement } from './../redux/actions/counter';
import styles from './../styles/styles';
// import {counterActionIncrement, counterActionDecrement} from '../../actions/counter/counter.actions';
// import { IRootReducerInterface } from '../../interfaces/root.interface';


const CounterScreen: React.FC = () => {
  
  const count = useSelector((state: IRootReducerInterface) => state.counter.count);

  const dispatch = useDispatch();

  return (
    <View style={
        styles.centerBackgroundColor
    }>
      <Text>The count is {count}</Text>
      <Button title={'+'} onPress={() => dispatch(counterActionIncrement(count))} />
      <Button title={'-'} onPress={() => dispatch(counterActionDecrement(count))} />
    </View>
  );
}

export default CounterScreen;