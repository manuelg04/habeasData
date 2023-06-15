import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import { selectUser } from '../redux/selector';

const WelcomeUser = () => {
  const currentUser = useSelector(selectUser); // Traemos el usuario actual desde Redux

  return (
    <Typography.Title level={3}>
      Bienvenido,
      {' '}
      {currentUser.usuario}
    </Typography.Title>
  );
};

export default WelcomeUser;
