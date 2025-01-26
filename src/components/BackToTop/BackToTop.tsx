'use client'

import { Affix, Transition, ActionIcon } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { FaArrowUp } from 'react-icons/fa6'

export default function BackToTop() {
  const [scroll, scrollTo] = useWindowScroll()

  return (
    <Affix position={{ bottom: 30, right: 30 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <ActionIcon style={transitionStyles} size={'md'} onClick={() => scrollTo({ y: 0 })}>
            <FaArrowUp style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  )
}
