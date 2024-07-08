import Image from 'next/image';
import React from 'react';
import styles from './LoadingLogo.module.css';

type Props = {
    size?: number;
}

export default function LoadingLogo({ size = 100 }: Props) {
  return (
    <div className={styles.loaderContainer}>
      <Image 
        src="/logo.svg"
        alt="logo"
        width={size}
        height={size}
        className='animate-pulse duration-800'
      />
    </div>
  )
}
