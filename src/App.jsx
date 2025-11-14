import { useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

function WindowReveal() {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-amber-900 to-stone-900"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-amber-900 to-stone-900"
      />
      {/* Center bar to mimic window frame */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="absolute top-0 bottom-0 left-1/2 w-1 bg-stone-800"
      />
    </div>
  )
}

function DawnScene() {
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.2 })

  // Sky transitions from deep night to dawn orange
  const skyFrom = useTransform(smoothProgress, [0, 0.5, 1], ['#0b1020', '#243b55', '#f59e0b'])
  const skyTo = useTransform(smoothProgress, [0, 0.5, 1], ['#111827', '#1f2937', '#fde68a'])

  // Sun position and opacity
  const sunY = useTransform(smoothProgress, [0, 1], [250, -80])
  const sunX = useTransform(smoothProgress, [0, 1], ['0%', '15%'])
  const sunOpacity = useTransform(smoothProgress, [0, 0.25, 0.5], [0, 0.6, 1])
  const sunScale = useTransform(smoothProgress, [0, 1], [0.6, 1.1])

  // Foreground lightening
  const darkness = useTransform(smoothProgress, [0, 1], [0.6, 0])

  // Farmers and bullock cart enter
  const farmerX = useTransform(smoothProgress, [0.25, 0.7], ['-30%', '5%'])
  const farmerOpacity = useTransform(smoothProgress, [0.25, 0.4], [0, 1])

  const cartX = useTransform(smoothProgress, [0.35, 0.85], ['120%', '55%'])
  const cartOpacity = useTransform(smoothProgress, [0.35, 0.5], [0, 1])

  // Birds for life
  const birdsY = useTransform(smoothProgress, [0.3, 1], [50, -120])
  const birdsOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1])

  // Parallax layers
  const mountainY = useTransform(smoothProgress, [0, 1], [60, -40])
  const fieldY = useTransform(smoothProgress, [0, 1], [0, -20])

  useEffect(() => {
    // no-op, keep component reactive
  }, [])

  return (
    <section className="relative h-[140vh] overflow-hidden">
      {/* Sky gradient */}
      <motion.div
        className="absolute inset-0"
        style={{ background: skyFrom.to((c1) => `linear-gradient(to bottom, ${c1}, ${skyTo.get()})`) }}
      />

      {/* Stars (fade out with dawn) */}
      <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none" style={{ opacity: useTransform(smoothProgress, [0, 0.4], [0.6, 0]) }}>
        {[...Array(60)].map((_, i) => {
          const x = (i * 97) % 1200
          const y = (i * 181) % 400
          const r = (i % 3) + 1
          return <circle key={i} cx={x} cy={y} r={r} fill="#fff" fillOpacity="0.8" />
        })}
      </motion.svg>

      {/* Sun */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2"
        style={{ y: sunY, x: sunX, opacity: sunOpacity, scale: sunScale }}
      >
        <div className="w-44 h-44 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 blur-[2px] shadow-[0_0_120px_40px_rgba(251,191,36,0.35)]" />
      </motion.div>

      {/* Mountains */}
      <motion.svg className="absolute bottom-32 left-0 w-full" viewBox="0 0 1200 300" preserveAspectRatio="none" style={{ y: mountainY, opacity: 0.95 }}>
        <path d="M0 220 L150 140 L250 190 L360 120 L500 200 L620 130 L760 210 L900 150 L1040 210 L1200 160 L1200 300 L0 300 Z" fill="#374151" />
        <path d="M0 240 L120 180 L220 220 L340 170 L480 230 L620 180 L780 240 L940 190 L1100 240 L1200 200 L1200 300 L0 300 Z" fill="#1f2937" />
      </motion.svg>

      {/* Rice fields */}
      <motion.div className="absolute bottom-0 left-0 right-0 h-64" style={{ y: fieldY }}>
        <div className="absolute inset-0 bg-gradient-to-t from-green-700 via-green-600 to-green-500" />
        {/* Furrows */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
          {[...Array(10)].map((_, i) => (
            <path key={i} d={`M0 ${280 - i * 20} C 300 ${260 - i * 16}, 900 ${300 - i * 12}, 1200 ${260 - i * 18}`} stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" />
          ))}
        </svg>
      </motion.div>

      {/* Village hut */}
      <motion.svg className="absolute bottom-40 left-[10%] w-56" viewBox="0 0 200 160" style={{ opacity: useTransform(smoothProgress, [0.1, 0.5], [0.5, 1]) }}>
        <rect x="50" y="70" width="100" height="70" fill="#8b5e3c" />
        <polygon points="40,80 100,40 160,80" fill="#a16207" />
        <rect x="90" y="100" width="20" height="40" fill="#422006" />
        <rect x="60" y="90" width="20" height="20" fill="#eab308" opacity="0.6" />
      </motion.svg>

      {/* Farmers silhouette */}
      <motion.svg className="absolute bottom-28 left-0 w-[40%]" viewBox="0 0 400 160" style={{ x: farmerX, opacity: farmerOpacity }}>
        <path d="M40 120 q20 -30 40 0 q-10 -10 10 -20 q0 30 -10 40 l-20 5 Z" fill="#111827" />
        <circle cx="75" cy="85" r="10" fill="#111827" />
        <path d="M110 120 q20 -30 40 0 q-10 -10 10 -20 q0 30 -10 40 l-20 5 Z" fill="#111827" />
        <circle cx="145" cy="85" r="10" fill="#111827" />
        {/* Sickle */}
        <path d="M85 100 q20 -20 35 0" stroke="#d1d5db" strokeWidth="3" fill="none" />
      </motion.svg>

      {/* Bullock cart silhouette */}
      <motion.svg className="absolute bottom-20 left-0 w-[55%]" viewBox="0 0 600 200" style={{ x: cartX, opacity: cartOpacity }}>
        <circle cx="120" cy="160" r="22" fill="#111827" />
        <circle cx="240" cy="160" r="22" fill="#111827" />
        <rect x="80" y="120" width="220" height="20" fill="#111827" />
        <rect x="150" y="100" width="150" height="30" fill="#111827" />
        <rect x="260" y="100" width="160" height="12" fill="#111827" />
        {/* Bulls */}
        <circle cx="430" cy="130" r="18" fill="#111827" />
        <rect x="420" y="140" width="50" height="10" fill="#111827" />
        <rect x="470" y="120" width="50" height="10" fill="#111827" />
        <circle cx="520" cy="130" r="18" fill="#111827" />
        <rect x="500" y="140" width="40" height="10" fill="#111827" />
      </motion.svg>

      {/* Birds */}
      <motion.svg className="absolute top-1/3 right-[15%] w-40" viewBox="0 0 200 100" style={{ y: birdsY, opacity: birdsOpacity }}>
        <path d="M10 60 q20 -20 40 0" stroke="#111827" strokeWidth="3" fill="none" />
        <path d="M50 60 q20 -20 40 0" stroke="#111827" strokeWidth="3" fill="none" />
        <path d="M90 60 q20 -20 40 0" stroke="#111827" strokeWidth="3" fill="none" />
      </motion.svg>

      {/* Darkness overlay fades with dawn */}
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: darkness }} />

      {/* Title and subtitle */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10">
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="text-5xl md:text-6xl font-extrabold tracking-tight text-amber-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          ভোর
        </motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.35, duration: 0.8 }} className="text-amber-100/90 mt-2">
          Bhor — College Magazine celebrating Bengali dawn and harvest
        </motion.p>
      </div>
    </section>
  )
}

function MagazineSection() {
  const samplePdf = 'https://arxiv.org/pdf/2107.14795.pdf'
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-amber-50 to-rose-50 flex flex-col items-center justify-center px-6 py-24">
      <div className="text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-stone-800">Read Bhor</h2>
        <p className="mt-3 text-stone-600">Immerse yourself in stories, poems, and photo essays of Bengal. You can read online or download the magazine.</p>
      </div>

      <div className="mt-10 w-full max-w-5xl bg-white/80 backdrop-blur rounded-xl shadow-xl border border-amber-200 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border border-stone-200 shadow-inner bg-stone-50">
              <iframe title="Bhor Magazine" src={samplePdf} className="w-full h-full" />
            </div>
          </div>
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-stone-800">Bhor — Issue 1</h3>
            <p className="mt-2 text-stone-600">A dawn-time journey across Bengal: rice fields at sunrise, village life, and cultural rhythms.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href={samplePdf} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition">Read Online</a>
              <a href={samplePdf} download className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-stone-800 text-white hover:bg-stone-900 transition">Download PDF</a>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-stone-500 text-sm">
        Made with love for Bengal • ভোর
      </footer>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <WindowReveal />
      <DawnScene />
      <MagazineSection />
    </div>
  )
}
