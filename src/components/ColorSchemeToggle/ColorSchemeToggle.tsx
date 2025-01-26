'use client'

import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconMoon } from '@tabler/icons-react'

export function ColorSchemeToggle() {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme()
  const light = colorScheme === 'light'
  const [state, { toggle }] = useDisclosure(light)

  return (
    <ActionIcon
      size="lg"
      onClick={() => {
        toggleColorScheme()
        toggle()
      }}
    >
      {/*Rewrite to contain both Icons, and implement switching by means of CSS*/}
      <IconMoon />
    </ActionIcon>
  )
}
