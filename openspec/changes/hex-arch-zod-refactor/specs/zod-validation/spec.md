## ADDED Requirements

### Requirement: Validate external data with Zod
The system SHALL validate all incoming external data using Zod schemas before it enters the application's domain layer.

#### Scenario: Valid data received
- **WHEN** the backend returns a well-formed JSON response
- **THEN** `z.safeParse()` succeeds and returns a mapped DTO

#### Scenario: Invalid data received
- **WHEN** the backend returns malformed data (e.g., string instead of number)
- **THEN** `z.safeParse()` fails gracefully without throwing an unhandled exception

### Requirement: Sanitize data via preprocessing
The system SHALL use Zod's `preprocess` feature to clean dirty data (e.g., parsing numeric strings with commas/currency symbols into native numbers).

#### Scenario: Formatted price string
- **WHEN** the API sends `"$62,000.50"`
- **THEN** the Zod schema parses and transforms it into the number `62000.5`

### Requirement: Use Branded Types for domain IDs
The system SHALL use Zod Branded Types to create nominal typing for domain identifiers (e.g., `AssetId`, `TransactionId`).

#### Scenario: Assigning correct ID type
- **WHEN** a developer passes an `AssetId` to a function expecting an `AssetId`
- **THEN** the TypeScript compiler allows the assignment

#### Scenario: Assigning incorrect ID type
- **WHEN** a developer passes a `TransactionId` to a function expecting an `AssetId`
- **THEN** the TypeScript compiler throws a type error
