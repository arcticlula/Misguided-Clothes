
import { Clothes, type IClothes } from "@/components/models/clothes.model";
import { doc, getDoc, setDoc, collection, DocumentReference, query, where, getDocs } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { fs, st } from "./firebase";


//Firestore
const clothesCol = collection(fs, 'Clothes');

const clothesDoc = (id: string | null) => {
  return id ?
    doc(clothesCol, id as string) :
    doc(clothesCol);
}

const getClothesById = async (id: string) => {
  const res = await getDoc(clothesDoc(id));
  if (res.exists()) {
    return new Clothes(res.id, res.data())
  }
  return null;
}

const setClothes = async (docRef: DocumentReference<any>, data: IClothes, merge = true) => {
  await setDoc(docRef, { ...data }, { merge: merge })
};

//Storage
const clothesSt = (clothes: IClothes) => {
  return ref(st, `Clothes/${clothes.id}`);
}

const uploadClothesImg = async (clothes: IClothes, file: File) => {
  await uploadBytes(clothesSt(clothes), file);
  return await getDownloadURL(clothesSt(clothes));
}

export {
  clothesCol,
  clothesDoc,
  getClothesById,
  setClothes,
  clothesSt,
  uploadClothesImg
}

