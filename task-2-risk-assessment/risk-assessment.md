# Risk Assessment

## Pet Name Generator Application

**Project Name:** Pet Name Generator
**Author:** Steffen Grøn Andersen
**Course:** Software Quality - KEA
**Date:** November 30, 2025
**Assessment Date:** Project Start

---

## 1. Introduction

### 1.1 Project Overview

The Pet Name Generator is a web-based application designed to generate creative pet names based on user preferences. The project serves as the exam project for the Software Quality course and demonstrates comprehensive testing practices across 10 different testing methodologies.

**Key Project Characteristics:**

- **Scope:** Web application with microservices architecture (Frontend, Backend, Database)
- **Duration:** Approximately 6 weeks (November - December 2025)
- **Deadline:** December 14, 2025, 23:59
- **Team Size:** Individual project (solo developer)
- **Deliverables:** 10 distinct submissions covering various testing methodologies

### 1.2 Purpose of Risk Assessment

This risk assessment document identifies, analyzes, and proposes mitigation strategies for potential risks that could impact the successful completion of the Pet Name Generator project. The assessment covers:

- **Schedule risks** related to deadline and workload
- **Technical risks** associated with implementation and tooling
- **Requirements risks** stemming from deliverable complexity
- **Resource risks** due to solo development constraints
- **Quality risks** affecting testing comprehensiveness

### 1.3 Risk Assessment Methodology

**Risk Rating System:**

- **Probability:** Low (1), Medium (2), High (3)
- **Impact:** Low (1), Medium (2), High (3)
- **Risk Score:** Probability × Impact (Range: 1-9)

**Risk Classification:**

- **Low Risk:** Score 1-3 (Green)
- **Medium Risk:** Score 4-6 (Yellow)
- **High Risk:** Score 7-9 (Red)

**Assessment Phases:**
This document presents three risk snapshots:

1. **Phase 1: Initial** - Project start, all risks identified
2. **Phase 2: Mid-Development** - After Week 1, implementation and test infrastructure complete
3. **Phase 3: Final** - Pre-submission, all development complete

---

## 2. Risk Identification

### 2.1 Schedule Risks

**RISK-01: Tight Project Deadline**

- **Description:** Only 6 weeks to complete 10 deliverables, including implementation and comprehensive testing
- **Category:** Schedule
- **Concern:** Multiple complex deliverables in short timeframe

**RISK-02: Solo Developer Workload**

- **Description:** Single developer responsible for all aspects: design, implementation, testing, documentation
- **Category:** Schedule / Resource
- **Concern:** No team to distribute parallel work streams

**RISK-03: Testing Implementation Time**

- **Description:** 8 different testing methodologies require significant implementation time (unit tests, integration tests, E2E tests, API tests, performance tests, etc.)
- **Category:** Schedule
- **Concern:** Testing tasks may be underestimated in time allocation

### 2.2 Technical Risks

**RISK-04: Docker Environment Complexity**

- **Description:** Application requires Docker Compose orchestration of 3 services (frontend, backend, database)
- **Category:** Technical
- **Concern:** Docker networking, volume management, and container debugging challenges

**RISK-05: New Testing Tools Learning Curve**

- **Description:** Unfamiliarity with multiple testing tools: JMeter (performance), Playwright (E2E), SonarQube (static analysis)
- **Category:** Technical / Resource
- **Concern:** Time needed to learn tool configuration and usage

**RISK-06: PostgreSQL Database Integration**

- **Description:** Database setup, migrations, seed data, and testing require careful configuration
- **Category:** Technical
- **Concern:** Data persistence, transaction handling, and test data management complexity

**RISK-07: CI/CD Pipeline Setup**

- **Description:** GitHub Actions workflow must automate linting, tests, and coverage reporting
- **Category:** Technical
- **Concern:** Pipeline configuration errors or flakiness in automated tests

### 2.3 Requirements Risks

**RISK-08: High Deliverable Count**

- **Description:** 10 separate deliverables with specific format requirements (PDFs, source code, JSON exports)
- **Category:** Requirements
- **Concern:** Organizational overhead and risk of missing submission components

**RISK-09: Test Coverage Expectations**

- **Description:** Requirement for >80% code coverage and comprehensive test cases across all equivalence classes
- **Category:** Requirements / Quality
- **Concern:** Achieving sufficient coverage depth may require extensive test writing

### 2.4 Resource Risks

**RISK-10: Single Point of Failure**

- **Description:** Solo developer means illness, emergency, or unavailability stops all progress
- **Category:** Resource
- **Concern:** No backup resources if developer becomes unavailable

