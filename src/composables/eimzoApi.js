import axios from 'axios'
import { EIMZOMobile } from '@/composables/e-imzo/mobile/e-imzo-mobile.js'

const textHash = (text_hash) => {
  let array_of_16 = text_hash.match(/.{1,16}/g)

  let array_of_16_html = ``

  array_of_16.forEach(function (item) {
    let array_of_1 = item.match(/.{1,1}/g)

    item = ``

    array_of_1.forEach(function (itm) {
      if (/^\d+$/.test(itm))
        item += `<span style="color:#333">` + itm + `</span>`
      else item += `<span style="color:#00C68E">` + itm + `</span>`
    })

    array_of_16_html += `<div class="flex justify-between">` + item + `</div>`
  })

  return array_of_16_html
}

export function useEimzoApi(baseUrl) {
  function getChallenge(callback) {
    axios
      .get(`${baseUrl}/eimzo/frontend/challenge`)
      .then(({ data }) => {
        callback?.(data, null)
      })
      .catch((error) => {
        callback?.(null, error)
      })
  }

  function getFrontEndMobileAuth(callback) {
    axios
      .post(`${baseUrl}/eimzo/frontend/mobile/auth`)
      .then(({ data }) => {
        if (data.status === 1) {
          let eim = new EIMZOMobile(data.siteId)
          let res = eim.makeQRCode(data.documentId, data.challange)
          let qr = res[1]
          let hash = res[0]
          getStatus(data.documentId, ({ status }, error) => {
            if (status && status === 2) {
              callback?.(
                {
                  qrCode: qr,
                  hash: textHash(hash),
                  challenge: data?.challange,
                  documentId: data.documentId,
                  siteId: data.siteId
                },
                null
              )
            } else if (error) {
              callback?.(null, error)
            }
          })
        }
      })
      .catch((error) => {
        callback?.(null, error)
      })
  }

  function getFrontEndMobileSing(document, callback) {
    axios
      .post(`${baseUrl}/eimzo/frontend/mobile/sign`)
      .then(({ data }) => {
        if (data.status === 1) {
          let eim = new EIMZOMobile(data?.siteId)
          let res = eim.makeQRCode(data?.documentId, JSON.stringify(document))
          let qr = res[1]
          let hash = res[0]
          getStatus(data.documentId, ({ status }, error) => {
            if (status && status === 2) {
              callback?.(
                {
                  qrCode: qr,
                  hash: textHash(hash),
                  documentId: data.documentId,
                  siteId: data.siteId
                },
                null
              )
            }
          })
        }
      })
      .catch((error) => {
        callback?.(null, error)
      })
  }

  function getStatus(documentId, callback) {
    axios
      .post(`${baseUrl}/eimzo/frontend/mobile/status`, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          documentId
        }
      })
      .then(({ data }) => {
        callback?.(data, null)
      })
      .catch((error) => {
        callback?.(null, error)
      })
  }

  return {
    getChallenge,
    getFrontEndMobileAuth,
    getFrontEndMobileSing,
    getStatus
  }
}
