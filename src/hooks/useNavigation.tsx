
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { navigationItems, findNavigationItem } from '@/config/navigation';

export const useNavigation = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  // Determine if an item should be expanded
  const isItemExpanded = (path: string) => {
    return expandedItems.includes(path);
  };
  
  // Toggle expanded state for an item
  const toggleExpanded = (path: string) => {
    setExpandedItems(current => 
      current.includes(path) 
        ? current.filter(item => item !== path) 
        : [...current, path]
    );
  };
  
  // Get the active item based on current location
  const activeItem = findNavigationItem(location.pathname, navigationItems);
  
  // Get parent path if current item has a parent
  const parentPath = activeItem?.parent;

  return {
    activeItem,
    parentPath,
    isItemExpanded,
    toggleExpanded,
    expandedItems,
  };
};
