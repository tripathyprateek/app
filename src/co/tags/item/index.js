import React from 'react'
import { connect } from 'react-redux'
import { oneRename } from '~data/actions/tags'
import t from '~t'

import { Confirm } from '~co/overlay/dialog'
import Rename from './rename'
import View from './view'
import Contextmenu from './contextmenu'

class TagsItem extends React.PureComponent {
    static defaultProps = {
        //...item,
        active:     false,
        canAppend:  false,
        events:     {}  //onItemClick, onItemAppendClick
    }

    state = {
        rename: false,
        menu: false,
        sharing: false
    }

    handlers = {
        onClick: ()=>
            this.props.events.onItemClick(this.props.query),

        onAppendClick: this.props.events.onItemAppendClick ? ()=>
            this.props.events.onItemAppendClick(this.props.query) : undefined,

        onRenameClick: ()=>
            this.setState({ rename: true }),
        
        onRenameCancel: ()=>
            this.setState({ rename: false }),

        onRename: (newName, success, fail)=>
            this.props.oneRename(this.props._id, newName, success, fail),
    
        onRemoveClick: async()=>{
            if (await Confirm(t.s('areYouSure'), { variant: 'warning' }))
                this.props.oneRename(this.props._id)
        },
    
        onContextMenu: (e)=>{
            e.preventDefault()
            e.target.focus()
            this.setState({ menu: true })
        },
    
        onContextMenuClose: ()=>
            this.setState({ menu: false }),

        onKeyUp: (e)=>{
            switch(e.keyCode){
                case 46: //delete
                case 8: //backspace
                    e.preventDefault()
                    return this.handlers.onRemoveClick()
    
                case 13: //enter
                    e.preventDefault()
                    return this.handlers.onRenameClick()
            }
        }
    }

    render() {
        const Component = (this.state.rename ? Rename : View)

        return (
            <>
                <Component 
                    {...this.props}
                    {...this.handlers} />

                {this.state.menu ? (
                    <Contextmenu 
                        {...this.props}
                        {...this.handlers} />
                ) : null}
            </>
        )
    }
}

export default connect(
	undefined,
	{ oneRename }
)(TagsItem)