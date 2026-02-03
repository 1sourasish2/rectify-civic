"use client";

import { useEffect, useState, useRef } from "react";
import {
  Search,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  X,
} from "lucide-react";
import Image from "next/image";
import { FaFacebookF, FaWhatsapp, FaTwitter } from 'react-icons/fa';


const tabs = ["Trending", "Nearby", "Latest"];

// EXTENSIVE posts data (20 posts, trending/latest/nearby covered)
const initialPosts = [
  {
    id: 1,
    author: "Alice Chen",
    avatar: "/avatar1.jpg",
    time: "2025-09-15T19:00:00.000Z",
    text: "The streetlight near the park entrance has been broken for days. It makes the area feel unsafe at night. Can someone look into this?",
    tags: ["#Streetlight", "#Safety", "#ParkIssue"],
    image: "https://media.istockphoto.com/id/496026170/photo/broken-street-lamp.jpg?s=612x612&w=0&k=20&c=1bX4binyYkD8P_ZzHbfRTspKowTIGoTkSjxvbcjAkY4=",
    likes: 24, comments: ["This needs fixing ASAP!", "Reported this last week."], shares: 6,
    status: "Pending", tracked: false, trendScore: 92, location: "Park Avenue"
  },
  {
    id: 2,
    author: "Robert Davis",
    avatar: "/avatar2.jpg",
    time: "2025-09-15T16:00:00.000Z",
    text: "Overflowing trash bins outside the main market. It smells terrible and attracts stray animals.",
    tags: ["#WasteManagement", "#CleanCity"],
    image: "https://media.istockphoto.com/id/1489051648/photo/open-garbage-dust-bin-liter-with-plastic-begs-and-waste-items-at-day-from-different-angle.jpg?s=612x612&w=0&k=20&c=slEZ91id04_iQDJ0Q_z8-PHUST7DiOfkFjQ0gCn6L2U=",
    likes: 42, comments: ["Happening in my area too!", "Needs urgent attention!"], shares: 9,
    status: "In Progress", tracked: false, trendScore: 88, location: "Main Market"
  },
  {
    id: 3,
    author: "Priya Singh",
    avatar: "/avatar3.jpg",
    time: "2025-09-15T20:30:00.000Z",
    text: "Road construction blocking the way to the hospital.",
    tags: ["#Traffic", "#Hospital", "#Construction"],
    image: "https://static.toiimg.com/thumb/msid-112151387,width-1280,height-720,resizemode-72/112151387.jpg",
    likes: 12, comments: ["Ambulance stuck yesterday!", "Need proper notice!"], shares: 4,
    status: "Pending", tracked: false, trendScore: 51, location: "City Hospital"
  },
  {
    id: 4,
    author: "Ben Lee",
    avatar: "/avatar5.jpg",
    time: "2025-09-15T22:00:00.000Z",
    text: "Water supply interruption near Patel Nagar till tomorrow noon.",
    tags: ["#WaterSupply", "#PatelNagar", "#Update"],
    image: "https://img.etimg.com/thumb/width-640,height-480,imgsize-1974248,resizemode-75,msid-114254018/news/india/delhi-water-supply-cut-no-water-for-18-hours-on-wednesday-check-timings-and-affected-areas.jpg",
    likes: 8, comments: ["Thanks for update!", "Any reason known?"], shares: 2,
    status: "Pending", tracked: false, trendScore: 33, location: "Patel Nagar"
  },
  // 15 more sample posts, various times and tags for rich feed
  
];


