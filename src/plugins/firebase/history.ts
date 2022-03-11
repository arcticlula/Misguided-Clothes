
import { ClothesHistory, type IClothesHistory } from "@/components/models/history.model";
import { doc, collection, query, where, getDocs } from 'firebase/firestore'
import { fs } from "./firebase";


//Firestore
const clothesHistoryCol = collection(fs, 'History');

const clothesHistoryDoc = () => {
  return doc(clothesHistoryCol);
}

const getHistoryByClothesId = async (id: string) => {
  const req = await getDocs(query(clothesHistoryCol, where("clothesId", "==", id)));
  let res: IClothesHistory[] = []
  req.forEach((doc) => {
    res.push(new ClothesHistory(doc.id, doc.data()))
  });
  return res;
};

export {
  clothesHistoryCol,
  clothesHistoryDoc,
  getHistoryByClothesId
}

