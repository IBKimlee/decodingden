# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## User Interaction Guidelines

**IMPORTANT**: When working with this codebase, assume the user is a novice developer. Follow these interaction principles:

1. **Expert Knowledge**: Act as a highly informed, top-tier coding expert in:
   - Next.js 14 with App Router
   - TypeScript and strict type checking
   - Tailwind CSS and custom theming
   - Supabase database operations
   - Visual Studio Code workflows
   - Educational platform development

2. **Detailed Instructions**: Always provide step-by-step instructions without skipping details:
   - Include exact file paths and locations
   - Specify which files to open/create/modify
   - Explain what each step accomplishes
   - Provide the exact code to add/modify/remove
   - Include terminal commands with proper directory context

3. **Assume No Prior Knowledge**: Explain concepts that experienced developers might take for granted:
   - Why certain patterns are used
   - How files relate to each other
   - What happens when code executes
   - How to verify changes worked correctly

4. **Educational Context**: Remember this is a phonics education platform built on Science of Reading principles. Maintain awareness of:
   - Research-based instructional design
   - Age-appropriate UI/UX considerations
   - Accessibility requirements for educational software
   - Legal compliance (COPPA/FERPA) considerations

5. **Git Commit Guidelines**: 
   - **NEVER commit or push changes to GitHub without explicit permission**
   - Always end responses with "Would you like me to commit these changes to GitHub and Vercel?"
   - Only commit and push if the user explicitly says "yes"
   - If the user says "no" or ignores, do not commit - they will continue with other tasks

## Site Access

### Authentication
The site uses Supabase authentication with two portals:
- **Teacher portal**: email + password login (accounts require admin approval via `is_approved` flag on the `teachers` table)
- **Student portal**: 6-digit login code (stored on the `students` table)

Landing page `/` is public. Role-based routing is enforced by `app/components/AuthWrapper.tsx`.

## Commands

