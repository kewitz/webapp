import Immutable from 'immutable'
import { createSelector } from 'reselect'
import sample from 'lodash/sample'
import { selectPathname, selectViewNameFromRoute } from './routing'
import { selectJson } from './store'
import { getLinkArray } from '../helpers/json_helper'

const selectCats = state => state.json.get('categories', Immutable.Map())
export const selectAuthPromotionals = state => state.promotions.get('authentication')
const selectPagePromotionals = state => state.json.get('pagePromotionals', Immutable.Map())

export const selectCategoryData = createSelector(
  [selectPathname, selectJson, selectCats], (pathname, json, categories) => {
    const slug = pathname.replace('/discover/', '')
    const cat = categories.valueSeq().find(category => category.get('slug') === slug) || Immutable.Map()
    return {
      category: cat,
      promotionals: getLinkArray(cat, 'promotionals', json) || Immutable.List(),
    }
  },
)

export const selectIsPagePromotion = createSelector(
  [selectViewNameFromRoute, selectPathname], (viewName, pathname) =>
    (viewName === 'discover' && pathname === '/discover') ||
    (viewName === 'discover' && /\/featured\b|\/trending\b|\/recent\b/.test(pathname)),
)

export const selectIsCategoryPromotion = createSelector(
  [selectViewNameFromRoute, selectIsPagePromotion, selectPathname],
  (viewName, isPagePromotion, pathname) =>
    (viewName === 'discover' && (!isPagePromotion && pathname !== '/discover/all')),
)

export const selectLoggedInPagePromotions = createSelector(
  [selectPagePromotionals], promos =>
    promos.filter(value => value.get('isLoggedIn') && !value.get('isArtistInvite') && !value.get('isEditorial')),
)

export const selectLoggedOutPagePromotions = createSelector(
  [selectPagePromotionals], promos =>
    promos.filter(value => !value.get('isLoggedIn') && !value.get('isArtistInvite') && !value.get('isEditorial')),
)

export const selectArtistInvitePagePromotions = createSelector(
  [selectPagePromotionals], promos =>
    promos.filter(value => value.get('isArtistInvite')),
)

export const selectRandomArtistInvitePromotion = createSelector(
  [selectArtistInvitePagePromotions], (promos) => {
    const keyArr = []
    promos.keySeq().forEach((key) => {
      keyArr.push(key)
    })
    const randomKey = sample(keyArr)
    return promos.get(randomKey)
  },
)

export const selectEditorialPagePromotions = createSelector(
  [selectPagePromotionals], promos =>
    promos.filter(value => value.get('isEditorial')),
)

export const selectRandomEditorialPromotion = createSelector(
  [selectEditorialPagePromotions], (promos) => {
    const keyArr = []
    promos.keySeq().forEach((key) => {
      keyArr.push(key)
    })
    const randomKey = sample(keyArr)
    return promos.get(randomKey)
  },
)

export const selectRandomAuthPromotion = createSelector(
  [selectAuthPromotionals], (promos) => {
    const keyArr = []
    promos.keySeq().forEach((key) => {
      keyArr.push(key)
    })
    const randomKey = sample(keyArr)
    return promos.get(randomKey)
  },
)
