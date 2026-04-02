// AppStoreBadge.jsx
import { Image } from '@chakra-ui/react';
import appStoreBadge from '../assets/appStoreBadge.png';

const AppStoreBadge = () => (
  <Image
    src={appStoreBadge}
    alt="App Store"
    width={{ base: "120px", md: "130px" }}
    borderRadius={6}
    objectFit={'contain'}
  />
);

export default AppStoreBadge;
