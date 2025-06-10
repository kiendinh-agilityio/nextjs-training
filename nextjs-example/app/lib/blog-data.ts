export interface Data {
  id: number;
  slug: string;
  title: string;
  content: string;
  date: string;
}

export const BLOG_DATA: Data[] = [
  {
    id: 1,
    slug: "ha-long-bay-vietnam",
    title: "Exploring the Majestic Beauty of Ha Long Bay",
    content:
      "Ha Long Bay - A UNESCO World Heritage Site featuring thousands of limestone karsts and isles rising from the emerald waters of the Gulf of Tonkin...",
    date: "2025-03-20",
  },
  {
    id: 2,
    slug: "sapa-trekking-adventure",
    title: "Sapa Trekking Adventure - A Paradise for Nature Lovers",
    content:
      "Sapa is famous for its stunning trekking routes, terraced rice fields, and the unique culture of ethnic minority groups...",
    date: "2025-03-21",
  },
  {
    id: 3,
    slug: "hoi-an-ancient-town",
    title: "Hoi An - Vietnam's Most Beautiful Ancient Town",
    content:
      "Hoi An Ancient Town with its well-preserved architecture, rich cuisine, and traditional culture has become an unmissable destination...",
    date: "2025-03-22",
  },
];
