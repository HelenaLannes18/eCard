import { ActiveTool, Editor, FILL_COLOR } from "@/features/editor/types";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ColorPicker } from "@/features/editor/components/color-picker";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FillColorSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const FillColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FillColorSidebarProps) => {
  // const value = editor?.getActiveFillColor() || FILL_COLOR;
  const [color, setColor] = useState(editor?.getActiveFillColor() || FILL_COLOR);
  const [customColors, setCustomColors] = useState<string[]>([]);

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: string, fromEyeDropper: boolean = false) => {
    if (fromEyeDropper) {
      setCustomColors((prevColors) => Array.from(new Set([value, ...prevColors])).slice(0, 10));
    }
    setColor(value);
    editor?.changeFillColor(value);
  };

  const pickColorFromScreen = async () => {
    if ("EyeDropper" in window) {
      const eyeDropper = new (window as any).EyeDropper();
      try {
        const result = await eyeDropper.open();
        onChange(result.sRGBHex);
      } catch (error) {
        console.error("Falha ao selecionar a cor:", error);
      }
    } else {
      alert("Seu navegador não suporta o seletor de cores da tela")
    }
  }

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "fill" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Cor de preenchimento"
        description="Adicione cor de preenchimento ao seu elemento"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker
            value={color}
            onChange={onChange}
            customColors={customColors}
          />
          <Button onClick={pickColorFromScreen} className="w-full">
            Selecionar cor da tela
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
