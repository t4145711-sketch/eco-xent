import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Tag, Share2, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getRelatedPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getPostBySlug(slug || "");
  const relatedPosts = getRelatedPosts(slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = post.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", post.metaDescription);
    }
  }, [post, slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-foreground mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-primary font-body hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const shareUrl = `https://www.ecoxent.com/blog/${post.slug}`;
  const shareText = post.title;

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };
    window.open(urls[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={0} onCartClick={() => {}} />

      {/* Breadcrumb */}
      <div className="pt-20 bg-muted/50">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <nav className="flex items-center gap-1 text-xs font-body text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="container mx-auto max-w-4xl px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-primary font-body hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <span className="inline-block text-xs font-body font-semibold tracking-wider uppercase text-gold mb-3">
            {post.category}
          </span>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-body mb-8">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(post.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden mb-8 bg-muted aspect-[16/9]">
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Social Share */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
            <Share2 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-body text-muted-foreground">Share:</span>
            {["whatsapp", "facebook", "twitter", "linkedin"].map((p) => (
              <button
                key={p}
                onClick={() => handleShare(p)}
                className="px-3 py-1.5 rounded-full text-xs font-body font-medium border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all capitalize"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none font-body
            prose-headings:font-heading prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-li:text-muted-foreground prose-li:leading-relaxed
            prose-table:border-border
            prose-th:bg-muted prose-th:text-foreground prose-th:font-body prose-th:text-sm prose-th:p-3
            prose-td:text-muted-foreground prose-td:font-body prose-td:text-sm prose-td:p-3 prose-td:border-border
          ">
            <ReactMarkdown
              components={{
                a: ({ href, children }) => {
                  if (href?.startsWith("/")) {
                    return <Link to={href} className="text-primary font-medium hover:underline">{children}</Link>;
                  }
                  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-border">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-body bg-muted text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>

          {/* Share Bottom */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
            <span className="text-sm font-body text-muted-foreground">Share this article:</span>
            {["whatsapp", "facebook", "twitter", "linkedin"].map((p) => (
              <button
                key={p}
                onClick={() => handleShare(p)}
                className="px-3 py-1.5 rounded-full text-xs font-body font-medium border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all capitalize"
              >
                {p}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <Link key={rPost.slug} to={`/blog/${rPost.slug}`} className="group">
                  <div className="rounded-xl overflow-hidden border border-border bg-card hover:shadow-md transition-all duration-300">
                    <div className="aspect-[16/10] bg-muted overflow-hidden">
                      <img
                        src={rPost.featuredImage}
                        alt={rPost.featuredImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-gold mb-1 block">
                        {rPost.category}
                      </span>
                      <h3 className="font-heading text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {rPost.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Article Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.metaDescription,
          "image": post.featuredImage,
          "datePublished": post.publishDate,
          "dateModified": post.publishDate,
          "author": { "@type": "Organization", "name": post.author },
          "publisher": {
            "@type": "Organization",
            "name": "Eco-Xent",
            "url": "https://www.ecoxent.com",
            "logo": { "@type": "ImageObject", "url": "https://www.ecoxent.com/favicon.png" }
          },
          "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.ecoxent.com/blog/${post.slug}` },
          "keywords": post.tags.join(", "),
          "articleSection": post.category,
          "url": `https://www.ecoxent.com/blog/${post.slug}`
        })
      }} />

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.ecoxent.com" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.ecoxent.com/blog" },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://www.ecoxent.com/blog/${post.slug}` }
          ]
        })
      }} />

      <FooterSection />
    </div>
  );
};

export default BlogPost;
