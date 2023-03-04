"use client";
import Card from "@/components/Card";
import { useAuthContext } from "@/context/AuthContext";
import { getData } from "@/utils/fetch";
import { Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProjectDetails from "./ProjectDetails";

type DataType = {
  name: string;
  country: string;
  img: string;
  biography: string;
  tags?: string[];
  dob: number;
};

export default function Page() {
  const [data, setData] = useState<DataType[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    getData("projects").then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {data &&
        data.map((item: DataType, index: number) => (
          <Card key={`${index + item.name}`} data={item}>
            <ProjectDetails data={item} />
          </Card>
        ))}
    </Grid>
  );
}
