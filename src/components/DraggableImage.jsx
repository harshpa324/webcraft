import { useDrag } from 'react-dnd';

const DragItemType = 'TOOL';


export default function DraggableImage() 

    {
      const [, drag] = useDrag({
      type: DragItemType,
      item: { id: 'image' }, 
    });
  
    return <div ref={drag}>Draggable Image</div>;
  }

 