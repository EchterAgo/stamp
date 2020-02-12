import { Notify } from 'quasar'
import { notificationTimeout } from './constants'
const remote = require('electron').remote

export const chainTooLongNotify = function () {
  Notify.create({
    message: 'Transaction chain too long or relay fee too low.',
    color: 'negative'
  })
}

export const insuffientFundsNotify = function () {
  Notify.create({
    message: 'Insufficent funds.',
    color: 'negative'
  })
}

export const walletDisconnectedNotify = function () {
  Notify.create({
    message: 'Unable to contact wallet server.',
    color: 'negative'
  })
}

export const keyserverDisconnectedNotify = function () {
  Notify.create({
    message: 'Unable to contact keyserver.',
    color: 'negative'
  })
}

export const relayDisconnectedNotify = function () {
  Notify.create({
    message: 'Unable to contact relay server.',
    color: 'negative'
  })
}

export const paymentFailureNotify = function () {
  Notify.create({
    message: 'Payment was rejected.',
    color: 'negative'
  })
}

export const addressCopiedNotify = function () {
  Notify.create({
    message: '<div class="text-center"> Address copied to clipboard </div>',
    html: true,
    color: 'accent'
  })
}

export const seedCopiedNotify = function () {
  Notify.create({
    message: '<div class="text-center"> Seed phrase copied to clipboard </div>',
    html: true,
    color: 'accent'
  })
}

export const sentTransactionNotify = function (tx) {
  Notify.create({
    message: '<div class="text-center"> Sent transaction </div>',
    html: true,
    color: 'accent',
    actions: [
      { label: 'View', color: 'secondary', handler: () => { /* ... */ } }
    ]
  })
}

export const desktopNotify = function (title, body, icon, callback) {
  let notify = new window.Notification(title, {
    title,
    body,
    icon
  })
  notify.onclick = () => {
    var window = remote.getCurrentWindow()
    window.show()
    callback()
    notify.close()
  }
  setTimeout(notify.close.bind(notify), notificationTimeout)
}
