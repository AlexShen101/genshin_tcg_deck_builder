// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage, ref } from 'firebase/storage'

import firebaseConfig from './FirebaseConfig'

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const storage = getStorage()
const storageRef = ref(storage)
export { firebase, storage }
