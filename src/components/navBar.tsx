// NavBar.tsx
import { Button, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/selector';
import { setUser } from '../redux/userSlice';

const { Item, SubMenu } = Menu;

const NavBar = () => {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState<string>('');
  const dispatch = useDispatch();
  useEffect(() => {
    setSelectedKey(router.pathname);
  }, [router.pathname]);

  const user = useSelector(selectUser);
  const isLoggedIn = Boolean(user.token);
  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/middlewares/auth/logout');
      console.log('🚀 ~ response:', response);
      dispatch(setUser({
        id: '', usuario: '', role: '', token: '',
      }));
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[selectedKey]}
      style={{
        display: 'flex',
        justifyContent: 'center',
        borderBottom: 'none',
        backgroundColor: '#003a8c', // fondo azul oscuro
        color: '#ffffff', // texto blanco
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
      theme="dark"
    >
      <Item key="/">
        <Link href="/">Inicio</Link>
      </Item>
      <Item key="/sobre-mtm">
        <Link href="/sobre-mtm">Sobre MTM</Link>
      </Item>
      <Item key="/servicios">
        <Link href="/servicios">Servicios</Link>
      </Item>
      <Item key="/contactanos">
        <Link href="/contactanos">Contáctanos</Link>
      </Item>
      <SubMenu key="SubMenu" title="Políticas">
        <Menu.Item key="5">
          <a href="https://www.transportesmtm.com/sites/default/files/2022-12/fr_sv_03_politica_de_seguridad_vial_2022.pdf" target="_blank">Política de seguridad vial</a>
        </Menu.Item>
        <Menu.Item key="6">
          <a href="https://www.transportesmtm.com/sites/default/files/2023-02/pr_lg_02_protocolo_de_seguridad_de_la_carga_triple_aaa.pdf" target="_blank">Política de seguridad transporte AAA</a>
        </Menu.Item>
        <Menu.Item key="7">
          <a href="https://www.transportesmtm.com/sites/default/files/2023-02/fr_gg_01_politica_de_control_y_seguridad.pdf" target="_blank">Política de control y seguridad</a>
        </Menu.Item>
        <Menu.Item key="8">
          <a href="https://transportesmtm.com/sites/default/files/2023-03/fr_gg_09_politica_de_responsabilidad_social_empresarial.pdf" target="_blank">Política de responsabilidad social empresarial</a>
        </Menu.Item>
      </SubMenu>
      <Item key="/habeas-data">
        <Link href="/habeas-data">Habeas Data</Link>
      </Item>
      <Item key="/login">
        {isLoggedIn
          ? <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Cerrar Sesion</a>
          : <Link href="/login">Iniciar Sesion</Link>}
      </Item>
    </Menu>
  );
};

export default NavBar;