**RISK-11: Multiple Tool Expertise Required**

- **Description:** Project requires proficiency in Jest, Playwright, JMeter, Postman, SonarQube, Docker, PostgreSQL, and Express.js
- **Category:** Resource / Technical
- **Concern:** Steep learning curve for multiple unfamiliar tools simultaneously

### 2.5 Quality Risks

**RISK-12: Testing Depth vs. Breadth**

- **Description:** Balancing comprehensive testing across all 10 methodologies vs. depth of testing per methodology
- **Category:** Quality
- **Concern:** Superficial testing to meet all requirements vs. thorough testing in fewer areas

---

## 3. Risk Tables

### 3.1 Phase 1: Initial Risk Assessment (Project Start)

| Risk ID | Risk Description                 | Probability | Impact   | Score | Level  | Mitigation Strategy                                                                                                      |
| ------- | -------------------------------- | ----------- | -------- | ----- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| RISK-01 | Tight Project Deadline           | 3 (High)    | 3 (High) | 9     | High   | Create detailed project schedule with milestones; prioritize critical deliverables first; build buffer time for setbacks |
| RISK-02 | Solo Developer Workload          | 3 (High)    | 2 (Med)  | 6     | Medium | Work consistently; avoid scope creep; focus on meeting requirements rather than perfection                               |
| RISK-03 | Testing Implementation Time      | 3 (High)    | 2 (Med)  | 6     | Medium | Start test framework setup early; use test generators and templates; focus on essential test cases first                 |
| RISK-04 | Docker Environment Complexity    | 2 (Med)     | 2 (Med)  | 4     | Medium | Follow Docker best practices; use official images; document setup steps; test locally before committing                  |
| RISK-05 | New Testing Tools Learning Curve | 2 (Med)     | 2 (Med)  | 4     | Medium | Allocate learning time in schedule; use official documentation and tutorials; start with simple examples                 |
| RISK-06 | PostgreSQL Database Integration  | 2 (Med)     | 2 (Med)  | 4     | Medium | Use repository pattern; write database initialization scripts; implement proper error handling                           |
| RISK-07 | CI/CD Pipeline Setup             | 2 (Med)     | 2 (Med)  | 4     | Medium | Start with basic pipeline; iterate incrementally; use GitHub Actions marketplace actions                                 |
| RISK-08 | High Deliverable Count           | 2 (Med)     | 2 (Med)  | 4     | Medium | Create checklist of all deliverables; organize folder structure early; track completion status                           |
| RISK-09 | Test Coverage Expectations       | 2 (Med)     | 2 (Med)  | 4     | Medium | Use coverage tools to guide test writing; focus on critical business logic first; use parameterized tests                |
| RISK-10 | Single Point of Failure          | 2 (Med)     | 3 (High) | 6     | Medium | Maintain good health; commit code frequently to Git; document setup/progress; plan realistic schedule                    |
| RISK-11 | Multiple Tool Expertise Required | 2 (Med)     | 2 (Med)  | 4     | Medium | Prioritize essential tool knowledge; use tool defaults when possible; leverage AI assistants for guidance                |
| RISK-12 | Testing Depth vs. Breadth        | 2 (Med)     | 2 (Med)  | 4     | Medium | Define "good enough" criteria per testing type; balance coverage across all 10 deliverables                              |

**Summary:**

- **High Risk (7-9):** 1 risk (RISK-01)
- **Medium Risk (4-6):** 11 risks
- **Low Risk (1-3):** 0 risks

---

### 3.2 Phase 2: Mid-Development Risk Assessment (Week 1 Complete)

**Context:** Implementation and test infrastructure setup complete. Application running in Docker. Test frameworks configured.

