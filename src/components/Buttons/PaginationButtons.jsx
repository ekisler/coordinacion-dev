import React from 'react';
import { Button, HStack, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const PaginationButtons = ({
  currentPageIndex,
  handlePreviousPage,
  handleNextPage,
  totalPages,
}) => {
  return (
    <HStack spacing={4} justify="center" align="center">
      <Button
        onClick={handlePreviousPage}
        isDisabled={currentPageIndex === 0}
        colorScheme="gray.200"
        color={'gray.500'}
        variant="outline"
        size="md"
        _hover={{ bg: 'gray.300', color: 'white' }}
        _disabled={{ opacity: 0.4, cursor: 'not-allowed' }}
      >
        <ChevronLeftIcon />
        <ChevronLeftIcon />
      </Button>

      <Text fontSize="lg" color="gray.400">
        Página {currentPageIndex + 1} de {totalPages}
      </Text>

      <Button
        onClick={handleNextPage}
        isDisabled={currentPageIndex === totalPages - 1}
        colorScheme="gray.200"
        color={'gray.500'}
        variant="outline"
        size="md"
        _hover={{ bg: 'gray.300', color: 'white' }}
        _disabled={{ opacity: 0.4, cursor: 'not-allowed' }}
      >
        <ChevronRightIcon />
        <ChevronRightIcon />
      </Button>
    </HStack>
  );
};

export default PaginationButtons;
