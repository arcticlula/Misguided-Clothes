
import { Brand, type IBrand } from "@/components/models/brand.model";
import { doc, getDoc, setDoc, collection, DocumentReference, query, where, getDocs } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { fs, st } from "./firebase";


//Firestore
const brandsCol = collection(fs, 'Brands');

const brandDoc = (id: string | null) => {
  return id ?
    doc(brandsCol, id as string) :
    doc(brandsCol);
}

const getBrandById = async (id: string) => {
  const res = await getDoc(brandDoc(id));
  if (res.exists()) {
    return new Brand(res.id, res.data())
  }
  return null;
}

const getBrands = async () => {
  const req = await getDocs(query(brandsCol, where("parentId", "==", null)));
  let res: IBrand[] = []
  req.forEach((doc) => {
    res.push(new Brand(doc.id, doc.data()))
  });
  return res;
};

let allBrands: IBrand[];

const getBrandsGrouped = async () => {
  allBrands = [];
  const req = await getDocs(brandsCol);
  req.forEach((doc) => {
    allBrands.push(new Brand(doc.id, doc.data()))
  });
  let res: { label: string, options: IBrand[] }[] = [];
  allBrands.filter(s => !s.parentId).forEach((s) => {
    res.push({
      label: s.name,
      options: allBrands.filter(j => j.id || j.parentId == s.id)
    })
  });
  return res;
};

const getBrandName = (id: string) => {
  const res = allBrands.find(s => s.id == id);
  if (res) {
    return res?.parentName ? `${res.parentName} ${res.name}` : res.name;
  }
  return '';
}

const setBrand = async (docRef: DocumentReference<any>, data: IBrand, merge = true) => {
  await setDoc(docRef, { ...data }, { merge: merge })
};

//Storage
const brandsSt = (brand: IBrand) => {
  const folder = brand.parentName ? brand.parentName : brand.name;
  return ref(st, `Brands/${folder}/${brand.id}`);
}

const uploadBrandImg = async (brand: IBrand, file: File) => {
  await uploadBytes(brandsSt(brand), file);
  return await getDownloadURL(brandsSt(brand));
}

export {
  brandsCol,
  brandDoc,
  getBrandById,
  getBrands,
  getBrandsGrouped,
  getBrandName,
  setBrand,
  brandsSt,
  uploadBrandImg
}

