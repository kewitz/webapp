// @flow
import React from 'react'
import { css, select } from '../../styles/jss'
import {
  // Ello icons
  ElloMark,
  ElloBoxMark,
  ElloDonutMark,
  ElloRainbowMark,
  // Badge icons
  BadgeCheckIcon,
  // Icons
  ArrowIcon,
  BoltIcon,
  BrowseIcon,
  BubbleIcon,
  CameraIcon,
  CheckCircleIcon,
  CheckIcon,
  CheckIconSM,
  CheckIconLG,
  ChevronCircleIcon,
  ChevronIcon,
  CircleIcon,
  CircleIconLG,
  DotsIcon,
  DragIcon,
  EyeIcon,
  FlagIcon,
  GridIcon,
  HeartIcon,
  LinkIcon,
  ListIcon,
  LockIcon,
  MarkerIcon,
  MoneyIcon,
  PencilIcon,
  PlusCircleIcon,
  PlusIconSM,
  RelationshipIcon,
  ReplyIcon,
  ReplyAllIcon,
  RepostIcon,
  SearchIcon,
  ShareIcon,
  SparklesIcon,
  XBoxIcon,
  XIcon,
  XIconLG,
  // Social icons
  FacebookIcon,
  GooglePlusIcon,
  LinkedInIcon,
  MailIcon,
  PinterestIcon,
  RedditIcon,
  TumblrIcon,
  TwitterIcon,
} from '../assets/Icons'
import { flex, flexColumn, flexWrap, fontSize16, mb10, mb40, mr10, my40, wrapperPaddingX } from '../../styles/jso'

const sectionStyle = css(flex, flexColumn, flexWrap, wrapperPaddingX, my40)
const h2Style = css(mb10, fontSize16)
const groupStyle = css(
  flex,
  mb40,
  select('& > *', mr10),
)

// TODO: Move to icons...
const badgeStyle = select('& .CheckShape', { stroke: 'white' })

export default() =>
  <section className={sectionStyle}>
    <h2 className={h2Style}>Ello icons</h2>
    <div className={groupStyle}>
      <ElloBoxMark />
      <ElloMark />
      <ElloRainbowMark />
      <ElloDonutMark />
    </div>
    <h2 className={h2Style}>Badge icons</h2>
    <div className={groupStyle}>
      <button className={badgeStyle} title="BadgeCheckIcon">
        <BadgeCheckIcon />
      </button>
    </div>
    <h2 className={h2Style}>Icons</h2>
    <div className={groupStyle}>
      { [
        ArrowIcon,
        BoltIcon,
        BrowseIcon,
        BubbleIcon,
        CameraIcon,
        CheckCircleIcon,
        CheckIconSM,
        CheckIcon,
        CheckIconLG,
        ChevronCircleIcon,
        ChevronIcon,
        CircleIcon,
        CircleIconLG,
        DotsIcon,
        DragIcon,
        EyeIcon,
        FlagIcon,
        GridIcon,
        HeartIcon,
        LinkIcon,
        ListIcon,
        LockIcon,
        MarkerIcon,
        MoneyIcon,
        PencilIcon,
        PlusCircleIcon,
        PlusIconSM,
        RelationshipIcon,
        ReplyIcon,
        ReplyAllIcon,
        RepostIcon,
        SearchIcon,
        ShareIcon,
        SparklesIcon,
        XBoxIcon,
        XIcon,
        XIconLG,
      ].map(icon => <button key={icon.name} title={icon.name}>{icon({})}</button>) }
    </div>
    <h2 className={h2Style}>Social icons</h2>
    <div className={groupStyle} >
      { [
        FacebookIcon,
        GooglePlusIcon,
        LinkedInIcon,
        MailIcon,
        PinterestIcon,
        RedditIcon,
        TumblrIcon,
        TwitterIcon,
      ].map(icon => <button key={icon.name} title={icon.name}>{icon()}</button>) }
    </div>
  </section>

