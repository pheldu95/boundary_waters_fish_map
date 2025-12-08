import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router';

export interface Position {
  x: number;
  y: number;
}

export interface DraggableWindowProps {
  children: ReactNode;
  title?: string;
  initialX?: number;
  initialY?: number;
  onClose?: () => void;
  className?: string;
  width?: number;
  minWidth?: number;
  height?: number;
  minHeight?: number;
  constrainToViewport?: boolean;
  zIndex?: number;
}

export const DraggableWindow: React.FC<DraggableWindowProps> = ({
  children,
  title = "Draggable Window",
  initialX = 100,
  initialY = 100,
  className = "",
  width,
  minWidth = 300,
  height,
  minHeight,
  constrainToViewport = true,
  zIndex = 1000
}) => {
  const [position, setPosition] = useState<Position>({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDragging) return;
      
      let newX = e.clientX - dragStart.x;
      let newY = e.clientY - dragStart.y;
      
      // Constrain to viewport if enabled
      if (constrainToViewport && windowRef.current) {
        const windowWidth = windowRef.current.offsetWidth;
        const windowHeight = windowRef.current.offsetHeight;
        const maxX = window.innerWidth - windowWidth;
        const maxY = window.innerHeight - windowHeight;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
      }
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = (): void => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      // Prevent text selection while dragging
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragStart, constrainToViewport]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    // Prevent drag if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.tagName === 'INPUT') {
      return;
    }
    
    if (!windowRef.current) return;
    
    const rect = windowRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
    
    // Prevent default to avoid text selection
    e.preventDefault();
  };

  const handleClose = (): void => {
    navigate(-1); //go back to previous page
  };

  return (
    <div
      ref={windowRef}
      className={`fixed select-none ${className} shadow-2xl rounded-lg`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default',
        width: width ? `${width}px` : 'auto',
        minWidth: `${minWidth}px`,
        height: height ? `${height}px` : 'auto',
        minHeight: minHeight ? `${minHeight}px` : 'auto',
        zIndex
      }}
    >
      <div
        className="bg-fishbluedarker px-4 py-3 cursor-grab active:cursor-grabbing rounded-t-lg border-t border-r border-l border-gray-500"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-yellowishbone select-none">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            {/* Window Controls */}
            <button
              onClick={handleClose}
              className="text-yellowishbone hover:text-redish transition-colors p-1 hover:bg-white/10 rounded cursor-pointer"
              type="button"
              aria-label="Close window"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="overflow-auto" style={{ maxHeight: height ? `${height - 48}px` : 'none' }}>
        {children}
      </div>
      <div
        className="bg-fishbluedarker px-4 py-3 rounded-b-lg border-b border-r border-l border-gray-500"
      />
    </div>
  );
};

export default DraggableWindow;