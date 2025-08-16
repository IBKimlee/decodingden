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

### Password Protection
The site is password protected. Users must enter the correct password to access any part of the application.
- **Site Password**: `177617761314!`
- Authentication is handled via client-side password verification
- Session is persisted in localStorage for user convenience

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
- `app/data/allStagesDatabase.ts` - Complete phoneme database with research citations
- `app/data/researchJustifications.ts` - Academic sources and methodology
- `app/data/phonemeDatabase.ts` - Phoneme-grapheme mappings
- `app/data/scopeAndSequence.ts` - Curriculum sequencing logic

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

## Claude Guidelines

### Implementation Principles
- Always summarize and understand the project context before implementing features or making changes
  - This would help ensure Claude doesn't jump into implementation without first understanding what you need.