# Optimizatsiya qilingan DataTable

## Overview

DataTable komponenti to'liq optimizatsiya qilindi va universal bo'ldi. Endi u istalgan ma'lumot turlari uchun ishlatilishi mumkin va filter logikasi tashqariga chiqarildi.

## Asosiy O'zgarishlar

### 1. Filter Logikasi Tashqariga Chiqarildi

- DataTable endi ichida filter logikasini o'zi boshqarmaydi
- Filter komponentini prop sifatida qabul qiladi
- Har bir entity uchun alohida filter komponent yaratiladi

### 2. Generic API

- `DataTableFilter` interface barcha filterlar uchun asosiy struktura
- `DataFetchResult` interface barcha ma'lumot turlarini qo'llab-quvvatlaydi
- Universal hook va service pattern

### 3. Performance Optimizatsiyasi

- Memoized states va callbacks
- Debounced search
- Efficient row selection handling
- Optimized re-renders

## Ishlatish Misoli

### 1. Service Layer

```typescript
// users.service.ts
import {
  DataTableFilter,
  DataFetchResult,
} from "@/components/data-table/types";

export async function getUsers(
  filters: DataTableFilter
): Promise<DataFetchResult<User>> {
  const response = await axiosClient.post("/users/search", {
    page: filters.page || 1,
    limit: filters.limit || 10,
    search: filters.search || "",
    from_date: filters.from_date || "",
    to_date: filters.to_date || "",
    sort_by: filters.sort_by || "created_at",
    sort_order: filters.sort_order || "desc",
  });

  return {
    success: true,
    data: response.data.data,
    pagination: {
      page: filters.page || 1,
      limit: filters.limit || 10,
      total_pages: Math.ceil(response.data.total / (filters.limit || 10)),
      total_items: response.data.total,
    },
  };
}
```

### 2. Filter Component

```typescript
// users-filter.tsx
import { DataTableFilter } from "@/components/data-table/types";

interface UsersFilterProps {
  onFilterChange: (filters: DataTableFilter) => void;
  currentFilters: DataTableFilter;
  isLoading?: boolean;
}

export function UsersFilter({
  onFilterChange,
  currentFilters,
  isLoading,
}: UsersFilterProps) {
  // Filter komponentini implementatsiya qilish
  return (
    <div className="flex items-center gap-2">
      {/* Search input */}
      {/* Date range picker */}
      {/* Sort options */}
      {/* Reset button */}
    </div>
  );
}
```

### 3. Main Table Component

```typescript
// users-table.tsx
import { DataTable } from "@/components/data-table/optimized-data-table";

export const UsersTable = () => {
  return (
    <DataTable<User, unknown>
      getColumns={getColumns}
      exportConfig={useExportConfig()}
      fetchDataFn={getUsers}
      fetchByIdsFn={getUsersByIds}
      idField="id"
      filterComponent={UsersFilter}
      initialFilters={{
        page: 1,
        limit: 25,
        sort_by: "created_at",
        sort_order: "desc",
      }}
      renderToolbarContent={({
        selectedRows,
        totalSelectedCount,
        resetSelection,
      }) => (
        <ToolbarOptions
          selectedUsers={selectedRows}
          totalSelectedCount={totalSelectedCount}
          resetSelection={resetSelection}
        />
      )}
      config={{
        enableRowSelection: true,
        enableColumnVisibility: true,
        enableToolbar: true,
        enablePagination: true,
        size: "default",
        columnResizingTableId: "users-table",
        enableColumnResizing: true,
      }}
    />
  );
};
```

## Funksional Xususiyatlar

### ✅ Tayyor Funksiyalar

- **Server-side pagination** - API dan ma'lumotlarni sahifalash
- **Dynamic filtering** - Qidiruv, sana oralig'i, sorting
- **Row selection** - Cross-page selection qo'llab-quvvatlash
- **Column resizing** - Ustun o'lchamlarini o'zgartirish
- **Column reordering** - Ustunlarni qayta tartiblash
- **Bulk operations** - Tanlanganlar ustida massa operatsiyalar
- **CRUD operations** - Create, Read, Update, Delete
- **Export functionality** - CSV/Excel export (ixtiyoriy)
- **Responsive design** - Barcha ekran o'lchamlarida ishlaydi

### 🔧 Konfiguratsiya

```typescript
config={{
  enableRowSelection: true,          // Qatorlarni tanlash
  enableClickRowSelect: false,       // Qatorga bosib tanlash
  enableKeyboardNavigation: true,    // Klaviatura navigatsiyasi
  enableColumnVisibility: true,      // Ustunlarni yashirish/ko'rsatish
  enableToolbar: true,              // Toolbar ko'rsatish
  enablePagination: true,           // Pagination ko'rsatish
  enableColumnResizing: true,       // Ustun o'lchamini o'zgartirish
  size: 'default',                 // Komponent o'lchami
  columnResizingTableId: 'users-table', // LocalStorage kaliti
}}
```

## Afzalliklari

1. **Universal** - Har qanday ma'lumot turi uchun ishlatiladi
2. **Modullar** - Har bir qism alohida komponent
3. **Performance** - Optimizatsiya qilingan re-render va state management
4. **Maintainable** - Oson kengaytirish va o'zgartirish
5. **Type-safe** - To'liq TypeScript qo'llab-quvvatlash
6. **Responsive** - Barcha qurilmalarda ishlaydi

## Kelajakda Qo'shilishi Mumkin

- [ ] Virtual scrolling (katta ma'lumotlar uchun)
- [ ] Advanced filtering (complex conditions)
- [ ] Drag & drop row reordering
- [ ] Column grouping
- [ ] Data aggregation (sum, count, etc.)
- [ ] Real-time updates (WebSocket/SSE)

## Xulosa

Bu optimizatsiya qilingan DataTable komponenti:

- To'liq universal va qayta ishlatilishi mumkin
- Performance optimizatsiya qilingan
- Kengaytirish va o'zgartirish oson
- Zamonaviy React patterns va best practices qo'llanilgan

Endi siz istalgan entity uchun (products, orders, companies, etc.) bir xil DataTable komponentini ishlatishingiz mumkin, faqat filter komponent va service layer ni o'zgartirishingiz kifoya!
