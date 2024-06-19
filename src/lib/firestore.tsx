import {
  where,
  collection,
  getDoc,
  doc,
  onSnapshot,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
  addDoc,
  endBefore,
  updateDoc,
  getCountFromServer,
} from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { filterOrdersByDay } from "@/utils/filterOrders";

export const getAllDocuments = (col: string) => {
  return getDocs(collection(db, col)).then((querySnapshot) => {
    let data: any = [];
    querySnapshot.forEach((doc) => {
      let docData = doc.data();
      docData.id = doc.id;
      data.push(docData);
    });
    return data;
  });
};

export const getDocument = (col: string, id: string) =>
  getDoc(doc(db, col, id));

export const onGetDocument = async (
  col: string,
  setData: any,
  setLoading?: any
) => {
  setLoading && setLoading(true);

  const q = query(collection(db, col));
  onSnapshot(q, (querySnapshot) => {
    let data: any = [];
    querySnapshot.forEach((doc) => {
      let docData = doc.data();
      docData.id = doc.id;

      if (!docData.deletedAt) {
        data.push(docData);
      }
    });
    setData(data);
    setLoading && setLoading(false);
  });
};

export const onGetAllDocuments = async (
  col: string,
  setData: any,
  limitnum: number,
  status?: string,
  order?: string | null
) => {
  console.log("status", status);

  const q = query(
    collection(db, col),
    orderBy("idDishOrder", "desc"),
    limit(limitnum)
  );

  const queryFilter = query(
    collection(db, col),
    orderBy("idDishOrder", "desc"),
    limit(limitnum),
    where("status", "==", status)
  );

  const searchQuery = query(
    collection(db, col),
    orderBy("idDishOrder", "desc"),
    limit(limitnum),
    where("idDishOrder", "==", Number(order))
  );

  const querySearch = () => {
    if (order) return searchQuery;
    if (status === "all") return q;
    return queryFilter;
  };

  onSnapshot(querySearch(), (querySnapshot: any) => {

    if (querySnapshot.empty) return setData([]);

    let data: any = [];
    querySnapshot.forEach((doc: any) => {
      let docData = doc.data();
      docData.id = doc.id;
      data.push(docData);
    });

    console.log("data", data);
    setData(data);
  });
};

export const onGetAllNextDocuments = (
  col: string,
  setData: any,
  setRawData: any,
  lastVisible: any
) => {
  const q = query(
    collection(db, col),
    orderBy("idDishOrder", "desc"),
    startAfter(lastVisible),
    limit(5)
  );
  onSnapshot(q, (querySnapshot) => {
    setRawData(querySnapshot);

    let data: any = [];
    querySnapshot.forEach((doc) => {
      let docData = doc.data();
      docData.id = doc.id;
      data.push(docData);
    });
    setData(data);
  });
};

export const onGetAllPrevDocuments = (
  col: string,
  setData: any,
  setRawData: any,
  firstVisible: any
) => {
  const q = query(
    collection(db, col),
    orderBy("idDishOrder", "desc"),
    endBefore(firstVisible),
    limit(5)
  );
  onSnapshot(q, (querySnapshot) => {
    setRawData(querySnapshot);

    let data: any = [];
    querySnapshot.forEach((doc) => {
      let docData = doc.data();
      docData.id = doc.id;
      data.push(docData);
    });
    setData(data);
  });
};

export const getAllData = (col: string) => {
  return getDocs(collection(db, col)).then(async (querySnapshot) => {
    const snapshot = await getCountFromServer(collection(db, col));
    let prices: any = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (
        data.totalOrder !== undefined &&
        !Number.isNaN(data?.totalOrder) &&
        data.status !== "pending"
      ) {
        prices.push(data.totalOrder);
      }
    });
    return { totalDocs: snapshot.data().count, prices };
  });
};

export const onGetStaticsDocs = async (col: string, setData: any) => {
  const q = query(collection(db, col));
  const snapshot = await getCountFromServer(q);
  onSnapshot(q, (querySnapshot) => {
    let prices: any = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      if (
        data.totalOrder !== undefined &&
        !Number.isNaN(data?.totalOrder) &&
        data.status !== "pending" &&
        filterOrdersByDay(data)
      ) {
        prices.push(data.totalOrder);
      }
    });

    const totalAmount = prices?.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue,
      0
    );

    setData({ totalAmount, totalOrders: prices.length });
  });
};

export const uploadFile = (file: File, location: string) => {
  const storageRef = ref(
    storage,
    `${location}/${new Date().getTime().toString()}`
  );
  return uploadBytesResumable(storageRef, file).then(() =>
    getDownloadURL(storageRef).then((url) => {
      console.log("url", url);
      return url;
    })
  );
};
export const createDocument = async (col: string, data: any) =>
  await addDoc(collection(db, col), data);

export const updateDocument = async (col: string, id: string, newFields: any) =>
  await updateDoc(doc(db, col, id), newFields);
