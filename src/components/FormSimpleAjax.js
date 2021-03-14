import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Simple Form Ajax',
    subject: 'LawWebsite', // optional subject of the notification email
    action: '',
    successMessage: 'Thank you for your message. We will get back to you soon.',
    errorMessage:
      'Sorry, your message has not been sent successfully. Please try to contact us via the specified email.'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subject, action } = this.props

    return (
      <Fragment>
        <Helmet>
          <script src="https://www.google.com/recaptcha/api.js" />
        </Helmet>
        <form
          name={name}
          method="POST"
          data-netlify-recaptcha="true"
          data-netlify="true"
        >
          <p>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Name"
                name="name"
                required
              />
              <span>Name</span>
            </label>
          </p>
          <p>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="email"
                placeholder="Email"
                name="emailAddress"
                required
              />
              <span>Email address</span>
            </label>
          </p>
          <p>
            <label className="Form--Label">
              <textarea
                className="Form--Input Form--Textarea Form--InputText"
                placeholder="Message"
                name="message"
                rows="10"
                required
              />
              <span>Message</span>
            </label>
          </p>

          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="SEND MESSAGE"
            disabled={this.state.disabled}
          />
        </form>
      </Fragment>
    )
  }
}

export default Form
