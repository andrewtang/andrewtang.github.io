import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/sections/Footer";
import ProjectTOC from "@/components/work/ProjectTOC";
import type { TOCItem } from "@/components/work/ProjectTOC";
import { projects, projectDetails, siteConfig } from "@/data/content";
import type { ProjectDetail, ProjectContentBlock } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Convert a heading string to a URL-safe id */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/** Derive TOC items from a detail's content blocks */
function buildTOC(detail: ProjectDetail): TOCItem[] {
  const items: TOCItem[] = [{ id: "overview", label: "Overview" }];
  for (const block of detail.content) {
    if (block.type === "text" && block.heading) {
      items.push({ id: slugify(block.heading), label: block.heading });
    }
  }
  return items;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const detail = projectDetails.find((d) => d.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: detail?.overview ?? project.description,
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: detail?.overview ?? project.description,
      url: `${siteConfig.url}/projects/${slug}`,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const detail = projectDetails.find((d) => d.slug === slug);

  if (!project || project.published !== true) notFound();

  const hasTOC = project!.published === true && !!detail && detail.content.some(
    (b) => b.type === "text" && b.heading
  );
  const tocItems = detail && hasTOC ? buildTOC(detail) : [];

  return (
    <>
      <main id="main-content" className="flex-1 pt-14 md:pt-[56px]">

        {/* ── Fixed left sidebar — desktop only ── */}
        <aside className="hidden xl:flex fixed left-16 top-24 flex-col gap-10 w-40 z-10">
          <BackLink />
          {hasTOC && <ProjectTOC items={tocItems} />}
        </aside>

        {/* ── Centered content ── */}
        <div className="px-6 md:px-16 pt-10 pb-16">
          <div className="max-w-[770px] mx-auto">

            {/* Center col — main content */}
            <article className="w-full">

              {/* Back link for non-xl screens */}
              <div className="xl:hidden mb-8">
                <BackLink />
              </div>

              {/* Hero */}
              <header className="mb-4 md:mb-6">
                <p className="text-sm font-mono uppercase tracking-wider text-muted dark:text-muted-dark mb-4">
                  {project!.description}
                </p>
                <h1 className="font-serif text-[52px] text-black dark:text-white" style={{ lineHeight: '1.1', letterSpacing: '-0.03em' }}>
                  {project!.title}
                </h1>
              </header>

              {/* Overview — between title and image */}
              {project!.published === true && detail && detail.overview && (
                <p
                  id="overview"
                  className="mb-6 md:mb-8 text-lg md:text-xl leading-relaxed text-black/80 dark:text-white/80 scroll-mt-24"
                >
                  {detail.overview}
                </p>
              )}

              {/* Hero image */}
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl mb-10 md:mb-12">
                <Image
                  src={project!.image}
                  alt={project!.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Metadata grid */}
              {detail && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-10 md:pb-12 border-b border-black/10 dark:border-white/10">
                  <MetaItem label="Role" value={detail.role} />
                  <MetaItem label="Company" value={detail.company} />
                  <MetaItem label="Year" value={detail.year} />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted dark:text-muted-dark mb-1.5">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project!.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono uppercase tracking-wider text-muted dark:text-muted-dark border border-black/15 dark:border-white/15 rounded-full px-2.5 py-0.5 whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}


              {/* Content blocks */}
              {project!.published === true && detail && detail.content.length > 0 && (
                <div className="mt-12 md:mt-14 space-y-12 md:space-y-16">
                  {detail.content.map((block, i) => (
                    <ContentBlock key={i} block={block} slugify={slugify} />
                  ))}
                </div>
              )}

            </article>

          </div>
        </div>

      </main>
      <Footer variant="project" />
    </>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-mono uppercase tracking-wider text-muted dark:text-muted-dark mb-1.5">
        {label}
      </p>
      <p className="text-sm font-mono text-black dark:text-white">{value}</p>
    </div>
  );
}

function ContentBlock({
  block,
  slugify,
}: {
  block: ProjectContentBlock;
  slugify: (s: string) => string;
}) {
  if (block.type === "divider") {
    return <hr className="border-black/10 dark:border-white/10" />;
  }

  if (block.type === "image" && block.src) {
    return (
      <figure className={block.layout === "full" ? "-mx-6 sm:-mx-8" : ""}>
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-none sm:rounded-xl">
          <Image
            src={block.src}
            alt={block.alt ?? ""}
            fill
            className="object-cover"
          />
        </div>
        {block.caption && (
          <figcaption className="mt-3 text-xs font-mono uppercase tracking-wider text-muted dark:text-muted-dark text-center px-6 sm:px-0">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block.type === "images" && block.srcs) {
    return (
      <figure>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {block.srcs.map((img, i) => (
            <div
              key={i}
              className="relative w-full aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt ?? ""}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {block.caption && (
          <figcaption className="mt-3 text-xs font-mono uppercase tracking-wider text-muted dark:text-muted-dark text-center">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // text block
  const sectionId = block.heading ? slugify(block.heading) : undefined;
  return (
    <div id={sectionId} className="scroll-mt-24">
      {block.heading && (
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted dark:text-muted-dark mb-4">
          {block.heading}
        </h2>
      )}
      {block.body && (
        <div className="space-y-4">
          {block.body.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-base md:text-lg leading-relaxed text-black/80 dark:text-white/80"
            >
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-muted dark:text-muted-dark hover:text-black dark:hover:text-white transition-colors group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform group-hover:-translate-x-0.5"
      >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
      Back
    </Link>
  );
}
