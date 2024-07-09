"use client";
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import useMutaionState from '@/hooks/useMutaionState';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';


const AddFriendSchema = z.object({
  email: z.string().min(1, { message: "This field can't be empty" }).email("Please Enter the valid email"),
});

const AddFriendsDialog = () => {
    const {mutate: createrequest, pending} = useMutaionState(api.request.create)

  const form = useForm<z.infer<typeof AddFriendSchema>>({
    resolver: zodResolver(AddFriendSchema),
    defaultValues: { email: '' },
  });

  const handleSubmit = async (values: z.infer<typeof AddFriendSchema>) => {
    await createrequest({email: values.email}).then(()=>{
        form.reset();
        toast.success("friend request sent")
    }).catch((error)=>{
        toast.error(error instanceof ConvexError ? error.data : "Unexpected Error")
    })
    // Implement your form submission logic here
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <UserPlus />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Add Friend</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>Send a request to connect with friends!</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      placeholder='Email...'
                      {...field}
                      className="w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <DialogFooter>
            <Button disabled={pending} type="submit">
                Send Request
              </Button>
            </DialogFooter>
            
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendsDialog;
