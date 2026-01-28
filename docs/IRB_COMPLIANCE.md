# IRB Compliance Documentation - Writing Defense Platform

## Overview

This document provides the framework for Institutional Review Board (IRB) approval and ethical research compliance for the Writing Defense Platform.

## Research Classification

**Study Type**: Human Subjects Research (Educational Technology)

**Risk Level**: Minimal Risk
- No deception involved
- No sensitive personal data collected (without consent)
- Voluntary participation
- No vulnerable populations targeted
- Educational benefit to participants

**IRB Category**: Expedited Review (likely Category 7: Research on group characteristics or behavior)

## Research Objectives

### Primary Research Questions

**T1: Detector Bias Investigation**
- Do AI detectors disproportionately flag L2 writers?
- What linguistic features correlate with false positives?
- How does burstiness predict AI detection risk?

**T2: Pedagogical Impact**
- Does visibility into detection mechanisms improve metacognition?
- Can students learn to balance authenticity and safety?
- Does source synthesis improve with real-time feedback?

### Hypotheses

1. **H1**: Burstiness score correlates negatively with AI detection (r > 0.60)
2. **H2**: L2 writers show measurable improvement in synthesis independence over 10 sessions
3. **H3**: Shadow system visibility increases user agency and confidence

## Participant Recruitment

### Inclusion Criteria

- Age 18+ (adults only)
- Currently enrolled in university (undergraduate or graduate)
- L2 English writers (any native language background)
- Access to computer with modern browser
- Basic computer literacy

### Exclusion Criteria

- Under 18 years old
- Native English speakers (for L2-focused study)
- Unable to provide informed consent
- No computer/internet access

### Recruitment Methods

1. **Classroom Announcements**: Partner with ESL/composition instructors
2. **Flyers**: Post in writing centers, international student offices
3. **Email Lists**: University writing program mailing lists
4. **Social Media**: Targeted ads for L2 student groups
5. **Word of Mouth**: Participant referrals (snowball sampling)

### Sample Size

**Phase 1 (Beta)**: 50-100 participants
- Sufficient for pilot validation
- Establishes baseline metrics
- Tests technical reliability

**Phase 2 (Full Study)**: 200-500 participants
- Statistical power for correlation analysis
- Longitudinal tracking (1 semester)
- Subgroup analysis by proficiency level

### Compensation

**Proposed**: $25 Amazon gift card for completing 10 writing sessions
- Pro-rated: $2.50 per session completed
- Alternative: Extra credit (if partnered with courses)
- No compensation required for app use (purely voluntary)

## Informed Consent Process

### Consent Form Elements

1. **Study Purpose**: Clearly explain research goals
2. **Procedures**: What participants will do
3. **Duration**: Time commitment per session
4. **Risks**: Minimal; potential for self-consciousness about writing
5. **Benefits**: Learning tool; contributes to research
6. **Confidentiality**: How data will be protected
7. **Voluntary**: Can withdraw anytime without penalty
8. **Contact Info**: Research team + IRB office

### Consent Workflow

```
User opens app (first time)
  ↓
Splash screen: "Welcome to Research Study"
  ↓
Present consent form (scrollable, full text)
  ↓
Quiz: 3 questions to verify understanding
  ├─ "Can you withdraw at any time?" [Yes/No]
  ├─ "Will your identity be shared?" [Yes/No]
  └─ "Is participation required?" [Yes/No]
  ↓
If all correct → Proceed to consent
If incorrect → Re-explain, retry quiz
  ↓
Consent decision:
  ├─ Accept → Data used for research
  ├─ Decline → App still usable, no data collected
  └─ "I'll decide later" → Ask again in 3 sessions
  ↓
Document consent: Timestamp, IP (hashed), version
  ↓
Continue to app
```

### Consent Variations

**Tier 1: App Use Only (No Consent)**
- Use app as personal tool
- Data stays local
- No research participation

**Tier 2: Anonymized Metrics (Minimal Consent)**
- Aggregate metrics only (word count, scores)
- No text content shared
- De-identified session logs

**Tier 3: Full Research Participation (Full Consent)**
- Anonymized text samples
- Session keystroke logs
- Baseline profiles
- Optional: Demographics survey

**Tier 4: Interview Participation (Additional Consent)**
- Video/audio interviews
- Think-aloud protocols
- Separate consent form

