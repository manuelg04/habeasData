/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-nested-ternary */
/* eslint-disable promise/always-return */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// NavBar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, message } from 'antd';
import '../styles/Login.module.css';
import { selectUser } from '../redux/selector';
import { setUser } from '../redux/userSlice';
import ParticlesContainer from './particlesContainer';
import Image from 'next/image';

const { Item, SubMenu } = Menu;

const NavBar = () => {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState<string>('');
  const dispatch = useDispatch();
  const justLoggedIn = typeof window !== 'undefined' && localStorage.getItem('justLoggedIn');
  useEffect(() => {
    setSelectedKey(router.pathname);
  }, [router.pathname]);

  const user = useSelector(selectUser);
  const isLoggedIn = Boolean(user.token);
  const handleLogout = async () => {
    if (isLoggedIn) {
      try {
        await axios.post('/api/middlewares/auth/logout');
        dispatch(setUser({
          id: '', usuario: '', role: '', token: '',
        }));
        message.success('Logout successful');
      } catch (error) {
        message.error('Error al cerrar sesión');
      }
    }

    // Si no hay un token, solo redirige al usuario al login
    router.push('/login');
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get('/api/controllers/verifyToken', { withCredentials: true });
        if (response.data.isValid) {
          dispatch(setUser(response.data.user));
        }
      } catch (error) {
        console.log(error);
        console.error('Error al verificar el token');
      }
    };

    verifyToken();
  }, []);

  return (
    <Menu
      className="custom_menu"
      mode="horizontal"
      selectedKeys={[selectedKey]}
      style={{
        display: 'flex',
        justifyContent: 'center',
        borderBottom: 'none',
        backgroundColor: '#ffffff',
        color: '#000000',
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
      theme="light"
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
          ? (
            justLoggedIn
              ? <Link href="/dashboard">Consultar estado de cuenta</Link>
              : <a style={{ cursor: 'pointer' }} onClick={handleLogout}>Cerrar Sesion</a>
          )
          : <Link href="/login">Consultar estado de cuenta</Link>}
      </Item>
      {/* Botón de Consultar estado de cuenta (solo si está autenticado) */}
      {isLoggedIn && (
        <Item key="/dashboard">
          <Link href="/dashboard">Consultar estado de cuenta</Link>
        </Item>
      )}
    </Menu>
  );
};

export default NavBar;
