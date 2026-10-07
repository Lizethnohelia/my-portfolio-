import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import { getAllProjectSlugs, getProjectBySlug } from "../data";
import { ProjectCaseStudyLayout } from "./components/case-study/CaseStudyLayout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found" };
  }
  const title = `${project.title} · ${project.headline}`;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.description,
      url: `/projects/${project.slug}`,
      images: [{ url: project.cardImage, alt: `${project.title} case study` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [project.cardImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-background">
      <ProjectCaseStudyLayout project={project} />
      <Footer />
    </main>
  );
}
