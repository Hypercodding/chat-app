import { useMutation } from 'convex/react';
import React, { useState } from 'react'

type Props = {}

const useMutaionState = (mutationToRun: any) => {
    const [pending, setPending] = useState(false);

    const mutateFn = useMutation(mutationToRun)

    const mutate = (payload: any)=> {
        setPending(true)

        return mutateFn(payload).then((res)=>{
            return res
        }).catch((error)=>{
            throw error
        }).finally(()=>setPending(false));
    }
  return {mutate, pending}
}

export default useMutaionState