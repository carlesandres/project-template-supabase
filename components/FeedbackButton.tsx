'use client';

import React, { useState } from 'react';
// import React, { useCallback, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import FeedbackForm from './FeedbackForm';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { useUser } from '@supabase/auth-helpers-react';
import { X } from 'lucide-react';
import { z } from 'zod';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
// import { Database } from '@/types/supabase';
import { PopoverClose } from '@radix-ui/react-popover';

export const formSchema = z.object({
  feedback: z.string().min(10).max(500),
});

const FeedbackButton = () => {
  // const supabase = createClientComponentClient<Database>();
  // const user = useUser();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  //Replace with below function when supabase project is fully setup
  const onSubmit = () => {
    console.log('submit');
  };

  // const onSubmit = useCallback(
  //   async (values: z.infer<typeof formSchema>) => {
  //     setError(false);
  //     const { error } = await supabase
  //       .from('feedback')
  //       .insert({ feedback: values.feedback, user_id: user?.id });
  //
  //     if (error) {
  //       setError(true);
  //       return;
  //     }
  //
  //     setSuccess(true);
  //   },
  //   [supabase, user],
  // );

  const resetForm = () => {
    setOpen(false);

    // Reset the form when the close animation is done
    setTimeout(() => {
      setSuccess(false);
      setError(false);
    }, 500);
  };

  const successMsg = (
    <div className="relative">
      <Alert className="relative text-green-600">
        <AlertTitle>Thank you for your feedback!</AlertTitle>
        <AlertDescription>
          Your feedback will help us improve this site.
        </AlertDescription>
        <PopoverClose>
          <X
            onClick={resetForm}
            size={14}
            className="absolute top-2 right-2 cursor-pointer hover:text-gray-800"
          />
        </PopoverClose>
      </Alert>
    </div>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(!open)}>
          Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 sm:w-[600px]" >
        {success ? (
          successMsg
        ) : (
          <FeedbackForm onSubmit={onSubmit} error={error} />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default FeedbackButton;

