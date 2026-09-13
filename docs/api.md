# JANSETU API Reference

Base URL: `http://localhost:8787` (Configurable via `PORT` in `server/.env`)

---

## 1. Health Check

### `GET /api/health`
Returns server operational status and AI provider configuration.

#### Response `200 OK`
```json
{
  "status": "ok",
  "service": "jansetu-api",
  "version": "0.1.0",
  "timestamp": "2026-09-14T01:00:00.000Z",
  "ai": {
    "provider": "gemini",
    "configured": true,
    "model": "gemini-2.0-flash"
  }
}
```

---

## 2. Civic Reports API

### `POST /api/reports`
Creates a civic report, preserves the raw citizen voice, executes AI analysis, and saves the record.

#### Request Body
```json
{
  "text": "Stormwater drain overflowing near Bellandur bus stop for 3 days.",
  "category": "WATER",
  "locationAddress": "Outer Ring Road, Bellandur",
  "ward": "Ward 150 - Bellandur",
  "mediaUrls": ["https://example.com/photo.jpg"],
  "reporterName": "Aarav Sharma"
}
```

#### Response `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "REP-c6f3...",
    "originalText": "Stormwater drain overflowing near Bellandur bus stop for 3 days.",
    "category": "WATER",
    "status": "SUBMITTED",
    "provenance": {
      "source": "Citizen Mobile/Web Ingestion",
      "sourceType": "CITIZEN",
      "createdAt": "2026-09-14T01:00:00.000Z",
      "verificationStatus": "unverified"
    }
  },
  "analysis": {
    "language": "English",
    "translatedSummary": "Stormwater drain overflowing near Bellandur bus stop for 3 days.",
    "category": "DRAINAGE",
    "urgency": "HIGH",
    "severity": "HIGH",
    "confidence": "HIGH"
  }
}
```

### `GET /api/reports`
Lists ingested civic reports with optional filtering.

#### Query Parameters
- `category` (optional): Filter by category (e.g. `WATER`, `ROADS`)
- `ward` (optional): Filter by ward name
- `limit` (optional): Number of records (default: 50)

### `GET /api/reports/:id`
Retrieves a single civic report by its unique ID.

---

## 3. AI Intelligence Gateway

### `POST /api/ai/analyze-report`
Transforms raw citizen text into structured factual entities.

#### Request Body
```json
{
  "text": "ಮಳೆ ಬಂದಾಗ ಇಲ್ಲಿ ನೀರು ತುಂಬಿಕೊಳ್ಳುತ್ತೆ, ವಾಹನಗಳು ಓಡಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ.",
  "language": "auto"
}
```

#### Response `200 OK`
```json
{
  "success": true,
  "data": {
    "language": "Kannada",
    "translatedSummary": "When it rains, water fills up here and vehicles cannot move.",
    "category": "WATER",
    "urgency": "HIGH",
    "severity": "HIGH",
    "affectedService": "Roads & Stormwater Drainage",
    "missingInformation": ["exact street name", "landmark"],
    "confidence": "HIGH",
    "needsHumanReview": false,
    "schemaVersion": "1.0"
  },
  "aiTrace": {
    "provider": "gemini",
    "model": "gemini-2.0-flash",
    "operation": "analyzeReport",
    "promptVersion": "reportAnalysis.v1",
    "durationMs": 742
  }
}
```

### `POST /api/ai/summarize-evidence`
Synthesizes verified evidence items for a civic cluster.

#### Request Body
```json
{
  "clusterId": "CL-BLR-150-01",
  "evidenceItems": [
    {
      "id": "ev-1",
      "type": "citizen_report",
      "title": "312 Citizen Reports Ingested",
      "description": "Corroborated flooding on Outer Ring Road",
      "verified": true
    },
    {
      "id": "ev-2",
      "type": "infrastructure_telemetry",
      "title": "Culvert Siltation",
      "description": "78% culvert choke causing backflow",
      "verified": true
    }
  ]
}
```

### `POST /api/ai/explain-priority`
Calculates score deterministically and returns human-readable explainability.

#### Request Body
```json
{
  "score": 94,
  "breakdown": {
    "demand": 90,
    "severity": 95,
    "vulnerability": 95,
    "urgency": 90,
    "evidenceStrength": 85,
    "serviceGap": 80
  },
  "context": {
    "category": "Water & Drainage",
    "clusterName": "Bellandur SWD Cluster",
    "location": "Outer Ring Road, Bengaluru"
  }
}
```

---

## 4. Standard Error Codes

All errors return a uniform JSON format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error description",
    "details": {}
  }
}
```

| Error Code | HTTP Status | Meaning |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Request body failed Zod schema validation |
| `INSUFFICIENT_DATA` | 400 | Required mathematical factors or evidence items missing |
| `NOT_FOUND` | 404 | Requested report or resource could not be found |
| `AI_INVALID_RESPONSE` | 502 | Gemini returned malformed or schema-noncompliant JSON |
| `AI_UNAVAILABLE` | 502 / 503 | Gemini API key not configured or upstream API unreachable |
| `AI_TIMEOUT` | 504 | Gemini call exceeded the 15-second abort deadline |
| `INTERNAL_ERROR` | 500 | Unhandled server exception |
