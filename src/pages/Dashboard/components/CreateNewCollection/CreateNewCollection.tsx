import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { PlusIcon } from 'assets/icons/customIcons';
import { COLLECTION_CATEGORIES } from './constants';

const CreateNewCollectionElement = ({
  category
}: {
  category: { title: string; description: string };
}) => {
  return (
    <Stack
      gap="10px"
      sx={{
        p: '25px',
        cursor: 'pointer',
        alignItems: 'center',
        borderRadius: '20px',
        boxShadow: (theme) => theme.customShadows.card
      }}
    >
      <PlusIcon />
      <Typography variant="subtitle1" color="grey.900">
        {category.title}
      </Typography>
      <Typography variant="caption" color="grey.600" sx={{ textAlign: 'center' }}>
        {category.description}
      </Typography>
    </Stack>
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
