import {connect} from 'react-redux';
import {Alert} from 'react-native';
import LoginUser from '../compoment/LoginUser';
import {EMAIL, PASS} from '../action/ActionType';
const connectState = (state) => {
  return {
    email: state.reducerState.email,
    password: state.reducerState.password,
  };
};
const connectDispatchState = (dispatch) => {
  return {
    setOnClickLoginUser: (email, password, navigation) => {
      if (email !== '' && password !== '') {
        if (email === 'khanhtra' && password === '123456') {
          navigation.navigate('Main');
        } else if (email === 'admin' && password === '123456') {
          navigation.navigate('Update');
        } else {
          Alert.alert('Tên đăng nhập or mặt khẩu không đúng !!!');
        }
      } else {
        Alert.alert('Giá trị nhập vào không được rỗng !!!');
      }
    },
    setStateEmail: (text) => {
      dispatch({type: EMAIL, email: text});
    },
    setStatePassWord: (text) => {
      dispatch({type: PASS, password: text});
    },
  };
};
const LoginUserContainer = connect(
  connectState,
  connectDispatchState,
)(LoginUser);
export default LoginUserContainer;
