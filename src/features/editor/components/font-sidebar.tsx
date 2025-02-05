import {
  ActiveTool,
  Editor,
  fonts,
} from "@/features/editor/types";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface FontSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export const FontSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
  searchTerm,
  setSearchTerm
}: FontSidebarProps) => {
  const value = editor?.getActiveFontFamily();

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const filteredFonts = fonts.filter((font) =>
    font.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "font" ? "visible" : "hidden",
      )}
    >
      <div className="p-4">
        <input
          type="text"
          placeholder="Buscar fonte..."
          className="w-full border rounded px-3 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ToolSidebarHeader
        title="Fonte"
        description="Mude a fonte do texto"
      />
      <ScrollArea>
        <div className="p-4 space-y-1 border-b">
          {filteredFonts.map((font) => (
            <Button
              key={font}
              variant="secondary"
              size="lg"
              className={cn(
                "w-full h-16 justify-start text-left",
                value === font && "border-2 border-blue-500",
              )}
              style={{
                fontFamily: font,
                fontSize: "16px",
                padding: "8px 16px"
              }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
          {filteredFonts.length === 0 && (
            <p className="text-center text-gray-500">Nenhuma fonte encontrada</p>
          )}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
