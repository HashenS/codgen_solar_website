import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import { ProjectClient } from "./ProjectClient";

export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // Await params if it's a promise (Next.js 15+ behavior)
  const resolvedParams = await Promise.resolve(params);
  const project = projectsData[resolvedParams.slug];
  
  if (!project) {
    return notFound();
  }

  return <ProjectClient project={project} />;
}
