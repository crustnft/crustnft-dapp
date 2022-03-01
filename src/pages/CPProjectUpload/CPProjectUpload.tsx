import { Card, Container, useTheme } from '@mui/material';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Page from '../../components/Page';

export default function CPProjectDetails() {
  const theme = useTheme();
  return (
    <Page title="Crypto Punks Projects">
      <Container maxWidth="lg" sx={{ mt: { lg: -3 } }}>
        <HeaderBreadcrumbs
          heading="Dashboard"
          links={[
            { name: 'Project Name', href: '/project-details' },
            {
              name: 'Upload Image',
              href: '/#/wallet/'
            }
          ]}
        />
        <Card sx={{ p: 3 }}></Card>
      </Container>
    </Page>
  );
}
