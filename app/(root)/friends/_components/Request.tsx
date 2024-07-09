import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import useMutaionState from '@/hooks/useMutaionState';
import { ConvexError } from 'convex/values';
import { Check, CheckCheck, User, X } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

type Props = {
    id: Id<"requests">;
    imageUrl: string;
    username: string;
    email: string;

}

function Request({id, imageUrl, username, email}: Props) {

    const {mutate: denyRequest, pending: denyPending} = useMutaionState(api.request.deny)
    const {mutate: acceptRequest, pending: acceptPending} = useMutaionState(api.request.accept)
  return <Card className='w-full p-2 flex flex-row items-center justify-between gap-2'>
    <div className='flex items-center gap-4 truncate'>
        <Avatar>
            <AvatarImage src={imageUrl} />
                <AvatarFallback>
                    <User/>
                    
                </AvatarFallback>
        </Avatar>
        <div className="flec flex-col truncate">
            <h6>{username}</h6>
            <p className="text-xs text-muted-foreground truncate">
                {email}
            </p>
        </div>
        {/* <p>{username}</p> */}
    </div>
    <div className="flex items-center gap-2">
        <Button size="icon" disabled={acceptPending} onClick={()=>{acceptRequest({id}).then(()=>{
            toast.success("Request Accepted")
        }).catch((error)=>{
            toast.error(error instanceof ConvexError ? error.data : "Unexpected Error")
        });
        }}><Check/></Button>
        <Button size="icon" disabled={denyPending} variant="destructive" onClick={()=>{denyRequest({id}).then(()=>{
            toast.success("Request Denied")
        }).catch((error)=>{
            toast.error(error instanceof ConvexError ? error.data : "Unexpected Error")
        });
        }}><X /></Button>
    </div>
  </Card>
}

export default Request