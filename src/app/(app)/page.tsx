'use client'

import { Container, Grid, Title, Text, Button } from '@mantine/core'
import classes from './Global.module.css'

export default function Page() {
  return (
    <>
      <Container className={`${classes.belowHeader} ${classes.section}`}>
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
            <Button mt="2rem">Resume</Button>
          </Grid.Col>
        </Grid>
      </Container>
      <Container>
        <Title order={1} ta={'center'}>
          Showcase
        </Title>
      </Container>
    </>
  )
}
