"use client";

import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Settings,
  Shapes,
  Sparkles,
  Type,
  LaptopMinimalIcon,
  PowerIcon,
  Layers2Icon
} from "lucide-react";

import { ActiveTool } from "@/features/editor/types";
import { SidebarItem } from "@/features/editor/components/sidebar-item";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";
import { usePathname } from "next/navigation";

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const Sidebar = ({
  activeTool,
  onChangeActiveTool,
}: SidebarProps) => {


  const duplicateMutation = useDuplicateProject();

  const onCopy = (id: string) => {
    duplicateMutation.mutate({ id });
  };

  const pathname = usePathname();
  const projectId = pathname.split("/").pop() || ""; // Obtém o ID do projeto
  const router = useRouter();

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
          icon={LaptopMinimalIcon}
          label="Desktop"
          isActive={activeTool === "desktop"}
          //onClick={() => projectId && onCopy(projectId)}
          onClick={() => router.push(`/editor/1aa94742-6f12-4048-aece-29720fb4621b`)}
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
          icon={Layers2Icon}
          label="Páginas"
          isActive={activeTool === "pageSite"}
          onClick={() => onChangeActiveTool("pageSite")}
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
          icon={PowerIcon}
          label="Botões"
          isActive={activeTool === "buttons"}
          onClick={() => onChangeActiveTool("buttons")}
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
