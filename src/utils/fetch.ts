"use client";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

export const fetchFirestoreData = async (
  collectionName: string
): Promise<QuerySnapshot> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot;
};

export const getData = async (collectionName: string) => {
  const querySnapshot = await fetchFirestoreData(collectionName);
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
};
