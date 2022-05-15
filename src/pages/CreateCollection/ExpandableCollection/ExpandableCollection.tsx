import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Grid, IconButton, Stack, Tab, Typography } from '@mui/material';
import {
  CrustButton,
  CrustFieldset,
  CrustOptionBox,
  IconPlusSquare,
  IconTrash
} from 'components/crust';
import CrustComplexInput, { CrustComplexInputProps } from 'components/crust/CrustComplexInput';
import CrustInput from 'components/crust/CrustInput';
import CrustUpload from 'components/crust/CrustUpload';
import { FormProvider } from 'components/hook-form';
import { SUPPORTED_CHAINS } from 'constants/chains';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { pxToRem } from 'utils/getFontValue';

type Property = {
  name: string;
  value: string;
};
type CollectionFormType = {
  properties: Array<Property>;
  levels: Array<{
    value: number;
    total: number;
    name: string;
  }>;
};
type CollectionComplexInputFormType<T extends keyof CollectionFormType> = {
  [k: string]: CollectionFormType[T];
};
const propertyPlaceholderRow = { name: '', value: '', isPlaceholder: true };
export default function ExpandableCollection() {
  const { tab: tabFromRoute } = useParams<'tab'>();
  const [tab, setTab] = useState<string>(tabFromRoute?.toLowerCase() || 'general');
  const { chain: selectedChain } = useWallet();
  const location = useLocation();
  const { switchNetwork } = useWeb3();
  const navigate = useNavigate();

  useEffect(() => {
    if (tabFromRoute !== tab) {
      navigate('/create-collection/expandable/' + tab);
    }
  }, [tabFromRoute, tab, location, navigate]);
  const createMultipleForm = useForm<CollectionFormType>();
  const addEditPropertiesForm = useForm<CollectionComplexInputFormType<'properties'>>({
    defaultValues: { properties: [propertyPlaceholderRow] },
    mode: 'onBlur'
  });
  const addEditPropertiesField = useFieldArray({
    control: addEditPropertiesForm.control,
    name: 'properties'
  });
  const addEditLevelsForm = useForm<CollectionComplexInputFormType<'levels'>>({
    defaultValues: { levels: [] },
    mode: 'onBlur'
  });
  const onTabChange = useCallback(
    (_e, v) => {
      setTab(v);
    },
    [setTab]
  );
  const addEditPropertiesModalProps = useMemo<CrustComplexInputProps['addModalProps']>(() => {
    const { isValid } = addEditPropertiesForm.formState;
    return {
      actions: (
        <CrustButton variant="contained" color="primary" size="large">
          Save
        </CrustButton>
      ),
      title: 'Add properties',
      children: (
        <>
          <Typography variant="subtitle1">Your subtitle is here. Feel free to change it</Typography>

          <FormProvider methods={addEditPropertiesForm}>
            <Stack spacing={2.5} direction="column">
              {addEditPropertiesField.fields.map((property, i) => (
                <Stack spacing={2.5} direction="row" key={property.id}>
                  <CrustInput
                    name={`properties.${i}.name`}
                    sx={{ mb: 0 }}
                    placeholder={`e.g "Gender"`}
                    rules={{ required: true }}
                  />
                  <CrustInput
                    name={`properties.${i}.value`}
                    sx={{ mb: 0 }}
                    placeholder={`e.g "Male"`}
                    rules={{ required: true }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isValid && i === addEditPropertiesField.fields.length - 1 ? (
                      <IconButton
                        sx={{ marginRight: pxToRem(-8) }}
                        onClick={() => {
                          addEditPropertiesField.append(propertyPlaceholderRow);
                        }}
                      >
                        <IconPlusSquare />
                      </IconButton>
                    ) : (
                      <IconButton
                        sx={{ marginRight: pxToRem(-8) }}
                        onClick={() => {
                          addEditPropertiesField.remove(i);
                        }}
                      >
                        <IconTrash />
                      </IconButton>
                    )}
                  </Box>
                </Stack>
              ))}
            </Stack>
          </FormProvider>
        </>
      )
    };
  }, [addEditPropertiesField, addEditPropertiesForm]);
  const addEditLevelsModalProps = useMemo<CrustComplexInputProps['addModalProps']>(() => {
    return {
      actions: (
        <CrustButton variant="contained" color="primary" size="large">
          Save
        </CrustButton>
      ),
      title: 'Add properties',
      children: (
        <>
          <Typography variant="subtitle1">Your subtitle is here. Feel free to change it</Typography>

          <FormProvider methods={addEditLevelsForm}>
            <Grid container>
              {addEditLevelsForm.watch('levels').map((level) => (
                <Fragment key={level.name}>
                  <Grid item sm={6}>
                    <CrustInput name="properties[0].name" value={level.name} />
                  </Grid>
                  <Grid item sm={6}>
                    <CrustInput name="properties[0].value" type="number" value="Legend" />
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </FormProvider>
        </>
      )
    };
  }, [addEditLevelsForm]);
  return (
    <Container fixed>
      <Typography variant="h3" component="h3" gutterBottom>
        Create multiple
      </Typography>
      <Box>
        <TabContext value={tab}>
          <Box>
            <TabList onChange={onTabChange} aria-label="basic tabs example">
              <Tab label="General" value="general" />
              <Tab label="Create" value="create" />
            </TabList>
          </Box>
          <TabPanel value="general" sx={{ padding: 0 }}>
            <Grid container padding={0}>
              <Grid item xs={12} sm={8}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h5" sx={{ margin: '25px 0' }}>
                      Choose a network
                    </Typography>
                  </Grid>
                  <Grid container style={{ margin: '-12.5px -15px' }}>
                    {SUPPORTED_CHAINS.map((chain) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        key={chain.chainId}
                        style={{
                          padding: '12.5px 15px'
                        }}
                      >
                        <CrustOptionBox
                          className={
                            chain.chainId === selectedChain.chainId ? 'Mui-selected' : undefined
                          }
                          onClick={() => {
                            switchNetwork(chain.chainId);
                          }}
                        >
                          <div
                            style={{
                              marginRight: pxToRem(15),
                              width: pxToRem(42),
                              height: pxToRem(42)
                            }}
                          >
                            <chain.Icon />
                          </div>
                          <Typography variant="subtitle1">{chain.name}</Typography>
                        </CrustOptionBox>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: '32px' }}>
                    <CrustButton
                      variant="contained"
                      onClick={() => {
                        setTab('create');
                      }}
                      sx={{ paddingLeft: pxToRem(74.5), paddingRight: pxToRem(74.5) }}
                    >
                      Next
                    </CrustButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="create" sx={{ padding: 0 }}>
            <Grid container padding={0}>
              <Grid item xs={8}>
                <FormProvider methods={createMultipleForm}>
                  <CrustFieldset label="Upload file">
                    <CrustUpload name="file" rule="PNG, JPEG or GIF. Max 3GB" />
                    <CrustFieldset label="Item details">
                      <CrustInput
                        label="Item name"
                        name="name"
                        placeholder={`e. g. "Redeemable Bitcoin Card with logo"`}
                      />
                      <CrustInput
                        label="Description"
                        name="name"
                        placeholder={`e. g. "Redeemable Bitcoin Card with logo"`}
                      />
                      <CrustComplexInput
                        name="properties"
                        helpText="Properties of the collection"
                        label="Properties"
                        addModalProps={addEditPropertiesModalProps}
                        editModalProps={addEditPropertiesModalProps}
                        render={({ field, isArray }) => {
                          return isArray
                            ? field.value.map((val: string) => (
                                <CrustOptionBox key={val}>{val}</CrustOptionBox>
                              ))
                            : null;
                        }}
                        addText="Add Properties"
                        editText="Edit Properties"
                      />
                      <CrustComplexInput
                        name="levels"
                        helpText="Levels of the collection"
                        label="Levels"
                        addModalProps={addEditLevelsModalProps}
                        editModalProps={addEditLevelsModalProps}
                        render={({ field, isArray }) => {
                          return isArray
                            ? field.value.map((val: string) => (
                                <CrustOptionBox key={val}>{val}</CrustOptionBox>
                              ))
                            : null;
                        }}
                        addText="Add Properties"
                        editText="Edit Properties"
                      />
                    </CrustFieldset>
                  </CrustFieldset>
                </FormProvider>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
