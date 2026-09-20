export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900/30 via-sky-700/20 to-cyan-900/50" />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm
                        border border-white/40 text-white rounded-full px-5 py-2 text-sm font-medium mb-6
                        shadow-lg">
          <span>守護海洋・用行動力愛地球</span>
        </div>

        {/* Main title */}
        <h1 className="animate-fade-up-delay-1 text-5xl md:text-6xl lg:text-7xl font-black text-white
                       leading-tight mb-6 drop-shadow-lg">
          挽起袖子，
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-100">
            一起來淨灘！
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up-delay-2 text-lg md:text-xl text-white/90 leading-relaxed mb-8
                      drop-shadow font-medium max-w-xl mx-auto">
          淨灘 x 美食 x 交流
          <br />
          享受人與人、人與自然美好的交流
        </p>

        {/* CTA Button */}
        <div className="animate-fade-up-delay-3">
          <a
            href="#signup"
            id="hero-cta-btn"
            className="inline-flex items-center justify-center bg-white text-cyan-700 font-bold text-lg
                       px-8 py-4 rounded-2xl shadow-2xl hover:bg-cyan-50 hover:scale-105
                       active:scale-95 transition-all duration-300"
          >
            立即報名
          </a>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <div className="relative">
          <svg
            className="animate-wave-slow w-[200%] h-20 text-[#F8FAFC]"
            viewBox="0 0 1440 80"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
          </svg>
          <svg
            className="animate-wave-fast w-[200%] h-16 text-cyan-100/50 absolute bottom-2"
            viewBox="0 0 1440 80"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0,30 C480,70 960,10 1440,50 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </div>
    </section>
  )
}
