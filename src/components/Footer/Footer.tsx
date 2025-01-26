'use client'

import PrimaryForm from '@components/ContactForm/PrimaryForm'
import { Anchor, Box, Title, Text, Container, Flex } from '@mantine/core'
import classes from './Footer.module.css'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

export default function Footer() {
  return (
    <Box className={classes.footerSection} id="contact">
      <Container>
        <Flex direction={{ base: 'column', sm: 'row' }} columnGap={'xl'} rowGap={'xl'}>
          <Flex
            flex={6}
            align={{ base: 'center', sm: 'flex-start' }}
            direction={'column'}
            ta={{ base: 'center', sm: 'left' }}
          >
            <Title order={2} mb={'sm'}>
              Contact Me
            </Title>
            <Text mb={'lg'} maw={'400px'}>
              Got a project or need something done? Drop me a message and I&apos;ll respond as soon
              as possible!
            </Text>
            <Text maw={'350px'} mb={'lg'}>
              If you prefer you may find message me or find my email on the following services:
            </Text>
            <Anchor
              href="https://www.linkedin.com/in/timothywudev/"
              target="_blank"
              className={classes.iconLink}
              mb={{ base: '.9rem', sm: '0' }}
            >
              <FaLinkedin />
              in/timothywudev
            </Anchor>
            <Anchor
              href="https://github.com/timothywudev"
              target="_blank"
              className={classes.iconLink}
            >
              <FaGithub />
              timothywudev
            </Anchor>
          </Flex>

          <Box flex={6}>
            <PrimaryForm />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