## Data Collection & Management

### Data Types Collected

**With Consent (Tier 2+)**:

1. **Session Metrics** (anonymized)
   - Humanity scores
   - Burstiness values
   - Shadow scores
   - Stumble events
   - Session duration

2. **Text Samples** (de-identified, Tier 3)
   - Sentences (not full essays)
   - No personally identifiable information
   - Academic writing only

3. **Baseline Profiles** (de-identified, Tier 3)
   - Linguistic fingerprints
   - No names or student IDs
   - Proficiency estimates

4. **Demographics** (optional, Tier 3)
   - Native language
   - CEFR level (self-reported)
   - Years studying English
   - Academic major

**Never Collected**:
- Real names
- Student IDs
- Email addresses (except for compensation)
- Social Security Numbers
- Financial information
- IP addresses (stored unencrypted)

### De-identification Protocol

**Participant IDs**: Randomly generated, no connection to identity
```
user_7f3a8b2c9d1e  (UUID v4)
```

**Data Separation**:
- Identity table: Name ↔ Participant ID (encrypted, separate database)
- Research data: Participant ID ↔ Metrics (no names)

**Key Management**:
- Encryption keys stored separately from data
- Only PI has access to identity table
- Research assistants see only anonymized data

### Data Storage

**During Study**:
- Encrypted local storage (participant device)
- Optional: Encrypted cloud backup (if participant opts in)
- Aggregate data: University secure server

**Post-Study**:
- Raw data: Destroyed after 2 years (or upon participant request)
- Anonymized datasets: Retained for publication + replication
- Code repository: Public (GitHub) with no participant data

### Data Sharing

**Internal**: Research team only (PI + authorized RAs)

**External**: 
- Anonymized aggregate data (publications, conferences)
- Public dataset (if participants consent): No text samples, metrics only

**Third Parties**: Never (no commercial sharing)

## Privacy & Security Measures

### Technical Safeguards

1. **Encryption**:
   - Data at rest: AES-256
   - Data in transit: TLS 1.3
   - Browser storage: IndexedDB (encrypted by OS)

2. **Access Control**:
   - Role-based permissions (PI, RAs, participants)
   - Two-factor authentication for research team
   - Audit logs for all data access

3. **Secure Deletion**:
   - Participant-initiated deletion: Immediate
   - Study completion: 2-year retention, then permanent deletion
   - Verified deletion (not just "marked deleted")

### Organizational Safeguards

1. **Training**:
   - CITI Program certification (all research team)
   - Data handling protocols
   - Confidentiality agreements

2. **Policies**:
   - Data retention policy (2 years max)
   - Breach response plan
   - Participant withdrawal protocol

3. **Monitoring**:
   - Quarterly security audits
   - IRB annual reviews
   - Incident reporting

## Risks & Mitigation

### Potential Risks

**1. Psychological Discomfort**
- **Risk**: User feels self-conscious about writing being analyzed
- **Likelihood**: Low
- **Mitigation**:
  - Emphasize learning, not judgment
  - Normalize "low scores" as developmental opportunities
  - Provide supportive tone in all feedback

**2. Data Breach**
- **Risk**: Unauthorized access to participant data
- **Likelihood**: Very Low
- **Mitigation**:
  - Encryption at rest and in transit
  - No personally identifiable data stored with research data
  - Separate identity database

**3. Stigmatization**
- **Risk**: Participants feel labeled as "AI-likely" due to low scores
- **Likelihood**: Low
- **Mitigation**:
  - Frame as "detector bias," not user deficiency
  - Emphasize injustice of current systems
  - Positive framing: "Your authentic voice is valuable"

**4. Academic Integrity Concerns**
- **Risk**: Participants use tool to evade legitimate detection
- **Likelihood**: Moderate
- **Mitigation**:
  - Educational focus, not evasion
  - Partner with instructors to clarify appropriate use
  - Ethical guidelines in user training

### Emergency Contacts

**Participant Distress**:
- Refer to university counseling center
- Contact research PI immediately
- Document incident per IRB protocol

**Data Breach**:
- Notify IRB within 24 hours
- Inform affected participants
- Implement containment measures

## Withdrawal Protocol

### Participant Rights

- **Withdraw anytime**: No questions asked, no penalty
- **Partial withdrawal**: Stop data collection but keep using app
- **Data deletion**: Request deletion of all collected data

