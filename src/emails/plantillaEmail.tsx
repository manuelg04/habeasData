/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-one-expression-per-line */
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Container } from '@react-email/container';

// Styles for the email template
const main = {
  backgroundColor: '#ffffff',
};
const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};
const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
};
const tableStyles = {
  border: '1px solid black',
  width: '100%',
};
const thStyles = {
  padding: '8px',
  backgroundColor: '#f2f2f2',
};
const tdStyles = {
  padding: '8px',
  textAlign: 'center' as const,
};
const TotalestdStyles = {
  padding: '8px',
  textAlign: 'right' as const,
};
const serviceStyles = {
  padding: '8px',
  textAlign: 'left' as const,
};

export default function PlantillaEmail() {
  return (
  // <Html>
    <Section style={main}>
      <Container style={container}>
        <Text style={heading}>Cliente:</Text>
        <h1>Buenas</h1>
      </Container>
    </Section>
  // </Html>
  );
}
