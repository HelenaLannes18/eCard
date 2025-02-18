import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
  save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
  save,
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      // Eventos padrões
      canvas.on("object:added", () => save());
      canvas.on("object:removed", () => save());
      canvas.on("object:modified", () => save());
      canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:updated", (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:cleared", () => {
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });

      // Evento para editar textbox ao dar duplo clique
      const handleDoubleClick = (event: fabric.IEvent) => {
        const target = event.target;
        if (target && target.type === "textbox") {
          canvas.setActiveObject(target);
          (target as fabric.Textbox).enterEditing();
        }
      };

      canvas.on("mouse:dblclick", handleDoubleClick);

      // Remover eventos ao desmontar
      return () => {
        canvas.off("object:added");
        canvas.off("object:removed");
        canvas.off("object:modified");
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
        canvas.off("mouse:dblclick", handleDoubleClick);
      };
    }
  }, [save, canvas, clearSelectionCallback, setSelectedObjects]);
};
