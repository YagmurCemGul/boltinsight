'use client';

import { createContext, useContext, useState, type ReactNode, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { tabsVariants, spacing, typography, motion } from '@/lib/design-tokens';
import { useThemeMode } from '@/hooks';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function TabsList({ children, className, style }: TabsListProps) {
  const mode = useThemeMode();
  const colors = tabsVariants.default[mode];

  const listStyles: CSSProperties = {
    display: 'flex',
    borderBottom: `1px solid ${mode === 'dark' ? '#334155' : '#e5e7eb'}`,
    ...style,
  };

  return (
    <div className={className} style={listStyles}>
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function TabsTrigger({ value, children, className, style }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const mode = useThemeMode();
  const colors = tabsVariants.default[mode];

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  const triggerStyles: CSSProperties = {
    padding: `${spacing[2]} ${spacing[4]}`,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    transition: motion.transition.colors,
    borderBottom: isActive ? `2px solid ${colors.triggerActive}` : '2px solid transparent',
    color: isActive ? colors.triggerActive : colors.triggerText,
    marginBottom: '-1px',
    ...style,
  };

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn('hover:opacity-80', className)}
      style={triggerStyles}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.activeTab !== value) return null;

  return <div className={className}>{children}</div>;
}
