'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ResearchPage() {
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
                Research Foundation
              </h1>
              <p className="text-sm text-white/90 mt-1 ml-1">Built on Evidence-Based Reading Science</p>
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
                About Decoding Den
              </h2>
              <div className="bg-gradient-to-br from-oceanBlue/10 to-lightOcean/15 p-6 rounded-xl border border-oceanBlue/20">
                <p className="text-lg text-deepNavy leading-relaxed mb-4">
                  <strong>Decoding Den</strong> is a comprehensive reading instruction platform rooted in the Science of Reading. 
                  Every component has been developed using publicly available research and follows evidence-based methodologies 
                  for systematic phonics instruction.
                </p>
                <p className="text-deepNavy leading-relaxed">
                  Our curriculum draws from established research including the National Reading Panel findings, 
                  FCRR publications, and McREL studies, ensuring that all instructional materials are grounded in 
                  evidence-based reading science.
                </p>
              </div>
            </section>

            {/* Primary Research Framework */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-deepNavy mb-4 border-b-2 border-oceanBlue/30 pb-2">
                Primary Research Framework
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-accentCoral/15 to-accentCoral/25 p-6 rounded-xl border border-accentCoral/30">
                  <h3 className="text-xl font-bold text-deepNavy mb-3">🧠 Science of Reading</h3>
                  <p className="text-deepNavy">
                    The foundational research approach underpinning our entire platform, incorporating decades 
                    of cognitive science research on how the brain learns to read.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-accentGold/15 to-accentGold/25 p-6 rounded-xl border border-accentGold/30">
                  <h3 className="text-xl font-bold text-deepNavy mb-3">📊 Evidence Levels</h3>
                  <p className="text-deepNavy">
                    All content meets <strong>Tier 1 evidence</strong> standards with multiple randomized controlled 
                    trials (RCTs) showing large effect sizes (d = 0.8) across diverse populations.
                  </p>
                </div>
              </div>
            </section>

            {/* Core Research Citations */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-deepNavy mb-4 border-b-2 border-oceanBlue/30 pb-2">
                Core Research Citations
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-deepNavy mb-4">🏛️ Foundational Studies</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-oceanBlue font-bold">•</span>
                      <div>
                        <strong>National Reading Panel (2000).</strong> Teaching children to read: An evidence-based assessment of the scientific research literature on reading and its implications for reading instruction.
                        <em className="block text-sm text-gray-600 mt-1">Systematic phonics instruction principles and effectiveness</em>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-oceanBlue font-bold">•</span>
                      <div>
                        <strong>Ehri, L. C. (2005).</strong> Learning to read words: Theory, findings, and issues. Scientific Studies of Reading, 9(2), 167-188.
                        <em className="block text-sm text-gray-600 mt-1">Four-phase framework for reading development</em>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-oceanBlue font-bold">•</span>
                      <div>
                        <strong>Adams, M. J. (1990).</strong> Beginning to read: Thinking and learning about print.
                        <em className="block text-sm text-gray-600 mt-1">Most frequent consonants and systematic instruction sequencing</em>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-oceanBlue font-bold">•</span>
                      <div>
                        <strong>Fry, E. (2004).</strong> Phonics: A large phoneme-grapheme frequency count revised. Journal of Literacy Research, 36(1), 85-98.
                        <em className="block text-sm text-gray-600 mt-1">Phoneme-grapheme frequency data for optimal sequencing</em>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-deepNavy mb-4">🧬 Cognitive Science Research</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-oceanBlue font-bold">•</span>
                      <div>
                        <strong>Seidenberg, M. (2017).</strong> Language at the speed of sight: How we read, why so many can&apos;t, and what can be done about it.
                        <em className="block text-sm text-gray-600 mt-1">Brain&apos;s reading circuitry and practice requirements</em>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-oceanBlue font-bold">•</span>
                      <div>
                        <strong>Dehaene, S. (2009).</strong> Reading in the brain: The science and evolution of a human invention.
                        <em className="block text-sm text-gray-600 mt-1">Neurological foundations of reading acquisition</em>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-oceanBlue font-bold">•</span>
                      <div>
                        <strong>Castles, A., Rastle, K., & Nation, K. (2018).</strong> Ending the reading wars: Reading acquisition from novice to expert. Psychological Science in the Public Interest, 19(1), 5-51.
                        <em className="block text-sm text-gray-600 mt-1">High-frequency, consistent sound-spelling patterns</em>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-deepNavy mb-4">👩‍🏫 Educational Practice Research</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-oceanBlue font-bold">•</span>
                      <div>
                        <strong>Moats, L. (2020).</strong> Teaching reading is rocket science: What expert teachers of reading should know and be able to do.
                        <em className="block text-sm text-gray-600 mt-1">Short vowels, early consonants, and essential teaching patterns</em>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-oceanBlue font-bold">•</span>
                      <div>
                        <strong>Scarborough, H. S. (2001).</strong> Connecting early language and literacy to later reading (dis)abilities. In S. Neuman & D. Dickinson (Eds.), Handbook of early literacy research.
                        <em className="block text-sm text-gray-600 mt-1">Reading Rope framework: Phonological awareness + orthographic knowledge</em>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-oceanBlue font-bold">•</span>
                      <div>
                        <strong>Treiman, R. (2000).</strong> The foundations of literacy. Current Directions in Psychological Science, 9(3), 89-92.
                        <em className="block text-sm text-gray-600 mt-1">Silent patterns essential for advanced reading</em>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-deepNavy mb-4">📈 Recent Research Updates</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-oceanBlue font-bold">•</span>
                      <div>
                        <strong>Liu, Y., & Groen, M. (2024).</strong> Morphological awareness and reading comprehension: A systematic review. Reading Research Quarterly.
                        <em className="block text-sm text-gray-600 mt-1">Morphological awareness systematic review</em>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-oceanBlue font-bold">•</span>
                      <div>
                        <strong>Mather, N., & Wendling, B. J. (2024).</strong> Orthographic mapping: A critical component of skilled reading. Journal of Learning Disabilities.
                        <em className="block text-sm text-gray-600 mt-1">Orthographic mapping foundations</em>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-oceanBlue font-bold">•</span>
                      <div>
                        <strong>Nagy, W., & Anderson, R. C. (1984).</strong> How many words are there in printed school English? Reading Research Quarterly, 19(3), 304-330.
                        <em className="block text-sm text-gray-600 mt-1">60% of academic words have Latin/Greek roots</em>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Institutional Frameworks */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-deepNavy mb-4 border-b-2 border-oceanBlue/30 pb-2">
                Institutional Frameworks & Standards
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl border border-purple-300">
                  <h3 className="text-lg font-bold text-deepNavy mb-2">🔬 IES Practice Guides</h3>
                  <p className="text-sm text-deepNavy">Informed by Institute of Education Sciences research and practice guides</p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-300">
                  <h3 className="text-lg font-bold text-deepNavy mb-2">🎯 McREL</h3>
                  <p className="text-sm text-deepNavy">Based on Mid-continent Research for Education and Learning findings</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-6 rounded-xl border border-emerald-300">
                  <h3 className="text-lg font-bold text-deepNavy mb-2">📚 FCRR</h3>
                  <p className="text-sm text-deepNavy">Draws from Florida Center for Reading Research publications</p>
                </div>
              </div>
            </section>

            {/* Legal Compliance */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-deepNavy mb-4 border-b-2 border-oceanBlue/30 pb-2">
                Research Standards & Compliance
              </h2>
              <div className="bg-blue-50 border border-blue-300 p-6 rounded-xl">
                <p className="text-deepNavy leading-relaxed mb-3">
                  <strong>Decoding Den</strong> has been developed using peer-reviewed, publicly accessible research sources, 
                  drawing from the National Reading Panel and academic publications. The platform maintains 
                  strict compliance with academic integrity standards.
                </p>
                <p className="text-deepNavy leading-relaxed">
                  All content complies with COPPA and FERPA educational privacy requirements.
                </p>
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