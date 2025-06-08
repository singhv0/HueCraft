"use client";
import React, { useState } from "react";
import { randomColorNear } from "@/utils/color-utils";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import PaletteBox from "./PaletteBox";
import { restrictToHorizontalAxis, restrictToParentElement } from "@dnd-kit/modifiers";

export default function PaletteEditor({
  palette,
  setPalette,
}: {
  palette: string[];
  setPalette: (colors: string[]) => void;
}) {
  const [animatedIdx, setAnimatedIdx] = useState<number | undefined>();
  const [pendingIdx, setPendingIdx] = useState<number | undefined>();

  const sensors = useSensors(useSensor(PointerSensor));

  // Add a new color with animation
  const handleAddColor = (idx: number) => {
    if (palette.length >= 10) return;
    const leftColor = palette[idx];
    const newColor = randomColorNear(leftColor);
    const newPalette = [...palette];
    newPalette.splice(idx + 1, 0, newColor);

    setPalette(newPalette);
    setPendingIdx(idx + 1); // Mark the new bar as pending (flexGrow 0)

    // After a tick, animate to flexGrow 1
    setTimeout(() => {
      setAnimatedIdx(idx + 1);
      setPendingIdx(undefined);
      setTimeout(() => setAnimatedIdx(undefined), 400); // Remove highlight after animation
    }, 30);
  };

  // Remove a color
  const handleRemoveColor = (idx: number) => {
    if (palette.length <= 2) return; // Prevent removing all colors
    setPalette(palette.filter((_, i) => i !== idx));
  };

  // Change a color (for shade picker)
  const handleColorChange = (idx: number, newColor: string) => {
    const newPalette = [...palette];
    newPalette[idx] = newColor;
    setPalette(newPalette);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = palette.findIndex((c, i) => active.id === c + i);
      const newIndex = palette.findIndex((c, i) => over.id === c + i);
      setPalette(arrayMove(palette, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]} // <-- Add both
    >
      <SortableContext
        items={palette.map((c, i) => c + i)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="w-full flex flex-col items-center">
          <PaletteBox
            colors={palette}
            height="24rem"
            showLayoutPanelLeft={false}
            staticAnimation={true}
            onAddColorBetween={handleAddColor}
            onRemoveColor={handleRemoveColor}
            animatedIdx={animatedIdx}
            pendingIdx={pendingIdx}
            showDragHandle={true} // <-- ADD THIS LINE
          />
        </div>
      </SortableContext>
    </DndContext>
  );
}