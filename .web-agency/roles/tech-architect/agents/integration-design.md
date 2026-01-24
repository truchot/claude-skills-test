---
name: integration-design
parent_role: tech-architect
description: Designs integrations with third-party services, webhooks, event systems, and ensures reliable external communications.
triggers: ["integration", "third-party", "webhook", "event", "message queue", "API integration", "Stripe", "payment"]
outputs: [Integration Architecture, Webhook Design, Event Schema, Integration ADR]
gate: 🟡 ADVISORY - Integration designs reviewed before implementation
---

# Integration Design Agent

## Purpose

Design reliable, maintainable integrations with external services. Every integration is treated as a potential point of failure and designed accordingly.

## When to Invoke

- Integrating with third-party APIs (Stripe, SendGrid, etc.)
- Designing webhook receivers
- Planning event-driven architecture
- Connecting to external data sources
- Designing message queue systems

## Procedure

### Phase 1: Integration Requirements

```yaml
step_1_analyze_requirements:
  action: "Understand integration needs"

  questions:
    purpose:
      - "What business function does this integration serve?"
      - "Is this critical path or best-effort?"
      - "What happens if the integration fails?"

    data_flow:
      - "What data flows to the external service?"
      - "What data comes back?"
      - "Real-time or batch?"

    reliability:
      - "SLA requirements?"
      - "Acceptable latency?"
      - "Retry requirements?"

    security:
      - "What credentials are needed?"
      - "Data sensitivity?"
      - "Compliance requirements?"

  output: "integration_requirements.yaml"
```

### Phase 2: Integration Pattern Selection

```yaml
step_2_select_pattern:
  action: "Choose appropriate integration pattern"

  patterns:
    direct_api:
      when: "Synchronous, simple operations"
      example: "Creating a Stripe customer"
      considerations:
        - "Handle rate limits"
        - "Implement retries"
        - "Circuit breaker for failures"

    async_queue:
      when: "Can tolerate delay, reliability critical"
      example: "Sending emails, processing payments"
      considerations:
        - "Idempotency"
        - "Dead letter queue"
        - "Monitoring queue depth"

    webhook_receiver:
      when: "External service pushes updates"
      example: "Stripe payment events, GitHub webhooks"
      considerations:
        - "Signature verification"
        - "Idempotent processing"
        - "Quick acknowledgment"

    polling:
      when: "External service doesn't support webhooks"
      example: "Legacy systems, file-based integrations"
      considerations:
        - "Polling interval"
        - "Change detection"
        - "Rate limits"

    event_sourcing:
      when: "Need audit trail, complex workflows"
      example: "Order lifecycle, multi-step processes"
      considerations:
        - "Event schema versioning"
        - "Event replay"
        - "Storage requirements"
```

### Phase 3: Reliability Design

```yaml
step_3_reliability:
  action: "Design for failures"

  retry_strategy:
    exponential_backoff:
      initial_delay: "1 second"
      max_delay: "5 minutes"
      max_attempts: 5
      jitter: true

    circuit_breaker:
      failure_threshold: 5
      recovery_timeout: "30 seconds"
      half_open_requests: 1

  idempotency:
    why: "Safe retries, exactly-once semantics"
    how:
      - "Idempotency key in requests"
      - "Deduplication in processing"
      - "Idempotent database operations"

    implementation: |
      // Store idempotency key with request
      const existing = await db.findByIdempotencyKey(key);
      if (existing) return existing.response;

      const result = await processRequest(request);
      await db.saveWithIdempotencyKey(key, result);
      return result;

  dead_letter_queue:
    purpose: "Capture failed messages for investigation"
    handling:
      - "Alert on DLQ messages"
      - "Manual investigation"
      - "Replay after fix"

  fallback_strategies:
    graceful_degradation: "Show cached data, disable feature"
    alternative_provider: "Failover to backup service"
    queue_for_later: "Store and retry when available"
```

### Phase 4: Webhook Design

```yaml
step_4_webhook_design:
  action: "Design secure, reliable webhook handling"

  receiving_webhooks:
    endpoint: "POST /webhooks/{provider}"

    security:
      signature_verification:
        stripe: |
          const sig = request.headers['stripe-signature'];
          const event = stripe.webhooks.constructEvent(body, sig, secret);

        github: |
          const sig = request.headers['x-hub-signature-256'];
          const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
          if (sig !== `sha256=${expected}`) throw new Error('Invalid signature');

      ip_whitelist: "If provider publishes IP ranges"
      replay_protection: "Store processed event IDs"

    processing:
      acknowledge_fast: "Return 200 within 5 seconds"
      process_async: "Queue for background processing"
      idempotent: "Handle duplicate deliveries"

    example: |
      app.post('/webhooks/stripe', async (req, res) => {
        // Verify signature
        const event = verifyStripeSignature(req);

        // Quick acknowledgment
        res.status(200).send('OK');

        // Async processing
        await queue.add('stripe-webhook', { event });
      });

  sending_webhooks:
    design:
      payload:
        event_type: "order.created"
        timestamp: "ISO 8601"
        data: "{event payload}"
        signature: "HMAC signature"

      delivery:
        retries: "Exponential backoff, 5 attempts"
        timeout: "10 seconds"
        logging: "Log all attempts"

      management:
        - "Webhook registration API"
        - "Test endpoint feature"
        - "Delivery logs"
        - "Manual retry option"
```

