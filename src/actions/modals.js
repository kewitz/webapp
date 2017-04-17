import { MODAL, ALERT } from '../constants/action_types'

export function openModal(component, classList = '', type = null, trackLabel = null) {
  return {
    type: MODAL.OPEN,
    payload: {
      classList,
      component,
      isActive: true,
      kind: 'Modal',
      trackLabel,
      type,
    },
  }
}

export function closeModal() {
  return {
    type: MODAL.CLOSE,
    payload: {
      classList: null,
      component: null,
      isActive: false,
      kind: 'Modal',
      type: null,
    },
  }
}

export function openAlert(component, classList = '', type = null, trackLabel = null) {
  return {
    type: ALERT.OPEN,
    payload: {
      classList,
      component,
      isActive: true,
      kind: 'Alert',
      trackLabel,
      type,
    },
  }
}

export function closeAlert() {
  return {
    type: ALERT.CLOSE,
    payload: {
      classList: null,
      component: null,
      isActive: false,
      kind: 'Alert',
      type: null,
    },
  }
}

