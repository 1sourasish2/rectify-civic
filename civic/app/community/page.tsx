"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import Image from "next/image";
import {
  FaUsers,
  FaPaperclip,
  FaPaperPlane,
  FaTimes,
  FaSearch,
  FaTrash,
  FaTimesCircle,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

interface Discussion {
  id: number;
  user: string;
  message?: string;
  media?: string;
  type: "text" | "image" | "video" | "audio";
  timestamp: number;
}

interface Group {
  id: number;
  name: string;
  members: number;
  latest: string;
  image: string;
  category:
    | "Traffic"
    | "Waste"
    | "Water"
    | "Safety"
    | "Healthcare"
    | "Education"
    | "Environment"
    | "Transport";
  discussions: Discussion[];
  joinedUsers: string[];
}

const currentUserName = "You";

// Paste your full 20 groups array here exactly as you provided previously
// Sample 20 groups with categories and discussions
const groups: Group[] = [
  {
    id: 1,
    name: "Traffic Solutions Forum",
    members: 420,
    latest: "Smart traffic signals pilot update.",
    image: "https://media.istockphoto.com/id/1207768535/vector/smart-transportation-and-vehicles-moving-in-the-city-streets.jpg?s=612x612&w=0&k=20&c=NeAvNxEiw8lqk0QVz-6pEWeNAPD7tZJu1QgVYVmT91A=",
    category: "Traffic",
    discussions: [
      {
        id: 1,
        user: "Raj",
        message: "Synchronized signals can ease congestion.",
        type: "text",
        timestamp: Date.now() - 86400000 * 2,
      },
      {
        id: 2,
        user: "Anita",
        message: "We need cycle lanes for safe travel.",
        type: "text",
        timestamp: Date.now() - 86400000,
      },
    ],
    joinedUsers: ["Raj", "Anita", "You"],
  },
  {
    id: 2,
    name: "Waste Management Drives",
    members: 310,
    latest: "Plastic recycling event planned.",
    image: "https://media.istockphoto.com/id/177470402/photo/plastic-resin-pellets-in-holding-hands.jpg?s=612x612&w=0&k=20&c=9-VcC_jIEiWoviN9hkyoMBdQkELXwyAgDSr__yDMbKI=",
    category: "Waste",
    discussions: [
      {
        id: 3,
        user: "Meera",
        message: "Segregation bins required in all wards.",
        type: "text",
        timestamp: Date.now() - 7200000,
      },
    ],
    joinedUsers: ["Meera"],
  },
  {
    id: 3,
    name: "Clean Water Forum",
    members: 275,
    latest: "Water quality reports published.",
    image: "https://media.istockphoto.com/id/622010710/photo/water-was-poured-into-the-beaker.jpg?s=612x612&w=0&k=20&c=Xh6Cb_WY62eXCW_RPtXRH40kAOJMXxYIVK70UKGNIlk=",
    category: "Water",
    discussions: [
      {
        id: 4,
        user: "Arun",
        message: "Filters need maintenance regularly.",
        type: "text",
        timestamp: Date.now() - 18000000,
      },
    ],
    joinedUsers: ["Arun"],
  },
  {
    id: 4,
    name: "Neighborhood Safety Patrol",
    members: 500,
    latest: "Community security volunteers enrolled.",
    image: "https://media.istockphoto.com/id/1458750155/photo/organising-a-festival.jpg?s=612x612&w=0&k=20&c=lpIBhI8W6AVHiQ34-QPC9tF_iTdv1sLUDdzI2H_oDwA=",
    category: "Safety",
    discussions: [
      {
        id: 5,
        user: "Kiran",
        message: "CCTV cameras help reduce theft cases.",
        type: "text",
        timestamp: Date.now() - 20000000,
      },
    ],
    joinedUsers: ["Kiran"],
  },
  {
    id: 5,
    name: "Public Healthcare Group",
    members: 360,
    latest: "Health camp scheduled next Monday.",
    image: "https://media.istockphoto.com/id/1395923150/photo/young-female-refugee-with-son-looking-at-clinician-making-notes-in-document.jpg?s=612x612&w=0&k=20&c=UUGkskUOPN5x_x1mDy8uSiLp6w_WE8KJif8P3jzZazI=",
    category: "Healthcare",
    discussions: [
      {
        id: 6,
        user: "Asha",
        message: "We need more doctors in local clinics.",
        type: "text",
        timestamp: Date.now() - 86400000 * 3,
      },
    ],
    joinedUsers: ["Asha"],
  },
  {
    id: 6,
    name: "Education Reform Circle",
    members: 300,
    latest: "Digital literacy drive begins.",
    image: "https://media.istockphoto.com/id/1431874851/photo/engineering-working-with-drawings-inspection-on-laptop-in-the-office-and-calculator-triangle.jpg?s=612x612&w=0&k=20&c=-qCMsES-M4-5wDUrmDLclMAMbINL_4fcQpfWszaf6q4=",
    category: "Education",
    discussions: [
      {
        id: 7,
        user: "Ravi",
        message: "Free classes for underprivileged children are vital.",
        type: "text",
        timestamp: Date.now() - 600000,
      },
    ],
    joinedUsers: ["Ravi"],
  },
  {
    id: 7,
    name: "Climate & Environment Action",
    members: 420,
    latest: "Tree plantation scheduled.",
    image: "https://media.istockphoto.com/id/1248915720/photo/farmers-hand-watering-a-young-plant.jpg?s=612x612&w=0&k=20&c=kip26_08vy0zT90x2bA9frWUD6ZEuzPkw8_9uv8cfrw=",
    category: "Environment",
    discussions: [
      {
        id: 8,
        user: "Neha",
        message: "Ban on plastic bags should be enforced strictly.",
        type: "text",
        timestamp: Date.now() - 3600000,
      },
    ],
    joinedUsers: ["Neha"],
  },
  {
    id: 8,
    name: "Urban Transport Hub",
    members: 415,
    latest: "Metro extensions nearing completion.",
    image: "https://media.istockphoto.com/id/1209006770/photo/riyadh-saudi-arabia-ksa-february-23-2020-construction-work-in-new-building-being-constructed.jpg?s=612x612&w=0&k=20&c=Phx8vx2cOiTJY1WG9vETBYfi7pbJNQmSM1Kp3VnI46w=",
    category: "Transport",
    discussions: [
      {
        id: 9,
        user: "Vikram",
        message: "E-buses are a good sustainable step.",
        type: "text",
        timestamp: Date.now() - 9600000,
      },
    ],
    joinedUsers: ["Vikram"],
  },
  {
    id: 9,
    name: "Women Safety Network",
    members: 290,
    latest: "Self-defense workshop this weekend.",
    image: "https://media.istockphoto.com/id/1383104590/photo/woman-making-stop-sign.jpg?s=612x612&w=0&k=20&c=3lzIQvkbf6yEelHXsulg_v6h54lwWi1ppLagPpT9qxQ=",
    category: "Safety",
    discussions: [
      {
        id: 10,
        user: "Sita",
        message: "Streetlights must be fixed in dark areas.",
        type: "text",
        timestamp: Date.now() - 4000000,
      },
    ],
    joinedUsers: ["Sita"],
  },
  {
    id: 10,
    name: "School Infrastructure Group",
    members: 250,
    latest: "Smart classrooms initiative launched.",
    image: "https://media.istockphoto.com/id/1407194547/photo/modern-classroom-with-connections.jpg?s=612x612&w=0&k=20&c=i4Qwyns9A6_F1J2_j8z2bNTN4FhL61XS06H71mRC0AE=",
    category: "Education",
    discussions: [
      {
        id: 11,
        user: "Mohit",
        message: "Libraries in schools must be upgraded.",
        type: "text",
        timestamp: Date.now() - 500000,
      },
    ],
    joinedUsers: ["Mohit"],
  },
  {
    id: 11,
    name: "River Cleaning Movement",
    members: 380,
    latest: "Volunteers signed up for Saturday drive.",
    image: "https://media.istockphoto.com/id/1353826551/photo/volunteer-picking-up-plastic-bottle-from-polluted-lake.jpg?s=612x612&w=0&k=20&c=NA2xKIgWKYlXD1mLuBWcQmmFFLO3siaTXWuDsaE6Uck=",
    category: "Environment",
    discussions: [
      {
        id: 12,
        user: "Aman",
        message: "Industrial waste disposal checks needed.",
        type: "text",
        timestamp: Date.now() - 8000000,
      },
    ],
    joinedUsers: ["Aman"],
  },
  {
    id: 12,
    name: "Smart City Digitization",
    members: 340,
    latest: "Public wifi hotspots installed.",
    image: "https://media.istockphoto.com/id/1221258471/photo/outdoor-router-street-access-point-coverage-wi-fi-area-repeater-street-router-for-the.jpg?s=612x612&w=0&k=20&c=xJlvh1KHHh-8C1RMmC3jX0JdH1drZ8E-tGcrU16EeIA=",
    category: "Transport",
    discussions: [
      {
        id: 13,
        user: "Leela",
        message: "Traffic sensors improve efficiency.",
        type: "text",
        timestamp: Date.now() - 720000,
      },
    ],
    joinedUsers: ["Leela"],
  },
  {
    id: 13,
    name: "Emergency Response Volunteers",
    members: 500,
    latest: "Fire safety awareness program this week.",
    image: "https://media.istockphoto.com/id/1284506661/photo/engineer-checking-industrial-fire-control-system-fire-alarm-controller-fire-notifier-anti.jpg?s=612x612&w=0&k=20&c=pRY4F3TPCU387_JRROs2ceUiP4Ligt-7NI7v1XOfxdI=",
    category: "Safety",
    discussions: [
      {
        id: 14,
        user: "Pranav",
        message: "Emergency helplines need better awareness.",
        type: "text",
        timestamp: Date.now() - 86400000 * 5,
      },
    ],
    joinedUsers: ["Pranav"],
  },
  {
    id: 14,
    name: "Urban Green Parks Forum",
    members: 400,
    latest: "Park rejuvenation plans announced.",
    image: "https://media.istockphoto.com/id/1021170914/photo/beautiful-landscape-in-park-with-tree-and-green-grass-field-at-morning.jpg?s=612x612&w=0&k=20&c=qEr8fBQ-jqwZ3y_X7UEjp-2votB_Flhob2TX_PncX5A=",
    category: "Environment",
    discussions: [
      {
        id: 15,
        user: "Divya",
        message: "We need more parks in residential areas.",
        type: "text",
        timestamp: Date.now() - 3600000,
      },
    ],
    joinedUsers: ["Divya"],
  },
  {
    id: 15,
    name: "Public Transport Feedback",
    members: 260,
    latest: "New app launched to report bus delays.",
    image: "https://media.istockphoto.com/id/1548715330/photo/man-walking-with-backpack-and-suitcase-walking-through-airport-terminal.jpg?s=612x612&w=0&k=20&c=S-4AwFIqJKrsvR-gY_RCgciyCmIETHZ0h8oeubbOkI8=",
    category: "Transport",
    discussions: [
      {
        id: 16,
        user: "Yash",
        message: "More bus shelters with shade required.",
        type: "text",
        timestamp: Date.now() - 6000000,
      },
    ],
    joinedUsers: ["Yash"],
  },
  {
    id: 16,
    name: "Local Waste Recycling Club",
    members: 150,
    latest: "New composting site inaugurated.",
    image: "https://media.istockphoto.com/id/1342229204/photo/a-lake-in-the-shape-of-a-recycling-sign-in-the-middle-of-untouched-nature-an-ecological.jpg?s=612x612&w=0&k=20&c=AENL8ZdXCJQN_q0hxCYEG1LxoOckfCezV8W206WB3k4=",
    category: "Waste",
    discussions: [
      {
        id: 17,
        user: "Maya",
        message: "Wet and dry waste segregation training needed.",
        type: "text",
        timestamp: Date.now() - 7200000,
      },
    ],
    joinedUsers: ["Maya"],
  },
  {
    id: 17,
    name: "Healthcare Digital Support",
    members: 280,
    latest: "Telemedicine booths installed.",
    image: "https://media.istockphoto.com/id/1675712006/photo/young-woman-having-a-doctors-appointment-online-at-home.jpg?s=612x612&w=0&k=20&c=GWB6VzKOSzn6he0shetqSFXbOg8O36TGTQoXui_OQzg=",
    category: "Healthcare",
    discussions: [
      {
        id: 18,
        user: "Kabir",
        message: "Helpline response time must improve.",
        type: "text",
        timestamp: Date.now() - 200000,
      },
    ],
    joinedUsers: ["Kabir"],
  },
  {
    id: 18,
    name: "Community Waste Warriors",
    members: 170,
    latest: "Monthly cleanup drive this Sunday.",
    image: "https://media.istockphoto.com/id/986900214/photo/volunteers-cleaning-park.jpg?s=612x612&w=0&k=20&c=WOSIJyalu-ZVMPKcZYuv5bnql8GZ6weECJTYqBAJExA=",
    category: "Waste",
    discussions: [
      {
        id: 19,
        user: "Rina",
        message: "Kids should be part of awareness drives.",
        type: "text",
        timestamp: Date.now() - 86400000,
      },
    ],
    joinedUsers: ["Rina"],
  },
  {
    id: 19,
    name: "Public Bike Sharing Group",
    members: 190,
    latest: "Expansion to new zones announced.",
    image: "https://media.istockphoto.com/id/1086841152/photo/friends-riding-bicycles-in-a-city.jpg?s=612x612&w=0&k=20&c=m8bxNeY0bh8nayPC4fya5058sf_sdVsWjSJ4JDFzvmM=",
    category: "Transport",
    discussions: [
      {
        id: 20,
        user: "Karthik",
        message: "Stations are lacking in residential areas.",
        type: "text",
        timestamp: Date.now() - 5000000,
      },
    ],
    joinedUsers: ["Karthik"],
  },
  {
    id: 20,
    name: "Air Pollution Control Forum",
    members: 240,
    latest: "Awareness rally for clean air on Sunday.",
    image: "https://media.istockphoto.com/id/1465338275/vector/protest-crowd-with-blank-signs.jpg?s=612x612&w=0&k=20&c=gv4Mjfg2VIzDfzzSkjDNP75vxtilFcvOvBeudG4hXaY=",
    category: "Environment",
    discussions: [
      {
        id: 21,
        user: "Geeta",
        message: "Ban on burning waste should be enforced strictly.",
        type: "text",
        timestamp: Date.now() - 360000,
      },
    ],
    joinedUsers: ["Geeta"],
  },
];


const formatTimeAgo = (ts: number) => {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

export default function CommunityPage() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<
      | "All"
      | "Traffic"
      | "Waste"
      | "Water"
      | "Safety"
      | "Healthcare"
      | "Education"
      | "Environment"
      | "Transport"
    >("All");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showMembersPanel, setShowMembersPanel] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const [showYourCommunitiesMobile, setShowYourCommunitiesMobile] =
    useState(false);
  const [confirmLeaveGroupId, setConfirmLeaveGroupId] = useState<number | null>(
    null
  );

  // State for create community modal and inputs
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    category: "Traffic",
    image: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("civicCommunityData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setJoinedCommunities(parsed.joinedCommunities || []);
      if (parsed.lastSelected) {
        const group = groups.find((g) => g.id === parsed.lastSelected);
        if (group) setSelectedGroup(group);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "civicCommunityData",
      JSON.stringify({
        joinedCommunities,
        lastSelected: selectedGroup?.id || null,
      })
    );
  }, [joinedCommunities, selectedGroup]);

  useEffect(() => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [selectedGroup?.discussions.length]);

  const isUserJoined = (groupId: number) => joinedCommunities.includes(groupId);

  const handleJoin = (groupId: number) => {
    if (!isUserJoined(groupId)) {
      setJoinedCommunities([...joinedCommunities, groupId]);
      const group = groups.find((g) => g.id === groupId);
      if (group) group.members += 1;
      setSelectedGroup(group || null);
    }
  };

  // Leave handlers
  const confirmLeaveHandler = (groupId: number) => {
    setConfirmLeaveGroupId(groupId);
  };

  const handleLeaveConfirmed = () => {
    if (confirmLeaveGroupId === null) return;
    setJoinedCommunities(joinedCommunities.filter((id) => id !== confirmLeaveGroupId));
    const group = groups.find((g) => g.id === confirmLeaveGroupId);
    if (group) group.members = Math.max(group.members - 1, 0);
    if (selectedGroup?.id === confirmLeaveGroupId) setSelectedGroup(null);
    setConfirmLeaveGroupId(null);
  };

  const handleCancelLeave = () => setConfirmLeaveGroupId(null);

  const getFileType = (file: File): "image" | "video" | "audio" => {
    if (file.type.startsWith("image")) return "image";
    if (file.type.startsWith("video")) return "video";
    if (file.type.startsWith("audio")) return "audio";
    return "image";
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    }
  };

  const clearPreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSend = () => {
    if (!selectedGroup) return;
    if (!message.trim() && !file) return;

    const newDiscussion: Discussion = {
      id: Date.now(),
      user: currentUserName,
      message: file ? undefined : message.trim(),
      media: file ? previewUrl ?? undefined : undefined,
      type: file ? getFileType(file) : "text",
      timestamp: Date.now(),
    };

    selectedGroup.discussions.push(newDiscussion);
    setMessage("");
    clearPreview();
    setSelectedGroup({ ...selectedGroup });
  };

  const handleDeleteMessage = (msgId: number) => {
    if (!selectedGroup) return;
    selectedGroup.discussions = selectedGroup.discussions.filter(
      (msg) => msg.id !== msgId
    );
    setSelectedGroup({ ...selectedGroup });
  };

  const filteredMembers = selectedGroup?.joinedUsers.filter((user) =>
    user.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const filteredGroups = groups.filter((g) => {
    const matchesFilter = filter === "All" || g.category === filter;
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderMessageContent = (msg: Discussion) => {
    switch (msg.type) {
      case "text":
        return <p>{msg.message}</p>;
      case "image":
        return (
          <Image
            src={msg.media || ""}
            alt="Image"
            width={200}
            height={200}
            className="rounded-lg mt-1"
          />
        );
      case "video":
        return (
          <video controls className="rounded-lg mt-1 w-48 max-w-full">
            <source src={msg.media} />
          </video>
        );
      case "audio":
        return (
          <audio controls className="mt-1 w-full">
            <source src={msg.media} />
          </audio>
        );
      default:
        return null;
    }
  };

  return (
    <section className="container mx-auto p-4 max-w-6xl min-h-screen flex flex-col">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-black select-none">Community Hub</h1>
        <p className="text-black mt-2 max-w-xl mx-auto">
          Collaborate, discuss, and solve civic issues in your neighborhood and city.
        </p>
      </header>

      {/* Your Communities Section */}
      <section className="mb-8 border border-green-300 rounded-3xl bg-green-50 shadow p-4">
        <div
          className="flex justify-between items-center cursor-pointer md:cursor-default select-none"
          onClick={() => setShowYourCommunitiesMobile((v) => !v)}
          aria-expanded={showYourCommunitiesMobile}
          aria-controls="your-communities-panel"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              setShowYourCommunitiesMobile((v) => !v);
          }}
        >
          <h2 className="text-xl font-semibold text-green-700">Your Communities</h2>
          <button
            className="rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1"
            aria-label={
              showYourCommunitiesMobile
                ? "Collapse your communities"
                : "Expand your communities"
            }
          >
            {showYourCommunitiesMobile ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {(showYourCommunitiesMobile || window.innerWidth >= 768) && (
          <div
            id="your-communities-panel"
            className="flex flex-wrap gap-2 mt-4 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100"
          >
            {joinedCommunities.length === 0 && (
              <p className="text-green-800 italic px-2">
                You are not a member of any community yet.
              </p>
            )}
            {joinedCommunities.map((id) => {
              const group = groups.find((g) => g.id === id);
              if (!group) return null;
              return (
                <button
                  key={id}
                  className="flex items-center bg-green-700 text-white px-4 py-2 rounded-2xl shadow hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-600"
                  onClick={() => setSelectedGroup(group)}
                  aria-label={`View community ${group.name}`}
                >
                  {group.name}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Search & Filter Section */}
      <section className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-3 text-gray-500 pointer-events-none" />
          <input
            type="text"
            aria-label="Search communities"
            placeholder="Search communities..."
            className="w-full pl-10 py-2 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            "All",
            "Traffic",
            "Waste",
            "Water",
            "Safety",
            "Healthcare",
            "Education",
            "Environment",
            "Transport",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                filter === cat
                  ? "bg-green-700 text-white shadow-lg"
                  : "bg-white border border-green-400 text-green-700 hover:bg-green-100"
              }`}
              aria-pressed={filter === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Community Cards Grid */}
      <section className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full py-10">
              No communities found matching your criteria.
            </p>
          ) : (
            filteredGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-3xl shadow-md border border-green-300 hover:shadow-xl hover:border-green-500 transition-colors overflow-hidden flex flex-col"
              >
                <div className="relative h-40 w-full flex-shrink-0">
                  <Image
                    src={group.image}
                    alt={`${group.name} community image`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-green-800 font-semibold text-lg mb-1 line-clamp-1">
                    {group.name}
                  </h3>
                  <p className="text-gray-600 flex items-center gap-2 mb-3 text-sm">
                    <FaUsers /> {group.members} members
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-2 text-sm">
                    <span className="font-semibold">Latest:</span> {group.latest}
                  </p>
                  <button
                    onClick={() => setSelectedGroup(group)}
                    className={`mt-auto py-2 rounded-2xl font-semibold transition focus:outline-none focus:ring-2 ${
                      isUserJoined(group.id)
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-green-700 hover:bg-green-800 text-white"
                    }`}
                    aria-label={`${
                      isUserJoined(group.id) ? "View" : "Join"
                    } ${group.name} community`}
                  >
                    {isUserJoined(group.id) ? "View Community" : "Join Community"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Floating Create Community Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-6 right-6 bg-green-700 hover:bg-green-800 text-white 
          w-16 h-16 rounded-full shadow-lg flex items-center justify-center 
          text-4xl transition-transform transform hover:rotate-90"
        aria-label="Create Community"
      >
        +
      </button>

      {/* Create Community Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-xl max-w-lg w-11/12 p-6 animate-slideUp relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-red-600 transition"
              aria-label="Close create community form"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold text-green-700 mb-4">Create Community</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newCommunity.name.trim()) return;

                const newGroup: Group = {
                  id: groups.length + 1,
                  name: newCommunity.name.trim(),
                  members: 1,
                  latest: "New community created!",
                  image: newCommunity.image || "/default.jpg",
                  category: newCommunity.category as Group["category"],
                  discussions: [],
                  joinedUsers: [currentUserName],
                };
                groups.push(newGroup);
                setJoinedCommunities([...joinedCommunities, newGroup.id]);
                setSelectedGroup(newGroup);
                setNewCommunity({ name: "", category: "Traffic", image: "" });
                setShowCreateModal(false);
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Community Name"
                className="border border-green-400 rounded-xl px-4 py-2"
                value={newCommunity.name}
                onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
                required
                maxLength={50}
              />
              <select
                className="border border-green-400 rounded-xl px-4 py-2"
                value={newCommunity.category}
                onChange={(e) =>
                  setNewCommunity({ ...newCommunity, category: e.target.value })
                }
              >
                {[
                  "Traffic",
                  "Waste",
                  "Water",
                  "Safety",
                  "Healthcare",
                  "Education",
                  "Environment",
                  "Transport",
                ].map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Image URL (optional)"
                className="border border-green-400 rounded-xl px-4 py-2"
                value={newCommunity.image}
                onChange={(e) => setNewCommunity({ ...newCommunity, image: e.target.value })}
              />
              <button
                type="submit"
                className="bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CHAT MODAL */}
      {selectedGroup && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex flex-col md:flex-row md:justify-center md:items-center p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="community-dialog-title"
        >
          {/* Sidebar - Community List */}
          <aside className="bg-green-50 rounded-3xl md:w-1/4 mb-4 md:mb-0 md:mr-6 flex flex-col max-h-[85vh] overflow-y-auto">
            <header className="p-5 border-b border-green-200 flex justify-between items-center rounded-t-3xl sticky top-0 bg-green-50 z-10">
              <h3
                className="text-green-700 font-bold text-lg"
                id="community-dialog-title"
              >
                Communities
              </h3>
            </header>
            <div className="flex-1 overflow-auto p-3 space-y-2">
              {groups.map((grp) => (
                <button
                  key={grp.id}
                  onClick={() => {
                    setSelectedGroup(grp);
                    setShowMembersPanel(false);
                    setMemberSearch("");
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-xl transition truncate ${
                    grp.id === selectedGroup.id
                      ? "bg-green-700 text-white"
                      : "hover:bg-green-100 text-green-700"
                  }`}
                  aria-current={grp.id === selectedGroup.id}
                >
                  {grp.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Chat + Members Panel Wrapper */}
          <main className="flex-1 bg-white rounded-3xl shadow-lg flex flex-col max-h-[90vh] md:max-h-[80vh] overflow-hidden min-w-0 md:w-3/4">
            {/* Header with Leave and Close buttons */}
            <header className="flex justify-between items-center border-b border-green-200 p-4 rounded-t-3xl bg-green-50 sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold text-green-700">
                  {selectedGroup.name}
                </h2>
                <p className="text-xs text-gray-500">{selectedGroup.members} members</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => confirmLeaveHandler(selectedGroup.id)}
                  className="mr-4 bg-red-600 text-white px-3 py-1 rounded-xl font-semibold hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Leave community"
                >
                  Leave
                </button>
                <button
                  className="text-green-600 hover:text-red-600 transform hover:scale-110 transition text-3xl p-2"
                  onClick={() => setSelectedGroup(null)}
                  aria-label="Close chat"
                >
                  <FaTimes />
                </button>
              </div>
            </header>

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative">
              {/* Messages Area */}
              <section className="flex-1 p-4 overflow-y-auto space-y-5 max-h-[calc(90vh-128px)] min-w-0">
                {!isUserJoined(selectedGroup.id) ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-green-900">
                    <p className="mb-6 text-lg font-semibold">
                      You are not a member of this community.
                    </p>
                    <button
                      onClick={() => handleJoin(selectedGroup.id)}
                      className="bg-green-700 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-green-800 transition focus:outline-none focus:ring-2 focus:ring-green-600"
                      aria-label={`Join ${selectedGroup.name} community`}
                    >
                      Join Now
                    </button>
                  </div>
                ) : (
                  <>
                    {selectedGroup.discussions.length === 0 && (
                      <p className="text-center text-gray-400 mt-20">
                        No messages yet. Start the discussion below.
                      </p>
                    )}

                    {selectedGroup.discussions.map((msg) => (
                      <article
                        key={msg.id}
                        className={`max-w-lg rounded-2xl p-4 shadow-md relative ${
                          msg.user === currentUserName
                            ? "bg-green-600 text-white ml-auto"
                            : "bg-green-100 text-green-900"
                        }`}
                        aria-label={`Message from ${msg.user}`}
                      >
                        <header className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{msg.user}</h4>
                          <time
                            className="text-xs opacity-70"
                            dateTime={new Date(msg.timestamp).toISOString()}
                          >
                            {formatTimeAgo(msg.timestamp)}
                          </time>
                        </header>
                        <div>{renderMessageContent(msg)}</div>
                        {msg.user === currentUserName && (
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="absolute top-1 right-1 p-1 rounded-full hover:bg-green-700 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-green-700"
                            aria-label="Delete message"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </article>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </section>

              {/* Members Panel */}
              <aside
                className={`bg-green-50 border-l border-green-200 md:w-72 p-4 flex flex-col transition-transform duration-500 ease-in-out fixed md:relative top-0 left-0 h-full z-50 md:z-auto rounded-tr-3xl rounded-br-3xl md:rounded-none shadow-lg md:shadow-none w-full md:w-72 ${
                  showMembersPanel
                    ? "translate-x-0"
                    : "-translate-x-full md:translate-x-0"
                }`}
              >
                <header className="mb-3 flex justify-between items-center">
                  <h3 className="font-bold text-green-700">Members</h3>
                  <button
                    onClick={() => setShowMembersPanel(false)}
                    className="text-green-700 md:hidden p-1 rounded-full hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                    aria-label="Close members panel"
                  >
                    <FaTimes />
                  </button>
                </header>
                <input
                  type="search"
                  aria-label="Search members"
                  placeholder="Search members..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="mb-3 px-3 py-2 border border-green-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <ul className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100">
                  {filteredMembers && filteredMembers.length > 0 ? (
                    filteredMembers.map((user) => (
                      <li
                        key={user}
                        className="p-2 border-b border-green-200 text-green-800 font-medium truncate"
                      >
                        {user}
                      </li>
                    ))
                  ) : (
                    <li className="text-green-500 italic text-center mt-4">
                      No members found
                    </li>
                  )}
                </ul>
              </aside>
            </div>

            {/* Input Bar */}
            {isUserJoined(selectedGroup.id) && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="border-t border-green-200 p-3 flex items-center gap-2 rounded-b-3xl bg-green-50"
              >
                <input
                  aria-label="Type your message"
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 border border-green-400 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-600"
                  maxLength={1000}
                />

                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*,video/*,audio/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="px-3 py-2 bg-green-200 rounded-xl cursor-pointer hover:bg-green-300 transition flex items-center"
                  title="Attach image, video or audio"
                >
                  <FaPaperclip />
                </label>

                {previewUrl && (
                  <div className="relative">
                    <div
                      className="absolute -top-2 -right-2 cursor-pointer bg-red-600 rounded-full p-1 shadow-md hover:bg-red-700 text-white transition"
                      onClick={clearPreview}
                      role="button"
                      tabIndex={0}
                      aria-label="Remove attached file"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") clearPreview();
                      }}
                    >
                      <FaTimesCircle size={18} />
                    </div>
                    {file && file.type.startsWith("image") && (
                      <Image
                        src={previewUrl}
                        alt="Thumbnail"
                        width={40}
                        height={40}
                        className="rounded"
                      />
                    )}
                    {file && file.type.startsWith("video") && (
                      <video className="w-16 rounded" muted>
                        <source src={previewUrl} />
                      </video>
                    )}
                    {file && file.type.startsWith("audio") && (
                      <audio controls className="w-24" src={previewUrl} />
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!message.trim() && !file}
                  className={`flex items-center gap-1 px-4 py-2 rounded-xl font-semibold text-white transition ${
                    !message.trim() && !file
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-700 hover:bg-green-800"
                  } focus:outline-none focus:ring-2 focus:ring-green-600`}
                  aria-label="Send message"
                >
                  <FaPaperPlane /> Send
                </button>
              </form>
            )}

            {/* Leave Confirmation Modal */}
            {confirmLeaveGroupId !== null && (
              <div
                className="fixed inset-0 bg-black/60 flex justify-center items-center z-60"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="leave-dialog-title"
                aria-describedby="leave-dialog-desc"
              >
                <div className="bg-white p-6 rounded-3xl w-11/12 max-w-md shadow-lg text-center">
                  <h3
                    className="text-xl font-bold mb-4 text-red-600"
                    id="leave-dialog-title"
                  >
                    Confirm Leave
                  </h3>
                  <p id="leave-dialog-desc" className="mb-6 text-gray-700">
                    Are you sure you want to leave this community? You will lose
                    access to its discussions.
                  </p>
                  <div className="flex justify-center gap-6">
                    <button
                      onClick={handleLeaveConfirmed}
                      className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Yes, Leave
                    </button>
                    <button
                      onClick={handleCancelLeave}
                      className="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </section>
  );
}
