let name = 'CrustNFT';
let symbol = 'CRT';
let authorInfo = '';
let contractName = 'EnumerableOwnable';

export const setName = (newName: string) => {
  newName && (name = newName);
};

export const setSymbol = (newSymbol: string) => {
  newSymbol && (symbol = newSymbol?.toUpperCase());
};

export const setAuthorInfo = (newAuthorInfo: string) => {
  authorInfo = newAuthorInfo
    ? `/// @author: ${newAuthorInfo}
  `
    : '';
};

export const setContractName = (newContractName: string) => {
  newContractName && (contractName = newContractName);
};

export const getContractName = () => contractName;

export const getContract = () => `
// SPDX-License-Identifier: MIT
/// @version: v0.0.1
/// @template: crustnft.io
${authorInfo}
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ${contractName} is
    ERC721URIStorage,
    ERC721Enumerable,
    Ownable
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;


    constructor() ERC721("${name}", "${symbol}") {
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        ERC721URIStorage._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function mint(string memory _tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }
}
`;
