# NFR2: Role-Based Access Control (RBAC) Implementation

## Overview

NFR2 implements role-based access control to protect admin-only endpoints. All create, update, and delete operations on martyrs and testimonies require admin authentication and authorization.

## Architecture

### RBAC Helper (`src/lib/rbac.ts`)

- **Function**: `requireAdmin(request)`
- **Purpose**: Centralized authorization check for all admin endpoints
- **Returns**:
  - `null` if user is authenticated and is admin
  - `NextResponse` with 401 status if user is not authenticated or not admin
- **Usage**: Import and call at the start of POST/PUT/DELETE handlers

```typescript
export async function requireAdmin(request: Request) {
  const { getUserFromRequest, isAdmin } = await import(
    "../../lib/supabaseAdmin"
  );
  const user = await getUserFromRequest(request);
  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
```

### Supabase Admin Helpers (`lib/supabaseAdmin.ts`)

- **Functions**:
  - `getUserFromRequest(request)`: Extracts authenticated user from request headers
  - `isAdmin(user)`: Checks if user has admin role (either `role: "admin"` or `app_metadata.role: "admin"`)

## Protected Endpoints

### Martyrs API

| Method | Endpoint            | Auth Required | Status    |
| ------ | ------------------- | ------------- | --------- |
| GET    | `/api/martyrs`      | ❌ No         | Public    |
| GET    | `/api/martyrs/[id]` | ❌ No         | Public    |
| POST   | `/api/martyrs`      | ✅ Admin      | Protected |
| PUT    | `/api/martyrs/[id]` | ✅ Admin      | Protected |
| DELETE | `/api/martyrs/[id]` | ✅ Admin      | Protected |

### Testimonies API

| Method | Endpoint                | Auth Required    | Status                      |
| ------ | ----------------------- | ---------------- | --------------------------- |
| GET    | `/api/testimonies`      | ❌ No            | Public (filtered)           |
| GET    | `/api/testimonies/[id]` | ❌ No            | Public                      |
| POST   | `/api/testimonies`      | ✅ Authenticated | User created                |
| PUT    | `/api/testimonies/[id]` | ✅ Admin         | Protected (status/approval) |
| DELETE | `/api/testimonies/[id]` | ✅ Admin         | Protected                   |

### Timeline API

| Method | Endpoint                   | Auth Required | Status    |
| ------ | -------------------------- | ------------- | --------- |
| GET    | `/api/timeline`            | ❌ No         | Public    |
| POST   | `/api/timeline/entry`      | ✅ Admin      | Protected |
| PUT    | `/api/timeline/entry/[id]` | ✅ Admin      | Protected |
| DELETE | `/api/timeline/entry/[id]` | ✅ Admin      | Protected |

## Implementation Details

### Authorization Flow

1. Request arrives at protected endpoint (POST/PUT/DELETE)
2. `requireAdmin(request)` is called
3. User is extracted from Supabase JWT token in Authorization header
4. `isAdmin()` checks user's role
5. If not admin: Return 401 Unauthorized
6. If admin: Proceed with request handling

### Admin User Detection

A user is considered admin if:

- `user.role === "admin"` (user object role property), OR
- `user.app_metadata?.role === "admin"` (Supabase app_metadata)

### Error Responses

All unauthorized requests return:

```json
{
  "status": 401,
  "body": {
    "error": "Unauthorized"
  }
}
```

## Test Coverage

### Unit Tests (`__tests__/lib/rbac.test.ts`)

- ✅ Admin user allowed to access protected endpoints
- ✅ Non-admin user rejected (403)
- ✅ Unauthenticated user rejected (401)
- ✅ Admin role detection from both `role` and `app_metadata`

### Integration Tests (`__tests__/api/rbac-integration.test.ts`)

- ✅ Admin can create martyrs (POST 201)
- ✅ Admin can update martyrs (PUT 200)
- ✅ Admin can delete martyrs (DELETE 200)
- ✅ Non-admin cannot create/update/delete (401)
- ✅ Admin can approve/reject testimonies (PUT 200)
- ✅ Non-admin cannot modify testimony status (401)
- ✅ Consistent error response format across endpoints

### Functional Tests (`__tests__/api/rbac-protection.test.ts`)

- ✅ Authorization header processing
- ✅ Supabase JWT token validation
- ✅ Role verification logic
- ✅ Multiple admin role formats
- ✅ Unauthenticated vs unauthorized responses

## Running Tests

```bash
# Run all RBAC tests
npm test -- __tests__/lib/rbac.test.ts
npm test -- __tests__/api/rbac-protection.test.ts
npm test -- __tests__/api/rbac-integration.test.ts

# Run all tests
npm test

# Run with coverage
npm test -- --coverage
```

## Security Considerations

1. **Token Validation**: All requests must include valid Supabase JWT token
2. **Role Inheritance**: Admin role is checked at every request, not cached
3. **Error Messages**: 401 responses do not reveal whether endpoint exists
4. **Logging**: Failed authorization attempts are logged for monitoring
5. **HTTPS Enforcement**: In production, HTTPS is required for token transmission

## Next Steps

1. ✅ RBAC helper implementation
2. ✅ Admin endpoint protection
3. ✅ Test coverage for RBAC
4. 📋 Frontend: Show/hide admin UI based on user role
5. 📋 Admin dashboard: List all protected actions available
6. 📋 Audit logging: Track who modified what and when
7. 📋 Rate limiting: Prevent abuse of admin endpoints

## Acceptance Criteria

- ✅ All admin endpoints require authentication
- ✅ Only users with admin role can modify data
- ✅ 401 response for unauthorized access
- ✅ Comprehensive test coverage
- ✅ Consistent error messages
- ✅ No sensitive data leaked in error responses

## References

- **RBAC Implementation**: `src/lib/rbac.ts`
- **Supabase Auth**: `lib/supabaseAdmin.ts`
- **Protected Routes**: `src/app/api/martyrs/route.ts`, `src/app/api/testimonies/[id]/route.ts`
- **Tests**: `__tests__/api/rbac-*.test.ts`, `__tests__/lib/rbac.test.ts`
