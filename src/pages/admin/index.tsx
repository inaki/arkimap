"use client";
import React, { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import SidebarWithHeader from "@/components/sidebarWithHeader";
import {
  getFirestore,
  collection,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import Card from "@/components/Card";
import { Grid } from "@chakra-ui/react";

const fetchFirestoreData = async (
  collectionName: string
): Promise<QuerySnapshot> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot;
};

const getData = async (collectionName: string) => {
  const querySnapshot = await fetchFirestoreData(collectionName);
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
};

type Props = {
  user: User | null;
};

function Page({ user }: Props) {
  const [data, setData] = React.useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
    getData("architects").then((data) => {
      setData(data);
      console.log(data);
    });
  }, [user, router]);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {data &&
        data.map(
          (
            item: {
              name: string;
              country: string;
              img: string;
              biography: string;
            },
            index: number
          ) => (
            <Card
              img={item.img}
              title={`${item.name}`}
              description={item.biography}
              tags={[item.country]}
              key={index + item.name + item.country}
            />
          )
        )}
    </Grid>
  );
}

export default function WrappedPage() {
  const { user } = useAuthContext();
  return (
    <SidebarWithHeader>
      <Page user={user} />
    </SidebarWithHeader>
  );
}
