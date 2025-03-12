import { createColumnHelper } from '@tanstack/react-table';
import type { TToolbarConfig, ColumnDefWithFilters } from "@/types/table"
import { Project } from '@/types/admin/project';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/config/routes';
import { useNavigation } from '@/hooks/useNavigation';
import { PlusIcon, FolderGit2 } from 'lucide-react';

const columnHelper = createColumnHelper<Project>();

const columns: ColumnDefWithFilters<Project>[] = [
  columnHelper.accessor('bh_project_name', {
    header: 'Name',
    enableColumnFilter: true,
  }),
  columnHelper.accessor('ytd_cost', {
    header: 'Ytd Cost',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('current_month_cost', {
    header: 'Current Month Cost',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('total_data_sources', {
    header: 'Data Sources',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ row }) => {
      const type = row.getValue('status') as string;
      return (
        <Badge className={`capitalize ${type === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {type}
        </Badge>
      );
    },
    enableColumnFilter: true,
  }),
];

const getToolbarConfig = (): TToolbarConfig => {
  const { handleNavigation } = useNavigation()
  return {
    buttons: [
      {
        label: <FolderGit2 className="mr-2 h-4 w-4" />,
        variant: "outline",
        icon: PlusIcon,
        onClick: () => {
          handleNavigation(ROUTES.ADMIN.PROJECTS.ADD)
        },
      }]
  }

}

export { columns, getToolbarConfig }
