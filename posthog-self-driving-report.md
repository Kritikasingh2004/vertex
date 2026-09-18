# PostHog Self-driving setup report

## Summary

PostHog Self-driving is configured with Session Replay, Error Tracking, and Support enabled. Health checks, error issue responders, and the Support responder are enabled; the focused scout troop and two custom learning-flow scouts are active.

Fresh scout configurations are picked up within about 30 minutes. Findings and clustered reports will appear in the [Self-driving inbox](https://us.posthog.com/project/244881/inbox).

## AI data processing

Approved.

## GitHub

The PostHog GitHub App was already connected before this setup. No GitHub Issues responder was enabled because no external tools were selected.

## Products enabled

| Product | Result | SDK check / note |
| --- | --- | --- |
| Session Replay | Already enabled | The web client initialization does not disable recording. No recordings were present in the probe, so Replay Vision cannot observe sessions until recorded traffic arrives. |
| Error Tracking | Already enabled | The web client enables exception capture. |
| Support (Conversations) | Enabled | Tickets arrive only after an inbound email, inbox, or Slack channel is connected in PostHog. |

## Signal sources

| source_product | source_type | Action |
| --- | --- | --- |
| `health_checks` | `health_issue` | Enabled — configuration and instrumentation health is always actionable. |
| `error_tracking` | `issue_created` | Enabled. |
| `error_tracking` | `issue_reopened` | Enabled. |
| `error_tracking` | `issue_spiking` | Enabled. |
| `conversations` | `ticket` | Enabled — dormant until a Support inbound channel is connected. |
| `signals_scout` | `cross_source_issue` | Skipped — scouts are enabled by default and no opt-out row existed. |
| `session_replay` | `session_analysis_cluster` | Skipped — retired route; Replay Vision scanners own replay coverage. |
| `replay_vision` | — | Skipped — scanners self-authorize with `emits_signals`. |

## Connected tools

No connected tools were selected. No external warehouse source or external responder was created.

## Scout troop

**Run budget:** 100 runs/day maximum; 0 used today and 100 remaining at configuration time.

> Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more.

### Active (6)

| Scout | Why it is enabled |
| --- | --- |
| General | Watches cross-product correlations and otherwise uncovered surfaces. |
| Product analytics | Watches engagement-flow regressions in the browser application. |
| Web analytics | Watches traffic, attribution, and landing-page health. |
| Health checks | Groups actionable PostHog setup and instrumentation issues. |
| Learning journey monitor (custom) | Watches course discovery progressing into a learning start. |
| Course navigation monitor (custom) | Watches section exploration progressing into lesson selection. |

### Disabled (23)

| Scout | Reason |
| --- | --- |
| AI observability | No LLM telemetry was evidenced. |
| Anomaly detection | No saved insight or dashboard coverage was evidenced; the selected scouts focus on the product’s known flows. |
| APM | No distributed-tracing surface was evidenced. |
| Conversations | Support has no inbound channel yet; the native ticket responder is already armed. |
| CSP violations | No CSP reporting configuration was found. |
| Customer analytics | No account/group analytics surface was evidenced. |
| Data pipelines | No pipeline or export surface was evidenced. |
| Data warehouse | No warehouse sources are connected. |
| Error tracking | Covered by the enabled native Error Tracking sources. |
| Experiments | No active experiment surface was evidenced. |
| Feature flags | No feature-flag usage was evidenced. |
| Inbox validation | A fresh inbox has no resolved reports to re-check yet. |
| Insight alerts | No existing insight-alert surface was evidenced. |
| Logs | No PostHog Logs usage was evidenced. |
| MCP tool calls | This project is not an MCP product surface. |
| Observability gaps | The focused health and product-analytics coverage is preferred at this stage. |
| Replay Vision | No accumulated scanner observations exist; the scanner layer is pending creation. |
| Revenue analytics | No payment or revenue data surface was evidenced. |
| Session replay | Replay coverage belongs to Replay Vision scanners, not a duplicate scout. |
| Skills store | No skills-store product surface was evidenced. |
| Surveys | Surveys are not enabled and no survey activity was found. |
| Tasks | No PostHog Tasks usage was evidenced. |
| Web vitals | No Core Web Vitals monitoring surface was evidenced. |

## Custom scouts

| Scout | What it watches | Signal-vs-noise discriminator | Why it adds coverage |
| --- | --- | --- | --- |
| `signals-scout-learning-journey` | The handoff from course selection to starting a lesson. | Reports only a sustained, material conversion decline versus a rolling four-week baseline while entry volume is stable. | The broad product analytics scout does not own this semantic learning-flow transition. |
| `signals-scout-course-navigation` | The handoff from expanding course sections to selecting a lesson. | Reports only a sustained, material progression decline while section-exploration volume is stable. | No built-in scout owns this interaction-specific course-navigation handoff. |

The proposals were approved and both scouts received active, daily, emitting configurations. Each explicitly ignores low-volume segments, site-wide traffic drops, launch-period variance, and one-window anomalies. To troubleshoot a noisy custom scout later, set `emit: false` on its scout configuration to leave it running as a dry run.

Surfaces considered and ruled out: error bursts are covered by native Error Tracking; session replay is reserved for Replay Vision; revenue, surveys, LLM, account analytics, and pipeline monitoring lacked evidence of use.

## Replay Vision scanners

A scanner is an LLM that watches individual session recordings on a schedule and pushes clear findings into the inbox. It is the only component in this setup that spends Replay Vision quota; findings arrive at half weight and need corroboration before promotion into a report.

| Brief | Intended name | Query scope | Sampling | Estimate | Result |
| --- | --- | --- | --- | --- | --- |
| Breakage monitor | Course flow breakage | Recordings on `/courses` pages — the catalog, course-detail, and lesson-navigation flow. | Focused, 10% | 0 observations/month; 0 credits/month | Not created: `vision-scanners-create` returned a generic fetch failure. |
| Frustration monitor | Learner interaction frustration | High-interaction recordings with more than 10 clicks; no URL scope, minimizing overlap with the course-flow monitor. | Focused, 10% | 0 observations/month; 0 credits/month | Not created: `vision-scanners-create` returned a generic fetch failure. |

Replay Vision quota was healthy at configuration time: 2,500 credits remaining, 0 used, and no existing scanners. No recordings were found in the recent probe. The scanner creation issue was reported to the PostHog team with the failed tool details.

## Files modified or created

| File | Change |
| --- | --- |
| `posthog-self-driving-report.md` | Created this setup report. |

No application source files were changed.

## Follow-ups

- [ ] Connect an inbound Support channel (email, inbox, or Slack) in PostHog so the enabled Support responder can receive tickets.
- [ ] Create the two Replay Vision monitors in [Replay Vision](https://us.posthog.com/project/244881/replay-vision), or retry this setup after the `vision-scanners-create` MCP failure is resolved.
- [ ] Reauthorize the MCP connection with `property_definition:read` if direct event-schema validation through MCP is needed; the event-schema read surface was unavailable to this session.

## What happens next

The scout coordinator picks up fresh configurations within about 30 minutes. Scouts use the shared daily run budget, and their findings are clustered into reports in the [Self-driving inbox](https://us.posthog.com/project/244881/inbox), where immediately actionable findings can become coding tasks.

## References

- [PostHog Self-driving setup](https://posthog.com/docs/self-driving/setup)
- [PostHog signal sources](https://posthog.com/docs/self-driving/inbox/sources)
- [Creating Replay Vision scanners](https://posthog.com/docs/replay-vision/creating-scanners)
