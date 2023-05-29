/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
import {
  Page, Text, View, Document, StyleSheet, Image,
} from '@react-pdf/renderer';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const imgPath = resolve(process.cwd(), 'public/assets/logoMTM.jpg');
const imgStr = readFileSync(imgPath).toString('base64');

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    paddingTop: 64,
    paddingLeft: 35, // Esto debería agregar algo de margen a la izquierda
    paddingRight: 35,

  },
  section: {
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '15px',
  },
  title: {
    fontSize: '20px',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '14px',
    textAlign: 'justify',
    marginBottom: '15px',
    marginTop: '15px',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: '25px',
  },
  imageContainer: {
    alignItems: 'center', // Centrar la imagen
  },
});
// Create Document Component
const MyDocument = (nombre, cedula) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} src={`data:image/jpg;base64,${imgStr}`} />
      </View>
      <View style={styles.title}>
        <Text style={styles.title}>AUTORIZACION DE RECOLECCION Y TRATAMIENTO DE DATOS PERSONALES</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          Yo,
          {' '}
          {cedula}
          {' '}
          identificado(a) con cedula de ciudadanía No
          {' '}
          {nombre}
          , autorizo a TRANSPORTES MTM S.A.S. para que realice la recolección de los datos personales que suministro de manera veraz y completa. TRANSPORTES MTM S.A.S. es responsable del tratamiento de datos personales que resultan indispensables para el ejercicio de su objeto social,
          en especial en lo referente a las actividades objeto social de la empresa, es así como recopila datos
          personales de conductores, propietarios, vehículos y terceros. Lo anterior impone la necesidad de
          expedir e implementar la presente Política de Protección y Tratamiento de Datos Personales
          TRANSPORTES MTM S.A.S., que serán de obligatorio cumplimiento para todos los niveles y
          dependencias de la entidad y a través de la cual se sustituyen las anteriores versiones que fueron
          implementadas con esta misma finalidad.
        </Text>
        <Text style={styles.paragraph}>
          {' '}
          Leyes de interés que acoge este documento.
        </Text>
        <Text style={styles.paragraph}>
          {' '}
          Ley de Protección de Datos Personales o Ley 1581 de 2012
          Reconoce y protege el derecho que tienen todas las personas a conocer, actualizar y rectificar las
          informaciones que se hayan recogido sobre ellas en bases de datos o archivos que sean
          susceptibles de tratamiento por entidades de naturaleza pública o privada
        </Text>
        <Text style={styles.paragraph}> Finalidad/Uso:</Text>
        <Text style={styles.paragraph}>
          TRANSPORTES MTM SAS y sus Encargados utilizarán los Datos Personales de los Grupos de Interés,
          para las siguientes finalidades:
          {' '}
        </Text>
        <Text style={styles.paragraph}>
          {' '}
          a- Para desarrollar todas las actividades propias de su objeto social principal y conexo.
        </Text>
        <Text style={styles.paragraph}> b- Actividades de mercadeo, publicidad, comercialización y promoción de productos y/o servicios.</Text>
        <Text style={styles.paragraph}>
          {' '}
          c-  Responsabilidad social empresarial: Para analizar y elaborar programas que generen un impacto
          social para sus Grupos de Interés; adelantar diálogos con sus Grupos de Interés.

        </Text>
        <Text style={styles.paragraph}>d- Fines estadísticos, comerciales y/o de control de riesgos.</Text>
        <Text style={styles.title}>AUTORIZACION DE RECOLECCION Y TRATAMIENTO DE DATOS PERSONALES</Text>
        <Text style={styles.paragraph}>
          e- Ubicación de la información: Entregar la información a terceros Contratistas para el
          almacenamiento de los datos en un servidor cuya ubicación esté dentro o fuera del país.
        </Text>
        <Text style={styles.paragraph}>
          {' '}
          f- Funcionamiento de los sistemas de gestión comercial, documental, financiera y contable,
          equipos tecnológicos y de cómputo y acceso a la información
        </Text>
        <Text style={styles.paragraph}>
          {' '}
          g- Proveedores, Contratistas y Aliados: Solicitar cotizaciones y/u ofertas; adelantar procesos de
          licitación y/o contratación directa de productos y/o servicios; analizar las ofertas y/o cotizaciones
          presentadas y evaluar la información contenida en las mismas; solicitar referencias de terceros;
          consultar en las diferentes Centrales de Riesgo legalmente establecidas
          {' '}
        </Text>
        <Text style={styles.paragraph}>
          h- Aspirantes y Empleados directos e indirectos, activos e inactivos y demás Colaboradores de
          TRANSPORTES MTM SAS: Solicitar directamente al Titular o terceros hojas de vida y/o referencias
          laborales y personales; adelantar procesos de selección; analizar las hojas de vida, experiencia y
          competencias de los Aspirantes; realizar entrevistas y las pruebas que se requieran, para el cargo
          aspirado; conservar las hojas de vida y resultado de las pruebas de los Aspirantes para otros
          procesos de selección de TRANSPORTES MTM SAS y/o de terceros y/o por cumplimiento de una
          norma legal; suscribir contratos laborales y/o de prestación de servicios; realizar evaluaciones de
          competencias y desempeño.
        </Text>
        <Text style={styles.paragraph}>
          i- Seguridad física de las instalaciones de TRANSPORTES MTM SAS: Llevar registro y control de
          ingreso a las instalaciones de personas y vehículos; establecer controles de entrada y salida
          mediante tarjetas de acceso e identificación de empleados y visitantes; monitorear mediante
          video-vigilancia y grabación de voz, las diferentes áreas de la compañía.
        </Text>
        <Text style={styles.paragraph}>
          j- Auditorías: Para soportar procesos de auditorías internas y externas y asignar planes de mejora;
          dar cumplimiento a las normas legales; realizar reportes a las diferentes entidades de control y
          vigilancia establecidos en normas vigentes o requeridos por las autoridades competentes.
        </Text>
        <Text style={styles.paragraph}>
          k- Accionistas: Para reconocer, proteger y materializar los derechos de los accionistas; dar
          cumplimiento a las normas legales; realizar reportes a las diferentes entidades de control y
          vigilancia establecidos en normas vigentes o requeridos por las autoridades competentes.
        </Text>
        <Text style={styles.paragraph}>
          {' '}
          L- Junta Directiva: Para elegir a los miembros principales y suplentes de la junta directiva, darles
          instrucciones, removerlos y fijar su remuneración; convocar a reuniones; remitir documentos;
          realizar el pago de honorarios; realizar reportes a las diferentes entidades de control y vigilancia
          establecidos en normas vigentes o requeridos por las autoridades competentes.
        </Text>
        <Text style={styles.paragraph}>
          m- General: Para realizar reportes y atender requerimientos de las autoridades administrativas y
          judiciales competentes; cumplir con las normas vigentes; presentar demandas y denuncias ante
          las autoridades competentes; ejercer el derecho de defensa en cualquier proceso administrativo
          y/o judicial.
        </Text>
      </View>
    </Page>
  </Document>
);

// const PDFView = () => {
//   useEffect(() => {
//     const pdfGenerate = async () => {
//       const blob = await pdf(MyDocument).toBlob();
//       saveAs(blob, 'my_document.pdf');
//     };
//     pdfGenerate();
//   }, []);

//   return null;
// };

export default MyDocument;
