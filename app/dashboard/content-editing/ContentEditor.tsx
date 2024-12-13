'use client';

import React, { useState, useRef } from 'react';

const ContentEditor = () => {
  const [showMenu, setShowMenu] = useState(false); // Toggle menu visibility
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null); // Selected menu item
  const editorRef = useRef<HTMLDivElement>(null);

  // Menu items
  const menuItems = [
    { label: 'H1', value: 'h1' },
    { label: 'H2', value: 'h2' },
    { label: 'List', value: 'list' },
  ];

  // Handle keydown event in the contentEditable div
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === '/') {
      e.preventDefault();
      const selection = window.getSelection();
      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Set menu position and show the menu
        setMenuPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
        setShowMenu(true);
      }
    } else if (e.key === 'Escape') {
      setShowMenu(false);
    }
  };

  // Handle menu item selection
  const handleMenuItemClick = (item: string) => {
    setSelectedMenuItem(item);
    setShowMenu(false);

    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);

      // Create the new element based on the selected menu item
      const newNode = document.createElement(item === 'list' ? 'ul' : item);
      newNode.textContent = item === 'list' ? '• List item' : `${item.toUpperCase()} Text`;

      // Replace the current range with the new node
      range.deleteContents();
      range.insertNode(newNode);

      // Move the cursor after the inserted element
      range.setStartAfter(newNode);
      range.setEndAfter(newNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div style={{ position: 'relative', padding: '10px', border: '1px solid #ccc' }}>
      {/* ContentEditable div */}
      <div
        ref={editorRef}
        contentEditable
        onKeyDown={handleKeyDown}
        style={{
          minHeight: '150px',
          outline: 'none',
          padding: '10px',
          fontFamily: 'sans-serif',
        }}
        suppressContentEditableWarning
      >
        Start typing here...
      </div>

      {/* Menu dropdown */}
      {showMenu && (
        <div
          style={{
            position: 'absolute',
            top: menuPosition.top,
            left: menuPosition.left,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          {menuItems.map((item) => (
            <div
              key={item.value}
              onClick={() => handleMenuItemClick(item.value)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
