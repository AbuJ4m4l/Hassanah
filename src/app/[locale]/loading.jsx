import { Box, SkeletonText } from "@chakra-ui/react";

const Loading = () => {
  return (
    <main>
      <Box padding='6' boxShadow='lg'>
        <SkeletonText startColor='#242424' endColor='#545454' mt='4' noOfLines={8} spacing='4' skeletonHeight='2' />
        <br />
        <br />
        <SkeletonText startColor='#242424' endColor='#545454' mt='4' noOfLines={8} spacing='4' skeletonHeight='2' />
        <br />
        <br />
        <SkeletonText startColor='#242424' endColor='#545454' mt='4' noOfLines={8} spacing='4' skeletonHeight='2' />
      </Box>
    </main>
  );
};

export default Loading;
