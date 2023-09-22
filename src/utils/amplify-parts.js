import { Authenticator, Button, CheckboxField, Heading, Image, Text, useAuthenticator, useTheme, View } from "@aws-amplify/ui-react";
import { Auth, Hub } from 'aws-amplify';
import { strings, translate } from "../components/internationalization";
import logo from './img/logo.svg';

function listenToAutoSignInEvent() {
  Hub.listen('auth', ({ payload }) => {
    const { event } = payload;
    if (event === 'autoSignIn') {
      const user = payload.data;

      localStorage.setItem("authenticated", `${!!user}`)
      localStorage.setItem("p_tguid", user.username)
      localStorage.setItem("p_tguid_updated_at", Date.now().toString())

      const hasuraClaimsString = user.signInUserSession?.getIdToken()?.payload["https://hasura.io/jwt/claims"]
      var claims = hasuraClaimsString && JSON.parse(hasuraClaimsString);
      claims && localStorage.setItem("principal_id", claims['x-hasura-principal-id'])
    } else if (event === 'autoSignIn_failure') {
      // redirect to sign in page
    }
  })
}

export const components = {
  Header() {
    const { tokens } = useTheme();
    return <View textAlign="left" padding={tokens.space.large} data-amplify-header>
      <Image alt="logo" src={logo} style={{ width: '100px' }} />
    </View>
  },

  Footer() {
    const { tokens } = useTheme();
    return <View textAlign="center" padding={tokens.space.large} data-amplify-footer>
      <Text color={tokens.colors.neutral[80]}>  &copy; {translate(strings.LOGIN_RIGHTS_RESERVED)}  </Text>
    </View>
  },

  SignIn: {
    Footer() {
      const { tokens } = useTheme();
      const { toResetPassword } = useAuthenticator();
      return <View textAlign="left" paddingLeft={tokens.space.large}>
        <Button onClick={() => window.location.replace("/")} size="medium" variation="link">
          {translate(strings.LOGIN_BACK)}
        </Button>
        <Button onClick={toResetPassword} size="medium" variation="link">
          {translate(strings.LOGIN_FORGOT_PASSWORD)}
        </Button>
      </View>
    },
  },

  SignUp: {
    Footer() {
      return <View textAlign="left">
        <Button onClick={() => window.location.replace("/")} size="medium" variation="link">
          {translate(strings.LOGIN_BACK)}
        </Button>
      </View>
    },
    FormFields() {
      const { validationErrors } = useAuthenticator();
      return <div>
        {/* Re-use default `Authenticator.SignUp.FormFields` */}
        <Authenticator.SignUp.FormFields />

        {/* Append & require Terms & Conditions field to sign up  */}
        <CheckboxField
          errorMessage={validationErrors.acknowledgement}
          hasError={!!validationErrors.acknowledgement}
          name="acknowledgement"
          value="yes"
          label={translate(strings.LOGIN_TERMS_CONDITIONS_CHECKBOX)}
        />
      </div>
    },
  },
  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return <Heading padding={`${tokens.space.xl} 0 0 0`} level={3} textAlign={'center'}>
        {translate(strings.LOGIN_CONFIRMATION_CODE)}
      </Heading>
    },
  },
  SetupTOTP: {
    Header() {
      const { tokens } = useTheme();
      return <Heading padding={`${tokens.space.xl} 0 0 0`} level={3} textAlign={'center'}>
        Enter Information:
      </Heading>
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return <Heading padding={`${tokens.space.xl} 0 0 0`} level={3} textAlign={'center'}>
        Enter Information:
      </Heading>
    },
  },
  ResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return <Heading padding={`${tokens.space.xl} 0 0 0`} level={3} textAlign={'center'}>
        {translate(strings.LOGIN_RESET_PASSWORD_HEADING)}
      </Heading>
    },
    FormFields() {
      const { validationErrors } = useAuthenticator();
      return <>
        {/* Re-use default `Authenticator.SignUp.FormFields` */}
        <Authenticator.ResetPassword.FormFields />
      </>
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return <Heading padding={`${tokens.space.xl} 0 0 0`} level={3} textAlign={'center'}>
        {translate(strings.LOGIN_CREATE_NEW_PASSWORD_HEADING)}
      </Heading>
    },
  },
};

