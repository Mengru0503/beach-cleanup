/**
 * 台灣各縣市身分證/居留證字首字母對應代碼表
 */
export const CITY_CODES = {
  A: 10, // 臺北市
  B: 11, // 臺中市
  C: 12, // 基隆市
  D: 13, // 臺南市
  E: 14, // 高雄市
  F: 15, // 新北市
  G: 16, // 宜蘭縣
  H: 17, // 桃園市
  I: 34, // 嘉義市
  J: 18, // 新竹縣
  K: 19, // 苗栗縣
  L: 20, // 臺中縣(已合併)
  M: 21, // 南投縣
  N: 22, // 彰化縣
  O: 35, // 新竹市
  P: 23, // 雲林縣
  Q: 24, // 嘉義縣
  R: 25, // 臺南縣(已合併)
  S: 26, // 高雄縣(已合併)
  T: 27, // 屏東縣
  U: 28, // 花蓮縣
  V: 29, // 臺東縣
  W: 32, // 金門縣
  X: 30, // 澎湖縣
  Y: 31, // 陽明山管轄區(已廢止)
  Z: 33, // 連江縣
}

/**
 * 驗證台灣國民身分證字號（加權檢查碼驗證）
 * 格式：首碼英文字母 + 第2碼(1或2) + 7碼流水號 + 1碼檢查碼
 */
export function validateTWID(id) {
  if (!/^[A-Z][12]\d{8}$/.test(id)) return false
  const code = CITY_CODES[id[0]]
  if (!code) return false

  const n1 = Math.floor(code / 10)
  const n2 = code % 10
  let sum = n1 * 1 + n2 * 9

  const weights = [8, 7, 6, 5, 4, 3, 2, 1]
  for (let i = 1; i <= 8; i++) {
    sum += parseInt(id[i], 10) * weights[i - 1]
  }

  const checkDigit = (10 - (sum % 10)) % 10
  return checkDigit === parseInt(id[9], 10)
}

/**
 * 驗證新式外僑/港澳居留證統一證號（2021年起實施）
 * 格式：首碼英文字母 + 第2碼(8男性或9女性) + 7碼流水號 + 1碼檢查碼
 * 備註：編碼原則與計算公式比照國民身分證
 */
export function validateNewARC(id) {
  if (!/^[A-Z][89]\d{8}$/.test(id)) return false
  const code = CITY_CODES[id[0]]
  if (!code) return false

  const n1 = Math.floor(code / 10)
  const n2 = code % 10
  let sum = n1 * 1 + n2 * 9

  const weights = [8, 7, 6, 5, 4, 3, 2, 1]
  for (let i = 1; i <= 8; i++) {
    sum += parseInt(id[i], 10) * weights[i - 1]
  }

  const checkDigit = (10 - (sum % 10)) % 10
  return checkDigit === parseInt(id[9], 10)
}

/**
 * 驗證舊式外僑/港澳居留證統一證號
 * 格式：首碼英文字母 + 第2碼(A-D) + 7碼流水號 + 1碼檢查碼
 * A: 外籍男, B: 外籍女, C: 港澳/無戶籍國民男, D: 港澳/無戶籍國民女
 */
export function validateOldARC(id) {
  if (!/^[A-Z][A-D]\d{8}$/.test(id)) return false
  const code1 = CITY_CODES[id[0]]
  const code2 = CITY_CODES[id[1]]
  if (!code1 || !code2) return false

  const n1 = Math.floor(code1 / 10)
  const n2 = code1 % 10
  const n2_second = code2 % 10 // 第2碼字母轉數字後只取個位數
  let sum = n1 * 1 + n2 * 9 + n2_second * 8

  const weights = [7, 6, 5, 4, 3, 2, 1]
  for (let i = 2; i <= 8; i++) {
    sum += parseInt(id[i], 10) * weights[i - 2]
  }

  const checkDigit = (10 - (sum % 10)) % 10
  return checkDigit === parseInt(id[9], 10)
}

/**
 * 自動識別並嚴格驗證證號（身分證 / 居留證）
 * 回傳：{ valid: boolean, type: string | null, label: string | null, message: string }
 */
export function verifyIdentityNumber(rawId) {
  const id = (rawId || '').trim().toUpperCase()
  if (!id) {
    return {
      valid: false,
      type: null,
      label: null,
      message: '請填寫身分證字號或居留證號碼（作為活動保險使用）',
    }
  }

  if (id.length < 10) {
    return {
      valid: false,
      type: null,
      label: null,
      message: `目前已輸入 ${id.length} 碼，證號需完整為 10 碼`,
    }
  }

  if (id.length > 10) {
    return {
      valid: false,
      type: null,
      label: null,
      message: '證號長度超過 10 碼，請確認是否輸入多餘字元',
    }
  }

  // 首碼需為英文字母
  if (!/^[A-Z]/.test(id)) {
    return {
      valid: false,
      type: null,
      label: null,
      message: '第 1 碼需為英文字母（例如：A、F、H 等縣市代號）',
    }
  }

  // 1. 本國國民身分證（第2碼為 1 或 2）
  if (/^[A-Z][12]/.test(id)) {
    if (!/^[A-Z][12]\d{8}$/.test(id)) {
      return {
        valid: false,
        type: 'TWID',
        label: '台灣身分證',
        message: '身分證字號格式不正確（後 8 碼需為數字）',
      }
    }
    if (!validateTWID(id)) {
      return {
        valid: false,
        type: 'TWID',
        label: '台灣身分證',
        message: '身分證字號檢核失敗（請確認是否有號碼打錯）',
      }
    }
    return {
      valid: true,
      type: 'TWID',
      label: '台灣身分證',
      message: '台灣身分證驗證通過',
    }
  }

  // 2. 新式外僑/港澳居留證（第2碼為 8 或 9）
  if (/^[A-Z][89]/.test(id)) {
    if (!/^[A-Z][89]\d{8}$/.test(id)) {
      return {
        valid: false,
        type: 'NEW_ARC',
        label: '新式居留證',
        message: '居留證號碼格式不正確（後 8 碼需為數字）',
      }
    }
    if (!validateNewARC(id)) {
      return {
        valid: false,
        type: 'NEW_ARC',
        label: '新式居留證',
        message: '居留證號碼檢核失敗（請確認是否有號碼打錯）',
      }
    }
    return {
      valid: true,
      type: 'NEW_ARC',
      label: '新式居留證（外僑/港澳）',
      message: '新式居留證號碼驗證通過',
    }
  }

  // 3. 舊式外僑/港澳居留證（第2碼為 A, B, C, D）
  if (/^[A-Z][A-D]/.test(id)) {
    if (!/^[A-Z][A-D]\d{8}$/.test(id)) {
      return {
        valid: false,
        type: 'OLD_ARC',
        label: '舊式居留證',
        message: '舊式居留證號格式不正確（後 8 碼需為數字）',
      }
    }
    if (!validateOldARC(id)) {
      return {
        valid: false,
        type: 'OLD_ARC',
        label: '舊式居留證',
        message: '舊式居留證號檢核失敗（請確認是否有號碼打錯）',
      }
    }
    return {
      valid: true,
      type: 'OLD_ARC',
      label: '舊式居留證（外僑/港澳）',
      message: '舊式居留證號碼驗證通過',
    }
  }

  // 第 2 碼不符任何身分證或居留證之定義
  return {
    valid: false,
    type: null,
    label: null,
    message: '第 2 碼不符合規範：台灣身分證為 1 或 2，新式居留證為 8 或 9，舊式居留證為 A～D',
  }
}
