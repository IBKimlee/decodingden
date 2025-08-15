'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function TeachingToolsPage() {
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
                Teaching Tools & Printables
              </h1>
              <p className="text-sm text-white/90 mt-1 ml-1">Evidence-Based Assessment Resources</p>
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
                Assessment Tools for Systematic Phonics Instruction
              </h2>
              <div className="bg-gradient-to-br from-accentCoral/15 to-accentCoral/25 p-6 rounded-xl border border-accentCoral/30">
                <p className="text-lg text-deepNavy leading-relaxed mb-4">
                  Our teaching tools focus on <strong>timely assessment</strong> that aligns with the 8-Stage Reading Matrix Framework. 
                  These evidence-based tools help teachers monitor student progress and ensure mastery of phonics concepts 
                  as they are taught.
                </p>
                <p className="text-deepNavy leading-relaxed">
                  All assessment materials are designed to complement systematic phonics instruction and provide 
                  actionable data for instructional decision-making.
                </p>
              </div>
            </section>

            {/* Current Tools Available */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-deepNavy mb-6 border-b-2 border-oceanBlue/30 pb-2">
                Available Teaching Tools & Resources
              </h2>
              
              <div className="grid gap-8">
                
                {/* Core Decoding Den Tool */}
                <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-8 rounded-xl border border-purple-300 shadow-lg">
                  <div className="flex items-start space-x-6">
                    <div className="bg-purple-200 p-4 rounded-full">
                      <svg className="w-12 h-12 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-deepNavy mb-3">Decoding Den: Phoneme/Grapheme Insights</h3>
                      <p className="text-deepNavy leading-relaxed mb-4">
                        <strong>Decoding Den</strong> — Phoneme–grapheme clarity in an instant, so every learner can be taught with 
                        focused intent, precision, and confidence. Because every second counts, and every student matters.
                      </p>
                      
                      <div className="bg-white p-4 rounded-lg border border-purple-300 mb-4">
                        <h4 className="font-bold text-deepNavy mb-2">Core Platform Features:</h4>
                        <ul className="text-sm text-deepNavy space-y-1">
                          <li>• <strong>Sound of the Day:</strong> Interactive phoneme and grapheme displays with research backing</li>
                          <li>• <strong>Articulation Guidance:</strong> Step-by-step pronunciation instructions for each phoneme</li>
                          <li>• <strong>Word List Practice:</strong> Decodable word examples organized by phonetic patterns</li>
                          <li>• <strong>Practice Text:</strong> Engaging decodable sentences and word ladders</li>
                          <li>• <strong>Customizable Lessons:</strong> Adaptable materials for different learning needs</li>
                          <li>• <strong>Word Workspace:</strong> Interactive word building and phonics practice space</li>
                        </ul>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Link 
                          href="/decoding-den" 
                          className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                        >
                          Access Decoding Den Platform
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Science-Based Implementation Strategies */}
                <div className="bg-gradient-to-br from-emerald-100 to-green-100 p-8 rounded-xl border border-emerald-300 shadow-lg">
                  <div className="flex items-start space-x-6">
                    <div className="bg-emerald-200 p-4 rounded-full">
                      <svg className="w-12 h-12 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-deepNavy mb-3">Science-Based Implementation Strategies</h3>
                      <p className="text-deepNavy leading-relaxed mb-4">
                        Evidence-based tools and strategies built into the platform help teachers implement 
                        Science of Reading principles effectively in their classrooms. These tools provide 
                        structured approaches to systematic phonics instruction.
                      </p>
                      
                      <div className="bg-white p-4 rounded-lg border border-emerald-300 mb-4">
                        <h4 className="font-bold text-deepNavy mb-2">Implementation Tools Include:</h4>
                        <ul className="text-sm text-deepNavy space-y-1">
                          <li>• <strong>8-Stage Progression Framework:</strong> Systematic scope and sequence for phonics instruction</li>
                          <li>• <strong>Research-Backed Sequencing:</strong> Evidence-based order of phoneme introduction</li>
                          <li>• <strong>Decodability Guidelines:</strong> Tools ensuring 95%+ decodable text selection</li>
                          <li>• <strong>Multi-Sensory Approaches:</strong> Visual, auditory, and kinesthetic learning strategies</li>
                          <li>• <strong>Differentiation Support:</strong> Scaffolding for struggling, on-level, and advanced learners</li>
                          <li>• <strong>Progress Monitoring:</strong> Built-in assessment and tracking capabilities</li>
                          <li>• <strong>Intervention Strategies:</strong> Targeted support for students needing additional help</li>
                        </ul>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Link 
                          href="/teacher/stages" 
                          className="bg-gradient-to-br from-emerald-600 to-green-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                        >
                          Explore Implementation Framework
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Bi-Weekly Assessments */}
                <div className="bg-gradient-to-br from-oceanBlue/10 to-lightOcean/15 p-8 rounded-xl border border-oceanBlue/20 shadow-lg">
                  <div className="flex items-start space-x-6">
                    <div className="bg-oceanBlue/20 p-4 rounded-full">
                      <svg className="w-12 h-12 text-oceanBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-deepNavy mb-3">Bi-Weekly Stage Assessments</h3>
                      <p className="text-deepNavy leading-relaxed mb-4">
                        Downloadable assessments that test concepts taught within each stage of the 8-Stage Reading Matrix Framework. 
                        These assessments are designed to be administered every two weeks to ensure students are mastering 
                        phonics concepts in a timely manner.
                      </p>
                      
                      <div className="bg-white p-4 rounded-lg border border-oceanBlue/30 mb-4">
                        <h4 className="font-bold text-deepNavy mb-2">Assessment Features:</h4>
                        <ul className="text-sm text-deepNavy space-y-1">
                          <li>• <strong>Stage-Aligned:</strong> Each assessment corresponds to specific stages in the framework</li>
                          <li>• <strong>Timely Feedback:</strong> Bi-weekly schedule ensures prompt identification of learning gaps</li>
                          <li>• <strong>Evidence-Based:</strong> Assessment items align with Science of Reading principles</li>
                          <li>• <strong>Downloadable PDFs:</strong> Print-ready format for classroom use</li>
                          <li>• <strong>Progress Monitoring:</strong> Track student mastery of phonetic concepts</li>
                        </ul>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Link 
                          href="/teacher/stages" 
                          className="bg-gradient-to-br from-oceanBlue to-lightOcean text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                        >
                          Access Assessments in Teacher Framework
                        </Link>
                        <span className="text-sm text-mediumGray">Available in 8-Stage Reading Matrix</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Coming Soon */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-deepNavy mb-6 border-b-2 border-oceanBlue/30 pb-2">
                Coming Soon
              </h2>
              
              <div className="bg-gradient-to-br from-accentGold/15 to-accentGold/25 p-8 rounded-xl border border-accentGold/30">
                <div className="flex items-start space-x-6">
                  <div className="bg-accentGold/30 p-4 rounded-full">
                    <svg className="w-12 h-12 text-deepNavy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-deepNavy mb-3">Individual Student Progress Trackers</h3>
                    <p className="text-deepNavy leading-relaxed mb-4">
                      We are developing comprehensive tracking tools that will allow teachers to monitor individual 
                      student progress across all 8 stages of the Reading Matrix Framework. These cumulative trackers 
                      will provide detailed insights into each student&apos;s phonics development journey.
                    </p>
                    
                    <div className="bg-white p-4 rounded-lg border border-accentGold/30">
                      <h4 className="font-bold text-deepNavy mb-2">Planned Features:</h4>
                      <ul className="text-sm text-deepNavy space-y-1">
                        <li>• <strong>Individual Student Profiles:</strong> Detailed progress tracking for each learner</li>
                        <li>• <strong>Stage-by-Stage Analysis:</strong> Visual representation of concept mastery</li>
                        <li>• <strong>Intervention Alerts:</strong> Automatic flagging of students needing additional support</li>
                        <li>• <strong>Parent Communication Tools:</strong> Printable progress reports for families</li>
                        <li>• <strong>Class Overview Dashboard:</strong> Whole-class progress at a glance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Access */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-deepNavy mb-6 border-b-2 border-oceanBlue/30 pb-2">
                How to Access Assessment Tools
              </h2>
              
              <div className="bg-blue-50 border border-blue-300 p-6 rounded-xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-deepNavy mb-3">Step 1: Navigate to Teacher Framework</h3>
                    <p className="text-deepNavy text-sm leading-relaxed">
                      Access the 8-Stage Reading Matrix Framework through the Teacher Den on the main page.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-deepNavy mb-3">Step 2: Select Your Stage</h3>
                    <p className="text-deepNavy text-sm leading-relaxed">
                      Choose the appropriate stage that corresponds to your current instruction focus.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-deepNavy mb-3">Step 3: Download Assessment</h3>
                    <p className="text-deepNavy text-sm leading-relaxed">
                      Access and download the bi-weekly assessment PDF for your selected stage.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-deepNavy mb-3">Step 4: Administer & Analyze</h3>
                    <p className="text-deepNavy text-sm leading-relaxed">
                      Use assessment results to guide instructional decisions and identify student needs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Return to Home */}
            <div className="text-center">
              <Link 
                href="/" 
                className="inline-flex items-center space-x-2 bg-gradient-to-br from-oceanBlue to-lightOcean text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium mr-4"
              >
                <span>← Return to Home</span>
              </Link>
              <Link 
                href="/teacher/stages" 
                className="inline-flex items-center space-x-2 bg-gradient-to-br from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
              >
                <span>Go to Teacher Framework →</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}