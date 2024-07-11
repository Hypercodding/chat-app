import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import useMutaionState from '@/hooks/useMutaionState';
import { AlertDialogAction, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { ConvexError } from 'convex/values';
import React, { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner';

type Props = {
    conversationId: Id<"conversations">;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

const RemoveFriendDialog = ({conversationId, open,setOpen}: Props) => {
    const {mutate: removeFriend, pending} = useMutaionState(api.friend.remove)
    const handleRemoveFriend = async()=>{
        removeFriend({conversationId})
    .then(()=>{
        toast.success("Removed Friend")
    }).catch(error=>{
        error instanceof ConvexError? error.data : "Unexpected Error"
    })
    }
  return <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are You Sure?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={pending} onClick={handleRemoveFriend}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
  </AlertDialog>
}

export default RemoveFriendDialog