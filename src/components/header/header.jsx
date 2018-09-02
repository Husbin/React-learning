import React ,{Component} from 'react'
import {is,fromJS} from 'immutable'
import {NavLink} from 'react-router-dom'
import PropTyes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './header.less'

export default class PublicHeader extends Component{
    static propTypes = {
        record:PropTyes.any,
        title:PropTyes.string.isRequired,
        confirm:PropTyes.any
    }

    state = {
        navState:false      //导航栏是否显示
    }
    //切换左侧导航栏状态
    toggleNav = ()=>{
        this.setState({navState:!this.state.navState})
    }
    //css动画组件设置为目标组件
    FirstChild = props =>{
        const childArray = React.Children.toArray(props.children)
        return childArray[0] || null
    }
    shouldComponentUpdate(nextProps,nextState){
        return !is(fromJS(this.props),fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    render(){
        return(
            <header className='header-continer'>
                <span className='header-slide-icon icon-catalog' onClick={this.toggleNav}></span>
                <span className='header-title'>{this.props.title}</span>
                {
                    this.props.record && <NavLink to='/record' exact className='header-link icon-jilu'></NavLink>
                }
                {
                    this.props.confirm && <NavLink to='/' exact className='header-link header-link-confim'>确定</NavLink>
                }
                <ReactCSSTransitionGroup
                    component={this.FirstChild}
                    transitionName="nav"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {
                        this.state.navState &&
                        <aside key='nav-slide' className='nav-slide-list' onClick={this.toggleNav}>
                            <NavLink to='/' className='nav-link icon-jiantou-copy-copy'>首页</NavLink>
                            <NavLink to='/balance' className='nav-link icon-jiantou-copy-copy'>提现</NavLink>
                            <NavLink to='/helpcenter' className='nav-link icon-jiantou-copy-copy'>帮助中心</NavLink>
                        </aside>
                    }
                </ReactCSSTransitionGroup>
            </header>
        )
    }
}