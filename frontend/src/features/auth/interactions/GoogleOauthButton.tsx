import googleLogo from '@assets/google-logo.svg'

export const GoogleOauthButton = () => {
  return (
    <button className='p-2 flex items-center gap-4 justify-center font-medium border-2 w-full border-border rounded-md hover:shadow my-1'>
        <img src={googleLogo} alt="" className='object-cover w-6 h-6'/>
        <span>Continue with Google</span>
    </button>
  )
}