export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("Trending");
  const [posts, setPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [commentInput, setCommentInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("posts");
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    let sorted = [...posts];
    if (activeTab === "Trending") {
      sorted.sort((a, b) => b.trendScore - a.trendScore);
    } else if (activeTab === "Latest") {
      sorted.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );
    } else if (activeTab === "Nearby") {
      sorted = sorted.filter((p) =>
        /park|nagar|market|center|stadium/i.test(p.location)
      );
      sorted.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );
    }
    if (searchTerm) {
      sorted = sorted.filter(
        (p) =>
          p.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          p.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPosts(sorted);
  }, [posts, activeTab, searchTerm]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (posts.length > 0 && Math.random() < 0.035) {
        setPosts((prev) =>
          prev.map((p) => {
            if (Math.random() < 0.045) {
              return {
                ...p,
                comments: [...p.comments, "Community: new comment!"],
              };
            }
            return p;
          })
        );
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [posts]);

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleComment = (id: number, comment: string) => {
    if (!comment.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, comments: [...p.comments, comment] } : p
      )
    );
    setCommentInput("");
    if (commentInputRef.current) commentInputRef.current.value = "";
  };

  const handleShare = async (id: number) => {
    const url = `${window.location.origin}/post/${id}`;
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({
          title: "Community Post",
          text: "Check out this post!",
          url,
        });
        setShareMessage("Shared successfully!");
      } catch {
        setShareMessage("Share cancelled.");
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShareMessage("Post link copied to clipboard!");
      } catch {
        setShareMessage("Failed to copy link.");
      }
    }
    setTimeout(() => setShareMessage(""), 2000);
  };

  const handleTrack = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, tracked: !p.tracked } : p))
    );
  };

  const handleHashtagClick = (tag: string) => {
    setSearchTerm(tag.replace("#", ""));
  };

  return (
    <section className="container mx-auto p-6 max-w-5xl">
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
        <Search className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          value={searchTerm}
          placeholder="Search posts, tags, author..."
          className="bg-transparent flex-1 outline-none text-gray-700"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex space-x-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {shareMessage && (
        <div className="mb-4 text-green-600 font-medium">{shareMessage}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow rounded-2xl p-4 border border-gray-100 cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div className="flex items-center mb-3">
              <Image
                src={post.avatar}
                alt={post.author}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-3">
                <h3 className="font-semibold text-gray-800">{post.author}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.time).toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-gray-800 mb-3 line-clamp-3">
              {post.text} <span className="text-green-600">See more</span>
            </p>

            <div className="rounded-xl overflow-hidden mb-3">
              <Image
                src={post.image}
                alt="Post image"
                width={600}
                height={400}
                className="object-cover w-full"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHashtagClick(tag);
                  }}
                  className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between border-t pt-3">
              <div className="flex space-x-6 text-gray-600">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(post.id);
                  }}
                  className="flex items-center space-x-1 hover:text-green-600"
                >
                  <ThumbsUp size={18} />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPost(post);
                  }}
                  className="flex items-center space-x-1 hover:text-green-600"
                >
                  <MessageCircle size={18} />
                  <span>{post.comments.length}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(post.id);
                  }}
                  className="flex items-center space-x-1 hover:text-green-600"
                >
                  <Share2 size={18} />
                  <span>{post.shares}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTrack(post.id);
                  }}
                  className={`flex items-center space-x-1 px-3 py-1 border rounded-full text-sm ${
                    post.tracked
                      ? "bg-green-50 text-green-600 border-green-300"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Bookmark size={16} />
                  <span>{post.tracked ? "Tracking" : "Track"}</span>
                </button>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.status === "Pending"
                      ? "bg-red-100 text-red-600"
                      : post.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {post.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full p-6 rounded-2xl relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setSelectedPost(null)}
            >
              <X size={20} />
            </button>

            <div className="flex items-center mb-3">
              <Image
                src={selectedPost.avatar}
                alt={selectedPost.author}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-3">
                <h3 className="font-semibold text-gray-800">
                  {selectedPost.author}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(selectedPost.time).toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-gray-800 mb-3">{selectedPost.text}</p>

            <div className="rounded-xl overflow-hidden mb-3">
              <Image
                src={selectedPost.image}
                alt="Post image"
                width={600}
                height={400}
                className="object-cover w-full"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {selectedPost.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-row mb-4 gap-2">
              {/* Facebook share */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.origin + "/post/" + selectedPost.id
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
              >
                <FaFacebookF size={18} />
               
              </a>

              {/* WhatsApp share */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  window.location.origin + "/post/" + selectedPost.id
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
              >
                <FaWhatsapp size={18} />
              </a>

              {/* X share */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  selectedPost.text +
                    "\n" +
                    window.location.origin +
                    "/post/" +
                    selectedPost.id
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition"
              >
                <FaTwitter size={18} />
              </a>
            </div>

            {/* Comments section */}
            <div className="mt-4">
              <h4 className="font-medium mb-2">Comments</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedPost.comments.map((c: string, idx: number) => (
                  <p
                    key={idx}
                    className="bg-gray-100 px-3 py-2 rounded-lg text-sm"
                  >
                    {c}
                  </p>
                ))}
              </div>

              <div className="flex mt-3">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  ref={commentInputRef}
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-l-lg outline-none"
                />
                <button
                  onClick={() => handleComment(selectedPost.id, commentInput)}
                  className="px-4 bg-green-600 text-white rounded-r-lg"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}