import { useState } from 'react'

const API_URL =
  'https://script.google.com/macros/s/AKfycbwskaVr_IEpLD9TprQss1drXe8dx44ggBH5iX8bNaYwoPVHNnoFlkTUqFdizn38__KQ1w/exec'

const LINE_GROUP_URL = 'https://line.me/ti/g/NYCICqxexJ'

const initialForm = {
  isMember: '',
  name: '',
  phone: '',
  idNumber: '',
  birthday: '',
  transport: '',
  emergencyName: '',
  emergencyPhone: '',
  referrer: '',
  volunteerHours: '',
  cadreWilling: '',
}

function RadioGroup({ name, value, onChange, options }) {
  return (
    <div className="form-radio-group">
      {options.map((opt) => (
        <label key={opt.value} className="form-radio-label" htmlFor={`${name}-${opt.value}`}>
          <input
            type="radio"
            id={`${name}-${opt.value}`}
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <span
            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
              value === opt.value ? 'border-cyan-600 bg-cyan-600' : 'border-slate-300'
            }`}
          >
            {value === opt.value && (
              <span className="w-1.5 h-1.5 rounded-full bg-white block" />
            )}
          </span>
          {opt.label}
        </label>
      ))}
    </div>
  )
}

function SuccessScreen() {
  return (
    <div className="text-center py-16 px-6">
      <div className="flex justify-center mb-6">
        <div
          className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center shadow-md text-white"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">報名成功！</h2>
      <p className="text-slate-600 text-base leading-relaxed mb-2">
        感謝您的參與！
      </p>
      <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto mb-6">
        我們已收到您的報名資料。期待當天與您一起淨灘、享用美味蔬食午餐，用行動力愛護海洋！
      </p>

      {/* LINE 群組按鈕區塊 */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 max-w-md mx-auto space-y-3 shadow-sm">
        <p className="text-sm font-bold text-emerald-900 leading-relaxed">
          🎉 請點擊下方按鈕加入淨灘服務 LINE 群組
        </p>
        <p className="text-xs text-emerald-700">
          活動最新消息、集合提醒及現場聯繫皆會在群組內發布喔！
        </p>
        <div className="pt-1">
          <a
            href={LINE_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-base px-6 py-3 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            加入淨灘服務 LINE 群組
          </a>
        </div>
      </div>
    </div>
  )
}

export default function FormSection() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const setField = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const errs = {}
    if (!form.isMember) errs.isMember = '請選擇是否為道親'
    if (!form.name.trim()) errs.name = '請填寫姓名'
    if (!form.phone.trim()) errs.phone = '請填寫聯絡電話'
    if (!form.idNumber.trim()) errs.idNumber = '請填寫身分證字號（僅作為保險使用）'
    if (!form.birthday) errs.birthday = '請選擇生日'
    if (!form.transport) errs.transport = '請選擇交通方式'
    if (!form.emergencyName.trim()) errs.emergencyName = '請填寫緊急聯絡人姓名'
    if (!form.emergencyPhone.trim()) errs.emergencyPhone = '請填寫緊急聯絡電話'
    if (!form.referrer.trim()) errs.referrer = '請填寫介紹人（無請填「無」）'
    if (!form.volunteerHours) errs.volunteerHours = '請選擇是否申請志工服務時數'
    if (!form.cadreWilling) errs.cadreWilling = '請選擇是否願意擔任現場幹部'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstErrKey = Object.keys(errs)[0]
      document.getElementById(`field-${firstErrKey}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      return
    }

    setLoading(true)
    try {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          submittedAt: new Date().toISOString(),
        }),
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Submit error:', err)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="signup" className="py-16 px-4 bg-gradient-to-b from-[#F8FAFC] to-slate-100">
      <div className="max-w-2xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-cyan-100 text-cyan-800 text-xs font-semibold
                           px-3.5 py-1 rounded-full mb-3 border border-cyan-200">
            線上報名
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            淨灘活動報名表單
          </h2>
          <p className="text-slate-500 text-sm">
            請填寫以下資料完成報名（標記 <span className="text-red-500 font-bold">*</span> 為必填欄位）
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
          {submitted ? (
            <SuccessScreen />
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8" noValidate>

              {/* ── Section 1: 基本資料 ── */}
              <div>
                <p className="form-section-title">基本資料</p>
                <div className="space-y-5">

                  {/* isMember */}
                  <div id="field-isMember">
                    <label className="form-label">
                      是否為道親 <span className="text-red-500">*</span>
                    </label>
                    <RadioGroup
                      name="isMember"
                      value={form.isMember}
                      onChange={(v) => setField('isMember', v)}
                      options={[
                        { value: '是', label: '是' },
                        { value: '否', label: '否' },
                      ]}
                    />
                    {errors.isMember && (
                      <p className="text-red-500 text-xs mt-1">{errors.isMember}</p>
                    )}
                  </div>

                  {/* name */}
                  <div id="field-name">
                    <label htmlFor="input-name" className="form-label">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-name"
                      type="text"
                      className="form-input"
                      placeholder="請輸入您的姓名"
                      value={form.name}
                      onChange={(e) => setField('name', e.target.value)}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* phone */}
                  <div id="field-phone">
                    <label htmlFor="input-phone" className="form-label">
                      聯絡電話 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-phone"
                      type="tel"
                      className="form-input"
                      placeholder="例如：0912-345-678"
                      value={form.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* idNumber & birthday */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div id="field-idNumber">
                      <label htmlFor="input-idNumber" className="form-label">
                        身分證字號 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="input-idNumber"
                        type="text"
                        className="form-input"
                        placeholder="僅作為保險使用"
                        value={form.idNumber}
                        onChange={(e) => setField('idNumber', e.target.value)}
                      />
                      {errors.idNumber && (
                        <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>
                      )}
                    </div>
                    <div id="field-birthday">
                      <label htmlFor="input-birthday" className="form-label">
                        生日 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="input-birthday"
                        type="date"
                        className="form-input"
                        value={form.birthday}
                        onChange={(e) => setField('birthday', e.target.value)}
                      />
                      {errors.birthday && (
                        <p className="text-red-500 text-xs mt-1">{errors.birthday}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Section 2: 交通方式 ── */}
              <div>
                <p className="form-section-title">交通方式</p>
                <div id="field-transport">
                  <label className="form-label">
                    請選擇交通方式 <span className="text-red-500">*</span>
                  </label>
                  <RadioGroup
                    name="transport"
                    value={form.transport}
                    onChange={(v) => setField('transport', v)}
                    options={[
                      { value: '9:00自行前往', label: '9:00 自行前往' },
                      { value: '7:30圓山站搭車', label: '7:30 圓山站搭車' },
                    ]}
                  />
                  {errors.transport && (
                    <p className="text-red-500 text-xs mt-1">{errors.transport}</p>
                  )}
                </div>
              </div>

              {/* ── Section 3: 緊急聯絡資訊 ── */}
              <div>
                <p className="form-section-title">緊急聯絡資訊</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div id="field-emergencyName">
                      <label htmlFor="input-emergencyName" className="form-label">
                        緊急聯絡人 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="input-emergencyName"
                        type="text"
                        className="form-input"
                        placeholder="緊急聯絡人姓名"
                        value={form.emergencyName}
                        onChange={(e) => setField('emergencyName', e.target.value)}
                      />
                      {errors.emergencyName && (
                        <p className="text-red-500 text-xs mt-1">{errors.emergencyName}</p>
                      )}
                    </div>
                    <div id="field-emergencyPhone">
                      <label htmlFor="input-emergencyPhone" className="form-label">
                        緊急聯絡電話 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="input-emergencyPhone"
                        type="tel"
                        className="form-input"
                        placeholder="緊急聯絡電話"
                        value={form.emergencyPhone}
                        onChange={(e) => setField('emergencyPhone', e.target.value)}
                      />
                      {errors.emergencyPhone && (
                        <p className="text-red-500 text-xs mt-1">{errors.emergencyPhone}</p>
                      )}
                    </div>
                  </div>
                  <div id="field-referrer">
                    <label htmlFor="input-referrer" className="form-label">
                      介紹人 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-referrer"
                      type="text"
                      className="form-input"
                      placeholder="介紹人姓名（若無請填寫「無」）"
                      value={form.referrer}
                      onChange={(e) => setField('referrer', e.target.value)}
                    />
                    {errors.referrer && (
                      <p className="text-red-500 text-xs mt-1">{errors.referrer}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Section 4: 服務意願調查 ── */}
              <div>
                <p className="form-section-title">服務意願調查</p>
                <div className="space-y-6">

                  {/* volunteerHours */}
                  <div id="field-volunteerHours">
                    <label className="form-label">
                      是否申請志工服務時數，如需申請請加入志工服務幹部群組(會在群組發佈申請連結) <span className="text-red-500">*</span>
                    </label>
                    <RadioGroup
                      name="volunteerHours"
                      value={form.volunteerHours}
                      onChange={(v) => setField('volunteerHours', v)}
                      options={[
                        { value: '是', label: '是' },
                        { value: '否', label: '否' },
                      ]}
                    />
                    {errors.volunteerHours && (
                      <p className="text-red-500 text-xs mt-1">{errors.volunteerHours}</p>
                    )}
                  </div>

                  {/* cadreWilling */}
                  <div id="field-cadreWilling">
                    <label className="form-label">
                      是否願意擔任現場幹部 <span className="text-red-500">*</span>
                    </label>
                    <RadioGroup
                      name="cadreWilling"
                      value={form.cadreWilling}
                      onChange={(v) => setField('cadreWilling', v)}
                      options={[
                        { value: '是，我可以協助擔任現場幹部', label: '是，我可以協助擔任現場幹部' },
                        { value: '是，我可以協助廚務工作', label: '是，我可以協助廚務工作' },
                        { value: '否，我是為了申請志工時數', label: '否，我是為了申請志工時數' },
                        { value: '否', label: '否' },
                      ]}
                    />
                    {errors.cadreWilling && (
                      <p className="text-red-500 text-xs mt-1">{errors.cadreWilling}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  id="submit-form-btn"
                  type="submit"
                  disabled={loading}
                  className={`submit-btn ${loading ? 'btn-loading' : ''}`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg
                        className="animate-spin w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      資料送出中…
                    </span>
                  ) : (
                    <span>確認送出報名</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
