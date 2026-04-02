import React from 'react';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <InputGroup w={{ base: "150px", md: "220px", lg: "200px" }}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.500" />
      </InputLeftElement>
      <Input
        name="searchTerm"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        size={{ base: "sm", md: "md" }}
        variant="filled"
        focusBorderColor="blue.500"
      />
    </InputGroup>
  );
};

export default SearchInput;