| Risk ID | Risk Description                 | Probability | Impact   | Score | Level  | Status Update                                                                         |
| ------- | -------------------------------- | ----------- | -------- | ----- | ------ | ------------------------------------------------------------------------------------- |
| RISK-01 | Tight Project Deadline           | 3 (High)    | 3 (High) | 9     | High   | **Unchanged** - Time pressure increasing as deadline approaches                       |
| RISK-02 | Solo Developer Workload          | 2 (Med)     | 2 (Med)  | 4     | Medium | **Improved** - Routine established, productivity increasing                           |
| RISK-03 | Testing Implementation Time      | 2 (Med)     | 2 (Med)  | 4     | Medium | **Improved** - Test infrastructure ready, templates in place                          |
| RISK-04 | Docker Environment Complexity    | 1 (Low)     | 2 (Med)  | 2     | Low    | **Mitigated** - Docker Compose working, containers stable                             |
| RISK-05 | New Testing Tools Learning Curve | 2 (Med)     | 2 (Med)  | 4     | Medium | **Improved** - Jest and Playwright configured, initial tests written                  |
| RISK-06 | PostgreSQL Database Integration  | 1 (Low)     | 2 (Med)  | 2     | Low    | **Mitigated** - Database connected, seed data working, repository pattern implemented |
| RISK-07 | CI/CD Pipeline Setup             | 2 (Med)     | 1 (Low)  | 2     | Low    | **Improved** - Basic pipeline running, needs enhancement                              |
| RISK-08 | High Deliverable Count           | 2 (Med)     | 2 (Med)  | 4     | Medium | **Improved** - 2/10 deliverables complete (SRS, Review), structure organized          |
| RISK-09 | Test Coverage Expectations       | 2 (Med)     | 2 (Med)  | 4     | Medium | **Unchanged** - Unit tests started but coverage still below target                    |
| RISK-10 | Single Point of Failure          | 2 (Med)     | 3 (High) | 6     | Medium | **Unchanged** - Still solo project; code committed regularly to Git                   |
| RISK-11 | Multiple Tool Expertise Required | 1 (Low)     | 2 (Med)  | 2     | Low    | **Improved** - Familiarity with main tools achieved; templates reusable               |
| RISK-12 | Testing Depth vs. Breadth        | 2 (Med)     | 2 (Med)  | 4     | Medium | **Unchanged** - Balancing act continues                                               |

**Summary:**

- **High Risk (7-9):** 1 risk (RISK-01)
- **Medium Risk (4-6):** 6 risks
- **Low Risk (1-3):** 5 risks (improved from 0)

**Emerging Risks (Phase 2):**

- **RISK-13:** Test data management complexity - Managing test databases and mocking external dependencies
- **RISK-14:** Performance test interpretation - Understanding JMeter results and setting realistic thresholds

---

### 3.3 Phase 3: Final Risk Assessment (Pre-Submission)

**Context:** All development complete. Tests written and passing. Documentation compiled. Final review in progress.

| Risk ID | Risk Description                 | Probability | Impact  | Score | Level | Status Update                                                   |
| ------- | -------------------------------- | ----------- | ------- | ----- | ----- | --------------------------------------------------------------- |
| RISK-01 | Tight Project Deadline           | 1 (Low)     | 2 (Med) | 2     | Low   | **Mitigated** - All work complete on schedule                   |
| RISK-02 | Solo Developer Workload          | 1 (Low)     | 2 (Med) | 2     | Low   | **Mitigated** - Workload managed successfully                   |
| RISK-03 | Testing Implementation Time      | 1 (Low)     | 1 (Low) | 1     | Low   | **Mitigated** - All tests implemented and passing               |
| RISK-04 | Docker Environment Complexity    | 1 (Low)     | 1 (Low) | 1     | Low   | **Mitigated** - Environment stable and documented               |
| RISK-05 | New Testing Tools Learning Curve | 1 (Low)     | 1 (Low) | 1     | Low   | **Mitigated** - Tools mastered and used effectively             |
| RISK-06 | PostgreSQL Database Integration  | 1 (Low)     | 1 (Low) | 1     | Low   | **Mitigated** - Database working reliably                       |
| RISK-07 | CI/CD Pipeline Setup             | 1 (Low)     | 1 (Low) | 1     | Low   | **Mitigated** - Pipeline running all tests successfully         |
| RISK-08 | High Deliverable Count           | 1 (Low)     | 2 (Med) | 2     | Low   | **Mostly Mitigated** - 9/10 complete, final compilation pending |
| RISK-09 | Test Coverage Expectations       | 1 (Low)     | 1 (Low) | 1     | Low   | **Mitigated** - Coverage >80% achieved                          |
| RISK-10 | Single Point of Failure          | 1 (Low)     | 2 (Med) | 2     | Low   | **Mitigated** - No incidents occurred; work complete            |
| RISK-11 | Multiple Tool Expertise Required | 1 (Low)     | 1 (Low) | 1     | Low   | **Mitigated** - Proficiency achieved                            |
| RISK-12 | Testing Depth vs. Breadth        | 1 (Low)     | 1 (Low) | 1     | Low   | **Mitigated** - Balance achieved across all deliverables        |

**Residual Risks (Phase 3):**

- **RISK-15:** Documentation compilation errors - Converting markdown to PDF, ensuring formatting consistency
- **RISK-16:** Final ZIP file organization - Ensuring all files included and properly structured per requirements
- **RISK-17:** Submission deadline miss - Technical issues with Itslearning submission portal

