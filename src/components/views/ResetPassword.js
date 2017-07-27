import React from 'react'
import PropTypes from 'prop-types'
import { MainView } from '../views/MainView'
import PasswordControl from '../forms/PasswordControl'
import FormButton from '../forms/FormButton'
import { resetPassword } from '../../networking/api'

const ResetPasswordForm = (props) => {
  const { onSubmit, onChangeControl } = props
  return (
    <form
      action={resetPassword().path}
      className="AuthenticationForm"
      id="ResetPasswordForm"
      method="POST"
      noValidate="novalidate"
      onSubmit={onSubmit}
    >
      <PasswordControl
        classList="isBoxControl"
        placeholder="Enter new password"
        label="Password"
        onChange={onChangeControl}
      />
      <FormButton className="FormButton isRounded" tabIndex="2">
        Change password
      </FormButton>
    </form>
  )
}

ResetPasswordForm.propTypes = {
  // passwordState: PropTypes.object.isRequired,
  // isFormValid: PropTypes.bool.isRequired,
  // onBlurControl: PropTypes.func,
  onChangeControl: PropTypes.func.isRequired,
  // onFocusControl: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
}

export const ResetPassword = (props) => {
  const { onSubmit, onChangeControl } = props
  return (
    <MainView className="Authentication isForgotPassword">
      <div className="AuthenticationFormDialog">
        <h1>
          Set new password
        </h1>
        <ResetPasswordForm
          // emailState={emailState}
          // isFormValid={isFormValid}
          // onBlurControl={onBlurControl}
          onChangeControl={onChangeControl}
          // onFocusControl={onFocusControl}
          onSubmit={onSubmit}
        />
      </div>
    </MainView>
  )
}

ResetPassword.propTypes = {
  // emailState: PropTypes.object.isRequired,
  // isSubmitted: PropTypes.bool.isRequired,
  // isFormValid: PropTypes.bool.isRequired,
  // onBlurControl: PropTypes.func,
  onChangeControl: PropTypes.func.isRequired,
  // onFocusControl: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
}

export default ResetPassword
