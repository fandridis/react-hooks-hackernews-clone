import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';

function useAuth() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setAuthUser(authUser);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return authUser;
}

export default useAuth;
