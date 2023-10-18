"use client"

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input' 
import { Button} from '@/components/ui/button' 
import FileUpload from '@/components/ui/file-upload'

import {useForm} from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  name: z.string().min(3, {message: "Digite o nome do servidor"}),
  imageUrl: z.string().min(1, {message: "Escolha uma imagem para o servidor"})
})

export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect (() => {
    setIsMounted(true)
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name:'',
      imageUrl:''
    }
  })

  const isLoading = form.formState.isSubmitting
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }
  if (!isMounted){
    return null
  }
  return (
    <Dialog open>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Crie um servidor
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Seu servidor é onde você e seus amigos se reúnem. Crie o seu e comece a interagir.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='space-y-8 px-6'>
              <div className='flex items-center justify-center text-center'>
                <FormField control={form.control} name="imageUrl" render={({field})=>(
                  <FormItem>
                    <FormControl>
                      <FileUpload endpoint="serverImage" value={field.value} onChange={field.onChange}/>
                    </FormControl>
                  </FormItem>
                  )}/>
              </div>
              <FormField control={form.control} name='name' render={({field})=> (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                    Nome do servidor
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} className='bg-zinc-300/50 border-0 focus-visible:ring-offset-0' placeholder='Digite o nome do servidor'/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            </div>
            <DialogFooter className='bg-gray-100 px-6 py-4'>
                <Button variant={'primary'}>
                  Criar
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}