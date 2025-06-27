import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  //I want this box to increase size when adding newlines but not be resizable via drag.
  //To do that, we have to

  // 1. Disable the default resizable property of the HTML textarea
  // 2. 

  //Because this is React, we can't just use something like 
  //const textarea = document.querySelector('textarea'); 
  // or getElementById, etc.because of react rerendering.
  //Instead, we have to use useRef when trying to identify something further down in the DOM.
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  
  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    // the element the handler is attached to (textarea)
    const target = event.currentTarget;
    
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${target.scrollHeight}px`; // Set to scroll height
    }
  };
    
  return (
    // HTML text areas are default resizable for some reason so I include resize-none
    <textarea
      data-slot="textarea"
      onInput={handleInput}
      className={cn(
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
