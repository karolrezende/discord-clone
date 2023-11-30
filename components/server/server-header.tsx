"use client";

import { ServeWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ChevronDown,
  LogOutIcon,
  PlusCircle,
  Settings,
  TrashIcon,
  UserPlus,
  Users,
} from "lucide-react";

import capitalizeFirstLetter from "@/utils/use-capitalize";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServeWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {capitalizeFirstLetter(server.name)}
          <ChevronDown className="h-5 v-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem
            onClick={()=> onOpen('invite', {server})}
            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
          >
            Convidar pessoas
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <>
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
              Config. do servidor
              <Settings className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
              Gerenciar membros
              <Users className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          </>
        )}
        {isModerator && (
          <>
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
              Criar canal
              <PlusCircle className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {isAdmin && (
          <>
            <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
              Apagar servidor
              <TrashIcon className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          </>
        )}
        {!isAdmin && (
          <>
            <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
              Sair do servidor
              <LogOutIcon className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
