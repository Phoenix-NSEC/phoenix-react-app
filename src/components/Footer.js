import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children } ) => {
  return (
    <Text fontWeight={'500'} fontSize={'16px'} mb={2} bold>
      {children}
    </Text>
  );
};

export default function LargeWithNewsletter() {
  return (
    <Box
      bg='#004a99'
      color='white'>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={15}>
          <Stack spacing={'6'}>
            <Box>
              <Heading fontSize='34px'>PHOENIX</Heading>
            </Box>
            <Text fontSize={'13px'} textAlign='left'>
              Phoenix has always strived for overall development of an individual, from technical to
              communication skills of a person by conducting domain-specific forums to interpersonal
              development by working in a team and taking leadership roles. Inculcating competitive spirit
              among college students by organizing events and tech Fests for them to display their skills,
              we do it all.
            </Text>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader fontSize='14px'>USEFUL LINKS</ListHeader>
              <Link fontSize='14px' href={'/home'}>Home</Link>
              <Link fontSize='14px' href={'/clubs'}>Clubs</Link>
              <Link fontSize='14px' href={'/events'}>Events</Link>
              <Link fontSize='14px' href={'/gallary'}>Image Gallery</Link>
              <Link fontSize='14px' href={'/blogs'}>Blogs</Link>
              <Link fontSize='14px' href={'/webteam'}>Web team</Link>
              <Link fontSize='14px' href={'/contact'}>Contact Us</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader fontSize='14px'>CONTACT US</ListHeader>
              <Text fontSize={'13px'} textAlign='left'>
                Netaji Subhash Engineering College, Garia, Panchpota, Kolkata, West Bengal, 700152
              </Text>
              <Text fontSize={'13px'} textAlign='left'>
                Email: <Link color='teal.500' href="mailto:info@phoenixnsec.in">info@phoenixnsec.in</Link>
              </Text> 
              <Stack direction={'row'} spacing={6}>
                <SocialButton label={'Telegram'} href={'https://t.me/phoenix_nsec2020'}>
                  <FaTelegram />
                </SocialButton>
                <SocialButton label={'Facebook'} href={'https://www.facebook.com/nsec.phoenix/'}>
                  <FaFacebook />
                </SocialButton>
                <SocialButton label={'Instagram'} href={'https://www.instagram.com/phoenix_nsec/'}>
                  <FaInstagram />
                </SocialButton>
                <SocialButton label={'YouTube'} href={'https://www.youtube.com/channel/UCBy1iIhw34E7YlHQ8tc4rDA'}>
                  <FaYoutube />
                </SocialButton>
              </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader as='h4' fontSize='14px'>FEEDBACK</ListHeader>
              <Text fontSize={'13px'} textAlign='left'>
                We would love to have feedbacks from anyone who want to suggest any improvements in our work.
              </Text>
            <Stack direction={'row'}>
              <Input
                placeholder={'your feedback..'}
                bg='white'
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                bg={useColorModeValue('green.400', 'green.800')}
                color={useColorModeValue('white', 'gray.800')}
                _hover={{
                  bg: 'green.600',
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box py={4} bgColor='#00428a'>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <Text>Phoenix Logo bosbe ekhane</Text>
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © Copyright Phoenix 2021-22. All Rights Reserved
        </Text>
      </Box>
    </Box>
  );
}