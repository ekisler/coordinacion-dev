import React from 'react';
import { Box, Image, useColorModeValue } from '@chakra-ui/react';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';

const SelectLogo = () => {
  const colorMode = useColorModeValue('light', 'dark');
  const selectLogo = () => {
    return colorMode === 'dark' ? image4 : image5;
  };
  const selectedLogo = selectLogo();

  return (
    <Box>
      <Image
        src={selectedLogo}
        alt="Logo"
        width={240}
        height={240}
        maxWidth="100%"
        margin="0 auto"
        mb={12}
        mt={12}
        objectFit="contain"
      />
    </Box>
  );
};

export default SelectLogo;
