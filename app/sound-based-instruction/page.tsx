'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function SoundBasedInstructionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(74, 144, 164, 0.05) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(212, 130, 110, 0.05) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-darkOcean to-oceanBlue via-indigo-600 shadow-2xl p-4 border-b border-oceanBlue/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:scale-110 transition-transform duration-200">
              <Image
                src="/images/dhole mascot.png"
                alt="Dhole mascot - Click to go home"
                width={48}
                height={48}
                className="inline-block"
              />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-2xl leading-none" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Sound-Based Instruction
              </h1>
              <p className="text-sm text-white/90 mt-1 ml-1">Explicit, Systematic Phonics for Every Learner</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-oceanBlue/30 overflow-hidden">
          <div className="p-8">

            {/* Introduction */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-deepNavy mb-4 border-b-2 border-oceanBlue/30 pb-2">
                What Is Sound-Based Instruction?
              </h2>
              <div className="bg-gradient-to-br from-oceanBlue/10 to-lightOcean/15 p-6 rounded-xl border border-oceanBlue/20">
                <p className="text-lg text-deepNavy leading-relaxed mb-4">
                  <strong>Sound-based instruction</strong> teaches reading by starting with the smallest units of speech —
                  <em>phonemes</em> — and explicitly connecting them to their written representations — <em>graphemes</em>.
                  This approach is the foundation of the Science of Reading.
                </p>
                <p className="text-deepNavy leading-relaxed">
                  Unlike approaches that rely on memorization or guessing from context, sound-based instruction
                  gives students the <strong>code</strong> they need to decode any word. One skill at a time,
                  from sound to meaning.
                </p>
              </div>
            </section>

            {/* Why It Matters */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-deepNavy mb-4 border-b-2 border-oceanBlue/30 pb-2">
                Why Sound-Based Instruction Matters
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-accentCoral/15 to-accentCoral/25 p-6 rounded-xl border border-accentCoral/30">
                  <h3 className="text-xl font-bold text-deepNavy mb-3">🧠 How the Brain Learns to Read</h3>
                  <p className="text-deepNavy">
                    Reading is not natural — it must be taught. The brain repurposes visual and language areas
                    to create a &quot;reading circuit.&quot; Explicit phonics instruction builds these neural pathways
                    efficiently and permanently.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-accentGold/15 to-accentGold/25 p-6 rounded-xl border border-accentGold/30">
                  <h3 className="text-xl font-bold text-deepNavy mb-3">📊 Decades of Research</h3>
                  <p className="text-deepNavy">
                    The National Reading Panel (2000) confirmed that systematic phonics instruction produces
                    significant benefits for students in K-6, particularly for those at risk for reading difficulties.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-6 rounded-xl border border-emerald-300">
                  <h3 className="text-xl font-bold text-deepNavy mb-3">🎯 Equity in Literacy</h3>
                  <p className="text-deepNavy">
                    Sound-based instruction closes gaps. Students who struggle with reading often lack phonemic
                    awareness — explicit instruction gives every child access to the code, regardless of background.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl border border-purple-300">
                  <h3 className="text-xl font-bold text-deepNavy mb-3">⚡ Efficiency</h3>
                  <p className="text-deepNavy">
                    When students understand phoneme-grapheme relationships, they can decode unfamiliar words
                    independently. This builds confidence and accelerates vocabulary growth through reading.
                  </p>
                </div>
              </div>
            </section>

            {/* The 8-Stage Approach */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-deepNavy mb-4 border-b-2 border-oceanBlue/30 pb-2">
                Our 8-Stage Progression
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl mb-6">
                <p className="text-deepNavy leading-relaxed mb-4">
                  Decoding Den organizes phonics instruction into <strong>8 developmental stages</strong>,
                  aligned with Ehri&apos;s phases of reading development and the natural progression
                  from simple to complex sound-spelling patterns.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-oceanBlue mb-1">Stage 1</div>
                  <div className="text-sm font-semibold text-deepNavy">K - Fall</div>
                  <p className="text-xs text-gray-600 mt-2">Core consonants & short vowels</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-oceanBlue mb-1">Stage 2</div>
                  <div className="text-sm font-semibold text-deepNavy">K - Spring</div>
                  <p className="text-xs text-gray-600 mt-2">Remaining consonants, initial blends</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">Stage 3</div>
                  <div className="text-sm font-semibold text-deepNavy">1st - Fall</div>
                  <p className="text-xs text-gray-600 mt-2">Consonant digraphs (sh, ch, th)</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">Stage 4</div>
                  <div className="text-sm font-semibold text-deepNavy">1st - Spring</div>
                  <p className="text-xs text-gray-600 mt-2">VCe silent-e patterns</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600 mb-1">Stage 5</div>
                  <div className="text-sm font-semibold text-deepNavy">2nd - Fall</div>
                  <p className="text-xs text-gray-600 mt-2">Vowel teams (ai, ay, ee, ea)</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600 mb-1">Stage 6</div>
                  <div className="text-sm font-semibold text-deepNavy">2nd - Spring</div>
                  <p className="text-xs text-gray-600 mt-2">R-controlled vowels & diphthongs</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                  <div className="text-2xl font-bold text-rose-600 mb-1">Stage 7</div>
                  <div className="text-sm font-semibold text-deepNavy">3rd - Fall</div>
                  <p className="text-xs text-gray-600 mt-2">Complex vowels, soft c/g</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                  <div className="text-2xl font-bold text-rose-600 mb-1">Stage 8</div>
                  <div className="text-sm font-semibold text-deepNavy">3rd - Spring</div>
                  <p className="text-xs text-gray-600 mt-2">Silent letters & morphology</p>
                </div>
              </div>
            </section>

            {/* Key Principles */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-deepNavy mb-4 border-b-2 border-oceanBlue/30 pb-2">
                Key Principles of Sound-Based Instruction
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-oceanBlue/5 to-transparent rounded-lg">
                  <div className="bg-oceanBlue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-deepNavy">Explicit Instruction</h3>
                    <p className="text-gray-600 text-sm">Teachers directly teach sound-spelling relationships — no guessing, no discovering by accident.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-oceanBlue/5 to-transparent rounded-lg">
                  <div className="bg-oceanBlue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-deepNavy">Systematic Sequence</h3>
                    <p className="text-gray-600 text-sm">Skills are taught in a logical order, from simple to complex, with each skill building on the last.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-oceanBlue/5 to-transparent rounded-lg">
                  <div className="bg-oceanBlue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-deepNavy">Cumulative Practice</h3>
                    <p className="text-gray-600 text-sm">Previously taught skills are continuously reviewed and applied in new contexts.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-oceanBlue/5 to-transparent rounded-lg">
                  <div className="bg-oceanBlue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-bold text-deepNavy">Decodable Text</h3>
                    <p className="text-gray-600 text-sm">Students practice with texts containing only patterns they&apos;ve been taught (95%+ decodability).</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-oceanBlue/5 to-transparent rounded-lg">
                  <div className="bg-oceanBlue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div>
                    <h3 className="font-bold text-deepNavy">Multi-Sensory Engagement</h3>
                    <p className="text-gray-600 text-sm">Instruction engages visual, auditory, and kinesthetic pathways to strengthen learning.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* How Decoding Den Helps */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-deepNavy mb-4 border-b-2 border-oceanBlue/30 pb-2">
                How Decoding Den Supports Teachers
              </h2>
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-6 rounded-xl border border-purple-300">
                <p className="text-deepNavy leading-relaxed mb-4">
                  Decoding Den provides teachers with instant access to phoneme-grapheme data, articulation guidance,
                  decodable word lists, and practice texts — all organized by our 8-stage progression.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-deepNavy mb-2">Teacher Portal</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Phoneme/grapheme lookup (Decoding Den)</li>
                      <li>• 8-Stage curriculum viewer</li>
                      <li>• Assessment generator</li>
                      <li>• Student management</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-deepNavy mb-2">Student Portal</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Elkonin boxes for segmentation</li>
                      <li>• Digital whiteboard practice</li>
                      <li>• Interactive word building</li>
                      <li>• Gamified learning activities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="mb-8">
              <div className="bg-gradient-to-r from-oceanBlue to-lightOcean p-8 rounded-xl text-center">
                <h2 className="text-2xl font-bold text-white mb-3">Ready to Explore?</h2>
                <p className="text-white/90 mb-6">
                  See our research foundation or dive into the teaching tools.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/research"
                    className="bg-white text-oceanBlue px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                  >
                    View Research Citations
                  </Link>
                  <Link
                    href="/teaching-tools"
                    className="bg-white/20 text-white border-2 border-white px-6 py-3 rounded-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-200 font-medium"
                  >
                    Explore Teaching Tools
                  </Link>
                </div>
              </div>
            </section>

            {/* Return to Home */}
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 bg-gradient-to-br from-oceanBlue to-lightOcean text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
              >
                <span>← Return to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
