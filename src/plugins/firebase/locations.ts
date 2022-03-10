
import { Location, type ILocation } from "@/components/models/location.model";
import { doc, getDoc, setDoc, collection, DocumentReference, getDocs } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { fs, st } from "./firebase";


//Firestore
const locationsCol = collection(fs, 'Locations');

const locationDoc = (id: string | null) => {
  return id ?
    doc(locationsCol, id as string) :
    doc(locationsCol);
}

const getLocationById = async (id: string) => {
  const res = await getDoc(locationDoc(id));
  if (res.exists()) {
    return new Location(res.id, res.data())
  }
  return null;
}

const getLocations = async () => {
  const req = await getDocs(locationsCol);
  let res: ILocation[] = []
  req.forEach((doc) => {
    res.push(new Location(doc.id, doc.data()))
  });
  return res;
}

const setLocation = async (docRef: DocumentReference<any>, data: ILocation, merge = true) => {
  await setDoc(docRef, { ...data }, { merge: merge })
};

//Storage
const locationSt = (location: ILocation) => {
  return ref(st, `Locations/${location.id}`);
}

const uploadLocationImg = async (clothes: ILocation, file: File) => {
  await uploadBytes(locationSt(clothes), file);
  return await getDownloadURL(locationSt(clothes));
}

export {
  locationsCol,
  locationDoc,
  getLocationById,
  getLocations,
  setLocation,
  locationSt,
  uploadLocationImg
}

