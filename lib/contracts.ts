
import { Address } from 'viem';

// Your addresses
export const BEANS_ADDRESS = '0x9D1FeFc037123154A8f4f51CB9fFBad18b67FeF6' as Address;
export const JOURNAL_ADDRESS = '0xA55e672549a59BAD61B06C8291f3E857513FA793' as Address;

// Minimal ABIs
export const erc20Abi = [
  { "type": "function", "name": "balanceOf", "stateMutability": "view", "inputs":[{"name":"owner","type":"address"}], "outputs":[{"name":"","type":"uint256"}] }
] as const;

export const erc721Abi = [
  { "type": "function", "name": "balanceOf", "stateMutability": "view", "inputs":[{"name":"owner","type":"address"}], "outputs":[{"name":"","type":"uint256"}] }
] as const;
