'use client'

import { useState } from 'react'

import {
  Container,
  Grid,
  Title,
  Text,
  Stack,
  Group,
  Box,
  Divider,
  Flex,
  Anchor,
} from '@mantine/core'
import globalClass from './Global.module.css'
import classes from './Home.module.css'
import { FaLinkedin, FaSquareGithub } from 'react-icons/fa6'
import { TiDocumentText } from 'react-icons/ti'
import Showcase from '@components/Showcase/Showcase'
import { LINKS } from '@/public/links'

export default function Page() {
  const [activeColumn, setActiveColumn] = useState(0)

  const handleMouseEnterColumn = (columnId: number) => {
    setActiveColumn(columnId)
    console.log(columnId)
  }

  return (
    <>
      <Flex direction={'column'} h={{ base: '30vh', sm: '100vh' }} bg={'#efebe5'}>
        <Container w={'100%'} className={classes.header}>
          <Title fz={{ base: '3rem', xs: '4rem', sm: '7rem' }}>
            timothywu<span className={classes.domext}>.dev</span>
          </Title>
          <Group gap={'sm'}>
            <Title order={1} fz={{ base: '1.2rem', xs: '2.125rem' }}>
              Front-End Developer
            </Title>
            <Group gap={2} className={classes.socialIcons}>
              <Anchor href={LINKS.LINKEDIN} target="_blank" lh={0}>
                <FaLinkedin size={32} />
              </Anchor>
              <Anchor href={LINKS.GITHUB} target="_blank" lh={0}>
                <FaSquareGithub size={32} />
              </Anchor>
            </Group>
          </Group>
          <Title order={5}>
            View my{' '}
            <Anchor href="" fw={700} style={{ fontSize: 'revert' }}>
              resume <TiDocumentText />
            </Anchor>
          </Title>
        </Container>
        <Container fluid p={0} w={'100%'} flex={1} display={{ base: 'none', sm: 'block' }}>
          <Grid
            component={'nav'}
            classNames={{
              root: classes.navGrid,
              inner: classes.navGridInner,
              col: classes.navGridCol,
            }}
            overflow="hidden"
            style={{ '--column': activeColumn }}
            data-column={activeColumn}
          >
            <Grid.Col
              span={4}
              onMouseEnter={() => handleMouseEnterColumn(0)}
              renderRoot={(props) => (
                <a href="#about" {...props}>
                  About.
                </a>
              )}
            ></Grid.Col>
            <Grid.Col
              span={4}
              onMouseEnter={() => handleMouseEnterColumn(1)}
              renderRoot={(props) => (
                <a href="#showcase" {...props}>
                  Projects.
                </a>
              )}
            ></Grid.Col>
            <Grid.Col
              span={4}
              onMouseEnter={() => handleMouseEnterColumn(2)}
              renderRoot={(props) => (
                <a href="#contact" {...props}>
                  Contact.
                </a>
              )}
            ></Grid.Col>
          </Grid>
        </Container>
      </Flex>
      <Box id="about" className={`${globalClass.section} ${classes.aboutMe}`}>
        <Container>
          <Stack>
            <Title order={2} mb={'md'} ta={'center'}>
              About Me
            </Title>
          </Stack>
          <Group className={classes.aboutText} maw={800} mx={'auto'}>
            <Text>
              I&apos;m a developer who loves programming—the challenge, the puzzle, and especially
              the satisfaction of bringing all the pieces together into a result that everyone is
              happy with. As a Front-End Developer foremost, I have transformed various designs,
              ideas, and even raw concepts into functional and responsive user-friendly interfaces.
              On occasion, I will take on the Back-End role and responsibilities. I have experience
              and knowledge in setting up CRMs, working with APIs, setting up forms, site
              deployment, and site hosting. I may not know everything, but I will certainly figure
              it out!
            </Text>
            <Text>
              I&apos;m highly enthusiastic about technology and do my best to follow advancements.
              This drives me to continuously learn new computer-related skills, whether it&apos;s
              picking up another programming language or diving into yet another JavaScript
              framework or library.
            </Text>
            <Text>
              In my free time, I like to explore other avenues of creativity. Recently, my
              technological hobbies have included game development, CAD modeling, and 3D modeling.
              Eventually, I&apos;d like to improve my drawing abilities and, in tandem, enhance my
              design skills for the areas mentioned above.
            </Text>
          </Group>
        </Container>
      </Box>
      <Container>
        <Divider></Divider>
      </Container>

      <Showcase />
    </>
  )
}
