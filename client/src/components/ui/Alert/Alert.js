import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import './Alert.scss'

const modalRoot = document.getElementById('modal-root')

class Alert extends Component {
  constructor(props) {
    super(props)
    this.modal = document.createElement('div')
    this.state = {
      isOpen: this.props.isOpen,
      showConfirmSpinner: false,
    }

    this.rejectRef = createRef()
    this.confirmRef = createRef()
  }

  componentDidMount() {
    modalRoot.appendChild(this.modal)
    document.addEventListener('keydown', this.handleKeypress)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.modal)
    document.removeEventListener('keydown', this.handleKeypress)
  }

  handleKeypress = ({ keyCode }) => {
    const { isOpen } = this.state
    if (!isOpen) return

    keyCode === 27 && this.onReject()
  }

  openAlert = () => {
    this.setState(
      {
        isOpen: true,
      },
      () => {
        this.rejectRef.current.focus()
      }
    )
  }

  onConfirm = async () => {
    const { onConfirm } = this.props

    this.setState({
      showConfirmSpinner: true,
    })

    if (onConfirm) {
      await onConfirm()
    }

    // this.onCloseFinally()
  }

  onReject = () => {
    const { onReject } = this.props

    if (onReject) {
      onReject()
    }

    this.onCloseFinally()
  }

  onCloseFinally() {
    this.setState({
      isOpen: false,
      showConfirmSpinner: false,
    })
  }

  render() {
    const {
      title,
      confirmText,
      rejectText,
      trigger,
      children,
      destructive,
      icon,
      shouldCloseOnOverlayClick,
      disabled,
    } = this.props
    const { isOpen, showConfirmSpinner } = this.state

    if (disabled) return trigger

    const triggerWithClickHandler = React.Children.map(trigger, node => {
      return React.cloneElement(node, {
        onClick: this.openAlert,
      })
    })

    if (!isOpen) return triggerWithClickHandler

    return (
      <>
        {triggerWithClickHandler}
        {createPortal(
          <div className="modal" role="dialog">
            <div
              className="ui dimmer modals page visible active"
              onClick={shouldCloseOnOverlayClick ? this.onReject : null}
            >
              <div className="ui mini test modal transition visible active">
                {!!title && <div className="header">{title}</div>}
                <div className="content">{children}</div>
                <div className="actions">
                  <button
                    className={`ui button ${!destructive &&
                      'negative'} ${showConfirmSpinner && 'disabled'}`}
                    onClick={this.onReject}
                    ref={this.rejectRef}
                  >
                    {rejectText}
                  </button>
                  <button
                    className={`ui ${!!icon && 'labeled icon'} button ${
                      destructive ? 'negative' : 'positive'
                    } ${showConfirmSpinner && 'loading'}`}
                    onClick={this.onConfirm}
                    ref={this.confirmRef}
                  >
                    {confirmText}
                    {!!icon && <i className={`icon ${icon}`} />}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          this.modal
        )}
      </>
    )
  }
}

Alert.propTypes = {
  trigger: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  confirmText: PropTypes.string,
  rejectText: PropTypes.string,
  onConfirm: PropTypes.func,
  onReject: PropTypes.func,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  shouldCloseOnOverlayClick: PropTypes.bool,
  destructive: PropTypes.bool,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
}

Alert.defaultProps = {
  isOpen: false,
  children: 'Default content',
  confirmText: 'Confirm',
  rejectText: 'Cancel',
  destructive: false,
  disabled: false,
  shouldCloseOnOverlayClick: true,
}

export default Alert
