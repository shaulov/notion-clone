"use client";

import { useSettings } from "@/hooks/use-settings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";

export function SettingsModal() {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="pb-3 border-b">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-1">
            <Label>Appearence</Label>
            <p className="text-[0.8rem] text-muted-foreground">Customize how Jotion looks on your device</p>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
}