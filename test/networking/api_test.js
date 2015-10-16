import { expect } from '../spec_helper'
import * as api from '../../src/networking/api'

describe('api.js', () => {
  it('.s3CredentialsPath', () => {
    expect(api.s3CredentialsPath.path).to.match(/\/assets\/credentials$/)
  })

  it('.profilePath', () => {
    expect(api.profilePath.path).to.match(/\/profile$/)
  })

  it('.awesomePeoplePath', () => {
    expect(api.awesomePeoplePath.path).to.match(/\/discover\/users\/onboarding\?/)
  })

  it('.communitiesPath', () => {
    expect(api.communitiesPath.path).to.match(/\/interest_categories\/members\?/)
  })

  it('.relationshipBatchPath', () => {
    expect(api.relationshipBatchPath.path).to.match(/\/relationships\/batches$/)
  })

  it('.discoverRecommended', () => {
    expect(api.discoverRecommended.path).to.match(/\/users/)
    expect(api.discoverRecommended.pagingPath).to.equal('posts')
  })

  it('.friendStream', () => {
    expect(api.friendStream.path).to.match(/\/streams\/friend\?/)
  })

  describe('#postDetail', () => {
    it('with an id', () => {
      expect(api.postDetail('666').path).to.match(/\/posts\/666\?/)
      expect(api.postDetail('666').pagingPath).to.equal('comments')
    })

    it('with a token', () => {
      expect(api.postDetail('six_six_six').path).to.match(/\/posts\/~six_six_six\?/)
      expect(api.postDetail('six_six_six').pagingPath).to.equal('comments')
    })
  })

  it('#commentsForPost', () => {
    expect(api.commentsForPost({id: 'suck_it'}).path).to.match(/\/posts\/suck_it\/comments\?/)
  })

  describe('#userDetail', () => {
    it('with an id', () => {
      expect(api.userDetail('666').path).to.match(/\/users\/666\?/)
      expect(api.userDetail('666').pagingPath).to.equal('posts')
    })

    it('with a token', () => {
      expect(api.userDetail('six_six_six').path).to.match(/\/users\/~six_six_six\?/)
      expect(api.userDetail('six_six_six').pagingPath).to.equal('posts')
    })
  })
})