### Development
- `npm run dev` - Start the development server at http://localhost:3000
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run lint` - Run ESLint checks

### Testing
The project uses manual testing approach with specific test files:
- `lib/decodability/test.ts` - Tests decodability calculation system
- `lib/contentGeneration/testContentGeneration.ts` - Tests content generation
- Various `test-*.js` files for API/Supabase testing
- No formal test runner configured - execute individual test files manually

### TypeScript
The project uses TypeScript with strict mode enabled. Type checking occurs automatically during build. Path alias `@/*` maps to the project root.

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom education-themed color palette
- **Database**: Supabase (PostgreSQL)
- **State**: Client-side React hooks (no global state management)
- **Libraries**: jsPDF for PDF generation, react-to-print for printing

### Project Structure

The application is organized around two primary user interfaces:

#### Teacher Portal (`/app/teacher/`)
- **Lesson Generator**: AI-powered phonics lesson creation with Science of Reading principles
- **8-Stage Viewer**: Research-based phonics progression system display
- **Scope & Sequence**: Curriculum planning interface

#### Student Portal (`/app/student/`)
- **Elkonin Boxes**: Interactive phoneme segmentation tool
- **Digital Whiteboard**: Practice space for writing and drawing
- **Main Interface**: Gamified learning environment with forest/animal themes

#### Decoding Den (`/app/decoding-den/`)
- **Main Learning Hub**: Comprehensive phoneme search and learning system
- **Sound of the Day**: Daily phoneme focus with articulation guidance
- **Word Lists**: Decodable word practice with 95%+ decodability
- **Stories**: Decodable sentences and short stories

### Core Data Architecture

The phonics curriculum is built on an 8-stage progression system stored in:
- `app/data/allStagesDatabase.ts` - Complete phoneme database, research citations, and research justifications
- `app/data/scopeAndSequence.ts` - Curriculum sequencing logic
- `app/data/assessmentDatabase.ts` - Checkpoint assessments by stage
- `app/data/graphemeFrequencies.ts` - Grapheme spelling percentages
- `app/data/comprehensivePhonemeFrequencies.ts` - Detailed frequency data

### API Design

The application has key API endpoints:
- `POST /api/generate-lesson` - Generates Science of Reading-aligned phonics lessons
  - Currently uses comprehensive lesson generation logic
  - Prepared for future AI integration (OpenAI/Claude)
- `POST /api/decoding-den` - Provides phoneme data and learning content for the main interface

### Key Implementation Details

1. **Research Compliance**: All content includes extensive research citations and legal compliance notices. The system is built exclusively from publicly available Science of Reading research.

2. **Phoneme Entry Structure**: Each phoneme includes:
   - Stage assignment (1-8)
   - Multiple grapheme representations
   - Frequency ranking
   - Grade band alignment
   - Assessment criteria
   - Teaching advantages
   - Research sources

3. **Color System**: Custom Tailwind colors optimized for education:
   - Primary: `oceanBlue` (#4a90a4)
   - Backgrounds: `warmBeige`, `creamyWhite`
   - Accents: `accentCoral`, `accentGold`

4. **Assessment Framework**: Three-tier assessment system:
   - Daily checks
   - Weekly reviews
   - Summative assessments

### Development Considerations

1. **Decodability**: Word lists maintain 95%+ decodability using cumulative phoneme teaching
2. **Legal Compliance**: COPPA/FERPA considerations built into the design
3. **Differentiation**: Built-in support for struggling, on-level, and advanced learners
4. **Multi-sensory**: Emphasis on visual, auditory, and kinesthetic learning approaches

### Environment Setup

Environment variables are configured via `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- Use `.env.example` as template for local development

### Database Schema (Supabase)

Key tables include:
- `phonemes` - Core phoneme data with 8-stage categorization
- `stages` - Stage progression information  
- `lesson_plans` - Generated lesson content
- `user_progress` - Student learning tracking
- Migration scripts located in `/supabase/migrations/`
- **Note**: The project already has Supabase configured with tables for phonemes, stages, lesson_plans, and user_progress, but may need modifications

### Phoneme Formatting Standards

#### Grapheme Notation
- Use angle brackets for all grapheme representations: 〈sh〉, 〈ch〉, 〈th〉
- Use forward slashes for phoneme representations: /sh/, /ch/, /th/
- This maintains consistency across all student-facing content

#### Text Alignment with Icons/Arrows
- When displaying content with arrows (→) or bullet points alongside phoneme notation:
  - Lines containing angle brackets (〈 〉) require no additional spacing
  - Lines without angle brackets need a 0.5rem spacer for proper alignment
  - Use the utility functions in `/app/utils/phonemeFormatting.ts`:
    - `renderAlignmentSpacer(content)` - Adds spacing when needed
    - `hasAngleBrackets(content)` - Checks for angle bracket presence
    - `renderContentWithBold(content)` - Handles <strong> tag rendering

#### Implementation Pattern
```tsx
// Standard layout for teaching content with arrows
<div className="flex items-start space-x-1 pl-12">
  <span className="text-xl flex-shrink-0">➜</span>
  {renderAlignmentSpacer(item.content)}
  <p className="text-gray-700">{renderContentWithBold(item.content)}</p>
</div>
```

This pattern ensures consistent alignment across all phoneme teaching content.

## Project Vision

### Current Project Status
- **Description**: Building Decoding Den, an educational phonics platform using Science of Reading

### Project Tech Specifics
- My project uses Next.js 14 with App Router, TypeScript with strict mode, Tailwind CSS with custom educational colors, and Supabase for the database

---

## 8-Stage Restructuring Plan (LOCKED — Approved 2026-04-19)

### Context
The original 8-stage system had 171 items with Stage 8 carrying 51 items (mostly morphology crammed into one stage). After consensus review by three AIs (Claude, ChatGPT, GPT) against Science of Reading research (Ehri, Moats, LETRS), the stages were rebalanced to distribute morphology earlier and fit realistic school calendar constraints.

### Key Principles
- Structured interleaving: GPCs are the anchor, morphology is layered on top
- Morphology starts in Stage 4 (1st-Spring), not Stage 8
- Blends added to Stage 2 (were missing entirely)
- Stage 8 extends into Grade 4 for advanced/rare items
- Each stage fits its semester (Fall: 11-12 weeks, Spring: 9-11 weeks)
- Heart words run as a parallel track across all stages

### Final Locked Layout

| Stage | Grade | Weeks | Items | Key Content |
|-------|-------|-------|-------|-------------|
| 1 | K-Fall | 12 | 15 | Core consonants + short vowels (no changes) |
| 2 | K-Spring | 11 | 25 | Remaining letters + digraphs + blends (blends restored) |
| 3 | 1st-Fall | 11 | 17 | VCe + FLOSS + tch/dge + bridge blends (ph removed to Stage 7, e_e demoted to EXPOSURE) |
| 4 | 1st-Spring | 10 | 14 | Core vowel teams + light morphology: -s, -ing (o→/ŭ/ removed, ie→/ē/ delayed) |
| 5 | 2nd-Fall | 11 | 18 | R-controlled + oo + long-u variants + soft c/g + morphology: -es, -ed |
| 6 | 2nd-Spring | 10 | 21 | Diphthongs + complex r-controlled + silent letters (kn, wr, mb) + morphology: un-, re- |
| 7 | 3rd-Fall | 11 | 21 | Variable patterns (ough, ch variants) + ph + o→/ŭ/ + morphology: pre-, dis-, mis-, -ful, -less, -ly |
| 8 | 3rd-Spring | 9 | 12 core | Advanced morphology: in-/im-, -er, -est, -tion, -sion, -ment, -ness + ti/ci→/sh/ + schwa + doubling rule |
| 8+ | Grade 4 | ongoing | ~10 | Deferred: -ture, -ous, -ent, -ant, -al, -or, rare GPCs (eau, augh, que, ssi, sci, gh→/f/, x→/gz/) |

### Items Moved Between Stages
- **ph**: Stage 3 → Stage 7 (Greek origin, not 1st grade appropriate)
- **e_e**: Stage 3 TEACH → EXPOSURE (very low frequency)
- **o→/ŭ/**: Stage 4 → Stage 7 (schwa-adjacent, not a teachable GPC at 1st grade)
- **ie→/ē/**: Stage 4 → Stage 5 (delayed, teach ie→/ī/ first)
- **-s, -ing**: Stage 8 → Stage 4 (inflectional morphology starts in 1st grade)
- **-es, -ed**: Stage 8 → Stage 5 (inflectional morphology continues in 2nd grade)
- **un-, re-**: Stage 8 → Stage 6 (most common prefixes, 2nd grade appropriate)
- **pre-, dis-, mis-, -ful, -less, -ly**: Stage 8 → Stage 7 (derivational morphology begins 3rd grade)
- **kn, wr, mb**: Stage 8 → Stage 6 (silent letters are late 2nd grade per LETRS)
- **Blends (st, sp, bl, cr, etc.)**: Missing → Stage 2 (critical gap fixed)
- **Doubled consonants (dd, gg, nn, pp, tt, rr)**: 6 items → 1 concept (doubling rule)

### What Has NOT Been Built Yet
- The `stagesWeeklyData.ts` file has NOT been updated to reflect this plan
- The current file still has the old layout (Stage 8 = 51 items)
- Building the new weekly data is the next step

### Implementation Rules
1. Do NOT change `allComprehensivePhonemes.ts` during this restructure — Phase 1 teaching content is done
2. Only change `stagesWeeklyData.ts` and related stage display files
3. Build one stage at a time, verify it compiles, then move to next
4. Heart words track uses existing `core400Words.ts` system
5. Stage 8 Grade 4 extension items should be documented but not removed from the system

### Data Files Involved
- `app/data/stagesWeeklyData.ts` — primary file to restructure
- `app/data/allStagesDatabase.ts` — stage metadata (names, descriptions, total_elements) needs updating
- `app/teacher/stages/page.tsx` — stage list display needs updated counts
- `app/teacher/stages/[stage]/page.tsx` — stage detail pages

---

## Claude Guidelines

### Implementation Principles
- Always summarize and understand the project context before implementing features or making changes
  - This would help ensure Claude doesn't jump into implementation without first understanding what you need.