// NavBar.tsx
import { Menu } from 'antd';
import Link from 'next/link';

const { Item } = Menu;

const NavBar = () => (
  <Menu mode="horizontal" style={{ display: 'flex', justifyContent: 'center' }}>
    <Item key="1">
      <Link href="/">Inicio</Link>
    </Item>
    <Item key="2">
      <Link href="/sobre-mtm">Sobre MTM</Link>
    </Item>
    <Item key="3">
      <Link href="/servicios">Servicios</Link>
    </Item>
    <Item key="4">
      <Link href="/contactanos">Contáctanos</Link>
    </Item>
    <Menu.SubMenu key="SubMenu" title="Políticas">
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
    </Menu.SubMenu>
    <Item key="9">
      <Link href="/habeas-data">Habeas Data</Link>
    </Item>
  </Menu>
);

export default NavBar;
