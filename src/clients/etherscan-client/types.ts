export interface VerifyContractRequest {
  address: string;
  sourceCode: any;
  name: string;
  compilerversion: string;
  licenseType: string;
  constructorArguments?: string;
}

export interface EtherScanResponse {
  data: {
    message: string;
    result: string;
    status: string;
  };
}