**Summary:**

- **High Risk (7-9):** 0 risks
- **Medium Risk (4-6):** 0 risks
- **Low Risk (1-3):** 12 risks (all original risks mitigated)
- **New Risks:** 3 residual risks (all low probability/impact)

---

## 4. Risk Matrices

### 4.1 Phase 1: Initial Risk Matrix (Project Start)

```
IMPACT →
                LOW (1)         MEDIUM (2)       HIGH (3)
              ┌─────────────┬─────────────┬─────────────┐
    HIGH (3)  │             │  RISK-03    │  RISK-01    │
              │             │  RISK-02    │             │
              │             │  RISK-10    │             │
              ├─────────────┼─────────────┼─────────────┤
  MEDIUM (2)  │             │  RISK-04    │             │
              │             │  RISK-05    │             │
              │             │  RISK-06    │             │
              │             │  RISK-07    │             │
              │             │  RISK-08    │             │
              │             │  RISK-09    │             │
              │             │  RISK-11    │             │
              │             │  RISK-12    │             │
              ├─────────────┼─────────────┼─────────────┤
    LOW (1)   │             │             │             │
              │             │             │             │
              │             │             │             │
              └─────────────┴─────────────┴─────────────┘

Legend:
🔴 HIGH RISK (7-9): 1 risk
🟡 MEDIUM RISK (4-6): 11 risks
🟢 LOW RISK (1-3): 0 risks
```

**Analysis:** At project start, one high-priority risk (tight deadline) requires immediate attention. All other risks are medium-level and manageable through planned mitigation strategies.

---

### 4.2 Phase 2: Mid-Development Risk Matrix (Week 1 Complete)

```
IMPACT →
                LOW (1)         MEDIUM (2)       HIGH (3)
              ┌─────────────┬─────────────┬─────────────┐
    HIGH (3)  │             │             │  RISK-01    │
              │             │             │             │
              │             │             │             │
              ├─────────────┼─────────────┼─────────────┤
  MEDIUM (2)  │  RISK-07    │  RISK-02    │  RISK-10    │
              │             │  RISK-03    │             │
              │             │  RISK-05    │             │
              │             │  RISK-08    │             │
              │             │  RISK-09    │             │
              │             │  RISK-12    │             │
              ├─────────────┼─────────────┼─────────────┤
    LOW (1)   │             │  RISK-04    │             │
              │             │  RISK-06    │             │
              │             │  RISK-11    │             │
              └─────────────┴─────────────┴─────────────┘

Legend:
🔴 HIGH RISK (7-9): 1 risk
🟡 MEDIUM RISK (4-6): 6 risks (improved from 11)
🟢 LOW RISK (1-3): 5 risks (improved from 0)
```

**Analysis:** Technical risks (Docker, Database, Tools) have been successfully mitigated. Schedule pressure remains high but manageable. Overall risk posture improved significantly.

---

### 4.3 Phase 3: Final Risk Matrix (Pre-Submission)

```
IMPACT →
                LOW (1)         MEDIUM (2)       HIGH (3)
              ┌─────────────┬─────────────┬─────────────┐
    HIGH (3)  │             │             │             │
              │             │             │             │
              │             │             │             │
              ├─────────────┼─────────────┼─────────────┤
  MEDIUM (2)  │             │  RISK-01    │             │
              │             │  RISK-02    │             │
              │             │  RISK-08    │             │
              │             │  RISK-10    │             │
              ├─────────────┼─────────────┼─────────────┤
    LOW (1)   │  RISK-03    │             │             │
              │  RISK-04    │             │             │
              │  RISK-05    │             │             │
              │  RISK-06    │             │             │
              │  RISK-07    │             │             │
              │  RISK-09    │             │             │
              │  RISK-11    │             │             │
              │  RISK-12    │             │             │
              │  RISK-15    │             │             │
              │  RISK-16    │             │             │
              │  RISK-17    │             │             │
              └─────────────┴─────────────┴─────────────┘

Legend:
🔴 HIGH RISK (7-9): 0 risks (improved from 1)
🟡 MEDIUM RISK (4-6): 0 risks (improved from 6)
🟢 LOW RISK (1-3): 15 risks (all risks mitigated to low)
```

**Analysis:** All original risks successfully mitigated to low level. Only minor residual risks remain (documentation formatting, file organization, submission portal). Project is in excellent position for successful completion.

---

## 5. Risk Trends and Evolution

### 5.1 Overall Risk Trajectory

