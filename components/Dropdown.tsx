import { useState, useRef, useEffect } from 'preact/hooks';
import { JSX } from "preact/jsx-runtime";

interface MenuItem {
  label: string;
  value: string;
  icon?: JSX.Element;
}

interface DropdownButtonProps {
  icon?: JSX.Element;
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
  className?: string;
  style?: Record<string, string>;
  children?: JSX.Element | JSX.Element[];
}

export default function Dropdown({ icon, items, onSelect, className = '', style = {} }: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  function handleItemClick(item: MenuItem) {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  }

  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`inline-block transition ${className}`}
      style={style}
      onClick={() => setIsOpen(!isOpen)}
      ref={ref}
    >
      {icon}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul className="py-1 w-full flex flex-col">
            {items.map((item) => (
              <div
                className="w-full inline-flex items-center gap-2 text-center block px-2 py-2 text-sm text-gray-700 hover:(bg-gray-100 text-gray-900 cursor-pointer)"
                onClick={() => handleItemClick(item)}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