export const services = {
  async validateCustomSignUp(formData) {
    if (!formData.acknowledgement) {
      return {
        acknowledgement: translate(strings.LOGIN_TERMS_CONDITION),
      }
    }
  },

  async handleSignUp(formData) {
    let { username, password, attributes } = formData
    // Custom username, on the login screen an email address works as a username.
    // Auth.signIn() also returns username HOWEVER it is not an email but a uuid sub of the user in Cognito.
    username = username.toLowerCase()
    const signUpResult = Auth.signUp({
      username,
      password,
      attributes,
      autoSignIn: {
        enabled: true,
      },
    })

    // Make sure user attributes are set in localStorage.
    listenToAutoSignInEvent()

    return signUpResult
  },

  async handleSignIn(formData) {
    let { username, password } = formData
    const user = await Auth.signIn({
      username,
      password
    })
    localStorage.setItem("authenticated", `${!!user}`)
    localStorage.setItem("p_tguid", user.username)
    localStorage.setItem("p_tguid_updated_at", Date.now().toString())

    const hasuraClaimsString = user.signInUserSession?.getIdToken()?.payload["https://hasura.io/jwt/claims"]
    var claims = hasuraClaimsString && JSON.parse(hasuraClaimsString);
    claims && localStorage.setItem("principal_id", claims['x-hasura-principal-id'])

    return user
  },
}
export const formFields = () => ({
  signIn: {
    username: {
      labelHidden: false,
      label: translate(strings.LOGIN_EMAIL),
      placeholder: '',
      isRequired: true,
      order: 1,
    },
    password: {
      labelHidden: false,
      label: translate(strings.LOGIN_PASSWORD),
      placeholder: '',
      isRequired: true,
      order: 2,
    },
  },
  signUp: {
    given_name: {
      labelHidden: false,
      label: translate(strings.LOGIN_NAME),
      placeholder: '',
      isRequired: true,
      order: 1,
    },
    family_name: {
      labelHidden: false,
      label: translate(strings.LOGIN_FAMILY_NAME),
      placeholder: '',
      isRequired: true,
      order: 2,
    },
    // Dirty hack recommended by amplify documentation, just label username as email
    username: {
      labelHidden: false,
      label: translate(strings.LOGIN_EMAIL),
      placeholder: '',
      isRequired: true,
      order: 3,
    },
    password: {
      labelHidden: false,
      label: translate(strings.LOGIN_PASSWORD),
      placeholder: '',
      isRequired: true,
      order: 4,
    },
    confirm_password: {
      labelHidden: false,
      label: translate(strings.LOGIN_CONFIRM_PASSWORD),
      placeholder: '',
      isRequired: true,
      order: 5
    }
  },
  forceNewPassword: {
    password: {
      labelHidden: false,
      placeholder: '',
    },
  },
  resetPassword: {
    username: {
      labelHidden: false,
      placeholder: '',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      labelHidden: false,
      placeholder: '',
      label: translate(strings.LOGIN_CONFIRMATION_CODE),
      isRequired: false,
      order: 1,
    },
    password: {
      labelHidden: false,
      placeholder: '',
      label: translate(strings.LOGIN_NEW_PASSWORD),
      isRequired: false,
      order: 2,
    },
    confirm_password: {
      labelHidden: false,
      label: translate(strings.LOGIN_CONFIRM_PASSWORD),
      placeholder: '',
      order: 3,
    },
  },
  setupTOTP: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'LOGIN_qr_test_user',
    },
    confirmation_code: {
      labelHidden: false,
      label: translate(strings.LOGIN_CONFIRMATION_CODE),
      placeholder: '',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      labelHidden: false,
      label: translate(strings.LOGIN_CONFIRMATION_CODE),
      placeholder: '',
      isRequired: false,
    },
  },
  confirmSignUp: {
    confirmation_code: {
      labelHidden: false,
      label: translate(strings.LOGIN_CONFIRMATION_CODE),
      placeholder: '',
      isRequired: false,
    },
  },
  resetPassword: {
    username: {
      labelHidden: false,
      label: translate(strings.LOGIN_EMAIL),
      placeholder: '',
      isRequired: true,
      order: 1,
    },
  }
});