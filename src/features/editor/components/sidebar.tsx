"use client";

import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from "lucide-react";

import { ActiveTool } from "@/features/editor/types";
import { SidebarItem } from "@/features/editor/components/sidebar-item";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const Sidebar = ({
  activeTool,
  onChangeActiveTool,
}: SidebarProps) => {
  const router = useRouter();

  const duplicateMutation = useDuplicateProject();

  const onCopy = (id: string) => {
    duplicateMutation.mutate({ id });
  };

  return (
    <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
      <ul className="flex flex-col">
        <SidebarItem
          icon={LayoutTemplate}
          label="Modelos"
          isActive={activeTool === "templates"}
          onClick={() => onChangeActiveTool("templates")}
        />
        <SidebarItem
          icon={LayoutTemplate}
          label="Mobile"
          isActive={activeTool === "templates"}
          onClick={() => onCopy("b35f7429-906e-40bb-8315-5348b89b9a8b")}
        />
        <SidebarItem
          icon={ImageIcon}
          label="Imagem"
          isActive={activeTool === "images"}
          onClick={() => onChangeActiveTool("images")}
        />
        <SidebarItem
          icon={Type}
          label="Texto"
          isActive={activeTool === "text"}
          onClick={() => onChangeActiveTool("text")}
        />
        {/* <SidebarItem
          icon={Sparkles}
          label="IA"
          isActive={activeTool === "ai"}
          onClick={() => onChangeActiveTool("ai")}
        /> */}
        <SidebarItem
          icon={Sparkles}
          label="Páginas"
          isActive={activeTool === "ai"}
          onClick={() => onChangeActiveTool("ai")}
        />
        <SidebarItem
          icon={Sparkles}
          label="Layout"
          isActive={activeTool === "ai"}
          onClick={() => onChangeActiveTool("ai")}
        />
        <SidebarItem
          icon={Shapes}
          label="Formas"
          isActive={activeTool === "shapes"}
          onClick={() => onChangeActiveTool("shapes")}
        />
        <SidebarItem
          icon={Pencil}
          label="Desenhar"
          isActive={activeTool === "draw"}
          onClick={() => onChangeActiveTool("draw")}
        />
        <SidebarItem
          icon={Settings}
          label="Configurações"
          isActive={activeTool === "settings"}
          onClick={() => onChangeActiveTool("settings")}
        />
      </ul>
    </aside>
  );
};
