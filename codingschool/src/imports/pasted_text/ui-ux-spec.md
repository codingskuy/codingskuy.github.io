# UI/UX Specification Document

# CodingSchool by CodingSkuy

> **The AI Engineering Mentor for OpenCode**

Version: 1.0  
Date: July 25, 2026

---

# 1. Design Vision

CodingSchool is **not** a traditional learning platform.

It is an **AI Engineering Workspace** that lives inside the developer workflow.

The landing page should immediately communicate three ideas within the first few seconds:

- This is built for developers.
- This is an OpenCode plugin.
- This is an AI Engineering Mentor—not another AI chatbot.

The overall experience should feel closer to **Warp**, **Ghostty**, **Claude Code**, and **OpenCode** than Udemy, Coursera, or Codecademy.

---

# 2. Design Philosophy

> **Built for Engineers. Inspired by Terminals.**

The interface should feel like a natural extension of the command line.

Instead of looking like a marketing website, it should resemble a premium engineering tool.

Every interaction should reinforce one message:

> **You are engineering software, not consuming content.**

---

# 3. Emotional Goals

When users visit CodingSchool, they should immediately think:

> "This isn't another coding course."

Followed by:

> "This looks like a real engineering tool."

Finally:

> "I want this inside my workflow."

---

# 4. Core Design Principles

## Developer First

Every UI decision prioritizes developers over marketing aesthetics.

---

## Calm Interface

Minimal distractions.

Large whitespace.

Simple layouts.

Clear hierarchy.

---

## Terminal Native

Use terminal-inspired visuals throughout the experience.

Examples:

- command prompts
- CLI outputs
- monospace typography
- progress bars
- status indicators

---

## Functional Beauty

Beauty should emerge from clarity—not decoration.

Avoid unnecessary visual effects.

---

## Confidence

The interface should communicate professionalism.

No playful illustrations.

No exaggerated animations.

No gimmicks.

---

# 5. Visual Identity

## Keywords

- Developer
- Terminal
- Modern
- Premium
- Technical
- Minimal
- Focused
- Calm
- Open Source
- Engineering

---

# 6. Color Palette

## Background

```
#0D1117
```

Primary application background.

---

## Surface

```
#161B22
```

Panels.

Cards.

Terminal containers.

---

## Elevated Surface

```
#1C2128
```

Hover cards.

Dialogs.

Floating elements.

---

## Border

```
#30363D
```

Subtle borders only.

---

## Primary

```
#4F8CFF
```

Buttons.

Links.

Highlights.

---

## Success

```
#3FB950
```

Completed lessons.

Passed tests.

Competency improvements.

---

## Warning

```
#D29922
```

Hints.

Recommendations.

---

## Danger

```
#F85149
```

Errors.

Failed tests.

Critical security findings.

---

## Text

Primary

```
#F0F6FC
```

Secondary

```
#8B949E
```

---

# 7. Typography

## UI

Inter

---

## Code

JetBrains Mono

---

## Philosophy

Body text uses Inter.

Anything related to engineering uses JetBrains Mono.

Examples:

```
$ install coding-school
```

```
> Diagnose completed
```

```
✔ Coach Agent Ready
```

---

# 8. Iconography

Use only:

- Lucide Icons

No 3D icons.

No illustrations.

No mascots.

No cartoon graphics.

---

# 9. Layout Principles

Use a 12-column responsive grid.

Large whitespace.

Minimal visual noise.

Consistent spacing.

Everything should feel balanced.

---

# 10. Hero Section

## Objective

Communicate product identity in less than five seconds.

---

## Layout

Left:

Headline

Subheadline

CTA

GitHub

Documentation

Right:

Animated terminal window.

---

## Headline

```
Become an Engineer.
Not an AI Copy-Paster.
```

---

## Subheadline

```
The free OpenCode plugin that teaches,
reviews,
and grows with you through real projects.
```

---

## CTA

Primary

```
Install Free
```

Secondary

```
View GitHub
```

---

## Hero Animation

Instead of showing a laptop mockup, display an interactive terminal session.

Example:

```bash
$ opencode install @codingskuy/coding-school

✔ Installing plugin...

✔ Learn Agent registered

✔ Coach Agent registered

✔ Loading student profile...

────────────────────────────

Knowledge

██████░░░░

Architecture

██░░░░░░░░

Debugging

████████░░

────────────────────────────

Ready to learn.
```

