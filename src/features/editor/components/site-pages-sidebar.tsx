import { useState } from "react";

import { ActiveTool } from "@/features/editor/types";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface PageSiteSidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const PageSiteSidebar = ({
    activeTool,
    onChangeActiveTool
}: PageSiteSidebarProps) => {
    const [pages, setPages] = useState<string[]>(["Página Inicial"]);
    const [newPageName, setNewPageName] = useState("");
    const [activePage, setActivePage] = useState("Página Inicial");

    const addPage = () => {
        if (newPageName.trim() === "") return;
        setPages([...pages, newPageName]);
        setNewPageName("");
    };

    const selectPage = (page: string) => {
        setActivePage(page);
    };

    const onClose = () => {
        onChangeActiveTool("select");
    };

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "pageSite" ? "visible" : "hidden"
            )}
        >
            <ToolSidebarHeader
                title="Páginas"
                description="Gerencie as paginas do seu site"
            />

            <ScrollArea className="flex-1 p-4 space-y-2">
                {pages.map((page) => (
                    <Button
                        key={page}
                        variant={activePage === page ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => selectPage(page)}
                    >
                        {page}
                    </Button>
                ))}
            </ScrollArea>

            <div className="p-4 border-t flex gap-2">
                <Input
                    placeholder="Nova página"
                    value={newPageName}
                    onChange={(e) => setNewPageName(e.target.value)}
                />
                <Button onClick={addPage}>+</Button>
            </div>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}