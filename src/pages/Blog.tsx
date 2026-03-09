import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { blogPosts, blogCategories } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Blog — Eco-Xent | Organic Hair & Skin Care Tips Pakistan";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Read expert tips on natural hair care, skin care, herbal ingredients & product guides. Eco-Xent blog — Pakistan's trusted organic wellness resource.");
    }
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={0} onCartClick={() => {}} />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4" style={{ background: "linear-gradient(135deg, hsl(90, 35%, 18%), hsl(90, 30%, 24%))" }}>
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-4"
          >
            Eco-Xent Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 font-body text-lg max-w-2xl mx-auto"
          >
            Expert tips on natural hair care, skin care, herbal ingredients & organic wellness
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {["All", ...blogCategories].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 border ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && selectedCategory === "All" && searchQuery === "" && (
          <Link to={`/blog/${filteredPosts[0].slug}`} className="block mb-12 group">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-6 rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-[16/10] md:aspect-auto bg-muted overflow-hidden">
                <img
                  src={filteredPosts[0].featuredImage}
                  alt={filteredPosts[0].featuredImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className="text-xs font-body font-semibold tracking-wider uppercase text-gold mb-3">
                  {filteredPosts[0].category} • Featured
                </span>
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                  {filteredPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{filteredPosts[0].author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(filteredPosts[0].publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
              </div>
            </motion.article>
          </Link>
        )}

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedCategory === "All" && searchQuery === "" ? filteredPosts.slice(1) : filteredPosts).map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <div className="rounded-xl overflow-hidden border border-border bg-card hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-[16/10] bg-muted overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.featuredImageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-gold mb-2">
                      {post.category}
                    </span>
                    <h3 className="font-heading text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-xs leading-relaxed mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-body mt-auto">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-body">No articles found. Try a different search or category.</p>
          </div>
        )}
      </div>

      {/* Blog Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Eco-Xent Blog",
          "description": "Expert tips on natural hair care, skin care, herbal ingredients & organic wellness from Pakistan's trusted organic brand.",
          "url": "https://www.ecoxent.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Eco-Xent",
            "url": "https://www.ecoxent.com",
            "logo": { "@type": "ImageObject", "url": "https://www.ecoxent.com/favicon.png" }
          },
          "blogPost": blogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.metaDescription,
            "url": `https://www.ecoxent.com/blog/${post.slug}`,
            "datePublished": post.publishDate,
            "author": { "@type": "Organization", "name": post.author }
          }))
        })
      }} />

      <FooterSection />
    </div>
  );
};

export default Blog;