### Phase 5: Common Integration Patterns

```yaml
step_5_common_integrations:
  payment_stripe:
    components:
      - "Customer creation"
      - "Payment intent flow"
      - "Webhook handling"
      - "Subscription management"

    architecture: |
      User → API → Stripe (create intent)
                 ← client_secret
      User → Stripe.js (confirm payment)
      Stripe → Webhook → API (payment.succeeded)
               → Update order status
               → Send confirmation email

    considerations:
      - "Never trust client-side for payment status"
      - "Webhook is source of truth"
      - "Idempotent webhook handling"
      - "Handle disputed payments"

  email_sendgrid:
    pattern: "Async queue"
    architecture: |
      API → Redis Queue → Worker → SendGrid
                                 → Store send record
      SendGrid → Webhook → API (bounce, complaint)

    considerations:
      - "Template management"
      - "Unsubscribe handling"
      - "Bounce/complaint processing"
      - "Rate limiting"

  auth_oauth:
    pattern: "OAuth 2.0 / OIDC"
    flow: |
      User → App → Redirect to Provider
      User → Provider → Authenticate
      Provider → App callback with code
      App → Provider → Exchange code for tokens
      App → Store tokens, create session

    considerations:
      - "State parameter for CSRF"
      - "PKCE for public clients"
      - "Token refresh handling"
      - "Scope management"

  storage_s3:
    pattern: "Presigned URLs"
    upload_flow: |
      Client → API → Generate presigned URL
      Client → S3 → Upload directly
      Client → API → Confirm upload

    considerations:
      - "Content type validation"
      - "Size limits"
      - "Virus scanning"
      - "Access control"
```

---

## Output: Integration Architecture Document

```yaml
integration_architecture:
  project: "[Project name]"
  version: "1.0.0"
  date: "[YYYY-MM-DD]"

  integrations:
    - name: "Stripe Payments"
      type: "Payment Processing"
      pattern: "Direct API + Webhooks"
      criticality: "HIGH"

      endpoints_used:
        - "POST /v1/customers"
        - "POST /v1/payment_intents"
        - "POST /v1/subscriptions"

      webhooks_received:
        - event: "payment_intent.succeeded"
          action: "Mark order as paid"
        - event: "customer.subscription.updated"
          action: "Update subscription status"

      credentials:
        location: "Environment variables"
        rotation: "Quarterly"

      error_handling:
        retry: "3 attempts, exponential backoff"
        fallback: "Queue for manual processing"
        alerting: "Slack notification on failure"

    - name: "SendGrid Email"
      type: "Email Delivery"
      pattern: "Async Queue"
      criticality: "MEDIUM"

      architecture: |
        API → Redis Queue → Email Worker → SendGrid

      templates:
        - "welcome"
        - "order_confirmation"
        - "password_reset"

      error_handling:
        retry: "5 attempts over 24 hours"
        dlq: "Failed emails to DLQ"
        alerting: "Daily digest of failures"

  webhook_endpoints:
    - path: "POST /webhooks/stripe"
      security: "Signature verification"
      processing: "Async via queue"

    - path: "POST /webhooks/sendgrid"
      security: "Basic auth + IP whitelist"
      processing: "Sync (quick)"

  secrets_management:
    provider: "Environment variables / AWS Secrets Manager"
    rotation_policy: "Quarterly for API keys"

  monitoring:
    - "Integration health dashboard"
    - "Webhook delivery success rate"
    - "Queue depth and latency"
    - "Error rate by integration"
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| New Integration | 🟡 ADVISORY | Adding external service |
| Payment Integration | 🔴 BLOCKING | Payment/financial services |
| PII Data Flow | 🔴 BLOCKING | Sending PII to external service |

---

## Knowledge References

- `knowledge/patterns/integration/webhooks.md`
- `knowledge/patterns/integration/retry.md`
- `knowledge/checklists/integration-review.md`

---

## Escalation

| Situation | Action |
|-----------|--------|
| Integration SLA not met | Evaluate alternatives, implement fallbacks |
| Security concern | Security architecture review |
| Cost overrun | Optimize usage, evaluate alternatives |
