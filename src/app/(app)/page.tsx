'use client'

import { useState, useEffect } from 'react'
import NextImage from 'next/image'
import {
  Container,
  Grid,
  Title,
  Text,
  Button,
  Stack,
  Group,
  Box,
  Image,
  Anchor,
  Code,
  Divider,
  UnstyledButton,
} from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import globalClass from './Global.module.css'
import classes from './Home.module.css'

import { stringify } from 'qs-esm'
import type { Where } from 'payload'
import { IconBrandLinkedin } from '@tabler/icons-react'

const query: Where = {
  isFeatured: {
    equals: true,
  },
}

interface Project {
  date: string
  url: string
  title: string
  image: Image[]
  tags: string[]
  id: number
  name: string
}

interface Image {
  id: number
  url: unknown
}

export default function Page() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function fetchProjects() {
      const stringifiedQuery = stringify({ where: query }, { addQueryPrefix: true })
      const response = await fetch(`http://localhost:3000/api/projects${stringifiedQuery}`)
      const data = await response.json()

      console.log(data)
      setProjects(data.docs)
    }
    fetchProjects()
  }, [])

  return (
    <>
      <Container className={`${globalClass.belowHeader} ${globalClass.section}`}>
        <Grid>
          <Grid.Col span={6}>
            <Title order={1}>About Me</Title>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum natus atque, fugit
              tenetur obcaecati maxime voluptatibus earum laborum rem nulla. Praesentium ipsam aut
              at incidunt consequatur quos officiis tempore harum!
            </Text>
            <Group mt="2rem" align="center">
              <Button>Download My Resume</Button>{' '}
              <UnstyledButton
                component="a"
                href="https://www.linkedin.com/in/timothywuiced/"
                target="_blank"
                className={classes.unstyledButtonIcon}
              >
                <IconBrandLinkedin size={28} />
              </UnstyledButton>
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
      <Container className={globalClass.section}>
        <Stack mb={'50'}>
          <Title order={1}>Showcase</Title>
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Text size="md" maw={'700px'}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum natus atque, fugit
              tenetur obcaecati maxime voluptatibus earum laborum rem nulla.
            </Text>
            <Button>More Here</Button>
          </Group>
        </Stack>
        <Box>
          {projects.map((project: Project) => {
            return (
              <Box key={project.id} mb={'xl'}>
                {/* Project Header */}
                <Group justify="space-between" align="flex-end">
                  <Stack gap={'0'}>
                    <Title order={3}>{project.title}</Title>
                    <Anchor href={project.url} target="_blank">
                      {project.url}
                    </Anchor>
                  </Stack>
                  <Stack ta={'right'} gap={0}>
                    <Text className={globalClass.textUppercase} lh={1}>
                      Start Date
                    </Text>
                    <Title order={1} lh={1}>
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
                  }}
                  mb={20}
                  slideGap="md"
                  controlSize={30}
                  loop
                  withControls={true}
                >
                  {project.image.map((image, index) => (
                    <Carousel.Slide key={image.id}>
                      <Image
                        component={NextImage}
                        src={image.url}
                        alt={`${project.title} image ${index + 1}`}
                        width={'0'}
                        height={'0'}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                      />
                    </Carousel.Slide>
                  ))}
                </Carousel>
                {/* Project Tags */}
                <Group>
                  {project.tags.map((tag: string) => (
                    <Code className={classes.projectTag} key={tag}>
                      {tag}
                    </Code>
                  ))}
                </Group>
              </Box>
            )
          })}
        </Box>
      </Container>
    </>
  )
}
