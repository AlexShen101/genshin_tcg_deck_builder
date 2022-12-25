import { storage } from './FirebaseSetup'
import { ref, getDownloadURL } from 'firebase/storage'

const queryImage = (firebasePath, my_callback) => {
    const pathReference = ref(
        storage,
        firebasePath
    )
    // var storageRef = firebase.storage().ref()
    getDownloadURL(pathReference)
        .then((url) => {
            my_callback(url)
            // document.querySelector('img').src = test;
        })
        .catch((error) => {
            console.log(error)
            my_callback(undefined)
        })
}

export default queryImage