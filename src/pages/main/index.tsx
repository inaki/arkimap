"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { User } from "firebase/auth";
import SidebarWithHeader from "@/components/sidebarWithHeader";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Grid } from "@chakra-ui/react";
import ArchitectsView from "@/sections/architects/ArchitectsView";
import ProjectView from "@/sections/projects/ProjectsView";

type ItemType = {
  name: string;
  country: string;
  img: string;
  biography: string;
};

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
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const { section } = router.query;

  useEffect(() => {
    getData(section as string).then((data) => {
      setData(data);
      console.log(data);
    });
  }, [section]);

  const renderSection = (sectionActive: string) => {
    switch (sectionActive) {
      case "architects":
        return <ArchitectsView />;
      case "projects":
        return <ProjectView />;
      case "cities":
        return <div>Cities</div>;
      default:
        return <div>Home</div>;
    }
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {renderSection((section as string) || "home")}
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
