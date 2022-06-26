import { Card, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { PlusIcon } from 'assets/icons/customIcons';
import { COLLECTION_CATEGORIES } from './constants';

const CreateNewCollectionElement = ({
  category
}: {
  category: { title: string; description: string };
}) => {
  return (
    <Card
      sx={{
        p: '25px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <PlusIcon />
      <Typography variant="subtitle1" color="text.primary" sx={{ mt: '10px' }}>
        {category.title}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mt: '15px' }}>
        {category.description}
      </Typography>
    </Card>
  );
};

const CreateNewCollection = () => {
  return (
    <Stack direction="row" gap="35px">
      {COLLECTION_CATEGORIES.map((category, index) => (
        <CreateNewCollectionElement key={index} category={category} />
      ))}
    </Stack>
  );
};

export default CreateNewCollection;
