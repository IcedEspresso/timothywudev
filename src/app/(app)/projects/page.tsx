'use client'
import {
  Anchor,
  Box,
  Code,
  Container,
  Divider,
  Flex,
  Group,
  Stack,
  Title,
  Text,
  Image,
  NativeSelect,
  Modal,
  Loader,
} from '@mantine/core'

import { HiArrowLongLeft } from 'react-icons/hi2'
import { IoExpandSharp } from 'react-icons/io5'
import globalClass from '../Global.module.css'
import classes from './Projects.module.css'
import { useEffect, useState } from 'react'
import { Project, Media } from '@/payload-types'
import { Carousel } from '@mantine/carousel'
import NextImage from 'next/image'
import Link from 'next/link'
import { useDisclosure } from '@mantine/hooks'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'

export default function Page() {
  const [projects, setProjects] = useState([])
  const [sort, setSort] = useState('Newest First')

  /* Carousel Modal */
  const [opened, { open, close }] = useDisclosure(false)
  const [carousel, setCarousel] = useState(1)

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch(`/api/projects`)
      const data = await response.json()

      // Default Sort: Newest First
      const sortedData = data.docs.sort((a: Project, b: Project) => {
        const timestampA = new Date(a.date).getTime()
        const timestampB = new Date(b.date).getTime()

        if (sort === 'Newest First') {
          return timestampB - timestampA
        } else {
          return timestampA - timestampB
        }
      })

      console.log(data.docs)
      setProjects(sortedData)
    }
    fetchProjects()
  }, [sort])

  useEffect(() => {
    const sortedData = [...projects].sort((a: Project, b: Project) => {
      const timestampA = new Date(a.date).getTime()
      const timestampB = new Date(b.date).getTime()

      /*
       ** 1: Newest First
       ** 2: Oldest First
       */
      if (sort === 'Newest First') {
        return timestampB - timestampA
      } else {
        return timestampA - timestampB
      }
    })

    // Protect from UseEffect loop due to projects being set
    if (JSON.stringify(sortedData) !== JSON.stringify(projects)) {
      console.log('Sorted! ' + sortedData)
      setProjects(sortedData)
    }
  }, [sort, projects])

  /*
   ** id is the id of the project
   */
  const handleCarousel = (id: number) => {
    setCarousel(id)
    open()
    console.log(projects[carousel - 1])
  }

  return (
    <>
      <Flex direction={'column'} className={classes.header}>
        <Container w={'100%'} pt={'5rem'} pb={'1rem'}>
          <Title order={2}>All Projects</Title>
          <Anchor component={Link} href="/" className={classes.back}>
            <HiArrowLongLeft /> Back
          </Anchor>
        </Container>
      </Flex>

      <Box>
        <Container pb={'5rem'}>
          <Divider className={classes.divider} />

          {projects && projects.length >= 1 ? (
            <>
              <Group mt={'3rem'} pb={'md'} justify="flex-end" align="center">
                <Group>
                  <Title order={5} mr={'xs'}>
                    Sort:
                  </Title>
                  <NativeSelect
                    value={sort}
                    onChange={(event) => setSort(event.currentTarget.value)}
                    data={['Newest First', 'Oldest First']}
                  />
                </Group>
              </Group>

              {/* Project Map */}
              {projects.map((project: Project) => {
                return (
                  <Box key={project.id} mb={'4rem'}>
                    <Flex
                      wrap="nowrap"
                      columnGap={'lg'}
                      align="normal"
                      mb={'md'}
                      className={classes.showcaseProject}
                    >
                      {/* Project Image */}
                      <Box flex={3}>
                        <Box
                          pos={'relative'}
                          className={classes.projectImageWrapper}
                          onClick={() => handleCarousel(project.id)}
                        >
                          <Image
                            component={NextImage}
                            src={(project.image?.[0] as Media).url}
                            alt={`${project.title}`}
                            width={'600'}
                            height={'300'}
                            style={{
                              width: '100%',
                              height: 'auto',
                              objectFit: 'cover',
                              border: '1px solid #e9e9e9',
                            }}
                          />
                          <IoExpandSharp className={classes.expandImage} />
                        </Box>
                      </Box>
                      {/* Project Details */}
                      <Box flex={7}>
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
                            <Title order={4} lh={1.1} className={classes.projectDate}>
                              {new Date(project.date).getFullYear()}
                            </Title>
                          </Stack>
                        </Group>

                        <Divider mt="xs" mb="lg" />

                        {project.description && (
                          <Box mb="md">
                            <RichText
                              data={
                                project.description as SerializedEditorState<SerializedLexicalNode>
                              }
                            />
                          </Box>
                        )}

                        {/* Project Tags */}
                        <Group gap={'xs'}>
                          {project.tags?.map((tag: string) => (
                            <Code className={classes.projectTag} key={tag}>
                              {tag}
                            </Code>
                          ))}
                        </Group>
                      </Box>
                    </Flex>
                  </Box>
                )
              })}

              {/* Expand Image (Gallery) */}
              <Modal
                opened={opened}
                onClose={close}
                title="Gallery"
                centered
                size={'var(--container-size-lg)'}
                classNames={{
                  content: classes.modalContent,
                }}
              >
                <Carousel
                  classNames={{
                    root: classes.carouselRoot,
                    control: classes.carouselControl,
                    controls: classes.carouselControls,
                    viewport: classes.carouselViewport,
                    indicator: classes.carouselIndicator,
                    slide: classes.carouselSlide,
                  }}
                  slideGap="0"
                  controlSize={30}
                  loop
                  withControls={true}
                  withIndicators={true}
                >
                  {(
                    (projects.find((p: Project) => p.id === carousel) as Project | undefined)
                      ?.image as Media[]
                  ).map((img: Media) => (
                    <Carousel.Slide key={img.id}>
                      <Image
                        component={NextImage}
                        fill={true}
                        pos={'relative'}
                        src={img.url}
                        alt={img.alt}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                      />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              </Modal>
            </>
          ) : (
            /* Loading projects... */
            <Flex justify={'center'} mt={'6rem'} mih={'60vh'}>
              <Loader size={30} type="bars" />
            </Flex>
          )}
        </Container>
      </Box>
    </>
  )
}
