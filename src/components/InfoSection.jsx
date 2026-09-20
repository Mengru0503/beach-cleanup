const details = [
  { label: '活動時間', value: '115 / 10 / 31 (三) 9:00 ~ 15:00' },
  { label: '活動地點', value: '龍門海灘 / 天慶堂' },
  { label: '活動內容', value: '淨灘 x 美食 x 交流' },
  { label: '交通說明', value: '7:30 圓山站搭車 / 9:00 自行前往地點集合' },
]

const contacts = [
  { name: '賴孝欣', phone: '0928-431-501', line: 'F2300355' },
  { name: '林月媚', phone: '0913-866-139' },
]

export default function InfoSection() {
  return (
    <section id="why" className="py-16 px-4 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* 活動主旨說明區塊 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80 text-center">
          <span className="inline-block bg-cyan-50 text-cyan-700 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3 border border-cyan-200">
            活動理念
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4">
            用行動力愛地球
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-base">
            享受人與人、人與自然美好的交流。
            我們會準備一些手套、麻布袋、夾子，新北市專用垃圾袋數量不多，歡迎參加者自備齊全的道具。
            收集的垃圾我們會請國家風景區管理處協助處理。
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap justify-center gap-4 text-sm font-medium text-teal-700">
            <span className="bg-teal-50 px-3.5 py-1.5 rounded-lg border border-teal-100">
              🥗 活動結束後一起享用豐富營養好吃的蔬食午餐
            </span>
            <span className="bg-sky-50 px-3.5 py-1.5 rounded-lg border border-sky-100 text-sky-700">
              📢 請用力分享讓更多人一起來參與！
            </span>
          </div>
        </div>

        {/* 活動細節列表 */}
        <div className="bg-gradient-to-br from-cyan-600 to-teal-600 rounded-2xl p-6 md:p-8 text-white shadow-md">
          <h3 className="text-xl font-bold mb-6 pb-2 border-b border-white/20 text-center md:text-left">
            活動細節一覽
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {details.map((d, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4 backdrop-blur-xs border border-white/10">
                <span className="text-xs text-cyan-100 font-semibold block mb-1">{d.label}</span>
                <span className="text-base font-bold text-white">{d.value}</span>
              </div>
            ))}
          </div>

          {/* 聯絡人資訊 */}
          <div className="bg-white/15 rounded-xl p-4 border border-white/20">
            <p className="text-xs text-cyan-100 font-semibold mb-2">活動聯絡人</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm font-medium">
              {contacts.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-bold text-white">{c.name}</span>
                  <a href={`tel:${c.phone.replace(/-/g, '')}`} className="underline hover:text-cyan-200">
                    {c.phone}
                  </a>
                  {c.line && <span className="text-xs bg-white/20 px-2 py-0.5 rounded text-cyan-50">LINE: {c.line}</span>}
                  {i < contacts.length - 1 && <span className="hidden sm:inline text-white/40">|</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
