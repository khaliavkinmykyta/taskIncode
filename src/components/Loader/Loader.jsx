import Spinner from 'react-native-loading-spinner-overlay';

const Loader = ({loading}) => {
  return (
    <Spinner
      visible={loading}
      textContent={'Loading, please wait'}
      textStyle={{color: '#FFF'}}
    />
  );
};

export default Loader;
