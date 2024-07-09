"use client"

import React from 'react'
import Desktopnav from './nav/DesktopNav'
import Mobilenav from './nav/MobileNav'

type Props = React.PropsWithChildren<{}>

const SidebarWrapper = ({ children }: Props) => {
  return (
    <div className="h-screen w-full p-4 flex gap-4">
      <Mobilenav/>
      <Desktopnav />
      <main className="h-full lg:h-full w-full flex gap-4">
        {children}
      </main>
    </div>
  )
}

export default SidebarWrapper
