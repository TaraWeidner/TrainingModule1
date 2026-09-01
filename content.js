window.TRAINING_CATALOG = {
  version: "2026.09-draft1",
  reviewed: "September 1, 2026",
  passingScore: 80,
  modules: [
    {
      id: "1.1",
      title: "HIPAA, WA Privacy, 42 CFR Part 2 & Minor Privacy",
      description: "Core privacy training covering PHI, permitted uses and disclosures, Washington-specific privacy, current Part 2 rules, adolescent confidentiality, security safeguards, and breach response.",
      audience: "All workforce members",
      estimate: "45–60 min",
      available: true
    },
    { id: "1.2", title: "OSHA & HazMat", description: "Hazard communication, SDS use, PPE selection, hazardous materials, spill response, and safe disposal.", audience: "Role dependent", estimate: "30–45 min", available: false },
    { id: "1.3", title: "Infection Control", description: "Standard precautions, hand hygiene, PPE, transmission-based precautions, safe injections, cleaning, disinfection, and exposure response.", audience: "All clinic roles", estimate: "40–50 min", available: false },
    { id: "1.4", title: "Workplace Violence Prevention", description: "Risk recognition, de-escalation, personal safety, reporting, and clinic response procedures.", audience: "All clinic roles", estimate: "30–40 min", available: false },
    { id: "1.5", title: "Fraud, Waste & Abuse", description: "Billing integrity, documentation, coding accuracy, medical necessity, FWA red flags, and reporting.", audience: "All workforce members", estimate: "30–40 min", available: false },
    { id: "1.6", title: "Mandatory Reporting", description: "Washington reporting obligations, child and vulnerable-adult abuse, safety escalation, documentation, and duty-to-protect concepts.", audience: "All clinic roles", estimate: "35–45 min", available: false },
    { id: "1.7", title: "OSHA Bloodborne Pathogens", description: "Blood and OPIM exposure risks, standard precautions, sharps safety, HBV vaccination, and post-exposure response.", audience: "Clinical / exposure-risk roles", estimate: "35–45 min", available: false },
    { id: "1.8", title: "Emergency Action Plan & Fire Safety", description: "Evacuation, shelter-in-place, lockdown, fire response, utility failures, emergency equipment, and drills.", audience: "All clinic roles", estimate: "30–40 min", available: false },
    { id: "1.9", title: "CLIA Waived Testing", description: "Manufacturer instructions, QC, specimen collection, test performance, documentation, corrective action, and competency.", audience: "Testing personnel", estimate: "35–45 min", available: false },
    { id: "1.10", title: "Cybersecurity Awareness & Data Security", description: "Phishing, passwords, MFA, workstation security, secure EHR use, mobile devices, and cyber incident reporting.", audience: "All workforce members", estimate: "30–40 min", available: false },
    { id: "1.11", title: "Risk Management & Incident Reporting", description: "Near misses, adverse events, objective reporting, just culture, root-cause analysis, and corrective action.", audience: "All workforce members", estimate: "30–40 min", available: false }
  ],

  course11: {
    id: "1.1",
    title: "HIPAA, WA Privacy, 42 CFR Part 2 & Minor Privacy",
    kicker: "Module 1.1 • Advanced Clinic Edition",
    lessons: [
      {
        id: "foundations",
        title: "1. Privacy Foundations",
        html: `
          <div class="lesson-inner">
            <p class="eyebrow">Lesson 1</p>
            <h2>Privacy starts with knowing what you are protecting.</h2>
            <p class="lead">Protected health information is broader than a diagnosis. It includes individually identifiable information connected to health care, payment, or health status — whether spoken, written, electronic, or visual.</p>
            <div class="comparison-grid">
              <div class="mini-card"><h3>Privacy</h3><p>Rules governing <strong>who</strong> may access, use, or receive health information.</p></div>
              <div class="mini-card"><h3>Security</h3><p>Safeguards governing <strong>how</strong> electronic protected health information is protected.</p></div>
            </div>
            <h3>Common PHI in a clinic</h3>
            <ul>
              <li>Name, date of birth, contact information, photographs, and medical record numbers</li>
              <li>Appointment dates, diagnoses, medication lists, test results, and treatment plans</li>
              <li>Insurance, billing, claim, and payment information</li>
              <li>Conversations or messages that identify a patient and reveal health information</li>
            </ul>
            <div class="learning-callout"><strong>Minimum necessary</strong>When the minimum-necessary standard applies, access only the information needed to perform your job. Curiosity is never a job duty. Treatment disclosures have important exceptions to the minimum-necessary rule, but workforce access should still follow role-based permissions and clinic policy.</div>
            <h3>Designated record set</h3>
            <p>The designated record set generally includes medical and billing records used to make decisions about an individual. HIPAA access and amendment rights attach to this concept, which is broader than a single progress note.</p>
          </div>`,
        check: {
          question: "A front-desk employee opens a neighbor’s chart just to see whether the neighbor is a patient. Which principle is most directly violated?",
          options: ["Treatment exception", "Minimum necessary / role-based access", "Public records law", "Incidental disclosure rule"],
          correct: 1,
          explanation: "Access must be tied to a legitimate job function. Curiosity-based access is not permitted."
        }
      },
      {
        id: "uses",
        title: "2. Uses & Disclosures",
        html: `
          <div class="lesson-inner">
            <p class="eyebrow">Lesson 2</p>
            <h2>Know when information may be shared — and when authorization is needed.</h2>
            <p class="lead">HIPAA permits many routine uses and disclosures without a separate written authorization, especially for treatment, payment, and health care operations. Other disclosures require authorization or a specific legal basis.</p>
            <div class="comparison-grid">
              <div class="mini-card"><h3>Treatment</h3><p>Care coordination, consultation, and many provider-to-provider exchanges.</p></div>
              <div class="mini-card"><h3>Payment</h3><p>Eligibility, claims, billing, prior authorization, and payment activities.</p></div>
              <div class="mini-card"><h3>Operations</h3><p>Quality improvement, internal audits, training, and other permitted operations.</p></div>
              <div class="mini-card"><h3>Authorization</h3><p>Often required for uses or disclosures outside permitted HIPAA pathways, such as many employer, marketing, or third-party requests.</p></div>
            </div>
            <h3>Psychotherapy notes are different</h3>
            <p>HIPAA gives psychotherapy notes special protection when they meet the regulatory definition and are maintained separately from the rest of the medical record. Most routine mental-health information in a medical record is <em>not</em> automatically a psychotherapy note.</p>
            <div class="learning-callout"><strong>Legal requests are not all the same.</strong>A fax from an attorney, a subpoena, and a court order are different. Do not improvise. Route legal demands and uncertain releases through the clinic’s designated privacy/records process.</div>
          </div>`,
        check: {
          question: "A specialist asks for information needed to treat a shared patient. What should staff do first?",
          options: ["Assume every disclosure requires a HIPAA authorization", "Follow the clinic’s treatment-disclosure workflow and verify the request/recipient", "Refuse all provider-to-provider disclosures", "Send the entire chart automatically"],
          correct: 1,
          explanation: "Treatment disclosures are commonly permitted without a separate HIPAA authorization, but identity, recipient, scope, and clinic workflow still matter."
        }
      },
      {
        id: "washington",
        title: "3. Washington Privacy",
        html: `
          <div class="lesson-inner">
            <p class="eyebrow">Lesson 3</p>
            <h2>Washington adds privacy considerations beyond the basic HIPAA framework.</h2>
            <p class="lead">State law can provide protections that interact with HIPAA. Staff should use clinic policy and escalate uncertain disclosures rather than relying on memory alone.</p>
            <h3>My Health My Data Act</h3>
            <p>Washington’s My Health My Data Act was designed to protect consumer health data that may fall outside HIPAA. It reaches certain health-related information and inferences collected by regulated entities and includes requirements around notices, consent, sharing, selling, and geofencing.</p>
            <div class="learning-callout"><strong>Important distinction</strong>Do not teach “MHMD applies to every piece of HIPAA PHI in the same way.” The statute contains exemptions and was specifically created to reach health data outside traditional HIPAA coverage. Inclusive Health should follow its approved privacy policy for any MHMD-specific workflow.</div>
            <h3>Sensitive services</h3>
            <p>Reproductive health, sexual health, gender-affirming care, HIV-related information, behavioral health, and substance-use information can carry additional confidentiality, discrimination, safety, or legal risk. Even when disclosure is legally permitted, avoid unnecessary detail and inadvertent outing.</p>
            <h3>Practical safeguards</h3>
            <ul>
              <li>Use neutral appointment wording when a sensitive service could be exposed through portals, reminders, or shared devices.</li>
              <li>Confirm safe contact methods when confidentiality is a concern.</li>
              <li>Do not reveal that someone is a patient to an unverified spouse, partner, family member, employer, or caller.</li>
            </ul>
          </div>`,
        check: {
          question: "Which statement about Washington’s My Health My Data Act is safest and most accurate for staff training?",
          options: ["It simply duplicates HIPAA", "It was designed in part to protect consumer health data outside HIPAA and must be handled through approved policy", "It applies only to hospitals", "It allows health-data sales with no consent"],
          correct: 1,
          explanation: "Washington describes MHMD as a privacy law designed to protect personal health data outside HIPAA’s ambit."
        }
      },
      {
        id: "part2",
        title: "4. 42 CFR Part 2",
        html: `
          <div class="lesson-inner">
            <p class="eyebrow">Lesson 4</p>
            <h2>Part 2 changed. Train to the current rule, not the old shorthand.</h2>
            <p class="lead">42 CFR Part 2 protects records from federally assisted substance-use-disorder programs. HHS’s 2024 Final Rule became mandatory for compliance on February 16, 2026 and aligned important parts of Part 2 more closely with HIPAA.</p>
            <h3>What staff should remember</h3>
            <ul>
              <li>Part 2 does not automatically apply to every mention of substance use in every medical record; applicability depends on the record and program context.</li>
              <li>The 2024 Final Rule permits a single consent for future treatment, payment, and health care operations uses/disclosures in circumstances covered by the rule.</li>
              <li>Part 2 retains particularly strong restrictions on using SUD records to investigate or prosecute a patient.</li>
              <li>SUD counseling notes have separate protections under the updated rule.</li>
              <li>Never guess whether a disclosure is permitted. Use the clinic’s approved Part 2 workflow.</li>
            </ul>
            <div class="learning-callout"><strong>Old rule alert</strong>“Part 2 information can never be redisclosed to another provider without a new consent” is no longer a safe universal training statement. The 2024 Final Rule changed consent and redisclosure rules.</div>
          </div>`,
        check: {
          question: "Which statement reflects the current Part 2 framework after the 2024 Final Rule?",
          options: ["Part 2 was abolished", "Every SUD mention in any chart is automatically Part 2", "Part 2 remains protective but now permits a single consent for future TPO disclosures in applicable circumstances", "Part 2 records may always be used in criminal investigations"],
          correct: 2,
          explanation: "HHS aligned Part 2 more closely with HIPAA for treatment, payment, and health care operations while retaining important SUD-specific protections."
        }
      },
      {
        id: "minors",
        title: "5. WA Minor Privacy",
        html: `
          <div class="lesson-inner">
            <p class="eyebrow">Lesson 5</p>
            <h2>Minor confidentiality follows the service, age, consent pathway, and specific law.</h2>
            <p class="lead">Washington allows minors to independently consent to certain services. When the minor is legally authorized to consent, confidentiality and portal/records workflows require special care.</p>
            <div class="comparison-grid">
              <div class="mini-card"><h3>Any age</h3><p>Washington DOH identifies emergency care, birth control, abortion, and prenatal care among services a minor may access independently.</p></div>
              <div class="mini-card"><h3>Age 13+</h3><p>Outpatient mental-health treatment and outpatient substance-use-disorder treatment.</p></div>
              <div class="mini-card"><h3>Age 14+</h3><p>Testing and treatment for sexually transmitted infections under RCW 70.24.110.</p></div>
              <div class="mini-card"><h3>Other care</h3><p>Parental/guardian consent is generally needed unless another legal pathway applies, such as emancipation or mature-minor doctrine.</p></div>
            </div>
            <div class="learning-callout"><strong>Portal risk</strong>A confidentiality failure can happen without anyone “releasing records.” Proxy portal access, appointment labels, text reminders, pharmacy notices, and insurance EOBs can expose sensitive care.</div>
            <h3>Front-desk rule</h3>
            <p>When a parent requests information about a teen’s visit, do not decide based only on the fact that they are the parent. Verify what service was provided, who consented, what access is legally permitted, and what the clinic’s adolescent-confidentiality workflow requires.</p>
          </div>`,
        check: {
          question: "In Washington, what is the general age threshold in RCW 70.24.110 for a minor to consent to STI diagnosis/treatment?",
          options: ["12", "13", "14", "16"],
          correct: 2,
          explanation: "RCW 70.24.110 uses age 14 or older for STI-related diagnosis and treatment."
        }
      },
      {
        id: "security",
        title: "6. Security Safeguards",
        html: `
          <div class="lesson-inner">
            <p class="eyebrow">Lesson 6</p>
            <h2>Privacy rules fail quickly when everyday security habits fail.</h2>
            <p class="lead">HIPAA’s Security Rule addresses administrative, physical, and technical safeguards for electronic PHI. Every workforce member contributes to those safeguards.</p>
            <div class="comparison-grid">
              <div class="mini-card"><h3>Administrative</h3><p>Training, risk analysis, policies, sanctions, incident response, access management.</p></div>
              <div class="mini-card"><h3>Physical</h3><p>Workstation placement, locked storage, visitor controls, device security.</p></div>
              <div class="mini-card"><h3>Technical</h3><p>Unique accounts, access controls, authentication, audit controls, encryption where appropriate.</p></div>
              <div class="mini-card"><h3>Human</h3><p>Lock screens, verify recipients, protect passwords, report phishing, avoid workarounds.</p></div>
            </div>
            <h3>Non-negotiable habits</h3>
            <ul>
              <li>Use your own login. Never share credentials.</li>
              <li>Lock the workstation whenever you step away.</li>
              <li>Verify fax, email, and portal recipients before sending PHI.</li>
              <li>Do not photograph or text PHI using unapproved personal apps or devices.</li>
              <li>Report a suspicious email, unexpected MFA prompt, lost device, or accidental disclosure immediately.</li>
            </ul>
          </div>`,
        check: {
          question: "You receive an MFA approval prompt you did not initiate. What is the best action?",
          options: ["Approve it to clear the alert", "Ignore it forever", "Deny it and report the suspicious authentication attempt through clinic procedure", "Send your password to IT by text"],
          correct: 2,
          explanation: "Unexpected MFA prompts may signal stolen credentials or an attempted account takeover."
        }
      },
      {
        id: "breach",
        title: "7. Privacy Incidents & Breaches",
        html: `
          <div class="lesson-inner">
            <p class="eyebrow">Lesson 7</p>
            <h2>Report first. Let the designated privacy process determine whether an incident is a breach.</h2>
            <p class="lead">An impermissible use or disclosure is generally presumed to be a breach unless an exception applies or a documented risk assessment demonstrates a low probability that PHI was compromised.</p>
            <h3>The four-factor risk assessment</h3>
            <ol>
              <li>Nature and extent of the PHI involved</li>
              <li>The unauthorized person who used or received it</li>
              <li>Whether PHI was actually acquired or viewed</li>
              <li>The extent to which risk was mitigated</li>
            </ol>
            <div class="learning-callout"><strong>No universal 30-day investigation deadline</strong>HIPAA requires required individual breach notifications without unreasonable delay and no later than 60 calendar days after discovery. Clinic policy may impose a much faster internal reporting deadline — and employees should report immediately.</div>
            <h3>Employee response</h3>
            <ol>
              <li>Stop or contain the exposure if you can do so safely.</li>
              <li>Notify the designated privacy/management contact immediately.</li>
              <li>Preserve facts: what happened, who was involved, what information was affected, and what mitigation occurred.</li>
              <li>Do not promise a patient that an event “is” or “is not” a HIPAA breach before review.</li>
            </ol>
          </div>`,
        check: {
          question: "You fax records to the wrong number. What should you do first?",
          options: ["Delete the fax confirmation and say nothing", "Immediately report the incident and attempt appropriate containment/mitigation", "Wait 30 days", "Call HHS before telling clinic leadership"],
          correct: 1,
          explanation: "Staff should promptly contain and escalate. The clinic then performs the required assessment and notification analysis."
        }
      },
      {
        id: "role",
        title: "8. Role-Based Practice",
        roleBased: true,
        html: `
          <div class="lesson-inner">
            <p class="eyebrow">Lesson 8</p>
            <h2>Apply the rules to the work you actually do.</h2>
            <p class="lead">This lesson changes with your selected role. The goal is not memorizing regulation numbers; it is recognizing when to proceed, when to protect information, and when to escalate.</p>
            <div id="roleScenarioHost"></div>
          </div>`
      },
      {
        id: "assessment",
        title: "9. Final Assessment",
        assessment: true,
        html: `<div class="lesson-inner"><p class="eyebrow">Final assessment</p><h2>Demonstrate what you know.</h2><p class="lead">You must score at least 80% to complete Module 1.1. You may retake the assessment. Your attempts and highest score are recorded locally on this browser.</p><div id="quizHost"></div></div>`
      },
      {
        id: "completion",
        title: "10. Attestation & Completion",
        completion: true,
        html: `<div class="lesson-inner"><p class="eyebrow">Completion</p><h2>Training attestation</h2><p class="lead">Completion requires a passing assessment and acknowledgement of your responsibility to follow current clinic policies and report questions or incidents promptly.</p><div id="completionHost"></div></div>`
      }
    ],

    roleScenarios: {
      reception: [
        {
          title: "The Curious Parent",
          text: "A parent calls for the STI test results of their 15-year-old child. The results are visible in the chart.",
          question: "What is the best response?",
          options: ["Give the results because the caller is the parent", "Do not disclose from the front desk; verify the confidential-care workflow and route appropriately", "Say whether the result is positive but not the details", "Ask the parent to guess the diagnosis"],
          correct: 1,
          explanation: "A 15-year-old may independently consent to STI care in Washington. Front-desk staff should not assume parental access and should follow the clinic’s confidential minor-care workflow."
        },
        {
          title: "The Ex-Partner",
          text: "A person says they are the patient’s spouse and asks when the patient’s next appointment is.",
          question: "What should you do?",
          options: ["Confirm the appointment", "Confirm only that the person is a patient", "Do not confirm patient status or scheduling information without appropriate authorization/verification", "Give the appointment date but not time"],
          correct: 2,
          explanation: "Relationship status alone does not authorize disclosure of patient status or appointment information."
        }
      ],
      ma: [
        {
          title: "Wrong Chart",
          text: "While rooming a patient, you open another patient’s chart and briefly see lab results before realizing the mistake.",
          question: "What should you do?",
          options: ["Close it and never tell anyone", "Report the privacy incident according to clinic procedure and document facts as directed", "Print the labs so you remember what happened", "Tell the patient whose chart you opened before notifying the clinic"],
          correct: 1,
          explanation: "Accidental access must be reported so the designated privacy process can determine whether an exception or breach analysis applies."
        },
        {
          title: "Texting a Wound Photo",
          text: "An offsite provider asks you to send a wound photo using your ordinary personal text messaging app.",
          question: "What is the best action?",
          options: ["Send it because a provider requested it", "Use only the clinic-approved secure workflow or escalate if no approved method is available", "Post it in a group text with the patient’s first name", "Remove the face and use any app"],
          correct: 1,
          explanation: "Use approved secure communication methods. Removing a face does not automatically remove all identifying information or make an unapproved app acceptable."
        }
      ],
      provider: [
        {
          title: "Sensitive Note Placement",
          text: "A teen independently receives confidential reproductive care. You are documenting the visit in an EHR with proxy portal access.",
          question: "What should you consider?",
          options: ["Document nothing", "Use the EHR’s approved confidential/restricted workflow and consider downstream portal, billing, and reminder exposure", "Put the sensitive diagnosis in every visible appointment field", "Give the proxy full access automatically"],
          correct: 1,
          explanation: "Accurate documentation is required, but the placement and visibility of confidential information matter."
        },
        {
          title: "SUD Records Request",
          text: "You receive records from a program that may be subject to 42 CFR Part 2 and are asked to disclose them externally.",
          question: "What is the safest approach?",
          options: ["Assume HIPAA alone answers every question", "Follow the clinic’s current Part 2 workflow and verify the consent/disclosure basis", "Never disclose the records under any circumstance", "Remove the SUD diagnosis and send the rest without review"],
          correct: 1,
          explanation: "Part 2 rules changed in 2026. Use the current consent/disclosure workflow rather than old blanket rules."
        }
      ],
      management: [
        {
          title: "Wrong-Recipient Fax",
          text: "Staff report that a fax containing PHI went to the wrong recipient, who says they destroyed it without reading it.",
          question: "What should management do?",
          options: ["Automatically call it a reportable breach", "Automatically close it because the recipient says they destroyed it", "Document and assess the incident using the HIPAA breach framework and mitigation evidence", "Wait until a patient complains"],
          correct: 2,
          explanation: "Impermissible disclosures require documented analysis. Whether notification is required depends on exceptions or the risk assessment, not a snap conclusion."
        },
        {
          title: "Audit Log Snooping",
          text: "An access audit shows an employee repeatedly opened charts of acquaintances without a work reason.",
          question: "What is the best response?",
          options: ["Ignore it if nothing was printed", "Investigate, preserve audit evidence, apply privacy/security and sanction policies consistently, and assess affected records", "Delete the audit logs", "Only ask the employee to stop verbally"],
          correct: 1,
          explanation: "Intentional inappropriate access is a serious privacy/security event and requires documented investigation and policy enforcement."
        }
      ]
    },

    quiz: {
      core: [
        { q: "Which statement best describes privacy versus security?", options: ["Privacy is who may use/receive information; security is how ePHI is safeguarded", "They are identical", "Security applies only to paper", "Privacy applies only to billing"], correct: 0 },
        { q: "A workforce member opens a chart solely out of curiosity. What is the best characterization?", options: ["Permitted if they work at the clinic", "Improper access without a job-related need", "Automatically permitted for operations", "Required by HIPAA"], correct: 1 },
        { q: "Which is commonly permitted without a separate HIPAA authorization?", options: ["Treatment, payment, and permitted health care operations", "Marketing unrelated to care", "Sending records to any employer that asks", "Posting patient details online"], correct: 0 },
        { q: "What changed under the 2024 Part 2 Final Rule?", options: ["Part 2 disappeared", "A single consent may cover future TPO uses/disclosures in applicable circumstances", "SUD records may always be used to prosecute patients", "HIPAA no longer applies to health care"], correct: 1 },
        { q: "Under Washington law, a minor generally may consent to STI diagnosis/treatment starting at what age?", options: ["12", "13", "14", "17"], correct: 2 },
        { q: "Which is an appropriate response to an unexpected MFA prompt?", options: ["Approve it", "Deny it and report it", "Share your password", "Turn off MFA"], correct: 1 },
        { q: "After an impermissible PHI disclosure, who determines whether breach notification is required?", options: ["The employee makes the final decision immediately", "The clinic’s designated privacy/breach process using applicable exceptions/risk assessment", "The patient’s employer", "The receptionist at another clinic"], correct: 1 },
        { q: "HIPAA individual breach notifications, when required, must be made:", options: ["Exactly 30 days after discovery", "Without unreasonable delay and no later than 60 calendar days after discovery", "Only at year-end", "Only if more than 500 people are affected"], correct: 1 }
      ]
    },

    sources: [
      { label: "HHS — Understanding 42 CFR Part 2", url: "https://www.hhs.gov/hipaa/part-2/index.html" },
      { label: "HHS — HIPAA Breach Notification Rule", url: "https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html" },
      { label: "WA Attorney General — My Health My Data", url: "https://www.atg.wa.gov/protecting-washingtonians-personal-health-data-and-privacy" },
      { label: "WA DOH — Confidentiality Roadmap for Providers Serving Youth", url: "https://doh.wa.gov/you-and-your-family/adolescents-young-adults/confidentiality-roadmap-providers-serving-youth" },
      { label: "RCW 70.24.110 — Minor STI consent", url: "https://app.leg.wa.gov/rcw/default.aspx?cite=70.24.110" },
      { label: "RCW 71.34.530 — Adolescent outpatient behavioral health", url: "https://app.leg.wa.gov/rcw/default.aspx?cite=71.34.530" }
    ]
  }
};
