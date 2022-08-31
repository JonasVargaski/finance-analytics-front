import React, { useRef, useLayoutEffect, useState } from 'react'

interface ICollapseProps {
  children: React.ReactNode
  instant?: boolean
  lazy?: boolean
  open: boolean
  onComplete?: (state: boolean) => void
  transitionDuration?: string
  transitionTimingFunction?: string
}

function Collapse({
  children,
  instant,
  lazy,
  open,
  onComplete,
  transitionDuration = '180ms',
  transitionTimingFunction = 'ease-out',
  ...props
}: ICollapseProps) {
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement)
  const firstRender = useRef(true)
  const [renderChildren, setRenderChildren] = useState(lazy ? open : true)
  const transition = `height ${transitionDuration} ${transitionTimingFunction}`

  function openCollapse() {
    const node = ref.current
    requestAnimationFrame(() => {
      node.style.height = `${node.scrollHeight}px`
    })
  }

  function closeCollapse() {
    const node = ref.current
    requestAnimationFrame(() => {
      node.style.height = `${node.offsetHeight}px`
      node.style.overflow = 'hidden'
      requestAnimationFrame(() => {
        node.style.height = '0px'
      })
    })
  }

  useLayoutEffect(() => {
    if (lazy) {
      if (open) {
        if (renderChildren) {
          openCollapse()
        } else {
          setRenderChildren(true)
        }
      } else {
        closeCollapse()
      }
    } else if (open) {
      openCollapse()
    } else {
      closeCollapse()
    }
  }, [open])

  useLayoutEffect(() => {
    const node = ref.current

    function handleComplete() {
      node.style.overflow = open ? 'initial' : 'hidden'
      if (!open && lazy) setRenderChildren(false)
      if (onComplete) onComplete(open)
      setTimeout(() => {
        if (open) node.style.height = 'auto'
      }, 10)
    }

    function handleTransitionEnd(e: TransitionEvent) {
      if (e.target === node && e.propertyName === 'height') handleComplete()
    }

    if (instant || firstRender.current) {
      handleComplete()
      firstRender.current = false
    }

    node.addEventListener('transitionend', handleTransitionEnd)
    return () => node.removeEventListener('transitionend', handleTransitionEnd)
  }, [open])

  useLayoutEffect(() => {
    if (open) openCollapse()
  }, [renderChildren])

  return (
    <div ref={ref} style={{ transition: instant || firstRender.current ? undefined : transition }} {...props}>
      {renderChildren ? children : null}
    </div>
  )
}

export default Collapse
