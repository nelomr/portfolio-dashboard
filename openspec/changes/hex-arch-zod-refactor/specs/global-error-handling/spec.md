## ADDED Requirements

### Requirement: Global error notification for validation failures
The system SHALL intercept Zod `safeParse` failures in the adapters and trigger a global error notification (e.g., a Toast) to inform the user of the data corruption.

#### Scenario: Malformed external data received
- **WHEN** the external API returns data that fails the Zod schema validation
- **THEN** the `RestCryptoAdapter` logs the specific validation errors to the console
- **AND** a global Toast notification (built strictly following `shadcn-vue` guidelines) is displayed indicating that external data was malformed
- **AND** the application state does not crash, returning a safe fallback or throwing a controlled domain error that the store catches
