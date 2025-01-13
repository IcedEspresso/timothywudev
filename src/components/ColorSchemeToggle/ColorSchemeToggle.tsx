'use client'

import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSun, IconMoon } from '@tabler/icons-react'

export function ColorSchemeToggle() {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme()
  const light = colorScheme === 'light'
  const [state, { toggle }] = useDisclosure(light)
  // True is Sun, False is Moon

  return (
    <ActionIcon
      size="lg"
      onClick={() => {
        toggleColorScheme()
        toggle()
      }}
    >
      {/*Rewrite to contain both Icons, and implement switching by means of CSS*/}
      {state ? <IconMoon /> : <IconSun />}
    </ActionIcon>
  )
}
