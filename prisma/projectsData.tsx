type LinksProps = {
  url: string;
  text: string;
};

export const projectsData: {
  id: string;
  name: string;
  architectId: string;
  cityId: string;
  year: number;
  description: string;
  longitude: number;
  latitude: number;
  published: boolean;
}[] = [
  {
    id: "0a7c7966-64ba-4093-bca4-63a700747062",
    name: "Casa Luis Barragán",
    longitude: -99.133208,
    latitude: 19.4326077,
    architectId: "7777b481-f78b-4c56-8d67-04d6213943e4",
    cityId: "01eccf1a-25b6-4dde-9cea-ba4fdfabc620",
    published: true,
    description:
      "Casa Luis Barragán is a house designed by Mexican architect Luis Barragán in Mexico City, Mexico.",
    year: 1948,
  },
];
