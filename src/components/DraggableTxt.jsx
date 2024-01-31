import { useDrag } from 'react-dnd';

const DragItemType = 'TOOL';

export default function DraggableText() {
  const [, drag] = useDrag({
    type: DragItemType,
    item: { id: 'text' },
  });

  return <div ref={drag}>Draggable Text</div>;
}
