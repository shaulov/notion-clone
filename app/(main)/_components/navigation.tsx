"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"nav">>(null);
  const headerRef = useRef<ElementRef<"header">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    isMobile ? collapse() : resetWidth();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) collapse();
  }, [isMobile, pathname]);

  const handleMouseDown = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    evt.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (evt: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = evt.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && headerRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      headerRef.current.style.setProperty("left", `$${newWidth}px`);
      headerRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    } 
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  const resetWidth = () => {
    if (sidebarRef.current && headerRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      headerRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      headerRef.current.style.setProperty(
        "left",
        isMobile ? "100%" : "240px"
      );
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && headerRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      headerRef.current.style.setProperty("width", "100%");
      headerRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  }

  return (
    <>
      <nav 
        className={cn(
          "group/sidebar relative z-10 flex flex-col w-60 h-full overflow-y-auto bg-secondary",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
        ref={sidebarRef}
      >
        <button 
          className={cn(
            "absolute top-3 right-2 w-6 h-6 text-muted-foreground rounded-sm opacity-0 group-hover/sidebar:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600",
            isMobile && "opacity-100"
          )}
          onClick={collapse}
        >
          <ChevronsLeft className="w-6 h-6" />
        </button>
        <ul className="grid gap-y-4">
          <li>Action item</li>
          <li>Documents</li>
        </ul>
        <button 
          className="absolute top-0 right-0 w-1 h-full bg-primary/10 cursor-ew-resize transition opacity-0 group-hover/sidebar:opacity-100"
          onClick={resetWidth}
          onMouseDown={handleMouseDown}
        />
      </nav>
      <header
        className={cn(
          "absolute top-0 left-60 z-10 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
        ref={headerRef}
      >
        <div className="w-full px-3 py-2 bg-transparent">
        {isCollapsed && (
            <Button variant="ghost" onClick={resetWidth}>
              <MenuIcon className="w-6 h-6 text-muted-foreground" />
            </Button>
          )}
        </div>
      </header>
    </>
  );
}