### Withdrawal Process

```
User selects "Withdraw from Study"
  ↓
Confirm: "Are you sure? This will:"
  ├─ Stop data collection
  ├─ Delete your research data
  ├─ [Optional] Disable app access
  ↓
If confirmed:
  ├─ Flag account as "withdrawn"
  ├─ Queue data for deletion (7-day grace period)
  ├─ Notify research team (PI review)
  ├─ Send confirmation email
  └─ Generate deletion certificate
  ↓
7 days later: Permanent deletion
```

**Grace Period**: 7 days before permanent deletion (allows users to undo)

## IRB Application Checklist

### Required Documents

- [ ] Protocol narrative
- [ ] Consent form(s)
- [ ] Recruitment materials (flyers, emails)
- [ ] Data management plan
- [ ] Security safeguards documentation
- [ ] Participant compensation justification
- [ ] App screenshots (UI examples)
- [ ] Quiz questions (comprehension check)
- [ ] Withdrawal protocol
- [ ] CITI training certificates (research team)
- [ ] Conflict of interest disclosure
- [ ] Data sharing agreement (if applicable)

### Timeline

**Week 1**: Prepare application
**Week 2**: Submit to IRB
**Weeks 3-6**: IRB review (expedited: 2-4 weeks)
**Week 7**: Address IRB questions/revisions
**Week 8**: Approval granted
**Week 9**: Begin recruitment

## Ongoing Compliance

### Annual Review

- **Due Date**: 12 months from approval date
- **Contents**:
  - Enrollment numbers
  - Adverse events (if any)
  - Protocol modifications
  - Data management updates
  - Continued need for study

### Modifications

**When to Submit Amendment**:
- Change in consent procedures
- New data collection methods
- Change in risk level
- Change in recruitment methods

**Amendment Process**:
1. Prepare modification memo
2. Submit to IRB
3. Wait for approval (do not implement until approved)

### Adverse Event Reporting

**Reportable Events**:
- Data breach
- Participant distress requiring intervention
- Unanticipated risks

**Reporting Timeline**:
- Serious events: 24 hours
- Non-serious events: Next annual review

## Publication & Dissemination

### Data Availability Statement

**Proposed Statement**:
> "Anonymized aggregate data supporting this study are available upon reasonable request to the corresponding author. Individual-level data cannot be shared due to IRB restrictions and participant privacy. Analysis code is publicly available at [GitHub URL]."

### Participant Attribution

**Acknowledgment Section**:
> "We thank the 247 student participants who contributed their writing to this research. This study would not have been possible without their generosity and trust."

**No Individual Naming**: Participants remain anonymous in all publications

## Ethical Considerations

### Beneficence

**Benefits to Participants**:
- Learning tool for writing development
- Awareness of AI detection bias
- Contribution to research on educational equity

**Benefits to Society**:
- Evidence of detector bias
- Improved pedagogical tools
- Advocacy for L2 writers

### Justice

**Equitable Selection**:
- Recruitment across proficiency levels
- Multiple language backgrounds represented
- No exclusion based on writing quality

**Fair Compensation**:
- Compensated for time
- Compensation not coercive

### Respect for Persons

**Autonomy**:
- Voluntary participation
- Informed consent
- Right to withdraw
- Control over data

**Decisional Capacity**:
- Adult participants only
- Comprehension quiz ensures understanding
- No vulnerable populations

## Contact Information

### Research Team

**Principal Investigator**:
- Name: [PI Name]
- Email: [PI Email]
- Phone: [PI Phone]

**Research Assistants**:
- [RA Names and Contact]

### IRB Office

**Institution**: [University Name]
- IRB Office Phone: [Phone]
- IRB Office Email: [Email]
- IRB Protocol Number: [To be assigned]

## Appendices

### Appendix A: Sample Consent Form
[See separate document: CONSENT_FORM.md]

### Appendix B: Recruitment Flyer
[See separate document: RECRUITMENT_FLYER.md]

### Appendix C: Comprehension Quiz
[See separate document: CONSENT_QUIZ.md]

### Appendix D: Data Management Plan
[See separate document: DATA_MANAGEMENT_PLAN.md]

---

**Version**: 1.0  
**Last Updated**: January 2026  
**Status**: Draft for IRB Submission
