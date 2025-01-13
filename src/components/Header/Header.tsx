'use client'

import { IconChevronDown } from '@tabler/icons-react'
import { Burger, Center, Container, Group, Menu, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './Header.module.css'
import { ColorSchemeToggle } from '@components/ColorSchemeToggle/ColorSchemeToggle'

const links = [
  { link: '#about', label: 'About' },
  {
    link: '/experience',
    label: 'Experience',
    links: [
      { link: '/professional', label: 'Professional' },
      { link: '/personal', label: 'Personal' },
    ],
  },
  { link: '/contact', label: 'Contact' },
]

export function Header() {
  const [opened, { toggle }] = useDisclosure(false)

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => <Menu.Item key={item.link}>{item.label}</Menu.Item>)

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      )
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    )
  })

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Title order={3}>timothywu.dev</Title>
          <Group gap={5} visibleFrom="sm">
            {items}
            <div className={classes.colorSchemeToggle}>
              <ColorSchemeToggle />
            </div>
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  )
}
