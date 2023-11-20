"use client";

import { ChevronsLeftRight } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserItem() {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center w-full p-3 text-sm hover:bg-primary/5">
          <div className="flex items-center gap-x-2 max-2-[150px]">
            <Avatar className="w-5 h-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="font-medium text-start line-clamp-1">
              {user?.fullName}&apos;s Jotion
            </span>
          </div>
          <ChevronsLeftRight className="w-4 h-4 ml-2 text-muted-foreground rotate-90" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="grid space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="p-1 bg-secondary rounded-md">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <p className="space-y-1 text-sm line-clamp-1">
              {user?.fullName}&apos;s Jotion
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full text-muted-foreground cursor-pointer">
          <SignOutButton>
            <span className="w-full">Log out</span>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}