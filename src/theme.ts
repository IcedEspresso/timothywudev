'use client'

import { createTheme, Group, MantineColorsTuple, Stack } from '@mantine/core'

const coffee: MantineColorsTuple = [
  '#f8f4f1',
  '#ebe7e4',
  '#d8ccc4',
  '#c5afa0',
  '#b59681',
  '#ac876d',
  '#a87f62',
  '#936c52',
  '#846047',
  '#745139',
]

export const theme = createTheme({
  primaryColor: 'teal',
  colors: {
    coffee,
  },

  headings: {
    sizes: {
      h1: {
        fontSize: 'calc(2.125rem * var(--mantine-scale))',
      },
      h2: {
        fontSize: 'calc(2rem * var(--mantine-scale))',
      },
      h3: {
        fontSize: 'calc(1.875rem * var(--mantine-scale))',
      },
      h4: {
        fontSize: 'calc(1.85rem * var(--mantine-scale))',
      },
      h5: {
        fontSize: 'calc(1.1rem * var(--mantine-scale))',
      },
      h6: {
        fontSize: 'calc(1rem * var(--mantine-scale))',
      },
    },
  },

  components: {
    Stack: Stack.extend({
      defaultProps: {
        gap: '0',
      },
    }),
    Group: Group.extend({
      defaultProps: {
        gap: '0',
      },
    }),
  },
})
