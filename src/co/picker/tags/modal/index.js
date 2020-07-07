import s from './index.module.styl'
import React from 'react'
import t from '~t'
import Modal, { Header, Content } from '~co/overlay/modal'
import { Layout, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Field from '../field'

export default class PicketTagsModal extends React.Component {
    static defaultProps = {
        //...same as ../field
        onSubmit: undefined,
        onClose: undefined
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.onSubmit && this.props.onSubmit()
    }

    render() {
        const { onSubmit, onClose, ...etc } = this.props

        return (
            <Modal onClose={onClose}>
                <Header title={t.s('addTags')}></Header>

                <Content className={s.content}>
                    <form onSubmit={this.onSubmit}>
                        <Layout>
                            <Field 
                                autoFocus={true}
                                placeholder=''
                                {...etc} />

                            <Buttons>
                                <Button 
                                    Tag='input'
                                    type='submit'
                                    disabled={!etc.value.length}
                                    variant='primary'
                                    value={etc.value.length ? `${t.s('add')} ${etc.value.length} ${t.s('tags').toLowerCase()}` : t.s('addTags')} />

                                <Button
                                    onClick={onClose}
                                    variant='outline'
                                    data-block>{t.s('cancel')}</Button>
                            </Buttons>
                        </Layout>
                    </form>
                </Content>
            </Modal>
        )
    }
}