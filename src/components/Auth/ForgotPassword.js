import React from 'react';
import { FirebaseContext } from '../../firebase';

const orcavo = {
  sections: {
    1: {
      title: 'Landing Page',
      looks: 'fullscreen image/background with bold text and call to action button',
    },
    2: 'What we do: a list of things we do, 3 categories with bullet points on each',
    3: 'How we do it: an interactive visualisation of the our process, 3 to 5 steps',
    4: 'What we use: a short section with technologies we use',
    5: 'Previous work: an showcase of what have we done so far'
  },
};

function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = React.useState('');
  const [isPasswordReset, setIsPasswordReset] = React.useState(false);
  const [passwordResetError, setPasswordResetError] = React.useState(null);

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch (error) {
      console.log('error sending email: ', error);
      setPasswordResetError(error.message);
      setIsPasswordReset(false);
    }
  }

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email"
        onChange={event => setResetPasswordEmail(event.target.value)}
      />
      <div>
        <button className="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
      {isPasswordReset && <p>Check email to reset password</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export default ForgotPassword;
