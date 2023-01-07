import { storage } from './FirebaseSetup'
import { ref, getDownloadURL } from 'firebase/storage'

//
const queryImage = async (firebasePath) => {
    const pathReference = ref(storage, firebasePath)
    const response = await getDownloadURL(pathReference)
    return response
}

export default queryImage
