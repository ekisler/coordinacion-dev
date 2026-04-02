import React from 'react';
import { Center } from '@chakra-ui/react';
import PaginationButtons from '../Buttons/PaginationButtons.jsx';

export const Pagination = ({
  currentPageIndex,
  handlePreviousPage,
  handleNextPage,
  totalPages,
}) => {
  return (
    <Center>
      <PaginationButtons
        currentPageIndex={currentPageIndex}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        totalPages={totalPages}
      />
    </Center>
  );
};
