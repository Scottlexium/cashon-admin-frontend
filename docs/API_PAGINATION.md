# Enhanced API with Pagination Support

The API instance has been enhanced to automatically handle pagination data alongside the main response data.

## Features

### 1. **Automatic Data Extraction**
The API automatically extracts data from responses with the structure `{ status, message, data }`.

### 2. **Pagination Handling**
When pagination data is present at the response level, it's automatically preserved and attached to the response.

### 3. **Type Safety**
Full TypeScript support for both regular and paginated responses.

## Usage Examples

### Basic API Call (Non-paginated)
```typescript
// Before enhancement
const response = await api.get('/profile');
const user = response.data.data; // Had to access nested data

// After enhancement
const response = await api.get<User>('/profile');
const user = response.data; // Direct access!
```

### Paginated API Call
```typescript
import { extractPaginatedData, ApiPaginationInfo } from '@/lib/utils';

// API call with pagination
const fetchUsers = async (page: number = 1, limit: number = 10) => {
  const response = await api.get<User[]>(`/users?page=${page}&limit=${limit}`);
  
  // Extract data and pagination using utility function
  const { data, pagination } = extractPaginatedData<User[]>(response.data);
  
  setUsers(data);
  setPagination(pagination || null);
};
```

### Manual Pagination Handling
```typescript
// If you want to handle pagination manually
const response = await api.get('/transactions?page=1&limit=10');

// Check if response contains pagination
if (response.data.pagination) {
  const { pagination, ...actualData } = response.data;
  setTransactions(actualData.table);
  setPagination(pagination);
} else {
  // Handle non-paginated response
  setTransactions(response.data.table);
}
```

## API Response Structures

### Regular Response
```json
{
  "status": true,
  "message": "Success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Becomes:**
```typescript
response.data = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
}
```

### Paginated Response
```json
{
  "status": true,
  "message": "Success",
  "totalItems": 150,
  "totalPages": 15,
  "currentPage": 1,
  "limit": 10,
  "data": {
    "table": [...],
    "stats": {...}
  }
}
```

**Becomes:**
```typescript
response.data = {
  table: [...],
  stats: {...},
  pagination: {
    totalItems: 150,
    totalPages: 15,
    currentPage: 1,
    limit: 10
  }
}
```

## Utility Functions

### `extractPaginatedData<T>(response: any)`
Safely extracts data and pagination info from a response.

```typescript
const { data, pagination } = extractPaginatedData<TransactionRecord[]>(response.data);
```

### `isPaginatedResponse<T>(data: any)`
Type guard to check if a response contains pagination data.

```typescript
if (isPaginatedResponse(response.data)) {
  // TypeScript knows this has pagination
  console.log(response.data.pagination.totalItems);
}
```

### `getPaginationInfo(response: any)`
Extracts just the pagination info from a response.

```typescript
const pagination = getPaginationInfo(response.data);
if (pagination) {
  console.log(`Page ${pagination.currentPage} of ${pagination.totalPages}`);
}
```

## Pagination Component

A reusable pagination component is available:

```typescript
import { Pagination } from '@/components/ui/pagination';

<Pagination
  pagination={paginationData}
  onPageChange={(page) => fetchData(page)}
  loading={isLoading}
/>
```

## Type Definitions

```typescript
export interface ApiPaginationInfo {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface ApiPaginatedResponse<T> {
  data: T;
  pagination: ApiPaginationInfo;
}
```

## Implementation Example (Transactions Page)

```typescript
const Page = () => {
  const [data, setData] = useState<TransactionRecord[]>([]);
  const [pagination, setPagination] = useState<ApiPaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      const response = await api.get<TransactionsResponse>(`/alltransaction?page=${page}&limit=${limit}`);
      
      // Extract data and pagination
      const { data, pagination: paginationInfo } = extractPaginatedData<TransactionsResponse>(response.data);
      
      if (data) {
        setData(data.table);
        setPagination(paginationInfo || null);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DataTable data={data} columns={columns} />
      
      {pagination && (
        <Pagination
          pagination={pagination}
          onPageChange={(page) => fetchTransactions(page, pagination.limit)}
          loading={loading}
        />
      )}
    </div>
  );
};
```

## Benefits

1. **Cleaner Code**: No more nested data access
2. **Automatic Pagination**: Pagination data is preserved automatically
3. **Type Safety**: Full TypeScript support
4. **Backward Compatible**: Works with existing non-paginated endpoints
5. **Utility Functions**: Helper functions for common pagination tasks
6. **Reusable Components**: Ready-to-use pagination component
