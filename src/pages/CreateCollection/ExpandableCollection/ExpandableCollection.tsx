import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Grid, Stack, Tab, Typography } from '@mui/material';
import { CrustButton, CrustFieldset, CrustOptionBox } from 'components/crust';
import CrustInput from 'components/crust/CrustInput';
import CrustUpload from 'components/crust/CrustUpload';
import { IconPlusOutlined } from 'components/crust/icons';
import { FormProvider } from 'components/hook-form';
import { SUPPORTED_CHAINS } from 'constants/chains';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { pxToRem } from 'utils/getFontValue';
import BoostsField from './BoostsField';
import LevelsField from './LevelsField';
import PropertiesField from './PropertiesField';
import StatsField from './StatsField';
import { CollectionFormType } from './types';
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
  const onTabChange = useCallback(
    (_e, v) => {
      setTab(v);
    },
    [setTab]
  );
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
                  </CrustFieldset>
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
                    <PropertiesField form={createMultipleForm} />
                    <LevelsField form={createMultipleForm} />
                    <StatsField form={createMultipleForm} />
                    <BoostsField form={createMultipleForm} />
                  </CrustFieldset>
                  <CrustFieldset label="Choose your collection">
                    <Stack spacing={4.25} direction="row">
                      <CrustOptionBox sx={{ width: 167, height: 167 }}>
                        <Stack
                          spacing={1}
                          sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
                        >
                          <Typography variant="subtitle1">New collection</Typography>
                          <CrustButton variant="contained" color="secondary">
                            <IconPlusOutlined color="white"></IconPlusOutlined>
                            Create
                          </CrustButton>
                        </Stack>
                      </CrustOptionBox>
                      <CrustOptionBox sx={{ width: 167, height: 167 }} className="Mui-selected">
                        <Stack spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                          <div
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: '50%',
                              overflow: 'hidden',
                              position: 'relative'
                            }}
                          >
                            <img
                              style={{
                                objectFit: 'cover',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                              }}
                              src="data:image/png;base64,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"
                            />
                          </div>
                          <Typography variant="subtitle1">Gorilla Gang</Typography>
                        </Stack>
                      </CrustOptionBox>
                      <CrustOptionBox sx={{ width: 167, height: 167 }}>
                        <Stack spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                          <div
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: '50%',
                              overflow: 'hidden',
                              position: 'relative'
                            }}
                          >
                            <img
                              style={{
                                objectFit: 'cover',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                              }}
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABUCAYAAADzqXv/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC6tSURBVHgB1X0HeB3lme475XSdpt6bbdmW5W6MbWywjQkEAoYQO4EEh042IeWyu8/eZ0uw92Y3u3c35Ca7KZDcQAKBYKcQSGih2NgGd8tNlmRZ3erSkU4vU+73z2lzjo5sQ0jIncfjqWfKO9//fe/3fv+MOPwlD6rKqTTh2GzWFJy26S9y4PARDyoBt2PHDu6zJQcXi6qyRIWyBJxUQ5DV0lYnoeiiqSuxd/Jn3TTfo6qYpFvoUXmuWeDU5qeGN5549NFHVe4jBvyjAJUjIHH2iVuWWiBfAyibOVVZrCaBo22cBl4SF1Vbl5pP7JNeVnWrVGbBeyQVLxoE/u2aL+xp/igA/rOByiyy9XufzzebPV+hBQJSXZwGRQ/WRdapOUCdAXBVAxjdqsr/l8SbXmj44pud+DMNf3JQGZjnn9y6QVBjXycgr0msRYYlpkBLLiu6eTUHsNkA5wIb0Fsx2f/PFAg/nf3wnrf/1P74Twkq1/3TretVWXmUmvM1On+IJECcbv7i4GVO1YsCjOnrkbDc+OIeyei6b86DL3f+qcD98EEly2x/9t46Qyz4KPnKbfqzcDmAnbmZ6+ZVRbesZFmnkvanlwIZad/LLFcQrDuq/+qNrg/b7wr4sAYCczu3nf9Zz2e/xivSsxyHK8HxZAw08vEp/QdMm3K6ZWTOI7ktsV6/jPQ0tUtyN+i3I70/MlYtVpTYrVNHn+LcK+87tHv37g8N2A/HUhPWaZRjPyF/eE38wOym1Bxn0Tf75PRSTT9pnUqi+SeW1SxrVjN9s5rcJ2t9/BjQ+V3utzHR9kgDWe2H4RL+aFC1QPT0vRsExH5CVlKTNgou4+jTr/VyQFUy53OsU1U9wIkAp/e/08DPdA0pd6CiRzFYb5/1V28d+2PdwR8F6vbt2/m7Z3V/DZC/xXEpx4kkoLpWlxjU6csqdLxUD66SAERBpjVmg5sGNQPgLCBV5LDalMXqwOb5R2offu///DHA8viAA90wv21O93Zq4t+K+0ueXZA2cjynjdpy0memlhN+VudvkTEK8ZETaZtAI005Ie6Xk9u55D58fD7hn9P7JM6nOzen99/pyJl+8EmjUJTHur67asd2uj98wOH9WyoLSPS7bc/et51XlX/iOH1A4NKBImuqjx+6g2VOp0V9vSUqunk5yzKT2/SWquRu+jldAnSWHL8OGcI3jn31ve1bOU7G+xzed/TfTua1beDp7TzUf+L4dCRPWSfHZ1gJlxgzLEcf0XVMILkvh/QyuJl+h8T+OkKgf4LJBzztIXKZ1I7T/zJtujyUq8sPPcm5X+nbs3vHjvflCt4XqKxJbBv4OQGKhIXyuqaVSZG0G+azmlwWQByfBBHxfaEDOLE/l6RMyXXIBjg9ZrSaBEj6XfQbuRwzWT8lzyZfs/DgT4T8VQ/seT+US7zcHVmU73zuwdvSgHKp+0s94aShZDuVHMsZq/jkD3VugEs3z7HBKXR0R1E/pxRO3o+xyQgEsxFFThN4MaI7iZI6bvxIzC3wiWl8D01MVHQQs1NwyXMm7TjhBuhGBFX+x7vyX+ui7U9t5zgFlzFwl7MTA7T52a/OzueCh+hEcTUpF6jJg3IznOGi/lW/nPZ/E0Ne/PaNHgyJVVh76xao0SjGhkcw0t8Fh4kY/JwCzJoVRsBqgk+MIkIuiYcBrqgMx/ggDBODRE6imSxCUaZxWFVRs6gYdD4YU2HefUXjV17vuBweezmWyu3YvVv4PBf6AzVNlz5SZgalLMSSZpC1PiegWeB2tQ2jd4zH+c4BtA5LCHIGXPXxpaiqLIXDbidM5mMoNBt9kbNoL/TjbV8fRvwhKFKERglmIaKd2knWvKqhFkt7fBBDo6kglPS3Gs5JWsdBlxBwGnZq+vKcZmXiDwd/dtvyK4FxXGK4JKhbtmzh7x78xWN0lho9iulZvYkiEQSyENMDehEw2bJvwofv/OIERmNGYlUmGGx5KCgug8PpgCDw6Bg/hUilD6divRgIDSPaR79TDORBVEgRSfPNSixG3iOMUDCMFzynMFxVihu77eCjvjhtUxQdkJl+NpESpIlJIjOkO67J9wxs37lz59e2bt16UUZwUVBZs2//+deWAeEvc0lKm0GhMgFJX4RuRRboF5v3TYXw1PMnMBzgEDWIdEYRBtEIi8UMyR7DubzDaOPH0NcXRjRC8VktovuNQZHJMhWB8JKgxqJ0OBGCbKJpjPxlDO/29qO6fAkW94bJOmNxH64kT82lgcx6ynGQ0wCLqvzwkoHvvUi4vHGx5OCiBJc1exMf2TUtaqecqS4aI3u9DlC9701NMn8bC0fwVouAUz1eCkI2WJ1umK15cNeVov4zczDa6MNbowPonCLAY2bikXQ2kYNEbVghxiCrAiTZQPMCZAJYZq5TNpI/5QlgHq9MtiJmcqVpWhbty4gRXNal6gKxqPp/9MTRoyIwczyaEVRGn+64sOse1uwzs5GsIcPipgOdOSIL9DS4753nMTwwAUXMQ3FNA5wON6rm1+Cqr65Arz2MtjEFYXIJWqQWYxCMZJ28D0ZzAEbrJIy2SQimIG0LEqAKZEmgfSUgRoyAGuuUx4cJhxkZ3DkZH7I4cU7qlr7dmg17v/RVwmdGUHM2f00k2fVIvcjjH3K29VyHu4gr4HL9RrccpCBzbljE8UOHwBfU07IXosmCOTfV4ozXiyCBKZgkat5kn9wkTMYQGRoBy7OmSSksMR1JUhCNxhAhdiAbCcwIAUsjR/5TkWUYCNhzxAJKuKQdKchJU1LUCvpAFWcDXHytoMT+ceOTW3/6qKqO5XIDOck/7cgvyfd9jY5xC5d6mkmQ9E8yecocT1hnjTO5i6QltHd78Ks3zyLs9UMxUtO3O1A8pwT2DcUYjagQjWSNxinYTD64bCoKLBbYTXmotlYiz2BFoTkfNtGKGkcD8izE+MwcwlIIMVlirpbcAQFI/mCtakRB8iZVfftRU+ClhySBxbRtNG/Oi/iib/a59uzatWsaqNMtlay0cVeLyMvfuysDzBwHnwZcjrNPXzf9COFgFONDQ0SFBIiKDIvVhvKrSzEYjMBgDMJKTd3AKzAJTvKnCoYGBQQ6CjEYdRIFFcgHk3WYw4gZfXDXEk81G2Bz0TaBlFdPkLitjGWmIsxFXPxWk6E/lRhwKT7F3EB8NpNWpfGJ3wMJ8Q9XhF/6LuE1ms1dczb/ZfIPP0+/rNEhlkYgF3h6hLLAmzkRSC+YKeCITD8QDBBofV6pFWoNBSOiRgZSqyJj+fCfLYO1qwrO0RIUe4tQmGeC0cBrWa0gxJlShGrTw3+YwkBFKzzzfw0UTWjNn1nz9WYn4RfTLoIjAUpNZmyJAKvq701V09cPPX9FyhfQZmfRePu27cBj24GLg/rgE0+Iol15OB7COGDmIJc+SeZMxmzysnP+JnHhXo8fRornKmfSLEUqUNF5zAb+bDXyx0tRNFaOMpcVJhOljRY6mhVpHQZxy2O/E+huqg0uVHpWYdHhRXir8AeIGF7BJmIQzpR1pl2VmrRUNbNFpqxVz1ez/CybIb5xy8ATT3wHKYKWA1QWoI4+9/ez6NeL0j4P08HL2az1MyoyglQOIDPOSxtNFHSiZG4GslbfK6uwxP0xVBbaYDGTNVYkrFHQn1/VXTenZUdKQv1j+zp4K24MfQFdtk5cbeE1PqsqfPx3Gk/VA5rM+Ll0xpVc5nJYa8Ihc4q67ouBZ5Y+oaqH9S4gI1DRExJX5U99nY65MpnKZQSVpM3lAJrLyU9zBC9O/2zi6zzjfhw6NQijvQDlpntxY8OtqC6zwkxWKRrJAgWaiolzpDTPRDvi4hipWo6eCDuJqorNZMKqWhc9mFOJU6opTDJzqeTx1PSCHkW9Uqifp1Hk1dFTrw3s6d69O2WtmTy1sZGnC1yX+TNcxCJzuAcO09cn103jrtDWSTEZvMmKAsMd+DgB6naJWlNmo2iABqxmiRKL5DSS7ySWpI1svRSjgMTmNcaPxL4qwgEVoyMrKPPKh55tpDl31jQ7ydEbApd120kAFeXmLzZuycAxtcCa/iek4/U0t2g60edyjJgByKwHweXYP+vqfIEoZUYrcdOK28k645fEgGF5vEBJES+qMFgToyl+1Yx7qgxJhjQXBk8MQaCkQCLUJWIIcoxpASppCUb4gxsSDphHit4ll7NA5pLXxmVOOWQ/DCRaorKwaPQ/8lm9LnlnKZ+6g3a5Uw1dDT7Tii4+cO9zW7blkwXKHIrKKnHfA1dhwVVeKJEI+vZYEegyUNMiH0vNumyZivy5IPcQl+RiPgkBkv8mzrbQQxiHagiCJ61ADprgHalHOFRNgZ6yL8UIKWyBZ3I5bNZXydcFkNZpEwCpXCIwcZkGkAxeqs6Hq2lY4q4mvqI0dm4zHn3yR1QJzQSVopggOJXFGerMxQDLidnlAJlekIIywiTzlfsmUeI+iq5n16FwnYCGTwYxcMKA3jdMWLSBQ8VKdvlkmSTrMSs12ihFJdlPsr1DnNRMMceo+QqDJQRj9XnSERTwKqNPZoTU2zDUOQfN3Rtw84bT4COdYOJQqudrEkgdyGkJS00oWXqQ1fQtJHYTIS3C7t0pNTwFalOkimSfM4tyY3kpi03so+YGL2NZZ6WyX8Hg+TFMGhVYwuughN3oe1HF5LkIZt0gobwpDLNJQDQcRXhiFLGAHxH/JLw9LcBYJ8xmSlEp1IeCXu3UZrOVGAKHYN85nG8+R14hiorG46Qw/xda+zgsrK9GfXkvOeMYMlpjClAgRbdUHQVLpq6agSctGUhGLV6R16Fbw1JKg0q2PLHjCYEvVNfmBEI3pHBLzXDp9Vzu30xfF3/MCt10kBR3Q/ksyuNnQ+pWYaQo72s14VCngGV3M9EkiBhLX4mweyjD6ujoRngqApdK3DMQgME7hcnhHgpaMUpRLYjCQg+pBPzqOhiobKLk2VDpHkCpVAu+jIRspx+856imF2g8NUmhkoCpegtGwnKTD0DNSgKSHlitdthGOc0nELUSk4Ccahisng7ARSx0Rn+b6RpUZFP/5MWSf6Sgwiwtj0RoI2mjof44qWERPxrgMX5EgmPBBXijEXzzX76BI0ePxqkT7SOQ7y8vK8PSJUtx56fuJxsJw0BRbN+xkzh+/BjRtHFMEeAiHaywcD82blyPNXPXYYxrQhFOQKs865s8x2dmUqpep060dZ0LSGEa9w3ONUM/r9u+o6V1Oy1ooO6gXbfEfPRocZnD5TT17HVZ24nJ80YeJoMAq8uN2IQJMTJMEvs1SsLTjQydHoDk+Tn4pTdjkLQBVdd7TyYL7+u/gLGxCWy+fiOad/4A9Tc/gO9+7/tEuaSUz2PT8929OHHyJJoWLkaVsVMHKLKATftUNcMdJAJTEum0o00ZtV2erDnT2Nim3Rr778yuXaT3Ks5sSFTMAKhukmMhvY6bCdz4smAVYHfaIFIWZXbHV8vENWNanY7o0HgVcc1yBN/diX/5+7/FtnvuQVl5Rcr9MMq1+bbboIycR0m+Dap3DHaqYaXOlKjSLly0CP/8L/+O0kAf7LHTumvgMimS7pq5rBY37T64rGVeqknOapZKdSjwz+6vwSWHHOBxF/HBKvQYIpv7ik4LnLPKEJOiMJTGNVFmoSzd5DVALBju3oyK2U8hcORFLBMduPaRv4KPak+BYBDF+XaYIiQSSZMwNzZgtO8w/pW2j0oiabASPSweLmp9dlyDC+9UgF/2ONCQBjMekLhMaqUPWslrTt6H5h24VKc2vV8V6Am6PR5mpLIG6htPPMEvtamapar6B5TRxC/x5HINM/ndpN+imzY6WJPyIeKhMooYVzuZ4iRLnKZCRaOVGOj8DIrL36VK6nkog8fhItQLKKAVRsnC6RiKw4qRcRkL5hQSF22HYXgSsiGffiuhv4UYBreVyiAmCE4gw0Kzon6mK4hHg3hxVU0oW0qKCWi2rCIhI9I/RUrFJK35L1++XJdaIZ1fZw+XXDcdRO4i29gNGEh9Uvx2tP3eEG/2ajyP11R9jgFMwFI5+kLXp2ihDo5SivqlRbA67Og43Ykf/ug1BPonUFFZqWVSb/3sD8hHEA4XgRAkgdvwD7CIdk1aFEhnRZZYzmW5gGmCevLada2Ny7oHNlCrUBmOKVCPUlRV0oji8oZcvnX69umaOjdtaimWEQkbtKeu6IQRIaGVilTXMRpYdTRPOx7ZJgU0Awrm1KJiST1axUoYF96C3ecCcK1sAkqqSUQxwV3kon3ziEdycVoumDA9909cS4YWkLg8/XzGNv1v48uKrPKDnZ1cClSGsKJktvqMuZw4X2zbTEPuJyCax1G38DQ1+XjUT167ollsXFgpncWjZmMTHOU1RJ2MZBkCHE471i6pw5wiqkNJQaxqLEZ9VT6lrgYYibPm15TCapPIV9PDosAnR62YDiCX5fP1lgpM0y6mAa27kZb4JNXqqcTbp+9umOpiqNcQ9XNq5rrpSxcDkpu2bXSglJp6/OZZ5NdcAIHJUYs1kkpVvoLstLoWrsXXwVZeT7m+mcQVO2z5VBEgAMeP/57KLiLyK2thKyTLJdXLYJBQ2DiACKlgksxagf786ZHLAlq/nGIBKdUq8zaS+0ocN1X2iXrtDFqgGvT5VD7JqqdhoF+ZvcOMbX/GI+QaQlPlGO4vB1VIEupU/CYYChJRShfFL+dsVUsUeAo4oqsUcl8nVZ8Z35TAiVGqBjigUmUgFolBCU0QNZMpgfAh3/YGqQZVtJ+RDilliieqDkw1yxov1gL1mVdiR4Uz9yabvwZq4+goyQ9ir5GSvFTHu3gA1A6gqmr6ieVCKHvdpVDM2m1qaDGR+XikZVopL8ZPLidE+vIVMZjcVBmVSL2nDEGJhrVOE9CCGeseJGpxmrEJyihgr5gNa3ENSX8heM6dIEsOIeQ3JGiaHrzEReibuqqzYv0yBx07SBQIk0xAk3HFyQGPzlKJqCLy89ZemxLENFSTdCMLirieoGZum7aM5JPB9CG+LhKoxuTgfAosqiY2s/0Fdhwh3rSolRNIBGiYaJdvDErQg6muVu3cAuu+rrIaP113NMi4IkxFpXDPW0vY2rSe1pby+TC/bkTYz4JeWHduPXA6QNPGlwP89Ao1UwSAj3P0lj+4XMZDCVCpdo11E/U9N7mGvHRPjiQi6bxd5xm4bHPNBC29pAN4BlylaAFG2j9OJWrSTU0K/H6ZStJc6lkwS6CCKjpeH0Ve4c/Q33EC9uJCjIdiVDkl9YqShTxnAWpn1aOAEgkWvLioH4P7folzPWPw8w5csWIxrV9OD0CCyRpEpj/Xj3oEMR3slBwYN7a4AIPUPu8ENvWyzJT9NA7qli3KyqdfJ8ESvQRfE4dsEBK/zvA7CdBTCCSesh7B7FmdG4pFijDcdgs8ww5NvGctMxZVNZ1TVOPHZVE7RqMw0ktWPABXngP8+Bhq6AcmE/FO0g6kKRKr9x7HpM2J2pVr4KxuhNlegRWzw9o5A0EL2k76UVeu0P6BHCAiC2RkuYGZnKvenwr77fVueUFLi7oLOj01EOpWY2Zuv1FVmlL+FFk2mcKNSwE77QJVvT/OPABROYraJJxMVWK4/SbEQmZqkioCpKsyi4wy3xRWmbas9X9i9agYuYSYtwmqrY7Iexskcx780SgpV/QkKIpx5EOr138CjrpGGNylpCdQwCJuFhrpxsjZwxjrL6Nr2YDKmg46qATMwAAywFIvhiE3bYOsGs6QFiRvf/RRlan/YuLJqNi5U1KDwqnME08/atrFctPNL3VRapaboCIcqUyjvaXwYhPc1mXETUlM9lFZOhoHz8Iqp2R9/skIzIoAE21nShSzYK+Xdavsg808oKlHrHQiEFc1WMyoWk3Hm3sFTAVVcdrAegHSOb2jIzi08xl4/J9mXcwxZ8nJ1KVdcpjW9KFr60CmtbDWZTjpBeuIGDfFdBWwqEjpVst+P+21mKx5/Ss12gGTaS2Qk7uyZW8oggBRoZIri2EIlRCQHCZHVNjdnIaDkagQUU2trk+ZJiJkhZGIgihZaSgswxtQMDJ2Nbw+1pE3RDUomvr9sDjz4axZANFeRC4kSqwgBDkcQHRyBMOtzfD6LfS7K1DX0At3fVjrAcOlQIEOrOx1OqPJ2JbLbQAjauE+hl9yOQXqo+vXy+cMVRNkHKf1feGTo/518FRH2GR/eWCaCST3OTsi4d2xC1AdnbQYgmPeG1R+uwALKXQ+jwIyOuTlcQiFVFjIUq15Bg3QMIEZI6UpRk2cJpj0r8K4ZyHtR9UCfxD+KT9sZXVa+ilPjSM2NoTISB9Cfe0YO7EPLe8cQMfQVnITBhRduRfj42/B77GAM9mmgaJOC16XM8T3kyGcOa7e3HWGaGlyS8qnMt712GM7Y1G38IpJjTVpCo3CpV/FSVEQ6PxmukmoWkki3ST6PQa8fMaA0xdUmK0VqLqxD1MD/aiomAW37RcExlmMDt8F3+BKKtQZNS9SUsITkGTFk9T0CTyVT3QSY+fi7fCFHybrfRwmbjdlXlGMtrfDmU+ZGJm7QpxUCvkQGOnH/r2ncbx1E7mPBbjp1ndQWNwHj7cPx195CVv/9mHKNo4m0MwN4KU9RJpSyRD3T5gC0q4tn01ZakYPldX3beFnRccofITu5tK/z0U4EgvqNJIw5BPxSosVe8/50DfBOuryZHUiDpyoxOmxcVRSka+oqhARegDff+kgDg20YCg0StFcQKEjj5oxFfLI6/uClIhQ3SlEroCllxKJExIplf7wPGrW+STAjBOA51FEFi9GvAgPd6P1yFm8uS+Ck51URMRcOGu7sXj9TgwOX0C3bMW7b8SwYpYBYWsBrFwo3eqga5kpV6amIdZVHNIKXnz9kHH2/aHltw79rqJCzglqESUBHOaOz5Ja15OFVF0cWDV1HrYcpeh9biyCnceBpQ3Hcc/mZpTwERzoKqNzy1pOHyQfd6R9AsXGMOorG7C0tpR8Xzcu+PvQET6AwrpnsHzeEUxMlmEqWAAfoWsgDTNG4MoU0cPkN1nPvhgqEVbWYMA7lwqBhThxmsPug24c65iDcV89JQEOBI0T6BCPoGXEiv6ggFfeLESTM4LGWuLEjmG4ZhGVYy+xRJUsQNmYXqf3aqr+ZWGwjI8/sye29T93x7zRFl0/1QxQW3buxHVtzXx9pKdQ5OSNGmCJ6M5lNQo9yIpxCtaqM5D83di4dgxNDTGiSkF0j/I41FatuQU1kdqBCmEdbSOoJLGj6ZqFmFduoYroJJzuLqxf10Zk/izstl/BWDlJUX4visQIBadCCmDpiMwqpxGJqqJ8HqZCVGUNWEjp56m5h8gCvWhccwAHfO1QDWTp5FrGPHmUcPlxz7VFKK2ywRsZRnHFBAyFHHo8JMqw3thaN0tdvMiw4OxvusTnQ7B9Y8Aw+6ilq0vSvxGY2ZN6xw7UbNrElRlM3fnq+L0EqGnGps8OSwYfsvRSKaQPrYM2nLjgI58ZhCkawNk2Eee7SIorDFDpOIYpHykLchwYTjSjp3ME/IVOzFk5F3OXViMvZMHLv8lD+5gJcxcFYbCfwYq6dlTOewuy4xh8shMxXz7RI9Iu1Zj2oBStJxo9QLoyK4Yxx7EXq1bvxUDxENr7ncQmjJogy7oIrSsJ4+ZPX40wT3buPgdDHpMLwzg2sgIR52rY6SHzkXFkvqCmTgMSatJhcH1vOO//Ir9wYfhv7rwz4xWgad3Tj770krrkVDBWH2u1k7WuQTJZTccgzWp5UwBqfg96sBoj/P24MFFMzbYGgv0m4qFHUFcTQtPcCSyeP4SrFvdh48IeDPUZccHriKefvAmDo1F4mg+hdn4tgVeCpqYKqvkH8Ls3SvD6e+XY0+HAAG/G6yc57D/fiv5wK1kpcwd+MCegqkSf1BFMyn3Ir3sTQ7ZOPNdViI4LxYSliUAVtXM1Fkj46oNrEKPE4fm3u9AwbxCs+4WFaIVgdmLfWTdauiWqEKhwm8KsNJIGM/U1DD2wLFGx/OhguPYtf3NzNPu91el9/slar7rjFs4qob1AHbuHWr8p20oFyxR8OIPHX6sksWM1vvvP/4YuyrVrS2zYd7QXjrwxVOf7WWhEmKSm5jYLdu2pwqHOinhfUvbqN41RTsR4zIrz7x6GnQJV6axqNKyqR0OFCfIo5fADQFuXHVN+Uv1FAZKBwDQdxrnYSfQqh9ArH0G/2oxR4Sy6ggqGIm7ivHlUKTBqgDJXsW62BV+6ewVJg/n4+Z5+HDg2gqFJBzbNn6AEA3AYL6DndDPmNa2HULWcWIsFRfxgHFg1RwAD+9gI1z9qqPt707o7hr60dauUDWHOFyl2L1igXmWcG60UelUDpA3QoSqYpogfnkBn91oULroN5zs6ccMNK7HqqtXkF61whfZj4xXEQ82K5o+DHhE/e34Fjg+yjEcgmkbNjvwGA5a9A0UJFbyqDR3nhjF4+ADy810orS3BgnlFWLdURFNpJyzSBFm4GfPzp/C9z3VjeVUYNdYYzgesUEUTrCYTZufTuXgn5fdU4CMpcHY+8Lk1Lty+eYkW3J4mQN/Z00ZlGSfWlgSxdOFYqnnPIRWsMv8MbMIoqWIyHIXkXwPheKoHNSNAsfmAYn+0ufTON02Dg9FcL1LMyHR37txp9EgWx8bArmNkW1WafsjSxlKyKnuQmuFadPRa8RaR7Nq112PpXAVuqmRabWe1VxqhWaSi+d1f/qYSz59YrFmOyrpAMpfCAhdtZ1MDPXsjk+nUKIqkUWxe6ce8RVfCXDqXJDsPcddujPb3wuvpRWPZMGUsEib8Kn7TakIpJQxXz43gPPHib/5uLmZV27FmnhXLltfBVpCPMwN+/OC5Exi9QMmCo4i0WhGN9WN44MsdxDCIjlF218Q6FJNhR4mycfRQzBaSDeGC7zjTIhKdYBMvCROL6XvZ+tWlypTZ/5Wv3BjJhd3M6QO10/94+mnrNcHD1+dzE79i+WTU7ENewSESfXl4YwJcbvbyg4ipCVLnC5W4y6HTtHeDKA3LwVXW0xg7f7kIrZ6q+BNnZQ3mpxRZA5296MDmmS7KMhGRmt2y2b24Y103ijkXyXuLEDYXwydatf7+PuKjBS5S+AOTsFFwEaiEwgKWP2pDSHKSvGdFlLTUwakAXtw3hD176UETLzVa3KQtmMk1JARtY4RkDh7lRLN2fOEUSDlEDzEMS0BEodsIs81Ox3XBf1RO0C5FM6oRVGza47v+QCDQGdq+fXvOV9VnfjeV2q7j8cejR5RVb68X3vgxJxnvf6ntLO5eq+Dx39rw6c0krcksy5UwSrTGKSdkMALuuVcX4dRoYap3ncoKTVz88xxahkb7su+jxF8sU+NXofnZ+INp7asgNuFF0fJJGKN74Llgx6utVyKfbnZ8ZBRzq4tQUl5NGRYTXywENqn6ggyjz4dXzwxgz9lJdHZNwWx2IL9otia+8Nq3WOLfbWEZmBqjIEbT/kkrft1cCqV8CscPFxKD4HHTuiHYPVM4QbxY8DdgjWFcA5WC64/2BzYdDayoimzfsG3Gd/8v+sLv4OCg7GhsDJ/zNvz7+OGW699VAlXBX1bivSkRd6l9TPDES28W45kjNZhdP4T5swMoIUs7OVimWSnrqhV/cwRa/6W1NRMIRAT4pszoDJjpcShaWzFSwT/CxA72jimR/DzXCFpJmQqdsKDEFsHCsgiqJ314fncY165sxPlJGY//7gjW14axbfUkBBKteaocxJwxVFdYMXV4BQpKyrGgNIzhKQsmJUF7iHWOCLq9YryflPYhhfg7VC+9Uh9PwsnnD9M1NB93YNbGXrTtrUWhqRQLlwuw2Yb6XhHv+wdhbl5oO+kkF8PtkuoB63ZdVNRo3X/wvca2ts4/cBAcnCWA/3HfKcwOOvHXv1hOJN2iNSmZRUzKyROEAVXkAkpdEYSZ2OhQ8MkNR3HFbGp2xFc9EzY0U6Bp32/BlqsGCEQHjnRWY8/J0rgvTrxq8vXbD2JJo1/z0a2nSe4rWI2wSM08dAazKjsILMq2yC/+8ryd0tNCnGkpJakrT7ux21Z2YMu6Ybx2sJiSkBo8+pmTODdgwbderSN/akPyYzTsjUCtuxGTDbUkhSe3Fe/7ahB53FJj9i5ZKFx30PaJM4G7PhbafokvVFzyGyqMg23evEl1Vs/xdrefn4xGYzdANqFlIIRjZ+swGbZoBJwRbEmS4x0h6OLMnAe3bj6MbTd04GOrurFhST8sRuKCJEoTg4eRKqBjg0HcsmkSFpeM8qIQGq70YM++MtILkpclY8v6ThhtMgIxpmJJqCjroXy/FQZ+nAIKuwPSV6m97TtkxnvHF5FLMsLGy1hR7aPIY8AViwaxYI4PhUYvKupDKC4Oo3U4gqqYCTc1juLMCD0DWdSIkiKxdJoFV7ofRdZG9l7BCKxfdM26eu/Cekfonrq6S37957I+TPMSJQRvdrYoSxrmn20/3W6QZHl1lLKbiaAhrtdonyuStAtQEgEoIhtwpKWEmrkPq8vDWuXTRk30JPnLAXk5zo0WEUkfQU0Z1SEJZEqwSPgw4sjBMqqhGxjF1R7QiSEL9p6x47mjlTjWZcGauV6YjMR9KTi+fNSuuQuJ6lrPH6hDwGvX2h5dBdYt68TdN3ZqrmdqikazCX6pnG7Yh6UWPzZtGkDNrAm8fNJBabCFjELRumCy1saun1kvux/RYnxs86c/+cSwLRa85xOfiF0OXpcF6g5KCBh3Xe1uVBYvmHeoo63FQBa7WvvKWbKrN10MuzDNYhm/Iy51VeUU7lg0qVkHaSt497gJ33hlCRY2Xo+uiSYq5E0iZFiIKtsFisJkhQ4Jt6zuw6ZVZBtWDt39doxN2uGZdJGukAfPVAHePm0nA/Til+/Uk5AyH3tPluPVIwVUMcinJizEEwuFRymVsxfO9pAhK3jptBNHjs5D4YIH8NSbPJZUt1OCQgU5n4LfvksPMWrUAJUoMDHKxx4Uuw+LzfztW7ds/ibnswT+7p7NMZYYfWigagO5gfUvPKVETw3I8xcVHOo80ylGI9LqZI0i/qIDqe90QeyiZDUCsewC3MU+lBgpMrPvGQTqUV23mIj+IH795H+jes4iTPGLSLVqQ5HbH2cCAtEjojunAlHSDxiDYJeY6F3CKBm5mxMdlZpV1lmoqkAtAsQAtIiOeLehKtMI7rrtLAooIRDJPcC0HIrrWnzrxy9iWaELheYyuMydJJUL2P9uFVUa6OrpIch0/Zq10vVbbZZv337HJ/+tZlG9P08Zi+1qarqsL/28P1AZrjt2aMDKJ07ISxoXHjx3ttUQYxZLzaWSLFMi3xpKXFyMdNCxYSf6u3hsXenT3oeyU5YzPr4cr7YP47Of3YSGObUYOvgM1jQNwWai3zMd1STikSfn4sS+Bq2nZ7JvVVxAkYnSteFzVw5ifNCEHfcewdIiH94+58KaogBGKWBFJapPSRacGSY1i1pIaTiGYusovvO8F5+/di7GyAJ5AzGDqmaUijHkcSRPnnfQNVOFIRoho4jClmf59l0P3PPNyqZaf8vq1ZEvEqCXZ6MfANQ0sC8o5ndalfkr5h9sO90evHdB2/q/u6EPvf0OtFN8YJ8sWu4kmiyJWEIBqqhMwlvtBrh4ElnKj6MmNIRyqgBU20hoWdoFu9NHUZxK0WR0HuKwR4+XUlO3JTQCWSPdLIDMyw/BSXLe2lU9WLt4EDHipnmuAJY7/Nh8Uweaz1mJ9Fs1i570OlE6YcHaK4aI8MewoW4YDvdiFNnqMTvwI+QVhrX9yor9JNhY4fNx5AYisNntO25/6P7H7EWWwLZrr41Qjq7u2PF+IH0fH/vSD4xSENWKwH2Nuu2hz/33Ku6/DqjyiR+vrPZW/rbLRjeh4tYlw2jigvjySVKGjroovVRx+4P9jJRi7jKK+PYn43V5H3uHNM7tImSpA4qIjh7WnyORdyuJvJvMtZ801L/d2Knt+4P9Vsyuuh49w13YvOA4gUmeIRZPf7WPJtDQVDlBqSc08MwWiR7iUyihRMBUGYtTNLLqk5SlTamkTMHUX1ZV8ciWz935VtQiBd1UDNO0uQ/wdcoP/KVfRrXefuEp+eBAt9ztmz1s4vxvukKe2r2tkVkNBMjVS8ZRQcHntVM18Eh5qK2awHVzA2jxAM0DnNb9kTXrEbrpx15xYk+7EYf6TXhuTyUkrxsZlVw2EFDrSZvdsICyG7JQn2cj3ul2UCnagUJnMebb+7G+XtXK26cGjRrPPTZGLmXOJF4fJd8zxaHGLWOI9YKhwxnowf/mlIhn/+9serKuA/MaG+696VMfOyx77IHJ3ubol770JQXv00KTwwey1OTAvh9CQ/ShJ55QHOIDZ8MNkW0fX/DYF66N9N5Hz7fST3X9jeU+fKUsjH5S1n961IJfvFNDqhKPEeU8yqm9v9DlRE/zfK1LepzjqvEPyiSHVGdEFfsIkJHXXPjaVRMotVO66suDs0LA+IUwlFoJ45ROhkgkV5vnaXzV73fh2e8vA7OdI+YQZj10AsetCrqPGHDLkhiahwxem7Hs25++51M/lA3R4IjBEN7+5Y+TAn7j+7bODFzwYQzs8587dggoKzNWumvMtaf+e25p6OAj/lDgU1UNgvaJ02cOOvDTZpaH2zRRQxViEI1EYWIurQs6l+g6yTSC64okEmBE9ElJGVNB8g38pWUBfOP+41qlNzZVRdlmHcx5hynsh/Gd19x49TD7XIGoZUZJQT1Z9HUUj1DRLwqptwQVV/f9ymVu+M+msus7VK8lVPM3d4W3sOT1Q/h88h9lqamBLmQ7KQFMtQlGInJP7QOnDyp3Ptww/vy3y6S93xoeja3a2VysvT7OC4wDsnI2+35UXuLNOwlf3zgKF2kFL5604OFtp+Afc+B/PdOATy6ZwE9OuXAhHO8I4SG1/3/vySP/K+Cv1/diLNBHXJbHHKeKFirFqNT8VSS/6wf9C2SYGi6AwSAeKC4pfGz9rLveCSti2O+mUtNgi7T1Mj+OeFlw4EMe2CvuJNzyLYEAycEuMyeFTMKx71/9w33CVkoOPiUaLdo9srfzkr0CBbLUW688gweum4RK0TuaR2USr4AIFeWK6734+tNzcainIO4iWD967bVyGddfdY5UKzOO9xTC4B5BaKiczm/QicpcStARBeGAu6Dw21dfu2mP1WmJTMEVPmMbje26xCfmPsjwoYOaHOJ/aGa3UFMDcTg6ajKHJPPBY4fqO851fzwai90jSWoleyFCMBjwhdXjuG3hIGS7D99vK8PCyqVoOXsYn1k+AYW0lB+/2Igjo3aotigebAhB9Zjx8oAZ1187jmsoAJ49XIYnz1rRE+Y04Tse8BUm97WYzcbXl1y56MdzZi8eU0UlonpiEe/SopimNP1/88cTcgxbdu4UFgSKDGYCVzH4jXa1wPD7F19YGJj0XBUIK9fNKb6w6l8/3QM5ZMZrbWuwb2oBpawj2DDrLK4sbCXHYsHJw+X4nwft+Mp9x3BDvoLwaB7GCoByBLVKQ1enkwnI3uCFaMv+1oo/9Lnc767atP6kIKkk6NsiBntEsnk80kMPPZSs6v3Jhj8LqGxIuoWhoSHRZKoTPJT1i1TKE4KyQXGK4nrzjxdQaaPpJ203N86RXq8MBQocS0uHKxbMO155yKvgAFU884dnY86y895lpZNeg4n3hb2G/ojJ0C9SPbs/UtJyEg+dEmKyFIpKlGyKMTfVSwfdIenRLVukRAD6k4KZHP5soOoH7dMY11zDY88oP+WA4GQv41kDYojnhTzZwofZl5L8Mh+zC5wYi1KLNvKSgVKtRO9yA82T6KzwYYHpHrJkhUzqoOx2ay1fbmlpkRsbG+UtW7Z8KNH8/Q4fCaj6IflHvggEzuPx8INuN1cTCPDRaCFvsRi5k8PDKMqPab0TeYNBGaZpCY2OUEg9TUyjYKJUHSjzqJsefFBpoRRa63j7F/xX1T7qgWUW2sgse7uq8mwaX9a+wf+RG8RMw/8Ddeme4LnO5BsAAAAASUVORK5CYII="
                            />
                          </div>
                          <Typography variant="subtitle1">Gorilla Gang</Typography>
                        </Stack>
                      </CrustOptionBox>
                      <CrustOptionBox sx={{ width: 167, height: 167 }}>
                        <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                          <Typography variant="subtitle1">See all your colletion</Typography>
                        </Box>
                      </CrustOptionBox>
                    </Stack>
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
