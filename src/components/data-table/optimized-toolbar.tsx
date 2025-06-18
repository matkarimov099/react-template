import type { Table } from "@tanstack/react-table";
import { Settings, Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { TableConfig } from "./utils/table-config";
import { DataTableViewOptions } from "./view-options";

// Helper functions for component sizing
const getButtonSizeClass = (size: "sm" | "default" | "lg") => {
  switch (size) {
    case "sm":
      return "h-8 px-3";
    case "lg":
      return "h-11 px-5";
    default:
      return "";
  }
};

interface OptimizedDataTableToolbarProps<TData> {
  table: Table<TData>;
  totalSelectedItems?: number;
  deleteSelection?: () => void;
  getSelectedItems?: () => Promise<TData[]>;
  getAllItems?: () => TData[];
  config: TableConfig;
  resetColumnSizing?: () => void;
  resetColumnOrder?: () => void;
  entityName?: string;
  columnMapping?: Record<string, string>;
  columnWidths?: Array<{ wch: number }>;
  headers?: string[];
  customToolbarComponent?: React.ReactNode;
}

export function OptimizedDataTableToolbar<TData>({
  table,
  config,
  resetColumnSizing,
  resetColumnOrder,
  customToolbarComponent,
}: OptimizedDataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        {/* Custom toolbar component */}
        {customToolbarComponent}
      </div>

      <div className="flex items-center gap-2">
        {/* Column visibility */}
        {config.enableColumnVisibility && (
          <DataTableViewOptions table={table} size={config.size} />
        )}

        {/* Table settings */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size={config.size === "sm" ? "sm" : "default"}
              className={`ml-auto hidden lg:flex ${getButtonSizeClass(
                config.size
              )}`}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Table Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Customize your table appearance and behavior
                </p>
              </div>
              <div className="grid gap-2">
                {config.enableColumnResizing && resetColumnSizing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetColumnSizing}
                    className="justify-start"
                  >
                    <Undo2 className="mr-2 h-4 w-4" />
                    Reset column sizes
                  </Button>
                )}
                {resetColumnOrder && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetColumnOrder}
                    className="justify-start"
                  >
                    <Undo2 className="mr-2 h-4 w-4" />
                    Reset column order
                  </Button>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
