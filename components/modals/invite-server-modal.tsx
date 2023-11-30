"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";


import { Check, Copy, RefreshCw } from "lucide-react";

import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

export const InviteModal = () => {

  const { onOpen, isOpen, onClose, type, data } = useModal();
  const {server} = data

  const isModalOpen = isOpen && type === "invite";

  const router = useRouter()
  const origin = useOrigin()
  
  const [isCopy, setIsCopy] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setIsCopy(true)
    setTimeout(() => {
      setIsCopy(false)
    }, 1000);
  }

  const onGenerate = async() => {
    try {
      setIsLoading(true)
      const newUrl = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen('invite', {server: newUrl.data})
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }
  return (  
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Convide amigos!
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Link de convite
          </Label>
          <div className="flex items center mt-2 gap-x-2">
            <Input 
            disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
              value={inviteUrl}
              readOnly
            />
            <Button size="icon" onClick={onCopy} disabled={isLoading}>
              {
                isCopy ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4" />
              }
            </Button>
          </div>
          <Button variant={'link'} onClick={onGenerate} size={'sm'} className="text-xs text-zinc-500 mt-2 p-0" disabled={isLoading}>
            Gerar outro link
            <RefreshCw className="w-4 h-4 ml-2"/>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
