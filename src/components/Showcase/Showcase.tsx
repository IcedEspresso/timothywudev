import { Project, Media } from '@/payload-types'
import { Carousel } from '@mantine/carousel'
import {
  Box,
  Container,
  Stack,
  Title,
  Button,
  Group,
  Anchor,
  Divider,
  Code,
  Text,
  Image,
  Flex,
  Loader,
  rem,
} from '@mantine/core'
import NextImage from 'next/image'
import Link from 'next/link'
import { stringify } from 'qs-esm'
import { useEffect, useState } from 'react'
import globalClass from '@app/(app)/Global.module.css'
import classes from './Showcase.module.css'
import { Where } from 'payload'

export default function Showcase() {
  const [projects, setProjects] = useState([])

  const query: Where = {
    isFeatured: {
      equals: true,
    },
  }

  useEffect(() => {
    async function fetchProjects() {
      const stringifiedQuery = stringify({ where: query }, { addQueryPrefix: true })
      const response = await fetch(`/api/projects${stringifiedQuery}`)
      const data = await response.json()
      console.log(data)
      setProjects(data.docs)
    }
    fetchProjects()
  }, [])

  return (
    <Box id="showcase" className={classes.showcaseSection}>
      <Container>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          columnGap={'xl'}
          className={classes.showcaseGrid}
        >
          <Box flex={4}>
            <Stack
              mb={rem('50px')}
              gap={0}
              pos={'sticky'}
              top={'20px'}
              ta={{ base: 'center', sm: 'left' }}
              className={classes.showcaseIntro}
            >
              <Title order={2} mb={'md'} lh={1}>
                Showcase
              </Title>

              <Text size="md" maw={'16.5rem'} mb={'md'}>
                To explore all my work, click the button below to visit the dedicated projects page.
              </Text>
              <Button component={Link} href="/projects" w={'min-content'}>
                See More
              </Button>
            </Stack>
          </Box>
          <Box flex={8}>
            <Box>
              {projects && projects.length >= 1 ? (
                <>
                  {projects.map((project: Project) => {
                    return (
                      <Box key={project.id} mb={'xl'}>
                        {/* Project Header */}
                        <Group
                          justify="space-between"
                          align="flex-end"
                          className={classes.showcaseDetails}
                        >
                          <Stack gap={0}>
                            <Title order={3} className={classes.projectTitle}>
                              {project.title}
                            </Title>

                            {project.url && (
                              <Anchor href={project.url} target="_blank">
                                {project.url}
                              </Anchor>
                            )}
                          </Stack>
                          <Stack ta={'right'} gap={0}>
                            <Text className={globalClass.textUppercase} lh={1}>
                              Year
                            </Text>
                            <Title className={classes.projectDate} order={4} lh={1.1}>
                              {new Date(project.date).getFullYear()}
                            </Title>
                          </Stack>
                        </Group>

                        <Divider mt="xs" mb="lg" />

                        {/* Project Images */}
                        <Carousel
                          classNames={{
                            root: classes.carouselRoot,
                            control: classes.carouselControl,
                            controls: classes.carouselControls,
                            viewport: classes.carouselViewport,
                          }}
                          mb={20}
                          slideGap="0"
                          controlSize={30}
                          loop
                          withControls={true}
                        >
                          {(project.image as Media[])?.map((image: Media, index: number) => (
                            <Carousel.Slide key={image.id}>
                              <Image
                                component={NextImage}
                                src={image.url}
                                alt={`${project.title} image ${index + 1}`}
                                width={'600'}
                                height={'300'}
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                              />
                            </Carousel.Slide>
                          ))}
                        </Carousel>
                        {/* Project Tags */}
                        <Group gap={'xs'}>
                          {project.tags?.map((tag: string) => (
                            <Code className={classes.projectTag} key={tag}>
                              {tag}
                            </Code>
                          ))}
                        </Group>
                      </Box>
                    )
                  })}
                </>
              ) : (
                /* Loading projects... */
                <Flex justify={'center'} mt={'6rem'} mih={'60vh'}>
                  <Loader size={30} type="bars" />
                </Flex>
              )}
            </Box>
            <Box w={'min-content'} mx={'auto'} mt={rem('70px')}>
              <Button
                mx={'auto'}
                component={Link}
                href="/projects"
                w={'min-content'}
                display={{ base: 'block', sm: 'none' }}
              >
                See All Projects
              </Button>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
