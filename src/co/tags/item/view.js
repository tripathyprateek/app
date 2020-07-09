import s from './view.module.styl'
import React from 'react'
import t from '~t'
import { humanNumber } from '~modules/strings'

import { Item, ItemIcon, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import SuperLink from '~co/common/superLink'

export default class TagsItemView extends React.Component {
    render() {
        const {
            _id, count, active, canAppend,
            onClick, onAppendClick, onRenameClick, onContextMenu, onKeyUp,
            oneRename, onRenameCancel, onContextMenuClose, onRemoveClick, onRename, //to ignore
            ...etc
        } = this.props

        return (
            <Item
                {...etc}
                className={s.item}
                active={active}>
                <ItemIcon>
                    <Icon name='tag' />
                </ItemIcon>

                <ItemTitle>{_id}</ItemTitle>

                {count ? <ItemInfo>{humanNumber(count)}</ItemInfo> : null}
                <ItemActions>
                    {canAppend && onAppendClick && (
                        <Button 
                            title={t.s('add')+' '+t.s('filters')}
                            onClick={onAppendClick}>
                            <Icon name='search_add' />
                        </Button>
                    )}
                    {onContextMenu && (
                        <Button 
                            title={t.s('more')}
                            onClick={onContextMenu}>
                            <Icon name='more_horizontal' />
                        </Button>
                    )}
                </ItemActions>

                {onClick && (
                    <SuperLink
                        tabIndex='1'
                        active={active}
                        
                        onClick={onClick}
                        onDoubleClick={onRenameClick}
                        onContextMenu={onContextMenu}
                        onKeyUp={onKeyUp} />
                )}
            </Item>
        )
    }
}