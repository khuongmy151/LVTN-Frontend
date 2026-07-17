import React from 'react';

interface TableProps {
  children: React.ReactNode;
}

export const Table = ({ children }: TableProps) => {
  return <table>{children}</table>;
};