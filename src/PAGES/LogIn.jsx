import React, { useEffect } from 'react'
import { auth, provider } from '../firebase';
import { useDispatch } from 'react-redux'
import { setUserLogIn } from '../ReduxStore/UserSlice'
const LogIn = () => {

const dispatch = useDispatch()

useEffect(() => {
  auth.onAuthStateChanged(async (user) => {
      if (user) {
          dispatch(setUserLogIn({
              name: user.displayName,
              email: user.email,
              photo: user.photoURL
          }))
      }
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
        let userInfo = result.user
        dispatch(setUserLogIn({
            name: userInfo.displayName,
            email: userInfo.email,
            photo: userInfo.photoURL
        }))
    })
}

  return (
    <div className='Login'>
      <div className="wraper">
        <ion-icon name="logo-wechat" id="logo"></ion-icon>
        <button className='d-flex align-items-center'onClick={() => signIn()}>Sign In with Google <ion-icon name="logo-google"></ion-icon></button>
      </div>
    </div>
  )
}

export default LogIn