The animation should type naturally.

---

# 11. Navigation

Sticky.

Transparent initially.

Solid background while scrolling.

Items:

- Features
- Philosophy
- Documentation
- GitHub

Right side

Install Button

---

# 12. Sections

Landing page order should follow storytelling—not feature listing.

---

## Section 1

Hero

---

## Section 2

The Problem

Explain why AI coding assistants create dependency.

Comparison:

```
Prompt

↓

Copy

↓

Paste

↓

Forget
```

vs

```
Diagnose

↓

Understand

↓

Build

↓

Reflect

↓

Grow
```

---

## Section 3

Why CodingSchool

Explain:

- AI Mentor
- Diagnosis First
- Engineering Growth

---

## Section 4

Dual Agent

Large visual diagram.

```
             Student Model

             /           \

      Learn Agent    Coach Agent

 Diagnose          Code Review

 Teach             Architecture

 Quiz              Security

 Reflect           Mentoring
```

---

## Section 5

Competency Engine

Instead of XP.

Show engineering growth.

Example:

```
Knowledge

████████░░

Implementation

██████░░░░

Debugging

█████████░

Teaching

██░░░░░░░░
```

Engineering

```
Architecture

█████░░░░░

Testing

██░░░░░░░░

Git

███████░░░

Security

████░░░░░░
```

---

## Section 6

Workspace

Large OpenCode screenshot.

Highlight:

- Lesson
- Editor
- AI Mentor
- Live Preview
- Reflection

Use floating annotations.

---

## Section 7

Learning Journey

```
Install

↓

Diagnose

↓

Learn

↓

Build

↓

Review

↓

Reflect

↓

Grow
```

---

## Section 8

Open Source

Display:

GitHub stars

Downloads

Community

Contributors

MIT License

---

## Section 9

Final CTA

```
Install CodingSchool

Grow with Every Commit.
```

---

# 13. Buttons

Style

Rounded 10px

Medium weight

Minimal shadow

Hover

Subtle brightness increase.

---

# 14. Cards

Inspired by terminal panels.

Example

```
┌────────────────────────────┐

 Learn Agent

 Diagnose

 Teach

 Reflect

└────────────────────────────┘
```

No glassmorphism.

---

# 15. Progress Indicators

Never use colorful gamified bars.

Use terminal-inspired progress.

Example

```
Knowledge

██████░░░░

Architecture

████░░░░░░

Testing

██░░░░░░░░
```

---

# 16. Animations

Animations should feel like CLI feedback.

Examples

Typing cursor

```
█
```

Loading

```
Loading student profile...
```

Completed

```
✔ Completed
```

Error

```
✖ Build failed
```

Avoid dramatic animations.

Maximum duration:

300ms

---

# 17. Section Dividers

Instead of graphic dividers.

Use terminal separators.

Example

```
────────────────────────────────────────
```

or

```
// Dual Agent
```

or

```
// Competency Engine
```

---

# 18. Empty States

Use CLI language.

Example

```
No competency found.

Run your first lesson.
```

Instead of

"No data available."

---

# 19. Accessibility

Keyboard navigable.

WCAG AA contrast.

Visible focus states.

Screen-reader friendly.

Respect prefers-reduced-motion.

---

# 20. Responsive Behavior

Desktop

Three-column layouts.

---

Tablet

Two-column layouts.

---

Mobile

Single column.

Terminal animation becomes horizontally scrollable.

Navigation collapses.

---

# 21. Motion Principles

Animation should simulate developer workflows.

Examples

- Typing
- Loading
- Status updates
- Build completion
- Test execution

Avoid

- Floating objects
- Random particles
- Overly playful transitions

---

# 22. Design Rules

DO

✅ Minimal

✅ Technical

✅ Calm

✅ Functional

✅ Terminal-inspired

✅ Premium

✅ Engineering-focused

---

DON'T

❌ Cartoon illustrations

❌ Neon cyberpunk

❌ Glassmorphism-heavy UI

❌ Large gradients

❌ Marketing-style hero images

❌ Excessive animations

❌ Course platform aesthetics

---

# 23. Overall Experience

CodingSchool should feel like opening a modern terminal—not visiting an online course.

Every section should reinforce the same message:

> **AI can generate code.**
>
> **CodingSchool teaches engineering.**