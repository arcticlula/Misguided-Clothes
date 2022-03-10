
import { defaultStatuses, Status, type IStatus } from "@/components/models/status.model";
import { doc, setDoc, collection, DocumentReference, getDocs, query, orderBy } from 'firebase/firestore'
import { fs } from "./firebase";


//Firestore
const statusCol = collection(fs, 'Status');

const statusDoc = (id: string | null) => {
  return id ?
    doc(statusCol, id as string) :
    doc(statusCol);
}

const getStatuses = async () => {
  const req = await getDocs(query(statusCol, orderBy("status")));
  let temp: IStatus[] = [];
  let res: IStatus[] = defaultStatuses;
  req.forEach((doc) => temp.push(new Status(doc.id, doc.data())));
  defaultStatuses.forEach((j) => {
    const defStatus: IStatus[] = temp.filter(s => s.status == j.status);
    if (defStatus.length > 0) {
      res = [...res.filter(s => s.status != j.status), ...defStatus].sort((a, b) => a.status - b.status);
    }
  })
  return res;
};

const setStatus = async (docRef: DocumentReference<any>, data: IStatus, merge = true) => {
  await setDoc(docRef, { ...data }, { merge: merge })
};

export {
  statusCol,
  statusDoc,
  getStatuses,
  setStatus
}

