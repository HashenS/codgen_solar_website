export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  capacity: string;
  location: string;
  thumbnail: string;
  gallery: string[];
  description: string;
  blueWords?: string[];
}

export const projectsData: Record<string, Project> = {
  "henuka-fresh-fruits-project-heiyanthuduwa": {
    id: "1",
    slug: "henuka-fresh-fruits-project-heiyanthuduwa",
    title: "Henuka Fresh Fruits 100kW Project",
    category: "COMMERCIAL",
    capacity: "100kW",
    location: "Heiyanthuduwa",
    thumbnail: "/recent-projects/Henuka_Fresh_Fruits_Project_Heiyanthuduwa/henuka-01-1024x1024.jpg",
    gallery: [
      "/recent-projects/Henuka_Fresh_Fruits_Project_Heiyanthuduwa/henuka-02-1024x1024.jpg",
      "/recent-projects/Henuka_Fresh_Fruits_Project_Heiyanthuduwa/henuka-03-1024x1024.jpg",
      "/recent-projects/Henuka_Fresh_Fruits_Project_Heiyanthuduwa/henuka-04-1024x1024.jpg"
    ],
    description: "CodeGen Solar, the Renewable Energy division of CodeGen International, delivers top-tier solar solutions with the best after-sales support and the friendliest service. We guided Henuka Fresh Fruits every step of the way on their solar investment journey, empowering their facility with a robust 100kW infrastructure.",
    blueWords: ["100kW", "Project"]
  },
  "malitha-lanka-project-ganemulla": {
    id: "2",
    slug: "malitha-lanka-project-ganemulla",
    title: "Malitha Lanka 100kW Project",
    category: "COMMERCIAL",
    capacity: "100kW",
    location: "Ganemulla",
    thumbnail: "/recent-projects/Malitha_Lanka_Project_Ganemulla/malitha-lanka-01-1024x1024.jpg",
    gallery: [
      "/recent-projects/Malitha_Lanka_Project_Ganemulla/malitha-lanka-02-2048x2048.jpg",
      "/recent-projects/Malitha_Lanka_Project_Ganemulla/malitha-lanka-03-2048x2048.jpg",
      "/recent-projects/Malitha_Lanka_Project_Ganemulla/malitha-lanka-04-2048x2048.jpg",
      "/recent-projects/Malitha_Lanka_Project_Ganemulla/malitha-lanka-05-2048x2048.jpg",
      "/recent-projects/Malitha_Lanka_Project_Ganemulla/malitha-lanka-06-2048x2048.jpg",
      "/recent-projects/Malitha_Lanka_Project_Ganemulla/malitha-lanka-07-2048x2048.jpg",
      "/recent-projects/Malitha_Lanka_Project_Ganemulla/malitha-lanka-08-2048x2048.jpg"
    ],
    description: "A comprehensive 100kW commercial solar installation designed to significantly reduce grid reliance and operational costs for Malitha Lanka in Ganemulla. This project features state-of-the-art smart inverters and high-efficiency panels ensuring maximum yield.",
    blueWords: ["100kW", "Project"]
  },
  "the-rise-tech-village-kandy": {
    id: "3",
    slug: "the-rise-tech-village-kandy",
    title: "The Rise Tech Village 100kW Project",
    category: "SMART GRID",
    capacity: "100kW",
    location: "Kandy",
    thumbnail: "/recent-projects/Rise_Tech_Village_Kandy/rise-01-1.jpg",
    gallery: [
      "/recent-projects/Rise_Tech_Village_Kandy/rise-03.jpg",
      "/recent-projects/Rise_Tech_Village_Kandy/rise-04.jpg",
      "/recent-projects/Rise_Tech_Village_Kandy/rise-05.jpg"
    ],
    description: "An advanced smart grid integration for The Rise Tech Village in Kandy. This 100kW setup not only offsets carbon emissions but utilizes our proprietary power orchestration to seamlessly blend solar generation with complex tech-park demand.",
    blueWords: ["100kW", "Project"]
  }
};
