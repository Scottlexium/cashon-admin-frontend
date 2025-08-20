import { cn } from '@/lib/utils';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export function Table({ children, className, ...props }: TableProps) {
  return (
    <div className="overflow-hidden">
      <table className={cn('w-full', className)} {...props}>
        {children}
      </table>
    </div>
  );
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export function TableHeader({ children, className, ...props }: TableHeaderProps) {
  return (
    <thead className={cn('bg-surface-secondary', className)} {...props}>
      {children}
    </thead>
  );
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export function TableBody({ children, className, ...props }: TableBodyProps) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export function TableRow({ children, className, ...props }: TableRowProps) {
  return (
    <tr className={cn('border-b border-border last:border-b-0', className)} {...props}>
      {children}
    </tr>
  );
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export function TableHead({ children, className, ...props }: TableHeadProps) {
  return (
    <th 
      className={cn(
        'px-6 py-5 text-left text-caption font-semibold text-text-muted uppercase tracking-wider',
        className
      )} 
      {...props}
    >
      {children}
    </th>
  );
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export function TableCell({ children, className, ...props }: TableCellProps) {
  return (
    <td className={cn('px-6 py-4 text-body text-text-primary', className)} {...props}>
      {children}
    </td>
  );
}
