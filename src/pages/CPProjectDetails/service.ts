export async function encodeArguments(abi: any, constructorArguments: any[]) {
  const { Interface } = await import('@ethersproject/abi');
  const contractInterface = new Interface(abi);
  let deployArgumentsEncoded;
  try {
    deployArgumentsEncoded = contractInterface.encodeDeploy(constructorArguments).replace('0x', '');
  } catch (error) {
    console.log(error);
  }

  return deployArgumentsEncoded;
}
