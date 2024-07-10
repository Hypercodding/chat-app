import { AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { CircleArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type Props = {
    imageUrl?: string;
    name?: string;
}

const Header = ({imageUrl, name}: Props) => {
  return (
    <Card className='flex w-full rounded-lg items-center justify-between p-2'>
        <div className='flex items-center gap-2'>
            <Link href="/conversations" className='block lg:hidden'>
                <CircleArrowLeft/>
            </Link>
            <Avatar className='h-8 w-8 rounded'>
                <AvatarImage 
                src={imageUrl} className="rounded-full h-8" />
                <AvatarFallback>
                    {name?.substring(0,1)}
                </AvatarFallback>

            </Avatar>
            <h2 className='font-semibold'>{name}</h2>
        </div>

    </Card>
  )
}

export default Header