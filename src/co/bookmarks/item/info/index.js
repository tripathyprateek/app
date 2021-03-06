import s from './index.module.styl'
import React from 'react'
import { Link } from 'react-router-dom'
import t from '~t'
import { ShortDate } from '~modules/format/date'

import Icon from '~co/common/icon'
import Path from './path'

export default class BookmarkItemView extends React.PureComponent {
    render() {
        const { className='', creatorRef, domain, type, link, created, reparse, collectionId, spaceId, important, broken, duplicate, cache, getLink } = this.props

        return (
            <div className={s.info+' '+className}>
                {creatorRef && creatorRef._id ? (
                    <>
                        <section data-inline><Icon name='user' size='micro' /></section>
                        <section>{creatorRef.fullName}</section>
                    </>
                ) : null}

                {spaceId != collectionId && spaceId != collectionId+'s' ? (
                    <section><Path {...this.props} /></section>
                ) : null}

                {important ? (
                    <section data-inline className={s.importantLabel}>
                        <Icon name='important_active' size='micro' />
                    </section>
                ) : null}

                {broken ? (
                    <section><Icon name='broken' size='micro' /></section>
                ) : null}

                {duplicate ? (
                    <>
                        <section data-inline className={s.duplicateLabel}><Icon name='duplicate' size='micro' /></section>
                        <section className={s.duplicateLabel}>
                            <Link 
                                to={getLink({ search: link })}
                                title={t.s('defaultCollection-0')+' '+t.s('original').toLowerCase()}>
                                {t.s('duplicates')}
                            </Link>
                        </section>
                    </>
                ) : null}

                {reparse ? (
                    <section data-inline><Icon name='progress' size='micro' /></section>
                ) : null}

                {cache && cache != 'ready' && cache != 'retry' ? (
                    <section data-inline><Icon name='cache_failed' size='micro' /></section>
                ) : null}

                {type != 'link' ? (
                    <section data-inline><Icon name={type} size='micro' /></section>
                ) : null}

                <section>{domain}</section>

                <section><ShortDate date={created}/></section>
            </div>
        )
    }
}