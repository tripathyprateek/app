import s from './index.module.styl'
import React from 'react'

import { Layout, Separator } from '~co/common/form'
import Preloader from '~co/common/preloader'
import Cover from './cover'
import Collection from './collection'
import Tags from './tags'
import Buttons from './buttons'
import Title from './title'
import Link from './link'
import More from './more'

export default class BookmarkEditForm extends React.Component {
    onSubmitForm = e=>{
        e.preventDefault()
        this.props.onSave()
    }

    render() {
        return (
            <form 
                className={s.form}
                data-status={this.props.status}
                onSubmit={this.onSubmitForm}>
                <Layout type='grid'>
                    <Cover {...this.props} />
                    <Title  {...this.props} />
                    
                    <Collection {...this.props} />
                    <Tags {...this.props} />
                    <Link {...this.props} />
                    <More {...this.props} />

                    <Separator />

                    <Buttons {...this.props} />
                </Layout>

                <div className={s.loading}>
                    <Preloader enlarge='1.5' />
                </div>
            </form>
        )
    }
}