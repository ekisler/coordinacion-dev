import { Image } from '@chakra-ui/react';
import playStoreBadge from '../assets/playStoreBadge.png';

const PlayStoreBadge = () => (
  
    <Image
      src={playStoreBadge}
      alt="Play Store"
      width={{ base: "140px", md: "130px" }}
      borderRadius={6}
      objectFit={'contain'}
    />
);

export default PlayStoreBadge;
