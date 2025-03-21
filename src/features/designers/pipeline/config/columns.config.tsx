import { createColumnHelper } from "@tanstack/react-table"
import type { TToolbarConfig, ColumnDefWithFilters } from "@/types/table"
import { PlusIcon, Network, MoreVertical } from 'lucide-react';
import { Pipeline } from '@/types/designer/pipeline';
import { formatDate } from "@/lib/date-format";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const columnHelper = createColumnHelper<Pipeline>()

const columns: ColumnDefWithFilters<Pipeline>[] = [
  columnHelper.accessor('pipeline_name', {
    header: 'Name',
    enableColumnFilter: true,
  }),
  columnHelper.accessor('bh_project_name', {
    header: 'Project',
    enableColumnFilter: true,
  }),
  columnHelper.accessor('created_by', {
    header: 'Created By',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('updated_at', {
    header: 'Last Updated',
    cell: (info) => formatDate(info.getValue() ?? new Date()),
    enableColumnFilter: false,
  }),
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right">
            <DropdownMenuItem
             onClick={(event) => {
              event.stopPropagation();
              window.dispatchEvent(
                new CustomEvent("openPipelineDeleteDialog", {
                  detail: row.original,
                })
              );
            }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableColumnFilter: false,
  }
];

const getToolbarConfig = (): TToolbarConfig => {
  return {
    buttons: [
      {
        label: <Network className="mr-2 h-4 w-4" />,
        variant: "outline",
        icon: PlusIcon,
        onClick: () => {
          window.dispatchEvent(new Event("openCreatePipelineDialog"));
        },
      }]
  }
}

export { columns, getToolbarConfig }