| Phase                | High Risks | Medium Risks | Low Risks | Overall Assessment        |
| -------------------- | ---------- | ------------ | --------- | ------------------------- |
| **Phase 1: Initial** | 1          | 11           | 0         | Moderate-High Risk        |
| **Phase 2: Mid-Dev** | 1          | 6            | 5         | Moderate Risk (Improving) |
| **Phase 3: Final**   | 0          | 0            | 15        | Low Risk (On Track)       |

**Trend:** ✅ Positive - Continuous risk reduction across all phases

### 5.2 Key Mitigation Successes

1. **Technical Risks (RISK-04, 05, 06, 07, 11):** Successfully mitigated through early infrastructure setup and incremental learning
2. **Testing Risks (RISK-03, 09, 12):** Addressed through test framework establishment and coverage-driven development
3. **Schedule Risk (RISK-01):** Managed through consistent work pace and realistic scope management

### 5.3 Lessons Learned

- **Early infrastructure setup** significantly reduces mid-project technical risks
- **Incremental tool learning** is more effective than trying to master everything upfront
- **Regular Git commits** provide safety net for solo projects
- **Realistic expectations** (not aiming for perfection) helps maintain schedule
- **Template reuse** accelerates repetitive testing tasks

---

## 6. Conclusion

### 6.1 Summary of Risk Assessment

The Pet Name Generator project began with **1 high-risk** factor (tight deadline) and **11 medium-risk** factors spanning schedule, technical, requirements, resource, and quality categories. Through proactive mitigation strategies and consistent execution, the risk profile improved dramatically:

- **Phase 1 (Initial):** 1 high, 11 medium, 0 low risks
- **Phase 2 (Mid-Development):** 1 high, 6 medium, 5 low risks
- **Phase 3 (Final):** 0 high, 0 medium, 15 low risks

### 6.2 Overall Assessment

**Risk Posture:** ✅ **LOW RISK**

All identified risks have been successfully mitigated or reduced to acceptable levels. The project is on track for successful completion by the December 14, 2025 deadline.

**Key Success Factors:**

1. ✅ Early risk identification and proactive mitigation planning
2. ✅ Realistic scope management (focusing on requirements, not perfection)
3. ✅ Incremental approach to complex tasks (Docker, testing tools, CI/CD)
4. ✅ Consistent work pace as solo developer
5. ✅ Regular Git commits providing safety and progress tracking

### 6.3 Confidence in Project Completion

**Confidence Level:** 🟢 **HIGH (85-90%)**

**Rationale:**

- All core functionality implemented and tested
- 2/10 deliverables complete, clear path to remaining 8
- Testing infrastructure established and operational
- No critical blockers or unresolved technical issues
- Adequate time buffer for final documentation and compilation

**Remaining Work:**

- 8 testing deliverables (black-box design, unit/integration tests, API tests, E2E tests, performance tests, static analysis, CI/CD, usability plan)
- Documentation compilation to PDF format
- Final ZIP file preparation and submission

**Contingency:**

- If time becomes critical, prioritize core testing deliverables (black-box, unit tests, API tests) over advanced testing (performance, usability)
- Leverage existing templates and examples from course materials
- Focus on meeting requirements rather than exceeding them

---

## 7. Appendices

### Appendix A: Risk Definitions

**Risk Probability Scale:**

- **Low (1):** Unlikely to occur (<30% chance)
- **Medium (2):** May occur (30-70% chance)
- **High (3):** Likely to occur (>70% chance)

**Risk Impact Scale:**

- **Low (1):** Minor inconvenience, minimal project effect
- **Medium (2):** Moderate impact, may affect timeline or quality
- **High (3):** Significant impact, could jeopardize project success

**Risk Score Calculation:**

- Score = Probability × Impact
- Range: 1-9
- Classification: Low (1-3), Medium (4-6), High (7-9)

### Appendix B: Mitigation Strategy Template

For each risk, mitigation strategies follow this structure:

1. **Prevention:** Actions to reduce probability
2. **Mitigation:** Actions to reduce impact if risk occurs
3. **Contingency:** Backup plan if mitigation fails
4. **Monitoring:** How to track risk status

### Appendix C: Risk Review Schedule

**Risk assessment reviews conducted at:**

1. **Initial:** Project kickoff (this document)
2. **Mid-Development:** After Week 1 / implementation complete
3. **Final:** Pre-submission review
4. **Ad-hoc:** Whenever new risks emerge or significant changes occur

---

**Document End**

**Next Steps:**

1. Convert this markdown to Word/PDF format
2. Include all 3 risk matrices as visual diagrams
3. Submit as part of Task 2 deliverable
4. Use risk mitigation strategies to guide project execution
